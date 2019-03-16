import Vue from 'vue';
import VeeValidate, {Validator}  from 'vee-validate';
import zh from './zh';

Validator.addLocale(zh);

const config = {
  locale: 'zh_CN'
};

Vue.use(VeeValidate,config);

// 配置中文
//Validator.addLocale(zh);

// 自定义validate 
const dictionary = {
    zh_CN: {
        messages: {
          email: () => '请输入正确的邮箱格式',
          required: () => "必填项"
          // required: () => " "
        },
        attributes:{
          email:'邮箱',
          password:'密码',
          name: '账号',
          phone: '手机'
        }
    }
};

Validator.updateDictionary(dictionary);

Validator.extend(
    'phone', {
          messages: {
            zh_CN:field => '请输入正确的手机号码',
          },
          validate: value => {
            return value.length == 11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/.test(value)
          }
    }
);
Validator.extend(
    'idcard', {
          messages: {
            zh_CN:field => '请输入正确的身份证',
          },
          validate: value => {
            return /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(value)
          }
    }
);
Validator.extend(
    'licenseNumber', {
        messages: {
          zh_CN: field => '请输入正确的车牌号',
        },
        validate: value => {
          return /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/ig.test(value)
        }
    }
);
Validator.extend(
  'licenseCode', {
      messages: {
        zh_CN: field => '请输入正确的车牌号',
      },
      validate: value => {
        return /^[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/ig.test(value)
      }
  }
);
Validator.extend(
    'carVin', {
        messages: {
          zh_CN: field => '请输入正确的车架号',
        },
        validate: value => {
          return /^[a-zA-Z0-9]{17}$/.test(value)
        }
    }
)
Validator.extend(
  'engine', {
      messages: {
        zh_CN: field => '请输入正确的发动机号',
      },
      validate: value => {
        if (value.length < 6) {
          return false;
        }else {
          return true;
        }
      }
  }
)

// 只能输入中文汉子和字母
Validator.extend(
  'ChineseAndzimu', {
      messages: {
        zh_CN: field => '请输入正确的姓名',
      },
      validate: value => {
        return /^[a-zA-Z\u4e00-\u9fa5]+$/.test(value)
        
      }
  }
)
// 只能输入数字
Validator.extend(
  'onlyNumber', {
      messages: {
        zh_CN: field => '请输入正确的编号',
      },
      validate: value => {
         return /^[1-9]\d*|0$/.test(value) && value.length==12 // 只能输入数字可以带一位小数
      }
  }
)
// 只能输入字母、数字
Validator.extend(
  'numberzimu', {
      messages: {
        zh_CN: field => '请正确输入',
      },
      validate: value => {
        return /^[0-9a-zA-Z]+$/.test(value)
        
      }
  }
)