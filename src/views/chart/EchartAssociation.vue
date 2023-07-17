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
      "name": "Nginx",
      "symbolSize": 66,
      "x": -87,
      "y": -6,
      "value": "haha",
      "category": 0
    },
    {
      "id": "1",
      "name": "Nginx Lua",
      "symbolSize": 16,
      "x": -140,
      "y": 113,
      "value": 10,
      "category": 0
    },
    {
      "id": "10",
      "name": "ACME",
      "symbolSize": 26,
      "x": -300,
      "y": 100,
      "value": 28.685715,
      "category": 1
    },
    {
      "id": "11",
      "name": "User Permission",
      "symbolSize": 26,
      "x": -50,
      "y": -280,
      "value": 28.685715,
      "category": 1
    },
    {
      "id": "20",
      "name": "Service Desk Web",
      "symbolSize": 35,
      "x": -200,
      "y": -180,
      "value": 4,
      "category": 2
    },
    {
      "id": "21",
      "name": "Milvus Attu",
      "symbolSize": 23,
      "x": 200,
      "y": 180,
      "value": 4,
      "category": 2
    },
    {
      "id": "30",
      "name": "3GPP Tech&Spec",
      "symbolSize": 30,
      "x": -480,
      "y": 400,
      "value": 9.485714,
      "category": 3
    },
    {
      "id": "31",
      "name": "CPI Docs",
      "symbolSize": 20,
      "x": -550,
      "y": 350,
      "value": 9.485714,
      "category": 3
    },
    {
      "id": "32",
      "name": "Pre-Sales Support Ticket",
      "symbolSize": 20,
      "x": -440,
      "y": 300,
      "value": 9.485714,
      "category": 3
    },
    {
      "id": "33",
      "name": "Automatic Deployment Manual",
      "symbolSize": 20,
      "x": -500,
      "y": 250,
      "value": 9.485714,
      "category": 3
    },
    {
      "id": "40",
      "name": "Langchain Embedding Client",
      "symbolSize": 30,
      "x": 238,
      "y": -150,
      "value": 9.485714,
      "category": 4
    },
    {
      "id": "41",
      "name": "Embedding Model",
      "symbolSize": 16,
      "x": 353,
      "y": -200,
      "value": 9.485714,
      "category": 4
    },
    {
      "id": "50",
      "name": "Tokenizer",
      "symbolSize": 15,
      "x": -200,
      "y": 245.29176,
      "value": 9.485714,
      "category": 5
    },
    {
      "id": "51",
      "name": "Spider",
      "symbolSize": 23,
      "x": -266,
      "y": 350,
      "value": 9.485714,
      "category": 5
    },
    {
      "id": "52",
      "name": "Converter",
      "symbolSize": 35,
      "x": -100,
      "y": 300,
      "value": 9.485714,
      "category": 5
    },
    {
      "id": "60",
      "name": "Milvus SA",
      "symbolSize": 40,
      "x": 387,
      "y": 200,
      "value": 9.485714,
      "category": 6
    },
    {
      "id": "61",
      "name": "etcd",
      "symbolSize": 22,
      "x": 516,
      "y": 347,
      "value": 9.485714,
      "category": 6
    },
    {
      "id": "62",
      "name": "MinIO",
      "symbolSize": 22,
      "x": 600,
      "y": 335,
      "value": 9.485714,
      "category": 6
    },
    {
      "id": "70",
      "name": "Local Chat Model",
      "symbolSize": 30,
      "x": -500,
      "y": -100,
      "value": 9.485714,
      "category": 7
    },
    {
      "id": "71",
      "name": "OpenAI",
      "symbolSize": 20,
      "x": -646,
      "y": -151,
      "value": 9.485714,
      "category": 7
    },
  ];

  const links = [
    {
      "source": "1",
      "target": "0"
    },
    {
      "source": "10",
      "target": "0"
    },
    {
      "source": "0",
      "target": "21"
    },
    {
      "source": "0",
      "target": "20"
    },
    {
      "source": "20",
      "target": "0"
    },
    {
      "source": "20",
      "target": "11"
    },
    {
      "source": "11",
      "target": "40"
    },
    {
      "source": "30",
      "target": "51"
    },
    {
      "source": "31",
      "target": "51"
    },
    {
      "source": "32",
      "target": "51"
    },
    {
      "source": "33",
      "target": "51"
    },
    {
      "source": "21",
      "target": "60"
    },

    {
      "source": "70",
      "target": "20"
    },
    {
      "source": "71",
      "target": "20"
    },
    {
      "source": "40",
      "target": "20"
    },
    {
      "source": "40",
      "target": "41"
    },
    {
      "source": "51",
      "target": "52"
    },
    {
      "source": "50",
      "target": "52"
    },
    {
      "source": "40",
      "target": "52"
    },

    {
      "source": "60",
      "target": "40"
    },
    {
      "source": "40",
      "target": "60"
    },
    {
      "source": "60",
      "target": "61"
    },
    {
      "source": "60",
      "target": "62"
    },

  ];

  const categories = [
    {
      "name": "Access Network" // 0-9
    },
    {
      "name": "Certification & Management" // 10-19
    },
    {
      "name": "User Interaction" // 20-29
    },
    {
      "name": "Document Source" // 30-39
    },
    {
      "name": "Embedding Application" // 40-49
    },
    {
      "name": "Crawler Application" // 50-59
    },
    {
      "name": "Data Base" // 60-69
    },
    {
      "name": "LLM" // 70 -
    },
  ];


  const option = computed<EChartsOption>(() => ({
    // tooltip: {},
    axisPointer: {animation: true},

    legend: [
      {
        data: categories.map(function (a) {
          return a.name;
        })
      }
    ],
    series: [
      {
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
        },
      },
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
