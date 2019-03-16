<template>
	<div id="">
		全选<input type="checkbox" v-model="checkAll" > <br>
		
		<input type="checkbox" v-for="item in list" v-model="item.checks" >
		
		<input type="text" v-model="item.price" v-for="item in list">
		<!--<input type="number" v-model="list[0].num">-->
		总价{{sum}}
	</div>
</template>
<script>
	export default {
		name: 'message',
		components: {},
		data() {
			return {
				msg: 'my页面',
				list:[
					{checks:false,price:30,num:2},
					{checks:false,price:20,num:2},
					{checks:false,price:20,num:3},
					{checks:false,price:10,num:11},
				]
			}
		},
		methods:{
			remove(p){
				this.list = this.list.filter(xx=>xx!==p)
			}
		},
		computed:{
			checkAll:{
				get(){
					return this.list.every(p=>p.checks)
				},
				set(val){
					this.list.forEach(p=>p.checks = val);
				}
			},
			sum() {
				return this.list.reduce((prev,next)=>{
					if(!next.checks) return prev; // 如果当前没有选中，就不加这一项
					return prev + next.price*next.num
				},0)
			},
		},
		
	}
</script>

<style>
</style>