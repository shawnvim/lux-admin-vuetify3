<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
const articles = [
  {
    id: 1,
    title: "Vue 3",
    subtitle: "Progressive Framework",
    image:
      "https://vuejs.org/logo.svg",
    content:
      "An approachable, performant and versatile framework for building web user interfaces.",
  },
  {
    id: 2,
    title: "Vite 4",
    subtitle: "Frontend Tooling",
    image:
      "https://v3.vitejs.dev/logo.svg",
    content:
      "The availability of native ES modules in the browser, and the rise of JavaScript tools written in compile-to-native languages.",
  },
  {
    id: 3,
    title: "Pinia",
    subtitle: "Intuitive store",
    image:
      "https://pinia.vuejs.org/logo.svg",
    content:
      "Type Safe, Extensible, and Modular by design. Forget you are even using a store.",
  },
];
</script>

<template>

  <v-sheet elevation="0" class="mx-auto" rounded>
    <v-sheet max-width="1600" class="mx-auto pa-5" elevation="0">
      <v-container>
        <v-row align="start">
          <v-col cols="12" md="4" v-for="item in articles" :key="item.id">
            <v-card max-width="400" class="mx-auto">
              <v-img class="ma-3" :src="item.image" height="200px"></v-img>
              <v-card-title class="text-h6 font-weight-bold">
                {{ item.title }}
              </v-card-title>
              <v-card-subtitle>
                {{ item.subtitle }}</v-card-subtitle
              >
              <v-card-text>
                {{ item.content }}
              </v-card-text>
            
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-sheet>
</template>

<style scoped lang="scss"></style>
