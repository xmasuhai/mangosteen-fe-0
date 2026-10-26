import { defineComponent, onMounted, ref } from 'vue'
import * as echarts from 'echarts'

/**
 * @Description: 金额比例图表
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-26 13:54:13
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-26 15:23:21
 * @FilePath: src/modules/statistics/AmountProportionChart.tsx
 */
export const AmountProportionChart = defineComponent({
  name: 'AmountProportionChart',
  setup(_props, _ctx) {
    const pieChartRef = ref<HTMLDivElement>()
    onMounted(() => {
      const pieChart = echarts.init(pieChartRef.value)
      pieChart.setOption({
        grid: { left: 0, right: 0, top: 0, bottom: 0 },
        tooltip: {
          trigger: 'item',
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
              { value: 300, name: 'Video Ads' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      })
    })

    return () => <div ref={pieChartRef} class="h-65vw w-full max-h-320px max-w-440px mb-1em"></div>
  },
})
