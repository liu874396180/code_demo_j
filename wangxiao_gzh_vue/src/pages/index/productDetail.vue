<template>
<div>
    <mu-dialog :open="dialog.alert" :title="dialog.alertTitle">
        {{dialog.alertContent}}
        <mu-button slot="actions" color="#0e99ff" @click="alertClose">确定</mu-button>
    </mu-dialog>
    <div class="product-pic">
        <img :src="GLOBAL.imageRoot + dataList.product.imageUrl" />
    </div>
    <div class="product-mes">
        <h5>{{dataList.product.name || defaultText}}</h5>
        <img :src="GLOBAL.imageRoot + dataList.product.logo" class="logo" alt="">
        <div class="price"><em>￥</em><i>{{commnetMoney}}</i><p style="color: #999;float: right;">已售<span style="color: #1d50a2;">{{dataList.product.salesNum}}</span></p></div>
        <div class="mes-sub"><span>承保年龄：{{dataList.product.ageStart}}{{dataList.product.ageUnitStart == '10' ? '天' : '周岁'}}-{{dataList.product.ageEnd}}{{dataList.product.ageUnit == '10' ? '天' : '周岁'}}</span><em class="margin-tag">|</em><span>保障期限：{{dataList.product.isOptionalEnsurePeriod}}</span>   </div>
    </div>
    <div class="plan-box">
        <!-- <mu-alert color="#fd5962" @delete="alert1 = false" delete v-if="alert1" transition="mu-scale-transition" style="    position:fixed;z-index: 999;width: 92%;">
            {{planAlertText}}
        </mu-alert> -->
        <mu-dialog  width="360" :open.sync="alert1">
            {{planAlertText}}
            <mu-button slot="actions" flat color="primary" @click="alert1 = false">关闭</mu-button>
        </mu-dialog>
        <h5 class="tit">保障计划</h5>
        <div class="plan-detail-box">
            <div class="plan-tit-box">
                <span class="choose-txt">计划选择</span>
                <el-tabs class="plan-tit" v-model="activeName">
                    <el-tab-pane v-for="(item,index) in dataList.product.porPlanList" :key="index" :label="item.planName" :name="index+''">
                        <ul class="tab-cont-list" :class="{'hiddenHeight':!showMore}">
                            <li v-for="(_item,_index) in item.planInterestsList" :key="_index"  @click="toggleAlert(_item.interests  + ' [ '  + _item.amount + ' ]')"><span class="planNamea">{{_item.interests}}</span><mu-icon value="keyboard_arrow_right" style="float: right;"></mu-icon><span class="planNameaRight">{{_item.amount}}</span>
                                
                            </li>
                        </ul>
                        <p class="btnMore" v-if="item.planInterestsList.length > 3" @click="showMore = !showMore">{{showMore?"隐藏更多":"查看更多"}}&nbsp;<span :class="{'border_down':!showMore,'border_up':showMore}"></span></p>
                        <div class="price-com">
                            <em class="price-icon">￥</em>
                            <!-- <span class="price">{{commnetMoney = item.planProp.amount ? item.planProp.amount :defaultText}}</span> -->
                            <span class="price">{{item.planProp.amount ? item.planProp.amount :defaultText}}</span>
                        </div>
                    </el-tab-pane>
                </el-tabs> 
            </div>    
        </div>
        <div class="more-txt">
            <span>更多详情，请阅读</span>
            <router-link :to="{path:'/touBaoXuZhi',query:{prodictId:dataList.product.id}}" tag="em" class="color-theme">
                《投保须知》和《保险条款》
            </router-link>
            <!-- <span> 和</span>
            <router-link to="" tag="em" class="color-theme">
                《保险条款》
            </router-link> -->
        </div>
        <div class="sug-box">
            <h5>推荐理由</h5>
            <div class="sug-txt" v-html="dataList.product.intro">
                
            </div>
        </div>
    </div>
    <footer class="buy-box">
        <em class="price-icon">￥</em><span class="price">{{commnetMoney}}</span>
        <mu-button color="#fd5962" @click="openFullscreenDialog" class="buy-btn">立即投保</mu-button>
    </footer>
    <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="openFullscreen">
        <mu-appbar>
             <span>{{dataList.product.name || defaultText}}</span>&emsp;&emsp;&emsp;
             <img :src="GLOBAL.imageRoot + dataList.product.logo" class="logo" alt="" style="max-width: 40px;vertical-align: middle;">
            <mu-button slot="right" icon @click="closeFullscreenDialog">
                <mu-icon value="close"></mu-icon>
            </mu-button>
        </mu-appbar>
        <div class="pop-content">
            <!-- <div class="product-mes">
            </div> -->
            <div style="padding:0 0.3rem 1rem">
                <mu-list>
                    <mu-list-item :ripple="false">
                        <mu-list-item-content>
                            <span class="item-tit">当前计划</span>
                            <span class="item-cont">{{dataList.product.porPlanList[activeName].planName || defaultText}}</span>
                        </mu-list-item-content>
                    </mu-list-item>
                    <mu-divider></mu-divider>
                    <mu-list-item :ripple="false">
                        <mu-list-item-content>
                            <span class="item-tit">购买分数</span>
                            <span class="item-cont">1份</span>
                        </mu-list-item-content>
                    </mu-list-item>
                    <mu-divider></mu-divider>
                    <mu-list-item :ripple="false" class="baoZhangQiXaing">
                        <mu-list-item-content>
                            <span class="item-tit">保障期限</span>
                        <div class="" style="float: right;width: 63%;">
                            <span class="radioSpan" v-for="(item,index) in ArrayListRadio" :key="index">
                                <input type="radio" name="radio-group" :id="`baozhang${index}`" v-model="showChangeMoney.ensurePeriod" :value="item.ensurePeriod+','+ item.ensurePeriodUnit" @change="fastChange('radio')"/>
                                <label :for="`baozhang${index}`">{{item.ensurePeriodLabel}}</label>
                            </span>
                            <span class="item-cont" v-if="ArrayListSelect.length">
                                <mu-select v-model="alternativeChangeEnsurePeriod" placeholder="更多选择" style="" @change="fastChange('sele')">
                                    <mu-option v-for="(item,index) in ArrayListSelect" :key="index" :label="item.keys+item.contactDate" :value="item.keys+','+item.unit"></mu-option>
                                </mu-select>
                            </span>
                        </div>
                        </mu-list-item-content>
                    </mu-list-item>
                    <mu-divider ></mu-divider>
                    <mu-list-item :ripple="false" v-if="(dataList.productPropLimit.ensurePeriodLimit - 0)">
                        <mu-list-item-content>
                            <span class="item-tit">社保限制</span>
                            <span class="item-cont">
                                <mu-select v-model="showChangeMoney.socialSecurity" @change="fastChange">
                                    <!-- <mu-option v-for="(item,index) in AroundDateList" :key="index" :label="item.ensurePeriod" :value="item.ensurePeriod"></mu-option> -->
                                     <mu-option v-if="dataList.productPropLimit.socialSecurityValue =='1' || dataList.productPropLimit.socialSecurityValue =='0'" label="有社保" value="1"></mu-option>
                                     <mu-option v-if="dataList.productPropLimit.socialSecurityValue =='2' || dataList.productPropLimit.socialSecurityValue =='0'" label="无社保" value="2"></mu-option>
                                </mu-select>
                            </span>
                        </mu-list-item-content>
                    </mu-list-item>
                    <mu-divider v-if="(dataList.productPropLimit.socialSecurityLimit - 0)"></mu-divider>
                    <mu-list-item :ripple="false" v-if="(dataList.productPropLimit.sexLimit - 0)">
                        <mu-list-item-content>
                            <span class="item-tit">性别限制</span>
                            <span class="item-cont">
                                <mu-select v-model="showChangeMoney.sex" @change="fastChange">
                                    <mu-option v-if="dataList.productPropLimit.sexValue =='1' || dataList.productPropLimit.sexValue =='0'" label="男" value="1"></mu-option>
                                     <mu-option v-if="dataList.productPropLimit.sexValue =='2' || dataList.productPropLimit.sexValue =='0'" label="女" value="2"></mu-option>
                                </mu-select>
                            </span>
                        </mu-list-item-content>
                    </mu-list-item>
                    <mu-divider v-if="(dataList.productPropLimit.sexLimit - 0)"></mu-divider>

                     <mu-list-item :ripple="false" v-if="(dataList.productPropLimit.ageLimit - 0)">
                        <mu-list-item-content>
                            <!-- <span class="item-tit">出生日期</span> -->
                            <span class="item-cont birth">
                                <!-- <mu-date-input label="" @change="fastChange" container="bottomSheet" v-model="showChangeMoney.birthdate" label-float name="birth" v-validate="'required'" :errorText="errors.first('birth')" :min-date="minDate" :max-date="maxDate"></mu-date-input> -->
                                <datetime v-model="showChangeMoney.birthdate" :start-date="minDate" :end-date="maxDate" @on-change="fastChange" title="出生日期" @on-cancel="log('cancel')" @on-confirm="onConfirm" @on-hide="log('hide', $event)" name="birth" year-row="{value}年" month-row="{value}月" day-row="{value}日" v-validate="'required'" :errorText="errors.first('birth')"></datetime>
                            </span>
                        </mu-list-item-content>
                    </mu-list-item>
                    <mu-divider v-if="(dataList.productPropLimit.ageLimit - 0)"></mu-divider>

                    <mu-list-item :ripple="false" v-if="(dataList.productPropLimit.smokeLimit - 0)">
                        <mu-list-item-content>
                            <span class="item-tit">吸烟史限制</span>
                            <span class="item-cont">
                                <mu-select v-model="showChangeMoney.smoke" @change="fastChange">
                                    <mu-option v-if="dataList.productPropLimit.smokeValue =='1' || dataList.productPropLimit.smokeValue =='0'" label="有吸烟史" value="1"></mu-option>
                                    <mu-option v-if="dataList.productPropLimit.smokeValue =='2' || dataList.productPropLimit.smokeValue =='0'" label="无吸烟史" value="2"></mu-option>
                                </mu-select>
                            </span>
                        </mu-list-item-content>
                    </mu-list-item>
                    <!-- <mu-divider v-if="(dataList.productPropLimit.smokeLimit - 0)"></mu-divider>
                     <mu-list-item :ripple="false" v-if="(dataList.productPropLimit.motherBabyLimit - 0)">
                        <mu-list-item-content>
                            <span class="item-tit">母婴限制</span>
                            <span class="item-cont">
                                <mu-select v-model="showChangeMoney.motherBaby" @change="fastChange">
                                    <mu-option v-if="dataList.productPropLimit.motherBabyValue =='1'" label="母婴" value="1"></mu-option>
                                    <mu-option v-if="dataList.productPropLimit.motherBabyValue =='2'" label="孕婴" value="2"></mu-option>
                                </mu-select>
                            </span>
                        </mu-list-item-content>
                    </mu-list-item>
                    <mu-divider v-if="(dataList.productPropLimit.motherBabyLimit - 0)"></mu-divider> -->
                    <!-- <mu-list-item :ripple="false">
                        <mu-list-item-content>
                            <span class="item-tit">类别限制</span>
                            <span class="item-cont">
                                <mu-select v-model="argEnsurePeriod">
                                    <mu-option v-for="(item,index) in AroundDateList" :key="index" :label="item.ensurePeriod" :value="item.ensurePeriod"></mu-option>
                                </mu-select>
                            </span>
                        </mu-list-item-content>
                    </mu-list-item>
                    <mu-divider></mu-divider> -->
                    <mu-list-item :ripple="false">
                        <mu-list-item-content>
                            <span class="item-tit">承保年龄</span>
                            <span class="item-cont">
                                {{dataList.product.ageStart}}{{dataList.product.ageUnitStart == '10' ? '天' : '周岁'}}-{{dataList.product.ageEnd}}{{dataList.product.ageUnit == '10' ? '天' : '周岁'}}
                            </span>
                        </mu-list-item-content>
                    </mu-list-item>
                    <mu-divider></mu-divider>
                    <mu-list-item :ripple="false" v-if="(dataList.productPropLimit.occupationLimit - 0)">
                        <mu-list-item-content>
                            <span class="item-tit">承保职业</span>
                            <span class="item-tit">{{workDateList}}类</span>
                            <!-- <span class="item-cont">
                                <mu-select v-model="showChangeMoney.occupation" @change="fastChange">
                                    <mu-option v-for="(item,index) in workDateList" :key="index" :label="item.occupation" :value="item.occupation"></mu-option>
                                </mu-select>
                            </span> -->
                            <span class="item-cont" @click="openFullscreenDialog2" style="color:red">查看</span>
                        </mu-list-item-content>
                    </mu-list-item>
                </mu-list>
            </div>
        </div>
        <footer class="buy-box">
            <em class="price-icon">￥</em><span class="price">{{moneyData.amount ||commnetMoney || defaultText}}</span>
            <mu-button color="#fd5962"  @click="toPath" class="buy-btn">确定</mu-button>
        </footer>
    </mu-dialog>
    <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="openFullscreen2">
        <mu-appbar color="#ffffff" title="查询职业类别" z-depth="1" textColor="#333333" style="text-align:center;position: fixed;width: 100%;">
        <mu-button slot="right" icon @click="closeFullscreenDialog2">
            <mu-icon value="close"></mu-icon>
        </mu-button>
        </mu-appbar>
        <el-collapse accordion style="padding-top: 60px;border-bottom:0">
            <div style="text-align: center;" v-if="!occupationList"><img src="../../../static/images/zhiyeLoad.gif" alt=""></div>
            <el-collapse-item v-else v-for="(item,index) in occupationList" :key="index" :title="item.occupationType" :name="index+''">
               <div class="col-content">
                   <mu-list class="mulist_bg" style="padding:0;background-color: #f2f2f2;">
                       <div v-for="(_item,index) in item.occupationList" :key="index">
                           <mu-list-item button :ripple="false">
                            <mu-list-item-title>{{_item.occupationName}}</mu-list-item-title>
                            <mu-list-item-title style="text-align:right;color: #5680e0;padding: 0 13px 0 0;">{{_item.classify}}类</mu-list-item-title>
                            <mu-list-item-action>
                                <mu-icon value="keyboard_arrow_right"></mu-icon>
                            </mu-list-item-action>
                        </mu-list-item>
                        <mu-divider /> 
                       </div>
                    </mu-list>
               </div>
            </el-collapse-item>
        </el-collapse>
    </mu-dialog>
    <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="openFullscreenHealthy" class="jiankanggaozhi">
        <mu-appbar color="#ffffff" title="健康告知" z-depth="1" textColor="#333333" style="text-align:center">
        <mu-button slot="right" icon @click="tellMeNo">
            <mu-icon value="close"></mu-icon>
        </mu-button>
        </mu-appbar>
        <div v-html="dataList.product.healthIntro" class="healthy-intro">
        </div>
        <div style="margin-bottom: 40px;padding: 0.3rem;">
            <div>
                <mu-radio v-model="healthyValue" value="1" label="以上有一项为是" color="#fd5962"></mu-radio>
                <mu-radio v-model="healthyValue" value="2" label="以上全部为否" color="#fd5962"></mu-radio>
            </div>
            <div v-if="healthyValue=='1'" style="color:red">您的健康标准不符合我们的产品要求，请进行线下投保</div>
        </div>
        <footer class="footer-btn">
            <mu-button color="#fd5962" @click="tellMe" full-width style="height:50px">确定</mu-button>
        </footer>
    </mu-dialog>
