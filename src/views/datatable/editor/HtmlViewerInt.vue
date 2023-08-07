<template>
  <v-container class="h-full">
    
  </v-container>
</template>
  
  
<script setup lang="ts">
const route = useRouter();
import HtmlPanel from "@/components/HtmlPanel.vue";

const url1 = ref('')

onMounted(() => {
  alert("gaga")
    console.log('route', route)
})


//router.push(`/data/html-viewer/rfc7540`);

//const url1 = ref('/rfc/rfc7540.html')

</script>
