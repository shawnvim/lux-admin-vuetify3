<!--
* @Component:
* @Maintainer: Shawn Qiu
* @Description:
-->

<script>
  import axios from "axios";
  export default {
    data() {
      return {
        tocItems: [],
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
              tag: heading.tagName.toLowerCase()
            });
          }

        });
      },

      hrefToHeading(heading) {
        const iframe = this.$refs.iframe;
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        const iframeSrc = iframeDocument.location.src;

        const iframeHref = `${this.$refs.iframe.contentDocument.location.href}#_REF__CLA__${heading.id}`;

        return `<a href="${iframeHref}" target = "3gppiframe"
        style="padding-left: ${heading.tag[1]*10}px;">
        ${heading.title}</a>`;
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
    <v-row>
      <v-col>
        <v-card-title>
          <h2 class="font-weight-bold pa-3">3GPP Technical Specification</h2>
          <v-select variant="outlined" placeholder="File Directory"
          label="Select TS" density="compact" hide-details
            :items="fileOptions" item-title="name" item-value="path" v-model="iframeSrc">
          </v-select>
        </v-card-title>
        <v-card min-height="90vh">
          <v-card-text>
            <div>
              <div class="toc" style="float:left;">
                <!-- <h2>Table of Contents</h2> -->
                <v-divider></v-divider>
                <ul>
                  <li v-for="item in tocItems" :key="item.id">
                    <div v-html="hrefToHeading(item)"></div>
                  </li>
                </ul>
              </div>
              <iframe name="3gppiframe" ref="iframe" frameborder="0" :src="iframeSrc" scrolling="yes"
                @load="handleIframeLoad" @v-scroll="handleIframeScroll">
              </iframe>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
  .toc {
    position: sticky;
    height: 87vh;
    overflow: auto;
    top: 0;
    left: 0;
    width: 20vw;
    padding: 5px;
  }

  iframe {
    top: 0;
    margin-left: 20vw;
    width: calc(100% - 20vw);
    height: 87vh;
  }
</style>



// onload="this.height=this.contentWindow.document.body.scrollHeight"
/**

**/
