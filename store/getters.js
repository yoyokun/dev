const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  avatar: state => state.user.avatar,
  roles: state => state.user.roles,
  menu: state => state.user.menu,
  secretKey: state => state.settings.secretKey,
  printSettings: state => state.settings.printSettings,
  mapKey: state => state.settings.mapKey,
  webMapKey: state => state.settings.webMapKey,
  onePageRow: state => state.settings.onePageRow,
  locale: state => state.settings.locale
}
export default getters
