<template>
  <v-container class="h-full">
    <v-select variant="outlined" placeholder="File Directory" label="Select HTML" density="compact" hide-details
      :items="items" item-title="name" item-value="path" v-model="select" return-object>
    </v-select>

    <HtmlPanel :url.asyc="select['path']" />

  </v-container>
</template>
  
  
<script setup lang="ts">
const router = useRouter();
import HtmlPanel from "@/components/HtmlPanel.vue";


const items = ref([
          {
            name: "RFC7540 - HTTP2",
            path: "/rfc/rfc7540.html",
            route: "rfc7540",
          },
          {
            name: "RFC5741 - Streams, Headers, and Boilerplates",
            path: "/rfc/rfc5741.html",
            route: "rfc5741",
          },

        ]);

const select = ref({name: "", path:"", route:""});


onMounted(() => {
  let id = router.currentRoute.value.params.id;

  let foundItem = items.value.find((item) => item.route == id);

  console.log('router', location, router.currentRoute.value)

  if (foundItem != undefined) {
    select.value = foundItem
  }

q
});

watch(select,(newValue, oldValue)=>{
  console.log('Selected', newValue)

  if (router.currentRoute.value.params.id != select.value.route) {
    router.push(`/data/html-viewer/${select.value['route']}`);
  } else {
    // let scroll = `${router.currentRoute.value.path}${router.currentRoute.value.hash}`
    console.log('Scroll', scroll)
    // router.push(scroll)
    //location.hash = router.currentRoute.value.hash
    console.log('Location', location)

  
    
  }
  
});



//router.push(`/data/html-viewer/rfc7540`);

//const url1 = ref('/rfc/rfc7540.html')

</script>
