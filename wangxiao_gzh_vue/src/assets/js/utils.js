export default{
    //将add复制到origin，origin不包含的属性则不复制
    mergeObj(origin, add) {
        if (add === null || typeof add !== 'object') {
            return origin
        }

        var keys = Object.keys(origin)
        var i = keys.length
        while (i--) {
            if(add.hasOwnProperty(keys[i])){
                origin[keys[i]] = add[keys[i]];
            }            
        }
        return origin;
    },
    //将add合并到origin，origin包含的属性则不复制
    combineObj(origin, add) {
        if (add === null || typeof add !== 'object') {
            return origin
        }

        var keys = Object.keys(add)
        var i = keys.length
        while (i--) {
            if(!origin.hasOwnProperty(keys[i])){
                origin[keys[i]] = add[keys[i]];
            }            
        }
        return origin;
    },
    //将cloned复制到origin
    cloneObj(cloned) {
        var newObject = null;
        if(cloned instanceof Array){
            newObject = [];
            for(var id = 0; id < cloned.length; id++){
                newObject.push(this.cloneObj(cloned[id]));
            }
        }else{
            const keys = Object.keys(cloned)//得到obj里所有的keys

            newObject = {};

            for (let i = 0; i < keys.length; i++) {
                 const key = keys[i]
                if(key.indexOf("_") == 0 ){
                    continue;
                }
               
                if (typeof cloned[key] === 'object') {
                    newObject[key] = this.cloneObj(cloned[key])
                } else {
                    newObject[key] = cloned[key]                   
                }
            }
        }
        
        return newObject
    },
    // 13位毫秒时间戳转时间xxxx/xx/xx
     timeFormat(nS) {     
        return new Date(parseInt(("/Date("+nS+")/").substr(6, 13))).toLocaleDateString();     
      },
      // 时间戳转日期xxxx-xx-xx
      getDate (timestamp) {
        if (typeof timestamp === 'string') {
            timestamp = timestamp * 1;
        }
        let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        // let h = date.getHours() + ':';
        // let m = date.getMinutes() + ':';
        // let s = date.getSeconds();
        let datess =  Y+M+D;
        return datess;
      },
    //时间转化
    dateFormat(date,fmt){
        if(fmt==null){
            fmt="yyyy-MM-dd hh:mm:ss";
        }
        var o = { 
            "M+" : date.getMonth()+1,                 //月份 
            "d+" : date.getDate(),                    //日 
            "h+" : date.getHours(),                   //小时 
            "m+" : date.getMinutes(),                 //分 
            "s+" : date.getSeconds(),                 //秒 
            "q+" : Math.floor((date.getMonth()+3)/3), //季度 
            "S"  : date.getMilliseconds()             //毫秒 
        }; 
        if(/(y+)/.test(fmt)) {
                fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length)); 
        }
         for(var k in o) {
            if(new RegExp("("+ k +")").test(fmt)){
                 fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
             }
         }
        return fmt; 
    },
    // 时间转换yyyy-mm-dd,
    getNowFormatDateAfter(dates) {
        var date = dates;
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    },
    //获取部分字段
    getProps(obj,filters){
        if(obj==null || !(obj instanceof Array)){
            return obj;
        }
        if(!(filters instanceof Array) || filters.length==0){
            return obj;
        }
        var rst=[];
        for(let o of obj){
            var add = {};
            for(let prop of filters){
                add[prop] = o[prop];
            }
            rst.push(add);
        }
        return rst; 
    },
    //校验身份证
    validIdcard(value){
        var bool = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(value);
        
        return bool;
    },
    getInfoFromIdcard(item){
        if(item.cardType=='10' && this.validIdcard(item.cardNo)){
            //性别
            if (parseInt(item.cardNo.substr(16, 1)) % 2 == 1) {
                item.gender = '10';
            }else{
                item.gender = '20';
            }
            //年龄
            var myDate = new Date(); 
            var month = myDate.getMonth() + 1; 
            var day = myDate.getDate(); 
            var age = myDate.getFullYear() - item.cardNo.substring(6, 10) - 1; 
            if (item.cardNo.substring(10, 12) < month || item.cardNo.substring(10, 12) == month && item.cardNo.substring(12, 14) <= day) { 
                age++; 
            }
            item.age = age;
            //出生日期
            if(item.cardNo.length==15){
                var year = "19"+item.cardNo.substring(6,8)+"-"+item.cardNo.substring(8,10)+"-"+ item.cardNo.substring(10,12);
                item.birthday = year;
            }
                         
            if(item.cardNo.length==18){
                var year = item.cardNo.substring(6,10)+"-"+item.cardNo.substring(10,12)+"-"+item.cardNo.substring(12,14);
                item.birthday = year;
            }
        }
    },
    //根据属性获取，filters例如{"prop1":"值1","prop2":"值2"}
    getByProps(obj,filters){
        if(obj==null || !(obj instanceof Array)){
            return obj;
        }
        if(!(filters instanceof Array) || filters.length==0){
            return obj;
        }
        for(var ij = 0 ; ij < obj.length; ij ++){
            var flag = true, o = obj[ij], keys = Object.keys(filters);
            var i = keys.length;
            while (i--) {
                obj[keys[i]] != filters[keys[i]];
                flag = false;
            }
            if(flag){
                return ij;
            }
        }
        return -1; 
    },
     //将locationsearch的属性整合
     operLocationSearch(uri) {
        var rtn = {};
        if(typeof uri != "string"){
            return rtn;
        }
        uri = uri.replace("?","");
        if(uri.length==0){
            return rtn;
        }
        var porps = uri.split("&");
        for(var i = 0; i < porps.length; i++){
            var kv = porps[i].split("=");
            if(kv.length != 2){
                continue;
            }
            rtn[kv[0]] = kv[1];
        }
        return rtn;
    },
    // 获取地址栏参数
    getRequest() {
        var url = window.location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var strs = url.substr(1);
            strs = strs.split("&");
            for(var i = 0; i < strs.length; i ++) {
                
            theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
                
            }
        }
        return theRequest;
    },
    isWeixinBrowser(){
        var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
                //在微信中打开
                return true;
        }
        if (ua.match(/WeiBo/i) == "weibo") {
                //在新浪微博客户端打开
                return false;
        }
        if (ua.match(/QQ/i) == "qq") {
                //在QQ空间打开
                return false;
        }
        return false;
    },
    getNumber(val){
        try{
            if(isNaN(Number(val))){
                return 0;
            }
            return Number(val)
        }catch(e){
            return 0;
        }
    },
    // 过滤 职业类别字典
    occupationType(list,type) {
        //职业类别
        if(type=="1"){
            list.forEach(element => {
                switch (element.occupationType) {
                    case "10":
                    element.occupationType = "机关团体公司行号";
                        break;
                    case "15":
                    element.occupationType = '农业';
                        break;
                    case "20":
                    element.occupationType = '牧业';
                        break;
                    case "25":
                    element.occupationType = '内陆渔业';
                        break;
                    case "30":
                    element.occupationType = '海上渔业';
                        break;
                    case "35":
                    element.occupationType = '森林砍伐业';
                        break;
                    default:
                        break;
                }
            });
        }else if(type=="2"){  // 行业类别
            list.forEach(element => {
                switch (element.occupationType) {
                    case "10":
                    element.occupationType = '一般'
                        break;
                    case "15":
                    element.occupationType = '农牧业'
                        break;
                    case "20":
                    element.occupationType = '渔业'
                        break;
                    case "25":
                    element.occupationType = '木材森林业'
                        break;
                    case "30":
                    element.occupationType = '矿业采石业'
                        break;
                    case "35":
                    element.occupationType = '森林砍伐业'
                        break;
                    default:
                        break;
                }
            })
            
        }
        return list;
    },
    // 获取当月月初和月末
    getMonthChuMo(){
        var nowDate = new Date();
        var cloneNowDate = new Date();

        var fullYear = nowDate.getFullYear();
        var month = nowDate.getMonth() + 1; // getMonth 方法返回 0-11，代表1-12月
        var date = nowDate.getDate();

        var endOfMonth = new Date(fullYear, month, 0).getDate(); // 获取本月最后一天
        // 一天的时间戳(毫秒为单位)
        var timestampOfDay = 1000*60*60*24;

        // 月初，月末
        var fullStartOfMonth = this.getFullDate( cloneNowDate.setDate(1) );
        var fullEndOfMonth = this.getFullDate( cloneNowDate.setDate(endOfMonth) );

        return {
            fullStartOfMonth: fullStartOfMonth,
            fullEndOfMonth: fullEndOfMonth
        };
    },
    // 格式化日期 (2016-02-14)
    getFullDate(targetDate) {
        var D, y, m, d;
        if (targetDate) {
            D = new Date(targetDate);
            y = D.getFullYear();
            m = D.getMonth() + 1;
            d = D.getDate();
        } else {
            y = fullYear;
            m = month;
            d = date;
        }
        m = m > 9 ? m : '0' + m;
        d = d > 9 ? d : '0' + d;

        // return y + '-' + m + '-' + d;
        return y + '-' + m;
    }
}