</div>
</template>
<script>
// import { Datetime } from 'vux';
// import 
export default {
    // name:"proD",
    // components: {
    //     Datetime,
    // },
    data (){
        return {
            value1: '2015-11-12',
            alternativeChangeEnsurePeriod:"", //替代changeEnsurePeriod 隱藏字段
            alert1:false, //计划列表详情弹窗
            planAlertText:"", // 计划列表弹窗内容
            // minDate:new Date(-2191438129),//最小出生日期
            // maxDate:new Date(),//最大出生日期
            minDate:"1970-01-01",//最小出生日期
            maxDate:"2030-01-01",//最大出生日期
            salesCommisionRate:this.$route.query.salesCommisionRate, //推广费
            agentId:this.$route.query.agentId || "", // 代理人id

            defaultText:'暂无数据',
            activeName: "0", // 默认选中
            sendPlanName:'', // 第一个弹窗的计划名字
            commnetPlanName:null,
            showMore:false,
            openFullscreen:false, // 第一层弹出
            openFullscreen2:false, // 第2层弹出
            id: this.$route.query.id,
            dataList:{
                product:[],
            },  //详情数据
            occupationList:[], //职业类别列表
            // 分开两个数组分别渲染--弹窗-保障期间数据
            ArrayListRadio : [],
            ArrayListSelect : [],
            workDateList:'', // 弹窗-职业类别下拉框数据---》类别展示
            moneyData:{},      // 实时金额数据
            argEnsurePeriod:null, //保障期间参数
            showChangeMoney:{
                planId:"",  //计划id
                birthdate:"2018-08-16",   //年龄
                socialSecurity:"", // 社保限制
                sex:"",  //性别限制
                smoke:"", //吸烟史限制
                motherBaby:"", //母婴限制
                changeEnsurePeriod:"", // 弹窗-保障期间数据,下拉框值，
                ensurePeriod:"", //保障期间限制
                ensurePeriodUnit:"", // 保障期间单位
                occupationCode:"", //职业限制
            },
            dialog:{
                alert: false,
            },
            healthyValue:"",
            openFullscreenHealthy:false,
            // 分享
            // share_title: "", // 分享标题
            // share_desc: "", // 分享描述
            // share_link: "", // 分享链接
            // share_imgUrl: "", // 分享图标
        }
    },
    created() {
        
        this.getProDetail(); //获取产品详情
        this.wshare();
        this.$nextTick(()=>{
            document.title = '产品详情';
        })
        //   http://localhost:9000/#/productDetail?id=99e59be885b94bd19233ecc5a2f77e75&salesCommisionRate
    },
    computed:{
        // 初次进来默认值
        commnetMoney() {
            return this.dataList.product.porPlanList[this.activeName].planProp.amount;
        },
        
    },
    methods:{
        
        //分享
        wshare(){
            var that = this;
            let locurl = ()=>{
                // #/productDetail?id=99e59be885b94bd19233ecc5a2f77e75&salesCommisionRate
                return location.hash.substring(1);
            }
            // let url = this.GLOBAL.host + 
           // let url = "https://emarking-wap.vip-jb.com/router=" + location.hash.substring(2).replace("?","_").replace("&","__");;
          let url = location.href.split("#")[0];
          // https://emarking-wap.vip-jb.com/productDetail?id=99e59be885b94bd19233ecc5a2f77e75&salesCommisionRate
            // alert(url)
            this.api.post(
                this.GLOBAL.host + '/notify/sfjk/wxShareProduct',
                {linkUrl: url,id:that.id}
            ).then(function(response) {
                if (response.result) {
                    that.$wxsdk.wxstart(response.data,url)
                    
                }
            })
        },
        
        log (str1, str2 = '') {
            console.log(str1, str2)
        },
        onConfirm (val) {
            console.log('on-confirm arg', val)
            console.log('current value', this.value1)
        },
        change (value) {
        console.log('change', value)
        },
        // 健康告知
        tellMe() {
            this.openFullscreenHealthy = !this.openFullscreenHealthy;
            if(this.healthyValue=="2"){
                this.$router.push({path: '/insurPolicy',query:{id:this.id,workDateList:this.workDateList}});
            }else{

            }
        },
        tellMeNo() {
           this.openFullscreenHealthy = !this.openFullscreenHealthy;
            this.healthyValue = "";
        },
        // 计划列表弹窗
        toggleAlert (text) {
            this.alert1 = !this.alert1;
            this.planAlertText = text;
        },
        // 监听赛选框变化
        fastChange(val) {
            // 替换默认值：金额
            // this.commnetMoney = null;
            // let va = val;
            // if(val !=val){

            // }
            if(val=="radio"){
                if(this.showChangeMoney.ensurePeriod != ""){
                    this.alternativeChangeEnsurePeriod = "";
                }
            }
            if(val=="sele"){
                if(this.showChangeMoney.alternativeChangeEnsurePeriod != ""){
                    this.showChangeMoney.ensurePeriod = "";
                }
            }
             console.log("======")
            //this.showChangeMoney.ensurePeriod = "";
            
            this.getChangeMoney("more");
        },
        //跳转下一页
        toPath() {
            // 订单信息
            let OrderInfo = {
                productName	:this.dataList.product.name ,	//产品名称
                productId:	this.dataList.product.id,	//产品id
                planName: this.dataList.product.porPlanList[this.activeName].planName ,	//计划名称
                planId:	this.dataList.product.porPlanList[this.activeName].planProp.planId,	//计划id
                orderAmount: this.moneyData.amount || this.commnetMoney,		//订单金额
                salesCommisionRate: this.salesCommisionRate,	//销售佣金比例（首页推广费率）
                agentId:this.agentId,//代理人id
            }
            // 保单信息
            let policyInfo = {
                contractId:this.dataList.product.contractId,
                // dateStart: 下个页面获取
            }
            //保单产品计划属性
            let policyProPlanProp = {
                birthdate:this.showChangeMoney.birthdate,	        //	出生日期
                socialSecurity:this.showChangeMoney.socialSecurity ,    //	1有社保 2无社保
                sex:this.showChangeMoney.sex ,             	//  1男 2女
                motherBaby:this.showChangeMoney.motherBaby ,	        //	1母婴 2孕婴
                category:"" ,	        //	种类（职业类型）
                smoke:this.showChangeMoney.smoke ,	            //	吸烟历史
                startPlace:"" ,	        //	出发地 写死
                endPlace:"" ,	        //	目的地 写死
                ensurePeriod:this.showChangeMoney.ensurePeriod || this.showChangeMoney.changeEnsurePeriod ,	    //	保障期间（String类型数字）--radio
                changeEnsurePeriod:this.showChangeMoney.ensurePeriod || this.showChangeMoney.changeEnsurePeriod ,	//	保障期间（String类型数字）--select
                ensurePeriodUnit:this.showChangeMoney.ensurePeriodUnit ,	//	保障期间单位（10天/20年）
            }
            OrderInfo =  JSON.stringify(OrderInfo);
            policyInfo =  JSON.stringify(policyInfo);
            policyProPlanProp =  JSON.stringify(policyProPlanProp);
            window.sessionStorage.OrderInfo = OrderInfo;
            window.sessionStorage.policyInfo = policyInfo;
            window.sessionStorage.policyProPlanProp = policyProPlanProp;
            window.sessionStorage.showChangeMoney = JSON.stringify(this.showChangeMoney);  // 传送弹框限制到保单填写页-以动态计算价格
            this.$validator.validateAll().then((result) => {
                if (result) {
                    let that = this;
                    // if(that.dataList.product.healthFlag == '1'){
                    // //    that.openFullscreenHealthy = true;
                    //     if(that.healthyValue == '0'){
                    //         that.$router.push({path: '/insurPolicy',query:{id:that.id,workDateList:that.workDateList}});
                    //     }else if(that.healthyValue == '1'){
                    //         that.alertOpen("提示","您的健康不符合我们的规定，请进行线下投保")
                    //     }else{
                    //         that.openFullscreenHealthy = true;
                    //     }
                    // }else{
                    //     that.$router.push({path: '/insurPolicy',query:{id:that.id,workDateList:that.workDateList}});
                    // }
                    if(that.healthyValue=="2" || that.dataList.product.healthFlag == '0' || !that.dataList.product.healthFlag){
                        that.$router.push({path: '/insurPolicy',query:{id:that.id,workDateList:that.workDateList}});
                    }else{
                        that.openFullscreenHealthy = true;
                    }
                }
            })
            
        },
        // 弹出 点击立即投保
        openFullscreenDialog() {
            // 获取实时价格，第一次默认价格
            this.getChangeMoney("once");
             // 请求 保障期限数据
            this.getPlanAround();
             this.limitBorn(); //出生日期限制
            this.openFullscreen = true;
           
            // 获取职业类别下拉框内容
            this.getCheckccupationList();
            
        },
        // 关闭
        closeFullscreenDialog () {
            this.openFullscreen = false;
        },
        // 弹出2 ---职业类别
        openFullscreenDialog2() {
            this.openFullscreen2 = true;
             this.getOccupationList();
             
           
        },
        // 关闭2---职业类别
        closeFullscreenDialog2 () {
            this.openFullscreen2 = false;
        },
        //获取产品详情
        getProDetail(){
            var that = this;
            this.api.post(
                this.GLOBAL.host + '/product/recProductsDetail',
                {"id":that.id}
            ).then(function(response) {
                if (response.result) {
                    that.dataList = response.data;
                    
                }
            })
        },
        //点击投保获取产品保障期间
        getPlanAround(){
            var that = this;
            let splicList = [];
            that.ArrayListRadio = [];
            that.ArrayListSelect = [];
            this.api.post(
                this.GLOBAL.host + '/product/getPeriodList',
                {"planId":that.dataList.product.porPlanList[that.activeName].planProp.planId}
            ).then(function(response) {
                if (response.result) {
                    response.data.list.forEach(element => {
                        if(!element.perDay){
                          that.ArrayListRadio.push(element);
                        }else{
                            let contactDate = "";
                            let i = (element.ensurePeriodStart-0);
                            for(let j = (element.ensurePeriodStart-0);j<=(element.ensurePeriod-0);j++){
                                if(i>(element.ensurePeriod-0)){
                                    break;
                                }
                                contactDate = (element.ensurePeriodUnit=="10"&&"天")||(element.ensurePeriodUnit=="20"&&"周")||(element.ensurePeriodUnit=="30"&&"月")||(element.ensurePeriodUnit=="40"&&"年");
                                
                                that.ArrayListSelect.push({
                                    keys:i,unit:element.ensurePeriodUnit,contactDate:contactDate
                                });
                                i = i + (element.perDay-0);
                            }
                            
                        }
                    });;
                }
            })
        },
        //点击投保获取产品保障期间价格实时变化
        getChangeMoney(type){
            var that = this;
            // alert("===")
            //弹窗默认值
            //that.showChangeMoney = that.$utils.mergeObj(that.showChangeMoney,that.dataList.product.porPlanList[that.activeName].planProp);
           if(type=="once"){
               that.showChangeMoney.planId = that.dataList.product.porPlanList[that.activeName].planProp.planId;
                that.showChangeMoney.socialSecurity = that.dataList.product.porPlanList[that.activeName].planProp.socialSecurity;
                that.showChangeMoney.sex = that.dataList.product.porPlanList[that.activeName].planProp.sex;
                that.showChangeMoney.smoke = that.dataList.product.porPlanList[that.activeName].planProp.smoke;
                that.showChangeMoney.motherBaby = that.dataList.product.porPlanList[that.activeName].planProp.motherBaby;
                that.showChangeMoney.ensurePeriod = that.dataList.product.porPlanList[(that.activeName-0)].planProp.ensurePeriod+','+that.dataList.product.porPlanList[that.activeName].planProp.ensurePeriodUnit;
                 console.log(this.showChangeMoney.ensurePeriod)
                //that.showChangeMoney.ensurePeriodUnit = that.dataList.product.porPlanList[that.activeName].planProp.ensurePeriodUnit;
                //that.showChangeMoney.occupation = that.dataList.product.porPlanList[that.activeName].planProp.occupation;
           }else{
               if(!that.showChangeMoney.ensurePeriod){
                   that.showChangeMoney.changeEnsurePeriod = that.alternativeChangeEnsurePeriod;
               }else{
                   that.showChangeMoney.changeEnsurePeriod = that.showChangeMoney.ensurePeriod;
               }
               this.api.post(
                    this.GLOBAL.host + '/product/getPlanAmount',
                    that.showChangeMoney
                ).then(function(response) {
                    if (response.result) {
                        that.moneyData = response.data;
                    }
                })
           }
            
        },
        //限制被保人出生日期
        limitBorn(){
            var that = this;
            this.api.post(
                this.GLOBAL.host + '/product/insuranceScope',
                {id:that.id,planId:that.showChangeMoney.planId}
            ).then(function(response) {
                if (response.result) {
                    // that.minDate =  new Date(-2209017943000);
                    // that.maxDate = new Date(response.data.endDate) || new Date();
                    that.minDate =  "1970-01-01";
                    that.maxDate = response.data.endDate +'' || new Date();
                    // that.showChangeMoney.birthdate = new Date(response.data.endDate) || new Date(); // 迭代测试暂时注释
                }
            })
        },
         //获取职业-查看所有
        getOccupationList(){
            var that = this;
            this.$store.dispatch('axiosLoadings', true);
            this.api.post(
                this.GLOBAL.host + '/ours/occupationList',
                {occupation:that.workDateList}
            ).then(function(response) {
                if (response.result) {
                    that.occupationList = that.$utils.occupationType(response.data,"1");
                    that.$store.dispatch('axiosLoadings', false);
                }
            })
        }, 
         //获取职业下拉框
        getCheckccupationList(){
            var that = this;
            this.api.post(
                this.GLOBAL.host + '/product/getOccupationList',
                {planId:that.dataList.product.porPlanList[that.activeName].planProp.planId}
            ).then(function(response) {
                if (response.result) {
                    that.workDateList = response.data.occupation;
                }
            })
        },    
            //打开dialog.alert
        alertOpen (title,content) {
            this.dialog.alert = true;
            this.dialog.alertTitle = title;
            this.dialog.alertContent = content;
        },   
        //关闭dialog.alert
        alertClose () {
            this.dialog.alert = false
        },
    },
    watch:{
        //期限选择实时调价格
        // "showChangeMoney.ensurePeriod":function(val,oldval){
        //     if(this.showChangeMoney.ensurePeriod != ""){
        //         this.showChangeMoney.changeEnsurePeriod = "";
        //         this.getChangeMoney("more");
        //     }
            
        // },
        // "showChangeMoney.changeEnsurePeriod":function(val,oldval){
        //     if(this.showChangeMoney.changeEnsurePeriod != ""){
        //         this.showChangeMoney.ensurePeriod = "";
        //         this.getChangeMoney("more");
        //     }
            
        // },
        // "showChangeMoney.birthdate":function(val,oldval){
        //     this.getChangeMoney("more");
        // },
    },
    filters:{
      filterUnit(val) {
        return (val=="10" && "天") || (val=="20" && "周") || (val=="30" && "月") || (val=="40" && "年") || "";
      },
    },
}
</script>
<style lang="less">
    .product-pic{
        width:100%;
        height:4.12rem;
        img{
            width:100%;
            height:100%; 
        }
    }
    .product-mes{
        position: relative;
        background:#fff;
        padding:.2rem;
        margin-bottom:.2rem;
        h5{
            width: 80%;
            line-height: 32px;
            vertical-align: middle;
            color:#333;
            font-size:.34rem;
            font-weight:normal;
            text-overflow:ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
        .logo{
            position: absolute;
            right:.3rem;
            top:.3rem;
            vertical-align: middle;
            max-height: .62rem;
            width: 1.6rem;
        }
        .price{
            color:#fd5962;
            margin-bottom:.2rem;
            margin-top: 0.1rem;
            i{
                font-size:.36rem;
                font-style:normal;
            }
            em{
                font-size:.24rem;
                font-style:normal;
            }
        }
        .mes-sub{
            color:#666;
            font-size:.24rem;
            .margin-tag{
                margin:0 .2rem;
            }
        }
    }
    .plan-box{
        padding:.3rem .2rem 60px;
        background:#fff;
        .material-icons{
            font-size: 17px;
            color: #666;
        }
        .tit{
            line-height:1.2;
            margin-bottom:.3rem;
            color:#333;
            font-size:.3rem;
            font-weight:normal;
        }
        .plan-detail-box{
            position: relative;
            border:1px solid #d8d8d8;
            .choose-txt{
                position: absolute;
                left:.2rem;
                top:10px;
                color:#333;
                font-size:0.3rem;
            }
            .plan-tit{
                margin-left:100px;
                .el-tabs__header{
                    margin-bottom:0;
                    margin-left: -20px;
                }
                .el-tabs__content{
                    margin-left:-100px;
                    .tab-cont-list{
                        padding:0 .2rem;
                        background:#fafafa;
                        border-bottom:1px solid #d8d8d8;
                        li{
                            padding:13px 0;
                            line-height:1.3;
                            border-bottom:1px solid #d8d8d8;
                            &:last-child{
                                border-bottom:none;
                            }
                            .planNamea{
                                width: 70%;
                                display: inline-block;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                font-size: .28rem;
                                color: #666;
                            }
                            .planNameaRight{
                                float:right;
                                width: 20%;
                                margin-right: 0.2rem;
                                display: block;
                                overflow: hidden;
                                height: 15px;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                font-size: .28rem;
                                color: #666;
                                text-align: right;
                            }
                        }
                    }
                    .hiddenHeight{
                        max-height: 145px;
                        overflow: hidden;
                    }
                    .btnMore{
                        padding: 13px 0;
                        line-height: 1.3;
                        text-align: center;
                        background:#fafafa;
                        border-bottom:1px solid #d8d8d8;
                    }
                    .moreIcon{
                        transform: rotateZ(90deg);
                        display: inline-block;
                    }
                    .border_down{
                        width: 0;
                        height: 0;
                        border-width: 9px 9px 0;
                        border-style: solid;
                        border-color: #ccc transparent transparent;
                        display: inline-block;
                    }
                    .border_up{
                        width: 0;
                        height: 0;
                        border-width: 0 9px 9px;
                        border-style: solid;
                        border-color: transparent transparent #ccc;
                        display: inline-block;
                    }
                    .price-com{
                        height:50px;
                        padding:15px;
                        .btn-price{
                            position:absolute;
                            bottom:9px;
                            right:15px;
                        }
                    }
                }
            }
            
        }
    }
    span.price{
        font-size:18px;
        color:#ff3339;
    }
    em.price-icon{
        font-size:12px;
        color:#ff3339;
        font-style:normal;
    }
    .more-txt{
        margin:15px 0 35px;
        color:#666;
        font-size:0.24rem;
        text-align: center;
        em{
            font-style:normal;
            color:#5680e0;
        }
    }
    .sug-box{
        position: relative;
        border:1px solid #d8d8d8;
        // margin:0 .6rem;
        padding:.4rem .3rem .3rem;
        font-size:.28rem;
        h5{
            position:absolute;
            left:50%;
            top:-12px;
            margin-left:-50px;
            font-size:normal;
            color:#333;
            font-size:16px;
            font-weight:normal;
            background:#fff;
            padding:0 15px;
        }
        .sug-txt{
           img{
               width: 100%;
                display: block;
           }
        }
    }
    .buy-box{
        position:fixed;
        bottom:0;
        left:0;
        right:0;
        height:50px;
        line-height:50px;
        padding:0 100px 0 .6rem;
        box-shadow:0px -3px 6px 0px 	rgba(0, 0, 0, 0.1);
        background:#fff;
        .buy-btn{
            position: absolute;
            right:0;
            top:0;
            bottom:0;
            width:100px;
            height:50px;
        }
    }
    .item-tit{
        display:inline-block;
        margin-right:1rem;
    }
    .item-cont{
        color:#666;
    }
    .pop-content{
        .product-mes{
            margin-bottom:0;
            h5{
                padding-bottom:0;
            }
        }
    }
    // 保障期间样式
    .radioSpan {
        position: relative;
        margin-right: 9px;
        input:checked+label {
          color: #fd5962;
          border: 1px solid #fd5962;
        }
        input {
          position: absolute;
          z-index: 1;
          left: .6rem;
          top: .1rem;
          display: none;
        }

        label {
          display: inline-block;
          text-align: center;
          background-color: #fff;
          font-size: .2rem;
          border: solid 1px #d8d8d8;
          border-radius: 4px;
            height: 0.5rem;
            line-height: 0.5rem;
            padding: 0 3px;
            margin-bottom: 4px;
        }
      }
    //   保障期限li
    .baoZhangQiXaing{
        .mu-item{
            height: auto;
            padding: 8px 16px;
        }
    }
</style>
<style>
 /* 修理菜单滚动 */
 .el-tabs__nav-wrap::after{
     height: 0 !important;
 }
 .el-tabs__nav-next, .el-tabs__nav-prev{
     display: none;
 }
/* 一级弹框 */
/* 弹窗 */

 .jiankanggaozhi .mu-dialog-fullscreen {
    height: 100% !important;
    top: auto;
  }
/* 二级弹窗title列表 */
.el-collapse-item__header{
    color: #333333;
    font-size: 0.3rem;
    padding: 0 0.3rem;
}
/* 二级弹窗二级list */
.mu-item-title{
    color: #333333;
    font-size: 0.26rem; 
}
/* 下拉title之间的距离 */
.el-collapse-item__content{
    padding-bottom: 0;
}
/* 二层弹窗滚动 */
.mu-dialog-fullscreen{
    overflow: scroll;
}
/* 二层弹窗下拉框 */
.mu-input{
    margin-bottom: 0;
    padding-bottom: 0;
    padding-top: 5px;
    /* width: 1.8rem; */
    font-size: 14px;
}
.birth .mu-input{
    width: 1.8rem;
    margin-bottom: 0;
}
.healthy-intro{
    padding:0.3rem;
    color:#333;
}
.footer-btn{
    position: fixed;
    left:0;
    bottom:0;
    right:0;
}

.el-collapse-item__wrap {
    padding: 0 ;
}
 .el-tabs__item:hover {
    color: #303133;
  }

.plan-tit-box .el-tabs__item.is-active {
    color: #fd5962;
  }
.plan-tit-box .el-tabs__active-bar {
    background: #fd5962;
  }
  .plan-tit-box .el-tabs__nav-scroll{
      overflow-x: scroll;
  }
</style>
