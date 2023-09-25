<!--
* @Component: 
* @Maintainer: Shawn Qiu
* @Description: 
-->
<script setup lang="ts">
const articles = [
  {
    id: 1,
    title: "Knowledge DB",
    subtitle: "Knowledge based database",
    image:
      "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    createAt: "Apr/2023",
    author: "",
    content:
      "Transform existing documentation collections associated with specific knowledge domains (standard, feature study, product info, training material, support ticket, etc.) for integration with natural language capabilities.",
  },
  {
    id: 2,
    title: "AIGC",
    subtitle: "LLM Integrated",
    image:
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    createAt: "May/2023",
    author: "",
    content:
      "Various LLM frameworks could be used as LLM agent functionality.",
  },
  {
    id: 3,
    title: "Web UI",
    subtitle: "Progressive and Cross-platform",
    image:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    createAt: "Jul/2023",
    author: "",
    content:
      "A progressive framework allowing selection of various knowledge domains and then further interaction by text chat or voice dictation. Hot reload and Server-Side Rendering (SSR).",
  },
  {
    id: 4,
    title: "Containerized ",
    subtitle: "Cloud-native Deployment",
    image:
      "https://images.unsplash.com/photo-1667372459510-55b5e2087cd0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    createAt: "Aug/2023",
    author: "",
    content:
      "Cloud-native containerization deployment and corresponding components compose.",
  },
];
</script>

<template>

  <v-sheet elevation="0" class="mx-auto" rounded>
    <v-sheet max-width="1600" class="mx-auto pa-5" elevation="0">
      <v-container>
        <v-row align="start">
          <v-col cols="12" md="3" v-for="item in articles" :key="item.id">
            <v-card max-width="400" class="mx-auto">
              <v-img cover :src="item.image" height="200px"></v-img>
              <v-card-title class="text-h6 font-weight-bold">
                {{ item.title }}
              </v-card-title>
              <v-card-subtitle>
                {{ item.subtitle }}</v-card-subtitle
              >
              <v-card-text>
                {{ item.content }}
              </v-card-text>
              <v-card-actions>
                <v-btn text color="primary">
                  <v-icon class="mr-2">mdi-account</v-icon>
                  {{ item.author }}
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn text color="primary">
                  <v-icon class="mr-2">mdi-calendar</v-icon>
                  {{ item.createAt }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-sheet>
</template>

<style scoped lang="scss"></style>
