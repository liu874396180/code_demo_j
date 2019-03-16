<template>
  <div class="LeveloneBox fontSize">
    <mu-snackbar v-if="dialog.toast" :position="dialog.position" :open="dialog.toast" color="error" style="text-align: center;">
        {{dialog.toastContent}}
    </mu-snackbar>
    <mu-list>
      <mu-list-item :ripple="false" class="datesbbbbbbb" style="background:#fff;">
        <!-- <mu-list-item-title class="muTitle">起保日期</mu-list-item-title>
          <mu-date-input v-model="dataObj.policyInfo.dateStart" label="" container="bottomSheet" label-float full-width name="qibao" v-validate="'required'" :errorText="errors.first('qibao')" :min-date="createDateStart"></mu-date-input> -->
          <datetime v-model="dataObj.policyInfo.dateStart" :start-date="createDateStart" :end-date="createDateEnd" title="起保日期" name="qibao" v-validate="'required'" :errorText="errors.first('qibao')"></datetime>
      </mu-list-item>
      <mu-list-item :ripple="false" style="background:#fff;">
        <mu-list-item-title class="muTitle">为谁投保</mu-list-item-title>
         <mu-select full-width v-model="dataObj.ensureForWho" name="weishui" v-validate="'required'" :errorText="errors.first('weishui')">
              <mu-option label="本人" value="10"></mu-option>
              <mu-option label="他人" value="20"></mu-option>
          </mu-select>
      </mu-list-item>
    </mu-list>
    <el-collapse class="fontSize" v-model="touBaoRen">
      <el-collapse-item title="投保人" name="toubaoren">
        <div class="col-content">
          <mu-list class="fontSize" style="padding:0">
            <mu-list-item button :ripple="false">
              <mu-list-item-title class="muTitle">投保人类型</mu-list-item-title>
              <mu-list-item-title>个人</mu-list-item-title>
            </mu-list-item>
            <mu-divider />
            <mu-list-item button :ripple="false">
              <mu-list-item-title class="muTitle">姓名</mu-list-item-title>
              <mu-text-field class="inputTestWidth" v-model="dataObj.policyHolder.name" name="toubaorenxingming" v-validate="'required'" :errorText="errors.first('toubaorenxingming')"></mu-text-field>
            </mu-list-item>
            <mu-divider />
            <mu-list-item button :ripple="false">
              <mu-list-item-title class="muTitle">证件类型</mu-list-item-title>
              <mu-select full-width v-model="dataObj.policyHolder.idNoType" name="toubaorenzhengjianleixing" v-validate="'required'" :errorText="errors.first('toubaorenzhengjianleixing')">
                <mu-option label="护照" value="20"></mu-option>
                <mu-option label="身份证" value="10"></mu-option>
              </mu-select>
            </mu-list-item>
            <mu-divider />
            <mu-list-item button :ripple="false">
              <mu-list-item-title class="muTitle">证件号码</mu-list-item-title>
              <mu-text-field class="inputTestWidth" v-model="dataObj.policyHolder.idNo" name="toubaorenzhengjianhaoma" v-validate="'required'" :errorText="errors.first('toubaorenzhengjianhaoma')"></mu-text-field>
            </mu-list-item>
            <mu-divider />
           <mu-list-item button class="datesbbbbbbb" :ripple="false">
              <!-- <mu-list-item-title class="muTitle">出生日期</mu-list-item-title>
              <mu-date-input v-model="dataObj.policyHolder.birthday" @change="fastChange(0,'1',$event,'own')" label="" container="bottomSheet" label-float full-width name="toubaorenzhengchushengriqi" v-validate="'required'" :errorText="errors.first('toubaorenzhengchushengriqi')"     :min-date="ownMinDate" :max-date="ownMaxDate"></mu-date-input> -->
              <datetime v-model="dataObj.policyHolder.birthday" :start-date="ownMinDate" :end-date="ownMaxDate" title="出生日期" name="toubaorenzhengchushengriqi" v-validate="'required'" :errorText="errors.first('toubaorenzhengchushengriqi')" @on-change="fastChange(0,'1',$event,'own')"></datetime>
            </mu-list-item>
            <mu-divider />
            <!-- <mu-list-item button :ripple="false" v-if="occupation">
              <mu-list-item-title class="muTitle">职业类别</mu-list-item-title>
              <mu-select full-width v-model="dataObj.policyProPlanProp.category" @change="fastChange(0,'2',dataObj.policyProPlanProp.category,'own')" name="toubaorenzhengjianleixing" v-validate="'required'" :errorText="errors.first('toubaorenzhengjianleixing')">
                <el-collapse>
                  <el-collapse-item v-for="(item,index) in objOption" :key="index" :title="item.occupationType" :name="index+''">
                    <div class="col-content">
                        <mu-list class="mulist_bg" style="padding:0;background-color: #f2f2f2;">
                           <mu-option v-for="(_item,index) in item.occupationList" :key="index" :label="item.occupationName" :value="item.occupationCode"></mu-option>    
                        </mu-list>
                    </div>
                  </el-collapse-item>
              </el-collapse>
              </mu-select>
            </mu-list-item>
            <mu-divider v-if="occupation"/> -->
            <mu-list-item button :ripple="false" v-if="occupation">
              <mu-list-item-title class="muTitle">职业类别</mu-list-item-title>
              <mu-list-item-title class="muTitle">{{dataObj.policyProPlanProp.category}}</mu-list-item-title>
            </mu-list-item>
            <mu-divider v-if="occupation"/>
            <mu-list-item button :ripple="false">
              <mu-list-item-title class="muTitle">性别</mu-list-item-title>
              <mu-select full-width v-model="dataObj.policyHolder.gender" name="toubaorenzhengsex" v-validate="'required'" :errorText="errors.first('toubaorenzhengsex')">
                <mu-option label="男" value="0"></mu-option>
                <mu-option label="女" value="1"></mu-option>
              </mu-select>
            </mu-list-item>
            <mu-divider />
            <mu-list-item button :ripple="false">
              <mu-list-item-title class="muTitle">电子邮箱</mu-list-item-title>
              <mu-text-field class="inputTestWidth" v-model="dataObj.policyHolder.email" name="toubaorenemail" v-validate="'required|email'" :errorText="errors.first('toubaorenemail')"></mu-text-field>
            </mu-list-item>
            <mu-divider />
            <mu-list-item button :ripple="false">
              <mu-list-item-title class="muTitle">手机号码</mu-list-item-title>
              <mu-text-field class="inputTestWidth" v-model="dataObj.policyHolder.mobile" name="toubaorenmobile" v-validate="'required|phone'" :errorText="errors.first('toubaorenmobile')"></mu-text-field>
            </mu-list-item>
          </mu-list>
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-collapse class="fontSize" v-if="dataObj.ensureForWho !='10'">
      <el-collapse-item title="被保险人" v-for="(item,index) in dataObj.insuredInfoList" :key="index" :name="index">
        <div class="col-content">
          <mu-list class="fontSize" style="padding:0">
            <mu-list-item button :ripple="false">
              <mu-list-item-title class="muTitle">姓名</mu-list-item-title>
              <mu-text-field class="inputTestWidth" v-model="item.name" name="beibaorenname" v-validate="'required'" :errorText="errors.first('beibaorenname')"></mu-text-field>
            </mu-list-item>
            <mu-divider />
            <mu-list-item button :ripple="false">
              <mu-list-item-title>是投保人的</mu-list-item-title>
              <mu-select full-width v-model="item.relation" name="beibaorenguanxi" v-validate="'required'" :errorText="errors.first('beibaorenguanxi')">
                <mu-option label="父亲" value="50"></mu-option>
                <mu-option label="母亲" value="60"></mu-option>
                <mu-option label="妻子" value="10"></mu-option>
                <mu-option label="丈夫" value="20"></mu-option>
                <mu-option label="儿子" value="30"></mu-option>
                <mu-option label="女儿" value="40"></mu-option>
                <mu-option label="本人" value="70"></mu-option>
                <mu-option label="其他" value="80"></mu-option>
              </mu-select>
            </mu-list-item>
            <mu-divider />
            <mu-list-item button :ripple="false">
              <mu-list-item-title class="muTitle">证件类型</mu-list-item-title>
              <mu-select full-width v-model="item.idNoType" name="beibaorenzhengjianleixing" v-validate="'required'" :errorText="errors.first('beibaorenzhengjianleixing')">
                <mu-option label="护照" value="20"></mu-option>
                <mu-option label="身份证" value="10"></mu-option>
              </mu-select>
            </mu-list-item>
            <mu-divider />
            <mu-list-item button :ripple="false">
              <mu-list-item-title class="muTitle">证件号码</mu-list-item-title>
              <mu-text-field class="inputTestWidth" v-model="item.idNo" name="beibaorenzhengjianhaoma" v-validate="'required'" :errorText="errors.first('beibaorenzhengjianhaoma')"></mu-text-field>
            </mu-list-item>
            <mu-divider />
            <mu-list-item button class="datesbbbbbbb" :ripple="false">
              <!-- <mu-list-item-title class="muTitle">出生日期</mu-list-item-title>
              <mu-date-input v-model="item.birthday" @change="fastChange(index,'1',$event,'other')" container="bottomSheet"  label="" label-float full-width name="beibaorenchushengriqi" v-validate="'required'" :errorText="errors.first('beibaorenchushengriqi')" :min-date="otherMinDate" :max-date="otherMaxDate"></mu-date-input> -->
              <datetime v-model="item.birthday" :start-date="otherMinDate" :end-date="otherMaxDate" title="出生日期" name="beibaorenchushengriqi" v-validate="'required'" :errorText="errors.first('beibaorenchushengriqi')" @on-change="fastChange(index,'1',$event,'other')"></datetime>
            </mu-list-item>
            <mu-divider />
             <!-- <mu-list-item button :ripple="false" v-if="occupation">
              <mu-list-item-title class="muTitle">职业类别</mu-list-item-title>
              <mu-select full-width v-model="dataObj.policyHolder.idNoType" @change="fastChange(index,'2',$event,'other')" name="toubaorenzhengjianleixing" v-validate="'required'" :errorText="errors.first('toubaorenzhengjianleixing')">
                <el-collapse>
                  <el-collapse-item v-for="(item,index) in objOption" :key="index" :title="item.occupationType" :name="index+''">
                    <div class="col-content">
                        <mu-list class="mulist_bg" style="padding:0;background-color: #f2f2f2;">
                           <mu-option v-for="(_item,index) in item.occupationList" :key="index" :label="item.occupationName" :value="item.occupationCode"></mu-option>    
                        </mu-list>
                    </div>
                  </el-collapse-item>
              </el-collapse>
              </mu-select>
            </mu-list-item>
            <mu-divider  v-if="occupation"/> -->
            <mu-list-item button :ripple="false" v-if="occupation">
              <mu-list-item-title class="muTitle">职业类别</mu-list-item-title>
              <mu-list-item-title class="muTitle">{{dataObj.policyHolder.idNoType}}</mu-list-item-title>
            </mu-list-item>
            <mu-divider  v-if="occupation"/>
            <mu-list-item button :ripple="false">
              <mu-list-item-title class="muTitle">性别</mu-list-item-title>
              <mu-select full-width v-model="item.gender">
                <mu-option label="男" value="0"></mu-option>
                <mu-option label="女" value="1"></mu-option>
              </mu-select>
            </mu-list-item>
            <mu-divider />
            <mu-list-item button :ripple="false">
              <mu-list-item-title class="muTitle">手机号码</mu-list-item-title>
              <mu-text-field class="inputTestWidth" v-model="item.contactsMobile" name="beibaorenmolie" v-validate="'required|phone'" :errorText="errors.first('beibaorenmolie')"></mu-text-field>
            </mu-list-item>
            <mu-divider />
            <mu-list-item button :ripple="false">
              <mu-list-item-title class="muTitle">受益人类型</mu-list-item-title>
              <mu-select full-width v-model="item.assign" name="shouyirenleixing" v-validate="'required'" :errorText="errors.first('shouyirenleixing')">
                <mu-option label="法定" value="40"></mu-option>
                <!-- <mu-option label="顺位" value="10"></mu-option>
                <mu-option label="均分" value="20"></mu-option>
                <mu-option label="比例 " value="30"></mu-option> -->
              </mu-select>
            </mu-list-item>
            <!-- 受益人list -->
            <el-collapse class="fontSize" v-if="item.assign !='40'">
              <el-collapse-item :title="`受益人${_index+1}`" v-for="(_item,_index) in item.bnfsInfoList" :key="_index" :name="`shouyiren${index}`">
                <div class="col-content">
                  <mu-list class="fontSize" style="padding:0">
                    <mu-list-item button :ripple="false">
                      <mu-list-item-title class="muTitle">姓名</mu-list-item-title>
                      <mu-text-field class="inputTestWidth" v-model="_item.name" name="shouyirenxingming" v-validate="'required'" :errorText="errors.first('shouyirenxingming')"></mu-text-field>
                    </mu-list-item>
                    <mu-divider />
                    <mu-list-item button :ripple="false">
                      <mu-list-item-title>是投保人的</mu-list-item-title>
                      <mu-select full-width v-model="_item.relation" name="shouyirenguanxi" v-validate="'required'" :errorText="errors.first('shouyirenguanxi')">
                        <mu-option label="父亲" value="50"></mu-option>
                        <mu-option label="母亲" value="60"></mu-option>
                        <mu-option label="妻子" value="10"></mu-option>
                        <mu-option label="丈夫" value="20"></mu-option>
                        <mu-option label="儿子" value="30"></mu-option>
                        <mu-option label="女儿" value="40"></mu-option>
                      </mu-select>
                    </mu-list-item>
                    <mu-divider />
                    <mu-list-item button :ripple="false">
                      <mu-list-item-title class="muTitle">证件类型</mu-list-item-title>
                      <mu-select full-width v-model="_item.idNoType" name="shouyirenzhengjianleiixng" v-validate="'required'" :errorText="errors.first('shouyirenzhengjianleiixng')">
                        <mu-option label="护照" value="20"></mu-option>
                        <mu-option label="身份证" value="10"></mu-option>
                      </mu-select>
                    </mu-list-item>
                    <mu-divider />
                    <mu-list-item button :ripple="false">
                      <mu-list-item-title class="muTitle">证件号码</mu-list-item-title>
                      <mu-text-field class="inputTestWidth" v-model="_item.idNo" name="shouyirenzhengjianhaoma" v-validate="'required'" :errorText="errors.first('shouyirenzhengjianhaoma')"></mu-text-field>
                    </mu-list-item>
                    <mu-divider />
                   
                   <mu-list-item button :ripple="false" v-if="item.assign =='30'">
                      <mu-list-item-title class="muTitle">受益比例</mu-list-item-title>
                      <mu-text-field class="inputTestWidth" v-model="_item.profitRate" name="shouyirenshouyibili" v-validate="'required'" :errorText="errors.first('shouyirenshouyibili')"></mu-text-field>
                    </mu-list-item>
                    <mu-divider />
                    <mu-list-item button :ripple="false">
                      <mu-list-item-title class="muTitle">顺位顺序</mu-list-item-title>
                      <mu-text-field class="inputTestWidth" v-model="_item.seq"></mu-text-field>
                    </mu-list-item>
                  </mu-list>
                </div>
              </el-collapse-item>
            </el-collapse>
            <mu-list @click="addGetPerson(index)"  v-if="item.assign !='40'">
              <mu-list-item :ripple="false" class="xinZeng" style="background:#fff;">
                +&emsp;新增受益人
              </mu-list-item>
            </mu-list>
          </mu-list>
        </div>
      </el-collapse-item>
    </el-collapse>
    <!-- <mu-list @click="addPerson" v-if="dataObj.ensureForWho !='10'">
      <mu-list-item :ripple="false" class="xinZeng" style="background:#fff;">
        +&emsp;新增被保险人
      </mu-list-item>
    </mu-list> -->
    <el-collapse class="fontSize">
      <el-collapse-item title="其他信息" name="2">
        <div class="col-content">
          <mu-list class="fontSize" style="padding:0">
            <mu-list-item button :ripple="false">
              <mu-list-item-title class="muTitle">出行目的地</mu-list-item-title>
              <mu-text-field class="inputTestWidth" v-model="dataObj.policyProPlanProp.locals"></mu-text-field>
            </mu-list-item>
            <mu-divider />
            <mu-list-item button :ripple="false">
              <mu-list-item-title class="muTitle">出行目的</mu-list-item-title>
              <mu-text-field class="inputTestWidth" v-model="dataObj.policyProPlanProp.dosome"></mu-text-field>
            </mu-list-item>
          </mu-list>
        </div>
      </el-collapse-item>
    </el-collapse>
    <mu-list style="text-align:center">
      <!-- <mu-list-item :ripple="false"  class="xinZeng" style="background:#fafafa;;"> -->
      <!-- 我已查看并同意<router-link to="">《投保声明》</router-link>  -->
      <mu-checkbox v-model="checked" uncheck-icon="radio_button_unchecked" checked-icon="check_circle" color="#fd5962" label="我已查看并同意"></mu-checkbox>
      <span @click="openInsuranceDeclarationFn(dataObj.orderInfo.productId)" style="color:#5680e0;vertical-align: top;display: inline-block;line-height: 24px;">《投保声明》</span>
      <!-- </mu-list-item> -->
    </mu-list>
    <mu-row gutter class="num-save-submit">
      <mu-col span="6">
        <div class="grid-cell numSaveSubmit1">￥{{changeAmounetMoney}}</div>
      </mu-col>
      <mu-col span="3">
        <div class="grid-cell numSaveSubmit2" @click="save('1')">保存</div>
      </mu-col>
      <mu-col span="3">
        <div class="grid-cell numSaveSubmit3" @click="save('2')">提交</div>
      </mu-col>
    </mu-row>
    <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="payOpenFullscreen">
      <mu-appbar color="#ffffff" title="选择支付方式" z-depth="1" textColor="#333333" style="text-align:center">
        <mu-button slot="right" icon @click="closeFullscreenDialog">
          <mu-icon value="close"></mu-icon>
        </mu-button>
      </mu-appbar>
      <mu-list class="btnCenter">
        <mu-list-item avatar>
          <mu-list-item-action avatar>
            <mu-avatar>
              <img src="../../../static/images/wxzhifu.png">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>微信支付</mu-list-item-title>
          </mu-list-item-content>
          <mu-checkbox v-model="hasChecked" uncheck-icon="radio_button_unchecked" checked-icon="check_circle" color="#fd5962" label=""></mu-checkbox>
        </mu-list-item>
        <mu-button full-width round class="full-width-btn" @click="pay(toPayPolicyId,toPayPolicyflag,totalPremium,policyNo)">立即支付</mu-button>
      </mu-list>
    </mu-dialog>
    <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="InsuranceDeclaration">
      <mu-appbar color="#ffffff" title="投保声明" z-depth="1" textColor="#333333" style="text-align:center">
        <mu-button slot="right" icon @click="closeInsuranceDeclarationFn">
          <mu-icon value="close"></mu-icon>
        </mu-button>
      </mu-appbar>
      <mu-list class="btnCenter">
        <div class="textInfo">
            <h1 class="title">投保声明</h1>
            <div class="content">
                1、请认真阅读
                <router-link v-for="(index,item) in dataList" :key="index" target="_blank" :to="{path:'/xuzhiPdf',query:{pdfUrl:item.url}}" class="color-theme">
                  {{'《' + item.termsTitle + '》'}}
                </router-link>
                了解并接受包括有关保障内容以及保额、责任条款及免除责任条款、承保地域限制、费用扣除、退保、保单现金价值、投被保险人义务及线上服务协议的约定。投保人已向被保险人明确说明，并征得其同意。
            </div>
            <div class="content">
                2、投保人兹声明各项内容、职业、告知属实。如投保信息不真实，保险公司将有权解除合同不承担保险责任。
            </div>
            <div class="content">
                3、根据《中华人民共和国合同法》第十一条规定，数据电文是合法的合同表现形式。本人接受电子保单作为合法有效凭证。
            </div>
            <div class="content">
                4、18周岁以下的未成年人身故保险金额以保险事故发生时中国保监会规定的金额限额为准。
            </div>
        </div>
      </mu-list>
    </mu-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        InsuranceDeclaration:false,
        dataList:[], // 投保声明
        showChangeMoney :{
          orderId:this.$route.query.id,
          occupation:"",
          birthdate:"",
        }, //实时价格变化需要的参数
        occupation:"", //职业
        objOption:[], // 获取职业类别----渲染
         soonStartDate:'', //暂存开始时间
        soonEndDate:'', //暂存结束时间
        ownMinDate:"1970-01-01",  //是否为自己投保-最小日期 1970
        ownMaxDate:this.$utils.getNowFormatDateAfter(new Date()), //是否为自己投保-最大日期
        otherMinDate:"1970-01-01", //是否为自己投保-最小日期
        otherMaxDate:this.$utils.getNowFormatDateAfter(new Date()), //是否为自己投保-最大日期
        createDateStart: this.$utils.getNowFormatDateAfter(new Date(new Date().getTime() + 24*60*60*1000)), // 明天时间
        createDateEnd:   this.$utils.getNowFormatDateAfter(new Date(new Date().getTime() + 3*30*24*60*60*1000)), // 时间段控制
        id:this.$route.query.id, // 订单id
        policyId:this.$route.query.policyId, //保单id
        dialog: {
          toastTimer: null,
          toast: false,
          position: "top"
        },
        touBaoRen:'toubaoren', // 默认投保人展开
        hasChecked: true, //支付方式默认微信已选中
        value1: '20',
        toPayPolicyId:'', // 投保成功返回的id
        toPayPolicyflag:'', // 投保成功返回的去投哪家保险
        totalPremium:"",// 支付金额---支付时
        policyNo:"",   // 保单号---支付时
        checked: true,
        moneyList:[], //存储实时总价格
        payOpenFullscreen: false, // 支付方式弹窗
        changeAmounetMoney:"",    // 初始总价格价格稍后会动态变化
        initMoney:"", // 本页面初始最低价格
        // 上一页本地缓存过来的数据
        // 订单信息
        //OrderInfo: JSON.parse(window.sessionStorage.OrderInfo),
        // policyInfo:  JSON.parse(window.sessionStorage.policyInfo),
        // 保单产品计划属性
        //policyProPlanProp : JSON.parse(window.sessionStorage.policyProPlanProp),
        // 数据
        dataObj: {
            id:this.$route.query.id, // 区别是否第一次保存
          status: '', //是	String	操作状态 处理项：1(保存)；2(提交)
          agentId: "", //是	String	代理人id
          agentName: "", //是	String	代理人姓名
          channelId: "", //是	String	渠道id
          ensureForWho:'10', // 为谁投保 默认本人10
          orderInfo: "",       //是	OrderInfo	订单信息  已由前页传来
          policyInfo: {
              contractId:"",
          }, //是	PolicyInfo	保单信息 （起保日期） 与缓存数据结合了
           policyProPlanProp: "", //是	PolicyProPlanProp	保单产品计划属性  已由上个页面传来
          policyHolder: {

          }, //否	PolicyHolder	投保人信息
          insuredInfoList: [{
            relation: '', //关系
            name: '', //被保人姓名
            idNoType: '', //证件类型
            idNo: '', //证件号码
            birthday: '', //出生日期
            gender: '', //性别
            contactsMobile: '', //手机号
            assign: '40', //被保险人收益分配方式
            bnfsInfoList:[],//受益人list
          }], //否	List<InsuredInfo>	被保人信息
        }

      }
    },
    computed:{
    },
    components: {

    },

    created() {
      this.$nextTick(() => {
        document.title = '保单填写';
      })
      this.getData();
    },

    mounted() {},
    // var aa =[1,4,7,2,10].reduce(function (partial, value){
    //       return (partial-0) + (value-0);})
    methods: {
      //投保声明
      getPdfList(id){
          var that = this;
          this.api.post(
              this.GLOBAL.host + '/product/getproductTermsList',
              {productId:id}
          ).then(function(response) {
              if (response.result) {
                that.dataList = response.data.list;
              }
          })
        },
      //气泡提示
      openToast(content, func) {
        this.dialog.toast = true;
        this.dialog.toastContent = content;
        if (this.dialog.toastTimer) {
          clearTimeout(this.dialog.toastTimer);
        }
        this.dialog.toastTimer = setTimeout(() => {
          this.dialog.toast = false;
        }, 1000);
      },
      // 监听赛选框变化
      fastChange(index,type,res,who) {
          // 被保人是否是自己
         if(this.dataObj.ensureForWho=="20" && index==0 && who=="own"){
            return false;
         } 
         if(type=="1"){
           this.showChangeMoney.birthdate = res;
         }
          if(type=="2"){
           this.showChangeMoney.occupationCode = res;
         }
        //  alert(res)
          // this.commnetMoney = null;
          this.getChangeMoney(index);
      },
      //点击投保获取产品保障期间价格实时变化
      getChangeMoney(index){
          var that = this;
          //弹窗默认值
          if(!that.showChangeMoney.changeEnsurePeriod){
                that.showChangeMoney.changeEnsurePeriod = that.showChangeMoney.ensurePeriod;
            }
          this.api.post(
              this.GLOBAL.host + '/product/getPlanAmount',
              that.showChangeMoney
          ).then(function(response) {
              if (response.result) {
                  that.moneyList[index] = response.data.amount;
                  that.changeAmounetMoney = that.moneyList.reduce((partial,value)=>(partial-0) + (value-0))
              }
          })
      },
      //限制被保人出生日期
      limitBorn(){
        var that = this;
        //弹窗默认值
        this.api.post(
            this.GLOBAL.host + '/product/insuranceScope',
            {id:that.id,planId:that.showChangeMoney.planId}
        ).then(function(response) {
            if (response.result) {
                // that.soonStartDate = new Date(response.data.startDate); //暂存开始时间
                // that.soonEndDate = new Date(response.data.endDate);    // 暂存结束时间
                //  that.otherMinDate = new Date(response.data.startDate) || new Date(-2191438129);
                //  that.otherMaxDate = new Date(response.data.endDate) || new Date();
                that.soonStartDate = response.data.startDate; //暂存开始时间
                that.soonEndDate = response.data.endDate;    // 暂存结束时间
                 that.otherMinDate = response.data.startDate || "1970-01-01";
                 that.otherMaxDate = response.data.endDate || "2020-01-01";
                 if(that.dataObj.ensureForWho =="10"){
                  //  that.ownMinDate = new Date(response.data.startDate) || new Date(-2191438129);
                  //  that.ownMaxDate = new Date(response.data.endDate) || new Date();
                    that.ownMinDate = response.data.startDate ||  "1970-01-01";
                   that.ownMaxDate = response.data.endDate || "2020-01-01";
                 }
              }
        })
      },
      //获取职业下拉框
      getCheckccupationList(){
        var that = this;
        this.api.post(
            this.GLOBAL.host + '/ours/occupationList',
            {occupation:that.occupation}
        ).then(function(response) {
            if (response.result) {
                response.data = that.$utils.occupationType(response.data,"1");
                // response.data.occupationList = that.$utils.occupationType(response.data.occupationList,"2");
                that.objOption = response.data;
            }
        })
      },
      // 弹出
      openFullscreenDialog() {
        this.payOpenFullscreen = true;
      },
      // 关闭
      closeFullscreenDialog() {
        this.payOpenFullscreen = false;
      },
      // 弹出---投保声明
      openInsuranceDeclarationFn(id) {
        this.getPdfList(id)
        this.InsuranceDeclaration = true;
      },
      // 关闭---投保声明
      closeInsuranceDeclarationFn() {
        this.InsuranceDeclaration = false;
      },
      // 新增被保人
      addPerson() {
        let obj = {
          relation: '', //关系
          name: '', //被保人姓名
          idNoType: '', //证件类型
          idNo: '', //证件号码
          birthday: '', //出生日期
          gender: '', //性别
          contactsMobile: '', //手机号
          assign: '', //被保险继承方式
          bnfsInfoList:[], // 受益人list
        };
        this.dataObj.insuredInfoList.push(obj);
        console.log(this.dataObj.insuredInfoList)
        // 添加默认价格
        this.moneyList.push(this.initMoney);
        this.changeAmounetMoney = this.moneyList.reduce((partial,value)=>(partial-0) + (value-0))
      },
      // 新增被保人中的受益人
      addGetPerson(index) {
        let obj = {
          relation: '', //关系
          name: '', //被保人姓名
          idNoType: '', //证件类型
          idNo: '', //证件号码
          //birthday: '', //出生日期
          //gender: '', //性别
          //contactsMobile: '', //手机号
          //assign: '', //被保险人收益分配方式
          profitRate:'', // 受益人受益比例
          seq:'',        //受益人顺位顺序
        };
        console.log(this.dataObj.insuredInfoList)
        this.dataObj.insuredInfoList[index].bnfsInfoList.push(obj);
      },
      save(status) {
        let that = this;
        that.dataObj.status = status;

        // 时间转换
        // 被保险人时间转换
        // that.dataObj.insuredInfoList.forEach((element) => {
        //   element.birthday = that.$utils.getDate(element.birthday);
        // });
        // 起保日期
        //that.dataObj.policyInfo.dateStart =  this.$utils.getDate(that.dataObj.policyInfo.dateStart);
        //
        // this.dataObj.policyHolder.birthday = this.$utils.getDate(that.dataObj.policyHolder.birthday);
        if(!that.checked){
          that.openToast("请选择投保声明");
        }else{
          this.$validator.validateAll().then((result) => {
            if (result) {
              that.dataObj.orderInfo.orderAmount = that.changeAmounetMoney;
              let P = new Promise((resolve, reject) => {
                that.api.post(
                  that.GLOBAL.host + '/order/agentCreateOrder',
                  that.dataObj
                ).then(function (response) {
                  if (response.result) {
                    // that.openFullscreenDialog();
                    if(that.dataObj.status=="2"){
                      that.toPayPolicyId = response.data.id;
                      that.toPayPolicyflag = response.data.saleCompCode;
                      that.totalPremium = response.data.totalPremium;
                      that.policyNo = response.data.policyNo;
                      that.openFullscreenDialog();
                      }else if(that.dataObj.status=="1"){
                        that.openToast("保存成功");
                      }
                  }
                })
              }).catch((e) => {
                // this.loading = false
                console.log(e)
              })
            } else {
              return false
            }
          })
        }
        
      },
      pay(id,toPayPolicyflag,totalPremium,policyNo) {
        let that = this;
        let objzx = {
            policyId: id, //订单号
            payType: 'wxpay',
            wxpayType: 'subscription'
        }
        let objal = {
             totalPremium:totalPremium,
             policyRef:policyNo
        }
        let url = toPayPolicyflag == "zxjk" ? "/order/toPay" : "/notify/h5/toAlPay";
        if(toPayPolicyflag =="zxjk"){
           var obj = objzx;
        }else{
          obj = objal;
        }
        // this.$validator.validateAll().then((result) => {
          if (that.hasChecked) {
            let P = new Promise((resolve, reject) => {
              that.api.post(
                that.GLOBAL.host + url,
                  obj
              ).then(function (response) {
                if (response.result) {
                  that.closeFullscreenDialog();
                  // alert(response.data)
                  window.location.href = response.data;
                  console.log(response)
                }else{
                  // alert(JSON.parse(response))
                }
              },function(error){document.write(error);})
            }).catch((e) => {
              // this.loading = false
              console.log(e)
              document.write(e);
            })
          } else {
            that.openToast("请选择支付方式");
          }
        // })
      },
      //获取数据
      getData(){
          var that = this;
          //弹窗默认值
        //   let showChangeMoney = JSON.parse(window.sessionStorage.showChangeMoney);
          this.api.post(
              this.GLOBAL.host + '/order/orderDetail',
              {"id":that.id,"policyId":that.policyId}
          ).then(function(response) {
              if (response.result) {
                 that.dataObj.ensureForWho = response.data.ensureForWho; //为谁投保
                 that.dataObj.policyInfo = response.data.policyInfo; //订单信息
                 that.dataObj.orderInfo = response.data.orderInfo; //保单信息
                 that.changeAmounetMoney = response.data.orderInfo.orderAmount;         // 初始总价格价格稍后会动态变化，第一次用于显示
                 that.initMoney = response.data.minAmount;    // 本页面初始最低价格,用于新增被保人的初始累加基数
                 that.moneyList[0] = response.data.orderInfo.orderAmount;   // 本页面初始带回来的金额，添加到累加数组作为第一个值
                 that.dataObj.policyProPlanProp = response.data.policyProPlanProp; //计划属性
                 that.dataObj.policyHolder = response.data.policyHolder; //投保人信息
                 that.dataObj.insuredInfoList = response.data.insuredInfoList; //被保人信息
              }
          })
      },

    },
    watch:{
      "dataObj.ensureForWho":function(val,oldval){
        if(val == "10"){
          // this.ownMinDate = this.soonStartDate || new Date(-2191438129);
          // this.ownMaxDate = this.soonEndDate || new Date();
          this.ownMinDate = this.soonStartDate || "1970-01-01";
          this.ownMaxDate = this.soonEndDate || "2020-01-01";
        }else{
          // this.ownMinDate = new Date(-2191438129);
          // this.ownMaxDate = new Date();
          this.ownMinDate = "1970-01-01";
          this.ownMaxDate = "2020-01-01";
        }
      }
    },



  }

