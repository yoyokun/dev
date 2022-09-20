module.exports = {
	signCanvas: {
		isEmptyMsg: '请签名'
	},
	securityCheckList: {
		titleText: '安检记录',
		totalNum: '安检总数',
		customerName: '客户名称',
		result: '安检结果',
		managerName: '安检员',
		endTime: '截止时间',
		search: {
			levelId: '风险等级',
			classify: '客户分类',
			result: '安检结果',
			state: '安检状态',
			rectifyState: '整改状态',
			classifyOptions: [{
					name: '居民',
					value: 1
				},
				{
					name: '非居民',
					value: 2
				}
			],
			resultOptions: [{
					name: '合格',
					value: 1
				},
				{
					name: '不合格',
					value: 2
				}
			],
			stateOptions: [{
					name: '未安检',
					value: 1
				},
				{
					name: '已安检',
					value: 2
				},
				{
					name: '无法安检',
					value: 3
				},
				{
					name: '已超时',
					value: 4
				},
				{
					name: '客户拒检',
					value: 5
				}
			],
			rectifyStateOptions: [{
					name: '未整改',
					value: 1
				},
				{
					name: '已整改',
					value: 2
				},
				{
					name: '无法整改',
					value: 3
				},
				{
					name: '已作废',
					value: 4
				},
				{
					name: '已超时',
					value: 5
				},
				{
					name: '拒绝整改',
					value: 6
				}
			]
		},
		resultObj: {
			1: '合格',
			2: '不合格'
		},
		stateObj: {
			1: '未安检',
			2: '已安检',
			3: '无法安检',
			4: '已超时',
			5: '客户拒检'
		}
	},
	rectificationList: {
		titleText: '整改记录',
		totalNum: '整改总数',
		customerName: '客户名称',
		managerName: '整改员',
		rectifyTime: '整改时间',
		search: {
			classify: '客户分类',
			state: '整改状态',
			classifyOptions: [{
					name: '居民',
					value: 1
				},
				{
					name: '非居民',
					value: 2
				}
			],
			stateOptions: [{
					name: '未整改',
					value: 1
				},
				{
					name: '已整改',
					value: 2
				},
				{
					name: '无法整改',
					value: 3
				},
				{
					name: '已作废',
					value: 4
				},
				{
					name: '已超时',
					value: 5
				},
				{
					name: '拒绝整改',
					value: 6
				}
			]
		},
		stateObj: {
			1: '未整改',
			2: '已整改',
			3: '无法整改',
			4: '已作废',
			5: '已超时'
		}
	},
	patrolCheckList: {
		titleText: '巡检记录',
		totalNum: '巡检总数',
		unitName: '往来名称',
		levelName: '巡检结果',
		managerName: '巡检员',
		checkTime: '巡检时间',
		search: {
			unitId: '风险单元',
			state: '巡检状态',
			stateOptions: [{
					name: '未巡检',
					value: 1
				},
				{
					name: '已巡检',
					value: 2
				},
				{
					name: '无法巡检',
					value: 3
				},
				{
					name: '已超时',
					value: 4
				}
			]
		},
		stateObj: {
			1: '未巡检',
			2: '已巡检',
			3: '无法巡检',
			4: '已超时'
		}
	},
	// 添加巡检
	addPatrolCheck: {
		titleText: '添加巡检',
		titleTextInfo: '巡检详情',
		titleTextEdit: '编辑巡检',
		form: {
			orgId: {
				label: '巡检组织',
				placeholder: '请选择组织'
			},
			managerId: {
				label: '巡检员',
				placeholder: '请选择巡检员'
			},
			unitId: {
				label: '风险单元',
				placeholder: '请选择风险单元'
			},
			assetFacilityVos: {
				label: '巡检设备',
			},
			levelId: {
				label: '巡检结果',
				placeholder: '请选择巡检结果'
			},
			remarks: {
				label: '备注',
				placeholder: '请输入备注'
			},
			picture: {
				label: '拍照'
			},
			customerSign: {
				label: '客户签名'
			},
			managerSign: {
				label: '巡检员签名'
			}
		},
		billNo: '编号',
		unitOrgName: '单元组织',
		unitName: '风险单元',
		unitTypeName: '单元类型',
		unitAddress: '位置',
		orgName: '巡检组织',
		managerName: '巡检员',
		state: '状态'
	},
	// 添加安检
	addSecurityCheck: {
		titleText: '添加安检',
		titleTextInfo: '安检详情',
		titleTextEdit: '编辑安检',
		form: {
			customerName: {
				label: '客户名称',
				placeholder: '请选择客户'
			},
			address: {
				label: '安检对象',
				placeholder: '请选择安检对象'
			},
			orgId: {
				label: '安检组织',
				placeholder: '请选择安检组织'
			},
			managerId: {
				label: '安检员',
				placeholder: '请选择安检员'
			},
			templateId: {
				label: '安检模板',
				placeholder: '请选择安检模板'
			},
			state: {
				label: '安检情况',
				placeholder: '请选择安检情况',
				options: [{
						name: '正常安检',
						value: 2
					},
					{
						name: '无法安检',
						value: 3
					},
					{
						name: '客户拒检',
						value: 5
					}
				]
			},
			refuseNote: {
				label: '无法安检',
				placeholder: '请输入无法安检原因'
			},
			refuseNote1: {
				label: '客户拒检',
				placeholder: '请输入客户拒检原因'
			},
			remarks: {
				label: '备注',
				placeholder: '请输入备注'
			},
			cylinderNum: {
				label: '钢瓶',
				placeholder: '请输入钢瓶数量'
			},
			picture: {
				label: '拍照'
			},
			customerSign: {
				label: '客户签名'
			},
			managerSign: {
				label: '安检员签名'
			}
		}
	},
	// 安检项目
	securityCheck: {
		datetimePlace: '选择日期时间',
		pictureName: '安检照片',
		rectifyPicture: '整改照片'
	},
	// 接收钢瓶列表
	cylinderSecurityList: {
		titleText: '接收钢瓶',
		totolTxt: '总数',
		vehicleNum: '车次',
		cylinderNum: '钢瓶数量',
		receiveDate: '接收日期',
		creator: '操作人',
		createTime: '更新时间',
		stateTxt: {
			1: '正常',
			2: '作废'
		},
		searchOptions: {
			createDateRange: {
				label: '接收日期',
				placeholder: ['开始日期', '结束日期']
			},
		},
	},
	// 安检重置
	securityReset:{
		titleText: '安检重置',
		tips:{
			noSecurity:'该钢瓶码未安检'
		}
	},
	// 添加接收钢瓶
	addCylinderSecurity: {
		titleText: '添加接收钢瓶',
		titleTextEdit: '接收钢瓶详情',
		sysSpecification: '钢瓶型号',
		numPlaceholder: '输入数量',
		baseTle: '基本信息',
		receiveDate: '接收日期',
		vehicleNum: '车次',
		cylinderNum: '钢瓶数量',
		state: '状态',
		creator: '操作人',
		createTime: '更新时间',
		invalidNote: '作废原因',
		stateTxt: {
			1: '正常',
			2: '作废'
		},
		form:{
			receiveDateStr:{
				label:'接收日期',
				placeholder:'请选择接收日期'
			},
			cylinderNum:{
				label:'钢瓶数量',
				placeholder:'请输入钢瓶数量'
			},
		},
	},
	// 钢瓶送达
	cylinderArrive: {
		titleText: '钢瓶送达',
		form:{
			customerName:{
				label:'客户',
				placeholder:'请选择客户'
			},
			type:{
				label:'送达方式'
			},
			nums:{
				label:'钢瓶数量',
				placeholder:'请输入钢瓶数量'
			},
			codeKey:{
				label: '钢瓶码',
				placeholder: '请输入钢瓶码',
			},
		},
		btn:{
			conf:'确定',
			continue:'继续送达',
			cancel:'去安检',
		},
		typeTxt:{
			1:'扫码',
			2:'填数',
			3:'无',
		},
		modalTips:{
			tle:['安检提示','送达提示','添加提示'],
			tips:(index,txt='') => ['客户未安检，是否要去安检?',`客户安检结果为${txt},是否继续送达？`,`没有 ${txt}，请问要添加该二维码吗？`][index]
		},
	},
}
