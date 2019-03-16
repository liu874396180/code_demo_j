<template>
  <div class="pdf-show">
    <div ref="mybox" class="mybox" style="">
      <div v-if="loadedRatio > 0 && loadedRatio < 1" style="background-color: green; color: white; text-align: center" :style="{ width: loadedRatio * 100 + '%' }">{{ Math.floor(loadedRatio * 100) }}%</div>
      <pdf  ref="pdf" :src="src" :page="page" :rotate="rotate" @password="password" @progress="loadedRatio = $event" @error="error" @num-pages="numPages = $event" @link-clicked="page = $event"></pdf>
    </div>
    <div class="pdf-footer">
        <mu-button icon color="#fff" @click="prev(page)" :disabled="page==1">
            <mu-icon :size="28" value="navigate_before"></mu-icon>
        </mu-button>
        <mu-button icon color="#fff" @click="next(page)" :disabled="page==numPages">
            <mu-icon :size="28" value="navigate_next"></mu-icon>
        </mu-button>
        <!-- <mu-button icon color="#fff" @click="add">
            <mu-icon :size="28" value="add"></mu-icon>
        </mu-button>
        <mu-button icon color="#fff" @click="remove">
            <mu-icon :size="28" value="remove"></mu-icon>
        </mu-button> -->
    </div>
    
  </div>
</template>

<script>
import pdf from 'vue-pdf'

export default {
  components: {
    pdf
  },
  data () {
    return {

      src:this.GLOBAL.host + '/pdf/ycFile?urlPath=' + this.GLOBAL.imageRoot + this.$route.query.pdfUrl,
      // src:"https://emarking-wap.vip-jb.com/h5/api" + '/pdf/ycFile?urlPath=' + "http://47.94.240.109:9980/" + "group1/M00/00/03/rBHVr1ti3j6ADlwBAA9nV0bIDrQ599.pdf",
      loadedRatio: 0,
      page: 1,
      numPages: 0,
      rotate: 0,
    }
  },
  methods: {

    password: function(updatePassword, reason) {

      updatePassword(prompt('password is "test"'));
    },
    error: function(err) {

      console.log(err);
    },
    logContent () {
      this.$refs.myPdfComponent.pdf.forEachPage(function (page) {
        return page.getTextContent()
          .then(function (content) {
            var text = content.items.map(item => item.str)
            console.log(text)
          })
      })
    },
    next(page){
        let that = this;
        that.page = page + 1;
      },
      prev(page){
        let that = this;
        that.page = page - 1;
      },
  },
  created () {
    this.$nextTick(() => {
      document.title = this.$route.query.electronicOrder=="electronicOrder" ? "电子保单预览" : '投保须知和保险条款'
    });
  },
  mounted(){
    this.$nextTick(() => {
      document.getElementsByTagName("meta")[1].setAttribute("content","width=device-width,initial-scale=1.0")
    });
  },
  destroyed() {
    document.getElementsByTagName("meta")[1].setAttribute("content","width=device-width,initial-scale=1.0,user-scalable=no")
  }
}
</script>

<style scoped>
.pdf-show .pdf-footer{
    position: fixed;
    left:0;
    right:0;
    bottom:0;
    background:#000;
    text-align:center;
}
.scae{
  background: red
}
</style>