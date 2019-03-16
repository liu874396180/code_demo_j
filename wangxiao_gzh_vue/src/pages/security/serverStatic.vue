<template>
     <div class="building">

    </div>
</template>
<script>
import { mapActions} from 'vuex';
export default {
    data() {
        return{}
    },
    created() {
        this.changActiveTabs(1); //触发tabs
        this.$nextTick(() => {
            document.title = '保障'
        })
    },
    methods:{
        ...mapActions(["changActiveTabs"]),
    },
}
</script>
<style lang="less" scoped>
.building{
    width:4.75rem;
    height:3.25rem;
    background:url(/static/images/build.png) 0 0 no-repeat;
    background-size:100%;
    display:block;
    margin:3rem auto;
}

</style>