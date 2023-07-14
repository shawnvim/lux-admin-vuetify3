<!--
* @Component: EchartPie
* @Maintainer: J.K. Yang
* @Description: Echart 饼图页
-->
\
<script setup lang="ts">
  import { Ref } from "vue";
  import type { EChartsOption } from "echarts";
  import { useChart, RenderType, ThemeType } from "@/plugins/echarts";

  const data = [
    {
      name: 'Nginx Proxy',
      children: [
        {
          name: 'Vue3 Web',
          value: 18,
          children: [
            {
              name: 'Access Auth',
              value: 6,
              children: [
                {
                  name: 'LDAP Client',
                  value: 2
                },
                {
                  name: 'Firebase Auth',
                  value: 2
                },
                {
                  name: 'SQL',
                  value: 2
                }
              ]
            },
            {
              name: 'Embedding Client',
              value: 6,
              children: [
                {
                  name: 'OpenAI Embed API',
                  value: 3
                },
                {
                  name: 'Local Embed model',
                  value: 3
                }
              ]
            },
            {
              name: 'LLM',
              value: 6,
              children: [
                {
                  name: 'OpenAI Chat API',
                  value: 3
                },
                {
                  name: 'Local LLM',
                  value: 3
                }
              ]
            },
          ]
        },
        {
          name: 'Milvus UI - Attu',
          value: 10,
          children: [
            {
              name: 'Milvus SA',
              value: 5,
              children: [
                {
                  name: 'MinIO',
                  value: 2
                },
                {
                  name: 'etcd',
                  value: 2
                }
              ]
            },

          ]
        }
      ]
    },
    {
      name: 'Certificates',
      children: [
        {
          name: 'ACME',
          children: [
            {
              name: 'LetsEncrypt',
              value: 7
            },
            {
              name: 'BuyPass',
              value: 3
            },
            {
              name: 'ZeroSSL',
              value: 3
            },
          ]
        }
      ]
    }
  ];


  const option = computed<EChartsOption>(() => ({
    // Make gradient line here
    series: [
      {
          type: 'sunburst',
          data: data,
          radius: [60, '90%'],
          itemStyle: {
            borderRadius: 7,
            borderWidth: 2
          },
          label: {
                    rotate: 'tangential'
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
