import auditInfo from './zh/auditInfo'
module.exports = {
	// tabbar
	tabbar: {
		index: '工作台',
		information: '消息',
		schedule: '待办',
		personal: '我的'
	},
	// 公共模块
	common: {
		noData: '没有更多了',
		searchPlaceholder: '请输入关键字',
		searchText: '确定',
		deleteTitle: '删除',
		deleteContent: '确定要删除该数据吗?',
		voidTitle: '作废提示',
		voidContentPlace: '请输入作废描述',
		addTitle: '添加提示',
		addContent: '没有该二维码，请问要添加该二维码吗?',
		stateObj: {
			1: '启用',
			2: '禁用'
		},
		editForm: {
			chooseText: '选择',
			cancelText: '取消'
		},
		btn: {
			add: '添加',
			save: '保存',
			edit: '编辑',
			delete: '删除',
			assignment: '分派',
			toVoid: '作废',
			result: '结果',
			confirm: '确定',
			accept: '接受',
			refuse: '拒绝',
			jump: '处理'
		}
	},
	// 登录页面
	login: {
		titleText: '登录',
		title: '气讯通',
		signIn: '登录',
		scanCode: '扫码快速登录',
		setting: '设置',
		form: {
			phonePlace: '请输入账号',
			passwordPlace: '请输入密码'
		},
		forget: '忘记密码？',
		loginSuccess: '登录成功'
	},
	// 忘记密码
	forgetPassword: {
		titleText: '忘记密码',
		form: {
			phone: '手机号',
			phonePlace: '请输入登录手机号',
			phoneMessage: '登录手机号不正确',
			verifyCode: '验证码',
			verifyCodeBtnText: '发送验证码',
			verifyCodeBtnMessage: '后重新获取',
			verifyCodePlace: '请输入验证码',
			verifyCodeMessage: '验证码长度在4到6个字符',
			newPwd: '新密码',
			newPwdPlace: '请输入新密码',
			newPwdMessage: '新密码长度在6到12个字符',
			newPwd1: '新密码',
			newPwd1Place: '请再次输入新密码',
			newPwd1Message: '新密码长度在6到12个字符',
			newPwdError: '两次输入的密码不一致'
		},
		save: '提交',
		saveCuccess: '修改成功'
	},
	// 秘钥
	secretKey: {
		titleText: '秘钥',
		chinese: '简体中文',
		english: '英语',
		title: '当前语言',
		form: {
			title: '关联软件',
			titlePlace: '请输入关联软件',
			titleValue: 'LPG综合管理系统',
			key: '密钥',
			keyPlace: '请输入密钥'
		}
	},
	// 我的
	personal: {
		titleText: '我的',
		signOut: '退出',
		signOutSuccess: '退出成功',
		boxOne: {
			titleOne: '基础信息',
			titleTwo: '岗位',
			titleThree: '打印设置',
			titleFour: '关于气讯通'
		}
	},
	// 基础信息
	editInfo: {
		titleText: '基础信息',
		phone: '手机',
		password: '密码',
		form: {
			name: '姓名',
			namePlace: '请输入姓名',
			sex: '性别',
			sexPlace: '请选择性别',
			account: '登录账号',
			accountPlace: '请输入登录账号',
			birthdayStr: '生日',
			birthdayStrPlace: '请选择生日',
			nativePlace: '籍贯',
			nativePlacePlace: '请选择籍贯',
			education: '学历',
			educationPlace: '请选择学历',
			idNumber: '身份证号',
			idNumberPlace: '请输入身份证号',
			headPhoto: '头像',
			headPhotoPlace: '请上传头像',
			idPhoto: '证件照片',
			idPhotoPlace: '请上传证件照片',
			sexOptions: [
				{
					name: '男',
					value: '男'
				},
				{
					name: '女',
					value: '女'
				},
				{
					name: '保密',
					value: '保密'
				}
			],
			educationOptions: [
				{
					name: '本科',
					value: '本科'
				},
				{
					name: '大专',
					value: '大专'
				},
				{
					name: '中专',
					value: '中专'
				},
				{
					name: '高中',
					value: '高中'
				},
				{
					name: '初中',
					value: '初中'
				}
			]
		}
	},
	// 修改密码
	editPassword: {
		titleText: '修改密码',
		pageTitle: '设置新密码',
		pageGrayred: '输入原密码方可设置新密码',
		form: {
			oldPwd: '原密码',
			oldPwdPlace: '请输入原密码',
			oldPwdMessage: '原密码长度在6到12个字符',
			newPwd: '新密码',
			newPwdPlace: '请输入新密码',
			newPwdMessage: '新密码长度在6到12个字符',
			newPwd1: '新密码',
			newPwd1Place: '请再次输入新密码',
			newPwd1Message: '新密码长度在6到12个字符',
			newPwdError: '两次输入的密码不一致'
		}
	},
	// 修改手机号
	editPhone: {
		titleText: '修改手机号',
		pageTitle: '修改手机号',
		pageGrayred: '输入原手机号接收短信验证即可修改',
		form: {
			oldPhone: '当前手机号',
			phone: '新手机号',
			phonePlace: '请输入新手机号',
			phoneMessage: '新手机号不正确',
			verifyCode: '验证码',
			verifyCodeBtnText: '发送验证码',
			verifyCodeBtnMessage: '后重新获取',
			verifyCodePlace: '请输入验证码',
			verifyCodeMessage: '验证码长度在4到6个字符'
		}
	},
	// 岗位详情
	jobDetails: {
		titleText: '岗位详情',
		orgName: '组织',
		roleNames: '岗位'
	},
	// 打印预览
	printSettings: {
		titleText: '打印预览',
		form: {
			printSettings: '是否需要打印预览'
		},
		saveCuccess: '修改成功'
	},
	// 服务协议
	agreement: {
		aboutTitleText: '关于气讯通'
	},
	// 待办事项
	schedule: {
		titleText: '待办事项',
	},
	// 审批事项
	auditList: {
		titleText: '审批事项',
		tabSwitch: [
			{
			  id: 1,
			  name: '要我审批'
			},
			{
			  id: 2,
			  name: '我发起的'
			},
			{
			  id: 3,
			  name: '抄送给我'
			},
			{
			  id: 4,
			  name: '审批历史'
			}
		]
	},
	// 审核详情
	auditInfo: auditInfo,
	// 成员
	addManager: {
		titleText: '添加成员',
		titleTextEdit: '编辑成员',
		titleTextInfo: '成员详情',
		form: {
			empNo: '成员编号',
			empNoPlace: '请输入成员编号',
			empNoMessage: '成员编号格式有误,只能输入数字或字母',
			name: '成员姓名',
			namePlace: '请输入成员姓名',
			sex: '成员性别',
			sexPlace: '请选择成员性别',
			phone: '手机号码',
			phonePlace: '请输入联系电话',
			phoneMessage: '联系电话格式有误',
			account: '登录账号',
			accountPlace: '请输入登录账号',
			customerAuth: '客户隔离',
			customerAuthPlace: '客户隔离',
			birthdayStr: '成员生日',
			birthdayStrPlace: '请选择成员生日',
			nativePlace: '籍贯',
			nativePlacePlace: '请选择籍贯',
			education: '学历',
			educationPlace: '请选择学历',
			state: '状态',
			statePlace: '请选择状态',
			price: '配额',
			pricePlace: '请输入配额',
			idNumber: '身份证号',
			idNumberPlace: '请输入身份证号',
			remarks: '备注',
			remarksPlace: '请输入备注',
			idPhoto: '证件照片',
			headPhoto: '头像',
			headPhotoPlace: '请上传头像',
			identitiesList: '岗位角色',
			addIdentities: '添加身份',
			addIdentitiesPlace: '请添加身份',
			orgLabel: '组织',
			customerAuthOptions: [
				{
					name: '隔离',
					value: 1
				},
				{
					name: '不隔离',
					value: 2
				}
			],
			sexOptions: [
				{
					name: '男',
					value: '男'
				},
				{
					name: '女',
					value: '女'
				},
				{
					name: '保密',
					value: '保密'
				}
			],
			educationOptions: [
				{
					name: '本科',
					value: '本科'
				},
				{
					name: '大专',
					value: '大专'
				},
				{
					name: '中专',
					value: '中专'
				},
				{
					name: '高中',
					value: '高中'
				},
				{
					name: '初中',
					value: '初中'
				}
			]
		}
	},
	// 岗位角色
	postRole: {
		titleText: '岗位角色',
		save: '确定'
	},
	// 成员列表
	managerList: {
		titleText: '成员信息',
		totalNum: '成员总数'
	},
	// 工单列表
	workList: {
		titleText: '工单列表',
		totalNum: '工单总数',
		customerName: '往来名称',
		channel: '渠道',
		formName: '工单类型',
		levelName: '工单等级',
		stateObj: {
			1: '待分派',
			2: '待接受',
			3: '已接受',
			4: '已拒绝',
			5: '已作废',
			6: '已超时',
			7: '已完成'
		}
	},
	// 添加工单
	addWork: {
		titleText: '添加工单',
		titleTextEdit: '编辑工单',
		titleTextInfo: '工单详情',
		titleTextAssign: '分派工单',
		form: {
			formKey: '工单类型',
			formKeyPlace: '请选择工单类型',
			customerId: '客户名称',
			customerIdPlace: '请选择客户名称',
			unitId: '风险单元',
			unitIdPlace: '请选择风险单元',
			actionTimeStr: '开始时间',
			actionTimeStrPlace: '请选择开始时间',
			cutoff: '时效(h)',
			cutoffPlace: '请输入时效',
			makeTimeStr: '预约时间',
			makeTimeStrPlace: '请选择预约时间',
			levelId: '工单等级',
			levelIdPlace: '请选择工单等级',
			toOrgId: '处理组织',
			toOrgIdPlace: '请选择处理组织',
			toManagerId: '处理员',
			toManagerIdPlace: '请选择处理员',
			remarks: '备注信息',
			remarksPlace: '请输入备注信息',
		}
	},
	// 选择客户
	chooseCustomer: {
		titleText: '选择客户',
		stateObj: {
	    1: '正常',
			2: '冻结'
		},
		classifyObj: {
			1: '居民',
			2: '非居民'
		}
	},
	// 选择组织
	chooseOrg: {
		titleText: '选择组织',
		orgModelObj: {
			1: '直营',
			2: '股份/合作',
			3: '独立/加盟'
		},
		orgTypeObj: {
			1: '公司',
			2: '气站',
			3: '门店'
		}
	},
	// 选择供应商
	chooseSupplier: {
		titleText: '选择供应商'
	},
	// 我的工单
	userWorkList: {
		titleText: '我的工单',
		totalNum: '工单总数',
		tabSwitch: [
			{
			  id: '',
			  name: '全部'
			},
			{
			  id: '2,3',
			  name: '待办'
			},
			{
			  id: '7',
			  name: '已完成'
			},
			{
			  id: '4,5,6',
			  name: '其他'
			}
		]
	},
	// 我的工单详情
	userWorkInfo: {
		titleText: '查看工单',
		acceptTitle: '接收提示',
		acceptContent: '确定要接收工单吗?',
		refuseTitle: '拒接提示',
		refuseContent: '请输入拒绝原因'
	},
	// 钢瓶档案
	cylinderArchivesList: {
		titleText: '钢瓶档案',
		totalNum: '档案总数',
		billNo: '自有编号',
		cylinderNo: '瓶身编号',
		codeKey: '钢瓶二维码编号',
		fillingStateStr: '充装状态',
		operationTime: '操作时间',
		stateObj: {
			1: '正常',
			2: '过期',
			3: '报废',
			4: '注销',
			5: '删除',
			6: '停用',
			7: '转出',
			8: '退回'
		}
	},
	// 选择商品
	chooseGoods: {
		titleText: '选择商品',
		brandName:'品牌',
		goodsClassifyName:'分类',
		unitsName:'单位',
		standardName:'规格',
		propertyNames:'属性参数',
		netContent:'重量',
		listPrice:'挂牌价',
		costPrice:'成本价',
		curStock:'库存',
		searchOptions:{
			goodsClassifyId:{
				label:'商品分类',
				placeholder:'选择商品分类'
			},
			brandId:{
				label:'品牌',
				placeholder:''
			},
			unitsId:{
				label:'单位',
				placeholder:''
			},
			startListPrice:{
				label:'挂牌价范围',
				placeholder:'请输入开始挂牌价'
			},
			endListPrice:{
				label:'',
				placeholder:'请输入结束挂牌价'
			},
			startCostPrice:{
				label:'成本价范围',
				placeholder:'请输入开始成本价'
			},
			endCostPrice:{
				label:'',
				placeholder:'请输入结束成本价'
			},
			createDateRange:{
				label:'日期范围',
				placeholder:['开始日期', '选择日期']
			}
		}
	},
	search:{
		searchTxt:'搜索',
		searchMore:'更多'
	},
	// 添加档案
	addCylinderArchives: {
		titleText: '添加档案',
		titleTextEdit: '编辑档案',
		titleTextInfo: '档案详情',
		codeErr: '二维码图片错误，请重新上传',
		form: {
			orgId: '归属组织',
			orgIdPlace: '请选择归属组织',
			ownerType: '产权分类',
			ownerTypePlace: '请选择产权分类',
			ownerId: '产权人',
			ownerIdPlace: '请选择产权人',
			billNo: '自有编号',
			billNoPlace: '请输入自有编号',
			cylinderNo: '瓶身编号',
			cylinderNoPlace: '请输入瓶身编号',
			codeKey: '钢瓶二维码',
			codeKeyplace: '请输入钢瓶二维码',
			codeKeyMessage: '钢瓶二维码格式有误,只能输入数字或字母',
			modelId: '钢瓶型号',
			modelIdPlace: '请选择钢瓶型号',
			fillingMedium: '充装介质',
			fillingMediumPlace: '请输入充装介质',
			initWeight: '钢瓶重量(kg)',
			initWeightPlace: '请输入原始重量',
			initWeightMessage: '原始重量有误,只能输入数字和小数点后五位',
			maxWeight: '最大充装量(kg)',
			maxWeightPlace: '请输入最大充装量',
			maxWeightMessage: '最大充装量有误,只能输入数字和小数点后五位',
			volume: '钢瓶容积(L)',
			volumePlace: '请输入钢瓶容积(L)',
			volumeMessage: '钢瓶容积(L)有误,只能输入数字和小数点后五位',
			thickness: '设计壁厚(mm)',
			thicknessPlace: '请输入设计壁厚',
			thicknessMessage: '设计壁厚有误,只能输入数字和小数点后五位',
			ratedPressure: '公称压力(MPa)',
			ratedPressurePlace: '请输入公称压力',
			ratedPressureMessage: '公称压力有误,只能输入数字和小数点后五位',
			waterPressure: '水试验压力(MPa)',
			waterPressurePlace: '请输入水试验压力(MPa)',
			waterPressuremessage: '水试验压力有误,只能输入数字和小数点后五位',
			supplierId: '制造单位',
			supplierIdPlace: '请选择制造单位',
			factoryDateStr: '出厂日期',
			factoryDateStrPlace: '请选择出厂日期',
			state: '钢瓶状态',
			statePlace: '请选择钢瓶状态',
			nextCheckDateStr: '下次检验日期',
			nextCheckDateStrPlace: '请选择下次检验日期',
			scrapDateStr: '报废日期',
			scrapDateStrPlace: '请选择报废日期',
			dealWithTimeStr: '报废处理时间',
			dealWithTimeStrPlace: '请选择报废处理时间',
			scrapNote: '报废处理情况',
			scrapNotePlace: '请输入报废处理情况',
			picture: '钢瓶图片',
			ownerTypeOptions: [
				{
					name: '组织',
					value: 1
				},
				{
					name: '客户',
					value: 2
				},
				{
					name: '检测厂',
					value: 4
				}
			],
			stateOptions: [
				{
					name: '正常',
					value: 1
				},
				{
					name: '过期',
					value: 2,
					disabled: true
				},
				{
					name: '报废',
					value: 3,
					disabled: true
				},
				{
					name: '注销',
					value: 4,
					disabled: true
				},
				{
					name: '删除',
					value: 5,
					disabled: true
				},
				{
					name: '停用',
					value: 6
				},
				{
					name: '转出',
					value: 7,
					disabled: true
				},
				{
					name: '退回',
					value: 8,
					disabled: true
				}
			]
		}
	}
}
