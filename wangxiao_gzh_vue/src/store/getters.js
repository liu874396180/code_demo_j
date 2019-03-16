const getters = {
  visitedViews: state => state.app.visitedViews,

  loginName: state => state.user.loginName,
  nickname: state => state.user.nickname,
  userId: state => state.user.userId,
  avatar: state => state.user.avatar,
  role: state => state.user.role,
  permissions: state => state.permissions,

  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters
}
export default getters
