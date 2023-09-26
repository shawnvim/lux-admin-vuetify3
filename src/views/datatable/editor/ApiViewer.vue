<script setup lang="ts">
import SwaggerUI from 'swagger-ui';
import 'swagger-ui/dist/swagger-ui.css';
import { Icon } from "@iconify/vue";
import apiData from "@data/5gc_api.json";

const dialog1 = ref(false);
const dialog2 = ref(false);
const release = ref("Rel-18");
const url = ref("/5GC_APIs/");
  // const url = ref("https://raw.githubusercontent.com/jdegre/5GC_APIs/");
const doc = ref("TS29518_Namf_Communication");
const ext = ref(".yaml");
const selectedDoc = ref();
const selectedRelease = ref();

const searchKey = ref("");

onMounted(() => {
  updateUI();
});

watch(selectedDoc, (newValue: string, oldValue: string) => {
  doc.value = newValue[0] || oldValue[0];
  updateUI();
})

watch(selectedRelease, (newValue: string, oldValue: string) => {
  release.value = newValue[0] || oldValue[0];
  updateUI();
})

const updateUI = () => {
  SwaggerUI({
    dom_id: '#swagger-ui',
    url: url.value + release.value + '/' + doc.value + ext.value,
    layout: 'BaseLayout',
    // deepLinking: true,
  });
}

const clickOutside1 = () => {
  dialog1.value = false
}

const clickOutside2 = () => {
  dialog2.value = false
}

const onSearch = (Items, Key) => {
  if (Key) {
    let key = Key.toLowerCase().replace(/\./g, "");
    return Items.filter((item) => {
      if (item.value) {
        return item.title.toLowerCase().includes(key) || item.value.toLowerCase().includes(key)
      }
      return true
    }).filter((item, index, array) => {
      if (item.type == "subheader") {
        if (!array[index + 1]) {
          return false
        }
        return array[index + 1].type != "divider"
      } else if (item.type == "divider") {
        if (!array[index - 1]) {
          return false
        }
        return array[index - 1].type != "subheader"
      }
      return true
    })
  }
  return Items
}

</script>

<template>
  <v-btn size="50" @click="dialog1 = !dialog1, dialog2 = false"
  class="toolbox-activator-1 elevation-10">
    <Icon icon="zondicons:news-paper" height="auto" />
    <v-tooltip activator="parent" location="left" :text="$t('toolbox.toc.title')"></v-tooltip>
  </v-btn>
  <v-btn size="50" @click="dialog2 = !dialog2, dialog1 = false"
  class="toolbox-activator-2 elevation-10">
    <span>{{ release.slice(-2) }}</span>
    <v-tooltip activator="parent" location="left" :text="$t('toolbox.toc.version')"></v-tooltip>
  </v-btn>
  <teleport to="body">
    <transition name="slide-y">
      <v-card v-if="dialog1" v-click-outside="clickOutside1"
      class="dialog-1 d-flex flex-column" max-width=90vw max-height=80vh>
        <v-text-field variant="solo" prepend-inner-icon="mdi-magnify" hide-details placeholder="Search"
          v-model="searchKey" @click:clear="searchKey = ''" clear-icon="mdi-close-circle" clearable></v-text-field>
        <v-list class="toc" density="compact"
        :items="onSearch(apiData.items, searchKey)" v-model:selected="selectedDoc">
        </v-list>
      </v-card>
    </transition>
    <transition name="slide-y">
      <v-card v-if="dialog2" v-click-outside="clickOutside2"
      class="dialog-2 d-flex flex-column" max-width=90vw max-height=80vh>
        <v-list class="toc"
        :items="apiData.releases" v-model:selected="selectedRelease">
        </v-list>
      </v-card>
    </transition>
  </teleport>
  <v-container>
  <v-card class="bg-white">
    <div id="swagger-ui" class="ma-10">
    </div>
  </v-card>
    
  </v-container>
</template>

<style scoped lang="scss">
$top: 90px;
$each: 55px;

.toolbox-activator-1,
.toolbox-activator-2 {
  position: fixed;
  transition: all 0.3s ease;
  top: $top;
  right: 5px;
  z-index: 999;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s;
  cursor: pointer;
}

.toolbox-activator-2 {
  top: $top+$each;
}

.dialog-1,
.dialog-2 {
  z-index: 999;
  position: fixed;
  scrollbar-width: thin;
  top: $top + $each;
  right: 5px;
}

.dialog-2 {
  top: $top + 2*$each;
}

.toc {
    scrollbar-width: thin; /* Firefox */
  }
</style>
