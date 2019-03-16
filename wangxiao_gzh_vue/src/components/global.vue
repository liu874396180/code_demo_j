<script type="text/javascript">

const imageRoot = process.env.IMAGE_ROOT;
const host = process.env.API_ROOT;
const shareRoot = process.env.SHARE_ROOT;
const AppId = "wx49892953e61ab647";
// const host = "http://192.168.147.109:8102/h5/api";   //彬彬
 //const host = "http://192.168.147.125:8102/h5/api";   //zhioyu
 //const host = "http://192.168.147.201:8102/h5/api";  //xians
 //const host = "http://192.168.147.114:8102/h5/api";  //
const payhost = process.env.PAY_ROOT;
const allPhone = {
    quoteFailPhone: '400-690-6050', // 报价失败联系客服电话
    piccPhone: '95518', // 人保电话
    cpicPhone: '95500', // 太平洋电话
    pinganPhone : '95511', // 平安电话
    renshouPhone : '95519', // 人寿电话
    sunPhone : '95510', // 阳光电话
    lianhePhone : '95585', // 联合财产电话
    daijiaPhone : '010-85355392', //代驾电话
    ContactPhoneNumber:'4000-020-071' //网销h5 【我的】联系电话
};
export default
{
  host,
  shareRoot,
  AppId,
  imageRoot,
  payhost,
  allPhone
}
</script>
