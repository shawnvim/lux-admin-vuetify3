<template>
    <v-container>
        <v-card>
            <div class="h-full bg-white d-flex align-center justify-center">
                <div v-html="removeHtmlStyle(html)" class="unset">
                
            </div>
        </div>

            

          

   
        </v-card>
    </v-container>

</template>
  
<style></style>
  
<script lang="ts">
import axios from "axios";

export default {



    // 使用时请使用 :url.sync=""传值

    props: {

        url: {

            required: true

        }

    },

    data() {

        return {
            loading: false,

            html: ''

        }

    },

    watch: {

        url(value) {

            this.load(value)

        }

    },

    mounted() {

        this.load(this.url)

    },

    methods: {

        removeHtmlStyle(html) {
            //var rel = /@media only screen\s*{[\s\S]*?}/g;
            var rel = /<style[^>]*>[^]*?<\/style>/g
            var newHtml = "";
            if (html) {
                newHtml = html.replace(rel, "");
                //console.log(html.removeProperty('text-decoration'))
            }
            return newHtml;
        },


        load(url) {

            if (url && url.length > 0) {

                // 加载中

                this.loading = true

                let param = {
                    headers: {
                        Accept: 'text/html, text/plain'
                    }

                }

                axios.get(url, param).then((response) => {

                    this.loading = false

                    // 处理HTML显示

                    this.html = response.data

                }).catch(() => {

                    this.loading = false

                    this.html = 'Loading Fail'

                })

            }

        },

    },

}

</script>


<style>
  .unset {
    all: revert;
  }

</style>
