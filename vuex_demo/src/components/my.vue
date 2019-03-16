<!--子组件-->
<template>
  <div id="">
  	wode
  	<p to="/home" @click="toa">hhhhhh</p>
  </div>
</template>

<script>
export default {
	data(){
		return{}
	},
	methods:{
		toa(){
//			this.$router.push("/home")
			this.$router.replace("/home")
		}
	}
}
</script>