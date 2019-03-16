<template>
  <!-- <div class="LeveltwoBox"> -->
      <div class="infoTable">
        <!-- <mu-dialog :open="dialog.alert">
        {{"已点击"}}
        </mu-dialog> -->  
        <mu-dialog :open="dialog.alert" :title="dialog.alertTitle">
            {{dialog.alertContent}}
            <mu-button slot="actions" flat @click="alertClose" color="#0e99ff">确定</mu-button>
        </mu-dialog>
        <mu-snackbar v-if="dialog.toast" :position="dialog.position" :open="dialog.toast" color="error">
            {{dialog.toastContent}}
        </mu-snackbar>

         <mu-paper class="demo-list-wrap">
             <div class="first-row clearfloat" style="height:40px">
            <div class="title">基本信息</div>
            <button v-if="!base_disabled" @click="saveInfo" class="edit">保存</button>
            <button v-if="base_disabled" @click="editInfo" class="save">编辑</button>
         </div>
        <mu-divider></mu-divider>

         <mu-list class="list-basic">
            <mu-list-item button :ripple="false">
              <mu-list-item-title class="mutit-self">用户昵称</mu-list-item-title>
              <mu-list-item-action  style="text-align-last: end;">
                <mu-text-field name="name" class="text-ellipsis" solo type="text" v-model="userInfo.name" :disabled="base_disabled" v-validate="'required'" :errorText="errors.first('name')" :max-length="50"></mu-text-field>
              </mu-list-item-action>   
            </mu-list-item>
          <mu-divider shallow-inset></mu-divider>
            <mu-list-item button :ripple="false">
              <mu-list-item-title class="mutit-self">微信号</mu-list-item-title>
              <mu-list-item-action style="text-align-last: end;">
                <mu-text-field class="text-ellipsis" name="wxCode" solo type="text" v-model="userInfo.wxCode" :disabled="base_disabled" :max-length="30"></mu-text-field>
              </mu-list-item-action>   
            </mu-list-item>
          <mu-divider shallow-inset></mu-divider>
            <mu-list-item button :ripple="false">
              <mu-list-item-title class="mutit-self">手机号</mu-list-item-title>
              <mu-list-item-action style="text-align-last: end;">
                <mu-text-field class="text-ellipsis" name="mobile" solo type="text" v-model="userInfo.mobile" :disabled="base_disabled" v-validate="'required|phone'" :errorText="errors.first('mobile')"></mu-text-field>
              </mu-list-item-action>   
            </mu-list-item>
          <mu-divider shallow-inset></mu-divider>
            <mu-list-item button :ripple="false">
              <mu-list-item-title class="mutit-self">邮箱</mu-list-item-title>
              <mu-list-item-action style="text-align-last: end;">
                <mu-text-field class="text-ellipsis" name="email" solo type="text" v-model="userInfo.email" :disabled="base_disabled" v-validate="'email'" :errorText="errors.first('email')" :max-length="100"></mu-text-field>
              </mu-list-item-action >   
            </mu-list-item>
          <mu-divider shallow-inset></mu-divider>
            <mu-list-item button :ripple="false">
              <mu-list-item-title class="mutit-self">公司名称</mu-list-item-title>
              <mu-list-item-action style="text-align-last: end;">
                <mu-text-field class="text-ellipsis" name="companyName" solo type="text" v-model="userInfo.companyName" :disabled="base_disabled" :max-length="50"></mu-text-field>
              </mu-list-item-action>   
            </mu-list-item>
          <mu-divider shallow-inset></mu-divider>
            <mu-list-item button :ripple="false">
              <mu-list-item-title class="mutit-self">店铺名称</mu-list-item-title>
              <mu-list-item-action style="text-align-last: end;">
                <mu-text-field class="text-ellipsis" name="nickName" solo type="text" v-model="userInfo.nickName" :disabled="base_disabled"></mu-text-field>
              </mu-list-item-action>   
            </mu-list-item>
          <mu-divider shallow-inset></mu-divider>
        
            <mu-list-item button :ripple="false" style="height:100px;">
              <mu-list-item-title class="mutit-self">备注</mu-list-item-title>
              <mu-list-item-action style="margin-top:35px;">
                 <!-- <div class="page-content"> -->
                    <!-- <textarea rows="5" cols="26" name="remarks" v-model="userInfo.remarks" disabled="true"></textarea> -->
                <mu-text-field class="text-ellipsis" :disabled="base_disabled" solo v-model="userInfo.remarks" multi-line :rows="3" :rows-max="3" :max-length="255"></mu-text-field>
                <!-- </div> -->
              </mu-list-item-action> 
            </mu-list-item>
     </mu-list> 

        </mu-paper>
    <!-- </div> -->

