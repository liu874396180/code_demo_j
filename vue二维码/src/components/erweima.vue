<template>
  <div class="hello">
    <h1>二维码</h1>
    <vue-q-art :config="config" ></vue-q-art>
    <img :src="msg" alt="">
  </div>
</template>

<script>
import VueQArt from 'vue-qart'
export default {
  components: {VueQArt},
  name: 'HelloWorld',
  data () {
    return {
      msg: '../assets/logo.png',
      config: {
            value: 'https://www.baidu.com',
            // imagePath: 'http://pic.hongdagq.com/download/20170523_145520437.jpg',
            imagePath:require('../assets/logo.png') ,
            filter: 'color',
            size: 500
        },
        // downloadButton: true,
        
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- :downloadButton="downloadButton" -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
