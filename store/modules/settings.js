const state = {
	// 语言
	locale: uni.getStorageSync('locale') || "zh-CN",
	// 密钥
	secretKey: uni.getStorageSync('secretKey') || "",
	// 是否开启打印预览
	printSettings: uni.getStorageSync('printSettings') || 1,
	// 地图key
	// mapKey: "d863f0d7263c912d2b36ccd5eac84314",
	mapKey: "WAFBZ-WEHE5-ZMZIV-QAKED-UPTR2-CFFZE",
	webMapKey: "e9c3c384d5bcdf64fb8b5ee9c0c0a947",
	onePageRow: '15',
}

const mutations = {
	SET_SEXRETKEY: (state, secretKey) => {
		state.secretKey = secretKey
		uni.setStorageSync('secretKey', secretKey)
	},
	SET_PRINTSETTINGS: (state, printSettings) => {
		state.printSettings = printSettings
		uni.setStorageSync('printSettings', printSettings)
	},
	SET_LOCALE: (state, locale) => {
		state.locale = locale
		uni.setStorageSync('locale', locale)
	}
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

