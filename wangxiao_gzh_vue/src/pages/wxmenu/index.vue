<template>
    <div class="model_wraper">
    </div>
</template>
<script>
export default {
    components:{
        
    },
    data() {
        let s = location.search;
        let props = this.$utils.operLocationSearch(s);
        return{
            turnTo:props.turnTo,
            code:props.code,
            state:props.state,
        }
    },
    mounted() {
        
    },
    created() {
        // this.getWxTry();
        this.isLogin();
    },
    computed: {
      
    },
    methods:{
         getWxTry() {
            var that = this;
            //alert(this.GLOBAL.host + '/login/getWxTry?code='+this.code+"&state="+this.state)
            this.api.post(
                this.GLOBAL.host + '/login/getWxTry?code='+this.code+"&state="+this.state,{}
                ).then(function(response) {
                    //alert(JSON.stringify(response))
                    if(response.result){
                        console.log(that.turnTo)
                        if(that.turnTo != ''){                            
                            that.turnTo = that.turnTo.replace(/_/g, "/");
                        }
                        window.sessionStorage.formWxQuery = that.turnTo;//  /my/myIndex
                        //that.isLogin(that.turnTo)
                        // location.href="/#"+that.turnTo;
                    }
                })
        },
        isLogin() {
            window.sessionStorage.loading = "xiaoping";
            var that = this;
            that.api.post(
            that.GLOBAL.host + '/login/checkUserLoginState', {}
            ).then(function (response) {
            window.sessionStorage.loading = "";
            if (response.result) {
                location.href="/#/index/home";
            } else {
                that.$router.push("/login")
            }
            })
        },
    },
}
</script>
<style lang="less" scoped>
 @fontSize:0.32rem;
*{
    margin: 0;
    padding: 0;
}
html, body, .model_wraper {
    width: 100%;
    height: 100%;
    list-style: none;
}
ul {
    width: 100%;
}
ul li {
    width: 98%;
    margin-left: 2%;
    padding: 15px;
    border-bottom: 1px solid #cccccc;
}
.msg_tishi {
    width: 100%;
    height: 0.7rem;
    display: flex;
    align-items: center;
    color: #ff651a;
    background: #fee7b3;
    img{
        width: 18px;
        margin: 0 6px 0 15px;
    }
}
.car_vin{
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    background: #f2f2f2;
    span {
        color: #ff7c23;
    }
}
.carlist_wraper {
    width: 100%;
    height: 9rem;
    overflow-y: scroll
}
.model_footer {
    position: fixed;
    width: 100%;
    bottom: 0;
    text-align: center;
    border-top: 1px solid #dddddd;
    padding: 0.27rem 0;
    color: #009cff;
    img {
        margin: 0 5px;
    }
}
.price {
    color: #ff9361;
}
</style>