</div>
</template>
<script>
export default {
    components:{
    },
    data() {
        return{
            dialog: {
                alert: false,
                confirm: false,
                alertTitle:"",
                alertContent:"",
                toastTimer:null,
                toast:false,
                position: 'top-end',
            },
            
            base_disabled: false,
            userId: this.$route.query.id,
            userInfo: {
                "username": "",
                "wxCode": "",
                "mobile": "",
                "email": "",
                "companyName": "",
                "nickName": "",
                "remarks": "",
            },

            chenggong:false,
            pageNo:1,
            pageSzie:10,
        }
    },
    created() {
        this.$nextTick(()=>{
            document.title = '基本信息';
           this.getData();
        })
    },
    computed: {
      
    },
    methods:{
        getData() {
            let that = this;
            this.api.post(
                this.GLOBAL.host + '/ours/essentialInformation',
                {}
            ).then(response => {
                if (response.result) {
                    that.userInfo = response.data;
                    that.base_disabled = true;
                } 
            })
        },
        editInfo() {
            let that = this;
            that.base_disabled = false;
        },
        alertOpen (title,content) {
            this.dialog.alert = true;
            this.dialog.alertTitle = title;
            this.dialog.alertContent = content;
        },
        alertClose () {
            this.dialog.alert = false
        },
        openToast(content,func){
            this.dialog.toast = true;
            this.dialog.toastContent=content;
            if (this.dialog.toastTimer ) {
                    clearTimeout(this.dialog.toastTimer)
            }
            this.dialog.toastTimer = setTimeout(() => { this.dialog.toast = false; if(func) func() }, 1000);
        },
        saveInfo() {
            this.$validator.validateAll().then((result)=>{
                if(result){
                    //验证成功
                    var that = this;
                    that.base_disabled = true;
                    this.api.post(
                            this.GLOBAL.host + '/ours/essentialInformationUpdate',
                            this.userInfo
                    ).then(function(response) {
                            if(response.result){                        
                                that.openToast("保存成功",false)
                            }else{
                                that.alertOpen("错误", "保存失败" + response.msg);
                            }             
                    })                        
                }else{
                    this.alertOpen("通知","用户昵称，手机号为必填");
                    return ;
                }
            });	
        },
    },
}
</script>
<style lang="less" scoped>
.mu-item-title {
    min-width: 1.3rem;
    font-size: .3rem;
    color: #666;
}
.mu-item-action {
    width: 100%;
    font-size: .3rem;
    color: #333;
}
.mu-input {
    width:100%;
    font-size: 14px;
}
.clearfloat:after{
    display:block;
    clear:both;
    content:"";
    visibility:hidden;
    height:0;
}
.clearfloat{
    zoom:1;
}
.title {
    height: .81rem;
    padding-top: .2rem;
    padding-left: .3rem;
    font-weight: bold;
    float:left;
    font-size: 15px;
}
.edit {
    border: none;
    background: transparent;
    color: #e57373;
    display:block;
    float:right;
    margin-top: .2rem;
    margin-right: .3rem;
    font-size: 15px;
}
.save {
    border: none;
    background: transparent;
    color: #e57373;
    display:block;
    float:right;
    position: absolute;
    top: .2rem;
    right: .3rem;
    font-size: 15px;
}
.list-basic{
    padding:0;
}
.list-basic .mutit-self{
    width:80px;
}
button:focus{
    outline:none;
}
</style>