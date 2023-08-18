<template>
    <div class="h-full bg-white d-flex align-center justify-center">

        <div  class="vhtml"
            ref="shadowHost"> 
            </div>
    </div>
</template>
  
<style></style>
  
<script lang="ts">
import axios from "axios";
export default {

// v-html="removeHtmlStyle(html)" class="vhtml"

    // 使用时请使用 :url.sync=""传值

    props: {

        url: {

            required: true

        }

    },

    data() {

        return {
            loading: false,

            // html: ''

        }

    },

    watch: {


        url(value) {

            this.load(value)

        }

    },

    mounted() {

        this.shadowRoot = this.$refs.shadowHost.attachShadow({ mode: "open" });
        this.load(this.url)


    },

    methods: {

        removeHtmlStyle(html) {
            /*
            var rel = /@media[^{]+\{([^{}]*\{[^{}]*\})*[^}]*\}/g;
            // var rel = /<style[^>]*>[^]*?<\/style>/g
            var newHtml = "";
            if (html) {
                newHtml = html.replace(rel, "");
                //console.log(html.removeProperty('text-decoration'))
            }
            //console.log(newHtml)

            */
            return html;

        },


        load(url) {
            let urlPath = url['path'];
            let urlHash = url['hash'];

            if (urlPath && urlPath.length > 0) {

                // 加载中

                this.loading = true
                this.shadowRoot.innerHTML = "Loading"
                //this.html = ""

                let param = {
                    headers: {
                        Accept: 'text/html, text/plain'
                    }

                }

                axios.get(urlPath, param).then((response) => {

                    

                    // 处理HTML显示

                    //this.html = response.data

                    this.shadowRoot.innerHTML = response.data;
                    this.loading = false

                    if (urlHash) try {
                        console.log("Hash jump: ", urlPath, urlHash)
                        const regHash = urlHash.replace(/\./g, "\\.");
                        const shadowDomHash = this.shadowRoot.querySelector(regHash);
                        shadowDomHash.scrollIntoView({
                            block: 'center',
                            behavior: 'smooth',
                        });
                    } catch (err) {
                        console.log("Hash not found: ", urlHash, regHash)
                    }
                    


                }).catch((Reason) => {

                    console.log("loadFail", Reason)

                    this.loading = false

                    this.shadowRoot.innerHTML = 'Loading Fail'

                    //this.html = 'Loading Fail'

                })

            }

        },

    },

}

</script>


<style scoped>
:deep(.vhtml) {
    overflow: auto;
	}
:deep(.vhtml) a {
    color: Royalblue;
    };


</style>