</script>
<style lang="less" <style lang="less" scoped>
  // 立即支付按钮
  .full-width-btn {
    width: 6.1rem;
    height: 0.88rem;
    text-align: center;
    background: #fd5962;
    line-height: 0.88rem;
    color: #ffffff;
    font-size: 0.36rem;
    border-radius: 4px;
    margin-top: 1.33rem;
  }

  .btnCenter {
    text-align: center;
  }

  .el-collapse-item__header {
    // border-bottom: 1px solid #ccc;
    padding: 0 0.3rem;
  } // 输入框
  .mu-input {
    margin-bottom: 0;
    padding-bottom: 0;
  } // 文字+输入框+图标，
  .muTitle {
    height: auto;
    width:43%;
  } //提交
  .num-save-submit {
    height: 0.98rem;
    text-align: center;
    line-height: 0.98rem; // 消除页面左右滚动
    margin-left: 0;
    margin-right: 0;
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .numSaveSubmit1 {
    background: #ffffff;
    color: red;
    font-size: 0.48rem;
  }

  .numSaveSubmit2 {
    background: #ff8774;
    color: #ffffff;
    font-size: 0.3rem;
  }

  .numSaveSubmit3 {
    background: #fd5962;
    color: #ffffff;
    font-size: 0.3rem;
  }

</style>
<style>
  /* 支付方式 */

  .mu-avatar-inner {
    background-color: #ffffff;
  }

  .mu-item-action {
    justify-content: flex-start !important;
  }

  .mu-avatar-inner img {
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 0;
  }

  /* 弹窗 */

  .mu-dialog-fullscreen {
    height: 50% !important;
    top: auto;
  }

  /* 下拉容器title */

  .el-collapse-item__header {
    padding: 0 0.3rem;
    border-bottom: 1px solid #ccc !important;
  }

  .fontSize {
    font-size: 0.3rem !important;
    color: #333333 !important;
  }

  /* 右箭头 */

  .mu-item-action {
    justify-content: flex-end;
  }

  /* 输入框宽度 */

  .col-content .inputTestWidth {
    width: 7rem;
  }

  /* 去掉下拉容器的padding-bottom */

  .el-collapse-item__content {
    padding-bottom: 0;
  }

  /*+ 新增按钮 */

  .xinZeng .mu-item {
    color: #fd5962;
    justify-content: center;
  }

  /* 底部按钮 */

  .col,
  .col-3,
  .col-6 {
    padding: 0;
  }
/* 默认进来输入框底部线 */
.mu-input .mu-input-line{
  background:#fff;
  height: 0;
}
.fontSize .mu-input-help{
  bottom:-11px;
}
</style>
