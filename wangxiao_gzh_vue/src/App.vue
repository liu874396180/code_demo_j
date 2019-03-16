<template>
  <div id="app">
    <Loading v-show="axiosLoading"></Loading>
    <router-view/>
  </div>
</template>
<script>
import { mapGetters, mapState,mapActions, mapMutations} from 'vuex';
import Loading from './components/loading';
export default {
  components: {
    Loading
  },
  data() {
    return{}
  },
  methods:{

  },
  computed:{
    ...mapGetters(['axiosLoading']),
  }
  
}
</script>
<style>
@import './assets/sass/font-icons/material/material-icons.css';
</style>
