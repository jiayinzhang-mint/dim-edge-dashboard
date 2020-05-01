<template>
  <div>
    <div :id="`chart-${name}`" style="height: 400px;"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import echarts from 'echarts';
import colors from 'vuetify/es5/util/colors';

@Component
export default class AreaChart extends Vue {
  @Prop(String) title!: string;
  @Prop(String) name!: string;
  @Prop(String) unit!: string;
  @Prop() data!: (string | number)[][];

  get color() {
    return this.$vuetify.theme.dark
      ? colors.grey.lighten1
      : colors.grey.darken4;
  }

  initChart() {
    const d = document.getElementById(`chart-${this.name}`) as HTMLDivElement;
    const myChart = echarts.init(d);

    console.log(this.color);

    myChart.setOption({
      title: {
        text: this.title,
        textStyle: {
          color: this.color,
          fontSize: 15,
        },
      },
      textStyle: {
        color: this.color,
      },
      xAxis: {
        type: 'time',
        axisLine: {
          lineStyle: {
            color: 'rgba(100,100,100,0.4)',
          },
        },
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        axisLine: {
          lineStyle: {
            color: 'rgba(100,100,100,0.4)',
          },
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(100,100,100,0.4)',
          },
        },
        axisLabel: {
          formatter: (e: number) => e.toFixed(1) + this.unit || '',
        },
        max: (e) => e.max + 1,
        min: (e) => (e.min - 1 < 0 ? 0 : e.min - 1),
      },
      series: [
        {
          type: 'line',
          data: this.dataShow,
          itemStyle: {
            color: 'rgb(60, 166, 154)',
          },
          lineStyle: {
            color: 'rgb(60, 166, 154)',
          },
          symbol: 'emptyCircle',
          smooth: true,
          areaStyle: {
            color: ({
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgb(60, 166, 154, 0.8)',
                },
                {
                  offset: 1,
                  color: 'rgb(60, 166, 154, 0.1)',
                },
              ],
              globalCoord: false, // 缺省为 false
            } as unknown) as string,
          },
        },
      ],
    });

    myChart.resize();
  }

  get dataShow() {
    return this.data.map((e) => [
      new Date(Number(e[0]) * 1000).toISOString(),
      e[1],
    ]);
  }

  @Watch('data')
  onDataChanged() {
    this.initChart();
  }

  mounted() {
    this.initChart();
  }
}
</script>

<style scoped></style>
