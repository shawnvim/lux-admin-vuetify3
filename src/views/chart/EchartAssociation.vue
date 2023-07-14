<!--
* @Component: EchartGraph
* @Maintainer: Shawn Qiu
* @Description: Echart 关系图
-->
\
<script setup lang="ts">
  import { Ref } from "vue";
  import type { EChartsOption } from "echarts";
  import { useChart, RenderType, ThemeType } from "@/plugins/echarts";

  const nodes = [
    {
      "id": "0",
      "name": "Myriel",
      "symbolSize": 19.12381,
      "x": -266.82776,
      "y": 299.6904,
      "value": 28.685715,
      "category": 0
    },
    {
      "id": "1",
      "name": "Napoleon",
      "symbolSize": 2.6666666666666665,
      "x": -418.08344,
      "y": 446.8853,
      "value": 4,
      "category": 0
    },
    {
      "id": "2",
      "name": "MlleBaptistine",
      "symbolSize": 6.323809333333333,
      "x": -212.76357,
      "y": 245.29176,
      "value": 9.485714,
      "category": 1
    },
  ];

  const links = [
    {
      "source": "1",
      "target": "0"
    },
    {
      "source": "2",
      "target": "0"
    },
  ];

  const categories = [
    {
      "name": "UI"
    },
    {
      "name": "Data Base"
    },
  ];


  const option = computed<EChartsOption>(() => ({
    legend: [
      {
        data: categories.map(function (a) {
          return a.name;
        })
      }
    ],
    series: [
      {
        name: 'Les Miserables',
        type: 'graph',
        layout: 'none',
        data: nodes,
        links: links,
        categories: categories,
        roam: true,
        label: {
          show: true,
          position: 'right',
          formatter: '{b}'
        },
        labelLayout: {
          hideOverlap: true
        },
        scaleLimit: {
          min: 0.4,
          max: 2
        },
        lineStyle: {
          color: 'source',
          curveness: 0.3
        }
      }
    ],
  }));

  const chartEl = ref<HTMLDivElement | null>(null);

  const { setOption, showLoading } = useChart(
    chartEl as Ref<HTMLDivElement>,
    true,
    true,
    RenderType.SVGRenderer,
    ThemeType.Light
  );

  onMounted(() => {
    nextTick(() => {
      // 显示loading
      showLoading();
      // 假装有网络请求 ...
      // 渲染图表
      setOption(option.value);
    });
  });

  watch(
    () => option.value,
    (newVal) => {
      setOption(newVal);
    },
    { deep: true }
  );
</script>

<template>
  <v-card class="ma-5 pa-5">
    <div ref="chartEl" :style="{ width: `100%`, height: `85vh` }"></div>
  </v-card>
</template>
