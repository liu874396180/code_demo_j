<template>
    <div>
        <group>
        <x-switch @on-change="changeV" :value-map="['0', '1']" title="隐藏推广费比例"  v-model="switchOnOff"></x-switch>
        <!-- 1是开，0关，0关掉后是，隐藏 -->
        </group>
    </div>
</template>
<script>
import { XSwitch,Group  } from 'vux'
export default {
    components: {
        XSwitch,
        Group
    },
    data() {
       return{
           switchOnOff:"0",
       } 
    },
    created() {
        this.getData()
    },
    methods:{
        getData() {
            var that = this;
            this.api.post(this.GLOBAL.host + '/ours/essentialInformation',{})
            .then(rep => {
                if(rep.result){
                    that.switchOnOff = rep.data.switchOnOff;
                }else{
                }
            }).catch((e)=>{
            })
        },
        changeV (val) {
            var that = this;
            this.api.post(this.GLOBAL.host + '/ours/essentialInformationUpdate',{switchOnOff:val})
            .then(rep => {
                if(rep.result){
                }
            })
        },
    },
}
</script>
<style lang="less" scoped>

</style>
