<!--父组件中引入子组件-->
<template>
  <div>
  	{{}}
    <!--<a href="javascript:;" @click="$store.state.motest.show = true">点击</a>-->
    <!--<a href="javascript:;" @click="$store.commit('switch_dialog')">点击</a>-->
    <!--<a href="javascript:;" @click="$store.dispatch('switch_dialog')">点击</a>
    <wode v-if="$store.state.motest.show"></wode>-->
    
    
    <a href="javascript:;" @click="dainji">点击</a>{{sun}}
    <wode v-if="show"></wode>{{loadingMsg}}
    <!--<wode ></wode>-->
  </div>
</template>

<script>
import wode from './my.vue'
import {mapState} from 'vuex';
import {mapActions} from 'vuex';
export default {
  components:{
    wode
  },
  methods:{
  	...mapActions(["test"]),
  	dainji(){
  		this.test("dd");
  	}
  },
   computed:{
    ...mapState({
      show:state=>state.motest.show
    }),
		...mapState(["loadingMsg"]),
		sun(){
			return this.loadingMsg
		}
		
  },
  mounted(){
  	localForage.setItem('user_1_photo', "request.response", function() {  
            // 图片已保存，想怎么用都可以  
        });  
    localForage.getItem('user_1_photo', function(photo) {  
    // 获取到图片数据后，可以通过创建 data URI 或者其它方法来显示  
      console.log(photo);  
		}); 
  },
  created(){
		 
  },
}
</script>