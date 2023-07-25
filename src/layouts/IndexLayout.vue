<script setup lang="ts">
  import ToolbarLanguage from "@/components/toolbar/ToolbarLanguage.vue";
  import ToolbarLogin from "@/components/toolbar/ToolbarLogin.vue";

  import { useCustomizeThemeStore } from "@/stores/customizeTheme";
  const customizeTheme = useCustomizeThemeStore();
</script>

<template>
  <v-app-bar>
    <v-spacer></v-spacer>
    <div class="d-flex">
      <ToolbarLanguage />
      <ToolbarLogin />
    </div>
  </v-app-bar>

  <v-main class="main-container">
    <!-- <GlobalLoading /> -->

    <div class="flex-fill">
      <slot></slot>
    </div>
  </v-main>
</template>

<style scoped>
  .scrollnav {
    height: calc(100vh - 326px);
  }

  .main-container {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
