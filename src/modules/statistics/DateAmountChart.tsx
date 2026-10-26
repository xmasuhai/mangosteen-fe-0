import { defineComponent, onMounted, ref } from 'vue'
import * as echarts from 'echarts'

/**
 * @Description: 日期金额图表
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-26 13:52:08
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-26 14:10:46
 * @FilePath: src/modules/statistics/DateAmountChart.tsx
 */
export const DateAmountChart = defineComponent({
  name: 'DateAmountChart',
  props: {},
  setup(_props, _ctx) {
    const lineChartRef = ref<HTMLDivElement>()

    onMounted(() => {
      const lineChart = echarts.init(lineChartRef.value)
      lineChart.setOption({
        grid: { left: 0, right: 0, top: 0, bottom: 0 },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      })
    })

    return () => (
      <div ref={lineChartRef} class="h-128px w-full max-h-240px max-w-440px mb-1em"></div>
    )
  },
})
