<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const htmlContent = ref('')

onMounted(async () => {
  await loadLocalHtmlFile()
})

async function loadLocalHtmlFile() {
  const response = await fetch('/5GC_ASNs/3GPP-NGAP-v16.5.0/3GPP NGAP v16.5.0.asn.html')
  if (response.ok) {
    htmlContent.value = await response.text()
  } else {
    console.error('Error loading local HTML file:', response.status, response.statusText)
  }
}
</script>




<template>
  <v-container>
    <v-card class="scroller">
    <div class="ma-15 child align-center justify-center" v-html="htmlContent">
    </div>
  </v-card>
</v-container>

  
</template>

<style>
.scroller{
  overflow: auto;
  scrollbar-width: thin;
}

.child{
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word;
}


</style>
