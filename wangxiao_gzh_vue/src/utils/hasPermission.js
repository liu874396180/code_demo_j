import store from '../store'

// 朱杰
// export function hasPermission(permission) {
//   let myPermissions = store.getters.permissions;
//   return myPermissions.indexOf(permission) > -1;
// }
// 修改--->多个导出
const ConstHasPerm =  function hasPermission(permission) {
  let myPermissions = store.getters.permissions;
  return myPermissions.indexOf(permission) > -1;
}

// 自定义全局变量 ---lpd
const colorList = {
  muBadge:'#ff8025', //订单-数字角标
}


export {
  ConstHasPerm,
  colorList
}