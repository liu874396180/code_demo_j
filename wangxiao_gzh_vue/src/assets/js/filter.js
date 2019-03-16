//将13位时间戳转换xxx-xx-xx日期
let formatDate = timestamp => {
    if (timestamp) {
        let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        let D = date.getDate() + ' ';
        // let h = date.getHours() + ':';
        // let m = date.getMinutes() + ':';
        // let s = date.getSeconds();
        let datess =  Y+M+D;
        return datess;
    }
}
//将13位时间戳转换xxx-xx-xx日期
let formatDateTime = timestamp => {
    let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = date.getDate()  < 10 ? '0'+date.getDate() : date.getDate() + ' ';
    let h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
    let m = (date.getMinutes()< 10 ? '0'+ date.getMinutes() : date.getMinutes()) + ':';
    let s = (date.getSeconds()< 10 ? '0'+ date.getSeconds() : date.getSeconds())  ;
    let datess =  Y+M+D+" "+h+m+s;
    return datess;
} 
// 将系统返回的来的13时间戳计算出距离当前时间的时间间隔，xx分钟前，xx小时前，天，月。。。前
let timeago = (dateTimeStamp) => {
//  if (type == 1) {
//      var stringTime = new Date(Date.parse(dateTimeStamp.replace(/-/g, "/")));
//      dateTimeStamp = stringTime.getTime();
//  }
    // dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
    var minute = 1000 * 60; //把分，时，天，周，半个月，一个月用毫秒表示
    var hour = minute * 60;
    var day = hour * 24;
    var week = day * 7;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime(); //获取当前时间毫秒
    var diffValue = now - dateTimeStamp; //时间差
    if (diffValue < 0) {
    	alert("diffValue < 0\n时间戳有误！")
        return;
    }
    var minC = diffValue / minute; //计算时间差的分，时，天，周，月
    var hourC = diffValue / hour;
    var dayC = diffValue / day;
    var weekC = diffValue / week;
    var monthC = diffValue / month;
    var result='';
    if (monthC >= 1) {
        result = "" + parseInt(monthC);
    } else if (weekC >= 1) {
        result = "" + parseInt(weekC) + "月";
    } else if (dayC >= 1) {
        result = "" + parseInt(dayC) + "周";
    } else if (hourC >= 1) {
        result = "" + parseInt(hourC) + "小时";
    } else if (minC >= 1) {
        result = "" + parseInt(minC) + "分钟";
    } else
        result = "刚刚";
    return result;
}
// 过滤 核保状态
let orderStatusFilter = num =>{
    switch (num) {
        case "10":
        return '待核保'
            break;
        case "20":
        return '核保通过'
            break;
        case "15":
        return '正在核保'
            break;
        case "25":
        return '核保失败(险种有误)'
            break;
        case "36":
        return '核保失败(保险尚未到期)'
            break;
        case "37":
        return '核保失败(其他原因)'
            break;
        case "30":
        return '核保失败(需验车)'
            break;
        case "35":
        return '核保失败(险种有误并且脱保)'
            break;
        case "40":
        return '待支付'
            break;
        case "50":
        return '待验证'
            break;
        case "60":
        return '待出单'
            break;
        case "70":
        return '已关闭'
            break;
        case "80":
        return '已完成'
            break;
        case "90":
        return '申请退款'
            break;
        default:
            break;
    }
}
// 过滤 险种
let insuranceType = num =>{
    switch (num) {
        case "10":
        return '交强险'
            break;
        case "20":
        return '车船税'
            break;
        case "130":
        return '车损险'
            break;
        case "30":
        return '三者险'
            break;
        case "40":
        return '盗抢险'
            break;
        case "50":
        return '司机险'
            break;
        case "60":
        return '乘客险'
            break;
    
        default:
            break;
    }
}
// 过滤 职业类别字典
let occupation_type = num =>{
    switch (num) {
        case "10":
        return '机关团体公司行号'
            break;
        case "15":
        return '农业'
            break;
        case "20":
        return '牧业'
            break;
        case "25":
        return '内陆渔业'
            break;
        case "30":
        return '海上渔业'
            break;
        case "35":
        return '森林砍伐业'
            break;
        default:
            break;
    }
}
// 过滤 行业类别字典
let industry = num =>{
    switch (num) {
        case "10":
        return '一般'
            break;
        case "15":
        return '农牧业'
            break;
        case "20":
        return '渔业'
            break;
        case "25":
        return '木材森林业'
            break;
        case "30":
        return '矿业采石业'
            break;
        case "35":
        return '森林砍伐业'
            break;
        default:
            break;
    }
}
// 过滤 亲属关系
let relation = num =>{
    switch (num) {
        case "10":
        return '妻子'
            break;
        case "20":
        return '丈夫'
            break;
        case "30":
        return '儿子'
            break;
        case "40":
        return '女儿'
            break;
        case "50":
        return '父亲'
            break;
        case "60":
        return '母亲'
            break;
        case "70":
        return '本人'
            break;
        case "80":
        return '其他'
            break;
        default:
            break;
    }
}
let insuranceTypeTwo = num =>{
    switch (num) {
        case "vehicle":
        return '交强险'
            break;
        case "damage":
        return '车损险'
            break;
        case "robbery":
        return '盗抢险'
            break;
        case "third":
        return '三者险'
            break;
        case "driver":
        return '司机险'
            break;
        case "passenger":
        return '乘客险'
            break;
        case "glass":
        return '玻璃险'
            break;
        case "scratch":
        return '划痕险'
            break;
        case "burn":
        return '自燃险'
            break;
        case "water":
        return '涉水险'
            break;
        case "damage_special":
        return '无法找到第三方'
            break;
        case "vehicle_exempt":
        return '车船税'
            break;
        case "damage_exempt":
        return '车损不计免赔'
            break;
        case "robbery_exempt":
        return '盗抢不计免赔'
            break;
        case "third_exempt":
        return '三者不计免赔'
            break;
        case "driver_exempt":
        return '司机不计免赔'
            break;
        case "passenger_exempt":
        return '乘客不计免赔'
            break;
        case "scratch_exempt":
        return '划痕不计免赔'
            break;
        case "burn_exempt":
        return '自燃不计免赔'
            break;
        case "water_exempt":
        return '涉水不计免赔'
            break;
    }
}
// 过滤金额，保留两位小数
let ToFixed = num =>{
   // return Math.floor(num * 100) / 100;  有bug,当xx.0000 时，return xx 
   if(num == null){
     return "0.00";
   }else if(num.indexOf(".") == -1){
     return num;
   }else{
    let indexLength = num.indexOf(".") + 3;
    return num.substr(0,indexLength);
   }
   
}

export { formatDate,formatDateTime,timeago,orderStatusFilter,insuranceType,insuranceTypeTwo,ToFixed,industry,occupation_type,relation} 