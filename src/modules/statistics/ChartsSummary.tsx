import { defineComponent, type PropType, ref, onMounted, } from 'vue'
import { FormItem } from '@/components/form/FormItem.tsx'
import * as echarts from 'echarts'
import { cn } from 'cn'

/**
 * @Description: 组件描述
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-23 22:55:11
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-26 13:40:22
 * @FilePath: src/modules/statistics/ChartsSummary.tsx
 */
export const ChartsSummary = defineComponent({
  name: 'ChartsSummary',
  props: {
    startDate: {
      type: String as PropType<string>,
      required: true,
    },
    endDate: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup( _props, _ctx ) {
    const kindOptions = Object.freeze([
      { value: 'expenses', label: '支出' },
      { value: 'incomes', label: '收入' },
    ])
    const kindRef = ref('expenses')
    const lineChartRef = ref<HTMLDivElement>()
    const pieChartRef = ref<HTMLDivElement>()

    const barProgressList = ref([
      {id: '1', tag: {sign: '😄', name: '房租', id: '1',}, amount: '3112', percent: '11',},
      {id: '2', tag: {sign: '💰', name: '工资', id: '2',}, amount: '32112', percent: '56',},
      {id: '3', tag: {sign: '💵', name: '奖金', id: '3',}, amount: '12323', percent: '33',},
    ])

    onMounted(() => {
      const lineChart = echarts.init(lineChartRef.value)
      const pieChart = echarts.init(pieChartRef.value)
      lineChart.setOption({
        grid: {left: 0, right: 0, top: 0, bottom: 0},
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      })
      pieChart.setOption({
        grid: {left: 0, right: 0, top: 0, bottom: 0,},
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })

      console.log('ChartsSummary_______________________')
      console.log("%c 2 --> lineChart: ","color:#58c4dc;", lineChart);
      console.log("%c 2 --> pieChart: ","color:#58c4dc;", pieChart);
      console.log("%c 3 --> lineChartRef: ","color:#ff0;", lineChartRef.value);
      console.log("%c 3 --> pieChartRef: ","color:#ff0;", pieChartRef.value);
      console.log('_______________________ChartsSummary')
    })

    return () => (
      <div class="mx-1em overflow-y-auto">
        <FormItem
          label="类型"
          type="select"
          v-model={kindRef.value}
          options={kindOptions}
          class="mb-1.5em"/>

        <div ref={lineChartRef} class="h-128px w-full max-h-240px max-w-440px mb-1em"></div>

        <div ref={pieChartRef} class="h-65vw w-full max-h-320px max-w-440px mb-1em"></div>

        <div
          class={cn(
          'bar-progress mb-8em',
          '[&>.top-item]:[--sibling-idx:calc(1*sibling-index())]',
          )}>
          {
            barProgressList.value
              .map(({id, tag, amount, percent}) => (
                <div
                  key={id}
                  style={{'--width-percent': `${percent}%`}}
                  class={cn(
                  'top-item mb-1em flex items-center justify-between',
                  )}>
                  <div class={cn(
                    'sign size-3em rounded-[50%] bg-[var(--tag-bg)]',
                    'grow-0 shrink-0 flex items-center justify-center',
                  )}>
                    {tag.sign}
                  </div>
                  <div class="bar-wrapper ml-1em grow-1 shrink-1">
                    <div class="bar_text text-[var(--text-muted)] flex items-center justify-between">
                      <span> {tag.name} - {percent}%</span>
                      <span> ¥ {amount}</span>
                    </div>
                    <div class="bar h-.5em rounded-.25em bg-[var(--bar-bg)] relative overflow-clip mt-.25em">
                      <div
                        class={cn(
                        'bar_inner absolute top-0 left-0',
                        `w-[var(--width-percent)] h-full`,
                        `bg-[oklch(70%_0.15_calc(var(--sibling-idx)*70))]`,
                        )}></div>
                    </div>
                  </div>
                </div>
              ))
          }
        </div>
      </div>
    )
  },
})
