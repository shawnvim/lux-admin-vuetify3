<!--
* @Component:
* @Maintainer: Shawn Qiu
* @Description:
-->

<script>
  import axios from "axios";
  import { useChatGPTStore } from "@/stores/chatGPTStore";
  
  const chatGPTStore = useChatGPTStore();
  
  export default {

    data() {
      return {
        tocItems: [],
        rail: true,
        iframeSrc: '/23.501/html/index.html',

        fileOptions: [{
            name: "23501",
            path: "/23.501/html/index.html"
          },
          {
            name: "23502",
            path: "/23.502/html/index.html"
          },


          // Add more file options as needed
        ],

      };
    },

    mounted() {
      let that = this;
      let x, y;
      var iframe = document.getElementById('iframe-id');
      iframe.onload = function() {
        iframe.contentDocument.onclick = function() {
          that.rail = true
        };
        iframe.contentDocument.onscroll = function() {
          // alert('scrolled')
        };
        iframe.contentDocument.onmousedown = function(event) {
          x = event.pageX;
          y = event.pagey;

        };
        iframe.contentDocument.onmouseup = function(event) {
          if (x == event.pageX && y == event.pagey) {
            //执行点击事件操作
          } else {
            chatGPTStore.updateContext(iframe.contentDocument.getSelection().toString());
            //alert(chatGPTStore.getContext)
            // 选中操作
            // alert(iframe.contentDocument.getSelection().toString())
          }
        };
      };

    },

    methods: {
      handleIframeLoad() {
        // Access iframe content
        const iframe = this.$refs.iframe;
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

        // Extract headings from iframe content
        const headings = Array.from(iframeDocument.querySelectorAll('h1, h2, h3'));

        const regexPattern = /^\d[\d.a-zA-Z]*/;

        this.tocItems = [];
        headings.forEach((heading, index) => {
          // Get the attribute name and header flag
          const clauseName = heading.innerText;
          const clauseId = clauseName.toLowerCase().match(regexPattern);

          if (clauseId != null) {
            this.tocItems.push({
              id: clauseId,
              title: clauseName,
              tag: parseInt(heading.tagName.toLowerCase()[1]) // h1 -> 1
            });
          }

        });
      },

      hrefToHeading(heading) {
        const iframe = this.$refs.iframe;
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        const iframeSrc = iframeDocument.location.href.split("#").shift();

        const iframeHref = `${iframeSrc}#_REF__CLA__${heading.id}`;

        return `<a href="${iframeHref}" target = "3gppiframe"
        style="padding-left: ${heading.tag}ch; float:left;">
        ${heading.title}</a>`;
      },

      onClickOutside() {
        this.rail = true
      },

      handleIframeScroll() {
        alert(2)
        const iframe = this.$refs.iframe.$el;
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        const iframeBody = iframeDocument.body;
        const scrollPosition = iframeBody.scrollTop || iframeDocument.documentElement.scrollTop;


        let activeSectionIndex = null;
        for (let i = 0; i < this.tocSections.length; i++) {
          const section = this.tocSections[i];
          const sectionElement = iframeDocument.getElementById(section.id);
          const sectionOffsetTop = sectionElement.offsetTop;
          if (scrollPosition >= sectionOffsetTop) {
            activeSectionIndex = i;
          } else {
            break;
          }
        }

        this.activeSection = activeSectionIndex;
      },

    },
  };
</script>

<template>
  <v-container>
    <div v-html="htmlContent"></div>
    <v-row>
      <v-col>
        <v-card-title>
          <h2 class="font-weight-bold pa-3">3GPP Technical Specification</h2>
          <v-select variant="outlined" placeholder="File Directory" label="Select TS" density="compact" hide-details
            :items="fileOptions" item-title="name" item-value="path" v-model="iframeSrc">
          </v-select>
        </v-card-title>
        <v-card min-height="90vh">
          <v-layout>
            <v-navigation-drawer :rail="rail" rail-width=49 width='24vw' permanent>


              <div class="toc">
                <v-card v-click-outside="onClickOutside" @click="rail = false">

                  <!-- <h2>Table of Contents</h2> -->


                  <v-list-item v-for="item in tocItems" :key="item.id" link=true variant='flat' density='compact'>
                    <v-layout row>
                      <v-icon start icon="$vuetify" :size="(1/item.tag+0.5)*15"></v-icon>
                      <div v-html="hrefToHeading(item)"></div>
                    </v-layout>
                  </v-list-item>
                </v-card>
              </div>

            </v-navigation-drawer>

            <v-main style="height: 90vh;">

              <iframe name="3gppiframe" ref="iframe" id="iframe-id" frameborder="0" :src="iframeSrc" scrolling="yes"
                @load="handleIframeLoad">

              </iframe>

            </v-main>
          </v-layout>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
  .toc {
    float: left;
    position: sticky;
    height: 90vh;
    overflow-y: scroll;
    top: 0;
    left: 0;
    width: 24vw;
    padding: 0px;
  }

  iframe {
    top: 0;
    left: 0;
    position: absolute;
    margin-left: 10ch;
    width: calc(100% - 10ch);
    height: 100%;
  }
</style>

<style scoped lang="scss">
  ::-webkit-scrollbar {
    width: 15px;
    background-color: #f5f5f5;
  }
</style>

// onload="this.height=this.contentWindow.document.body.scrollHeight"
/**

**/
