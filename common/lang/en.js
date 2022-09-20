module.exports = {
	// tabbar
	tabbar: {
		index: 'workbench',
		information: 'information',
		schedule: 'schedule',
		personal: 'personal'
	},
	// 公共模块
	common: {
	},
	// 登录页面
	login: {
		titleText: 'sign in',
		title: 'Qixutong',
		signIn: 'signIn',
		scanCode: 'Scan code for quick login',
		setting: 'set up',
		form: {
			phonePlace: 'Please enter the account number',
			passwordPlace: 'Please input a password'
		},
		loginSuccess: 'Login successful'
	},
	// 秘钥
	secretKey: {
		titleText: 'Secret key',
		form: {
			title: 'Associated software',
			titlePlace: 'Please enter the associated software',
			titleValue: 'LPG Integrated management system',
			key: 'secret key',
			keyPlace: 'Key please enter the key',
			lang: 'Current language',
			langPlace: 'Please choose Current language',
			langOptions: [
				{
					name: 'ZH-Chinese',
					value: 'zh-CN'
				},
				{
					name: 'English',
					value: 'en-US'
				}
			]
		},
		save: 'preservation'
	}
}