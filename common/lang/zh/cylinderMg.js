module.exports = {
	// 流转信息
	circulationInfoList: {
		titleText: '钢瓶流转信息',
		modelName: '钢瓶型号',
		codeKey: '钢瓶二维码',
		flowNodeStr: '流转环节',
		operator: '操作员',
		operationTime: '更新时间',
		searchOptions: {
			flowState: {
				label: '流转状态',
				options: [{
						name: '正常',
						value: 1
					},
					{
						name: '流失',
						value: 2
					}
				]
			},
			flowNode: {
				label: '流转环节',
				options: [{
						name: '存放',
						value: 1
					},
					{
						name: '充装',
						value: 2
					},
					{
						name: '运输',
						value: 3
					},
					{
						name: '配送',
						value: 4
					},
					{
						name: '使用',
						value: 5
					},
					{
						name: '回收',
						value: 6
					},
					{
						name: '检测',
						value: 7
					}
				]
			},
			flowState: {
				label: '流转状态',
				options: [{
						name: '正常',
						value: 1
					},
					{
						name: '流失',
						value: 2
					}
				]
			},
			fillingState: {
				label: '气瓶状态',
				options: [{
						name: '轻瓶',
						value: 1
					},
					{
						name: '重瓶',
						value: 2
					}
				]
			},
			holderType: {
				label: '持有者类型',
				options: [{
						name: '组织',
						value: 1
					},
					{
						name: '客户',
						value: 2
					},
					{
						name: '车辆',
						value: 3
					},
					{
						name: '供应商/检测厂',
						value: 4
					}
				]
			},
			state: {
				label: '钢瓶状态',
				options: [{
						name: '正常',
						value: 1
					},
					{
						name: '过期',
						value: 2
					},
					{
						name: '报废',
						value: 3
					},
					{
						name: '注销',
						value: 4
					},
					{
						name: '删除',
						value: 5
					},
					{
						name: '停用',
						value: 6
					},
					{
						name: '转出',
						value: 7
					},
					{
						name: '退回',
						value: 8
					}
				]
			},
			modelId: {
				label: '钢瓶型号',
			},
			createDateRange: {
				label: '更新日期',
				placeholder: ['开始日期', '选择日期'],
			},
		},
	},
	// 流转记录
	circulationList: {
		titleText: '流转记录',
		holderName: '持有者',
		flowNodeStr: '流转环节',
		operator: '操作员',
		operationTime: '更新时间',
		searchOptions: {
			flowState: {
				label: '流转状态',
				options: [{
						name: '正常',
						value: 1
					},
					{
						name: '流失',
						value: 2
					}
				]
			},
			flowNode: {
				label: '流转环节',
				options: [{
						name: '存放',
						value: 1
					},
					{
						name: '充装',
						value: 2
					},
					{
						name: '运输',
						value: 3
					},
					{
						name: '配送',
						value: 4
					},
					{
						name: '使用',
						value: 5
					},
					{
						name: '回收',
						value: 6
					},
					{
						name: '检测',
						value: 7
					}
				]
			},
			flowState: {
				label: '流转状态',
				options: [{
						name: '正常',
						value: 1
					},
					{
						name: '流失',
						value: 2
					}
				]
			},
			fillingState: {
				label: '气瓶状态',
				options: [{
						name: '轻瓶',
						value: 1
					},
					{
						name: '重瓶',
						value: 2
					}
				]
			},
			holderType: {
				label: '持有者类型',
				options: [{
						name: '组织',
						value: 1
					},
					{
						name: '客户',
						value: 2
					},
					{
						name: '车辆',
						value: 3
					},
					{
						name: '供应商/检测厂',
						value: 4
					}
				]
			},
			state: {
				label: '钢瓶状态',
				options: [{
						name: '正常',
						value: 1
					},
					{
						name: '过期',
						value: 2
					},
					{
						name: '报废',
						value: 3
					},
					{
						name: '注销',
						value: 4
					},
					{
						name: '删除',
						value: 5
					},
					{
						name: '停用',
						value: 6
					},
					{
						name: '转出',
						value: 7
					},
					{
						name: '退回',
						value: 8
					}
				]
			},
			modelId: {
				label: '钢瓶型号',
			},
			createDateRange: {
				label: '更新日期',
				placeholder: ['开始日期', '选择日期'],
			},
		},
	},
	// 添加流转记录
	addCirculation: {
		
		form: {
			holderId: {
				label: '充装组织',
				placeholder: '请选择充装组织'
			},
			holderIdRe:{
				label: '接收组织',
				placeholder: '请选择接收组织'
			},
			holderIdBack:{
				label: '回瓶组织',
				placeholder: '请选择回瓶组织'
			},
			carNo: {
				label: '车牌号码',
				placeholder: '请输入车牌号码'
			},
			customerName: {
				label: '客户',
				placeholder: '请选择客户'
			},
			supplierName:{
				label: '供应商',
				placeholder: '请选择供应商'
			},
			userName:{
				label: '提货人',
				placeholder: '请选择提货人'
			},
			codeKey: {
				label: '钢瓶码',
				placeholder: '请输入钢瓶二维码'
			},
		},
		tableColumn: {
			cylinderNo: '瓶身编号',
			codeKey: '钢瓶二维码',
			modelName: '钢瓶型号',
			holderName: '产权人',
		},
		tips: {
			errImg: '二维码图片错误，请重新上传',
			errCode: '该二维码无效'
		},
		loadTxt:{
			finding:'查询中',
			saving:'保存中'
		},
		btn:{
			conf:'确定'
		},
	},
	// 添加充装流转记录
	addCirculationFill: {
		titleText: '充装流转',
	},
	// 添加车辆配送流转记录
	addCirculationDelivery: {
		titleText: '车辆配送流转',
		license: '车牌号码',
		certificateNo: '行驶证编号',
		orgName: '车辆归属',
		principal: '车辆负责人',
		linkphone: '联系电话',
		vehicleModelName: '车辆类型',
	},
	// 添加组织接收流转
	addCirculationReceive: {
		titleText: '组织接收流转',
	},
	// 客户回瓶流转
	addCirculationBack: {
		titleText: '客户回瓶流转',
	},
	// 确认送达流转
	addCirculationService: {
		titleText: '确认送达流转',
		customerNo: '客户编号',
		customerName: '客户名称',
		phone: '联系电话',
		orgName: '归属组织',
	},
	// 钢瓶检验流转
	addCirculationTest:{
		titleText: '钢瓶检验流转',
	},
	// 送气工提货流转
	addCirculationTake:{
		titleText: '送气工提货流转',
	},
}
