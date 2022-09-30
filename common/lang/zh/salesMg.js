module.exports = {
	common: {
		totalTxt: '总数',
		orderStateTxt: ['待支付', '已结算', '已完成', '已关闭', '已作废'],
		checkStateTxt: ['已审核', '待提交', '待审核', '已作废', '未通过', '无审核'],
		allotStateTxt: ['待提交', '待接收', '正常接收', '异常接收', '已作废']
	},
	// 支付方式
	settlement: {
		payment: '支付情况',
		onlinePayment: '线上支付',
		nonPayment: '未支付',
		residue: '剩余金额',
		paymentMethod: '支付方式',
		pricePlace: '请输入金额'
	},
	// 快速下单
	placeOrder: {
		titleText: '快速下单',
		form: {
			customerName: {
				label: '客户',
				placeholder: '请选择客户'
			},
			linkMan: {
				label: '收货人',
				placeholder: '请输入收货人'
			},
			phone: {
				label: '联系电话',
				placeholder: '请输入联系电话'
			},
			address: {
				label: '地址',
				placeholder: '请选择地址'
			},
			orderTemp: {
				label: '子单模板',
				placeholder: '请选择子单模板'
			},
		},
	},
	// 接收列表
	allotReciveList:{
		titleText: '接收列表',
		outOrgName: '调出组织',
		inOrgName: '调入组织',
		billTime: '开单时间',
		pickMode: '提货方式',
		stateTxt: {
			1: '待提交',
			2: '待接收',
			3: '正常接收',
			4: '异常接收',
			5: '作废'
		},
		pickModeTxt: {
			1: '自提',
			3: '车辆配送'
		},
		searchOptions: {
			stateStr: {
				label: '订单状态',
				options: [{
						name: '待提交',
						value: '1'
					},
					{
						name: '待接收',
						value: '2'
					},
					{
						name: '正常接收',
						value: '3'
					},
					{
						name: '异常接收',
						value: '4'
					},
					{
						name: '作废',
						value: '5'
					}
				]
			},
			outOrgId:{
				label: '调出组织'
			},
			createDateRange:{
				label: '更新日期',
				placeholder: ['开始日期', '结束日期']
			},
		},
	},
	// 调拨单列表
	allotOrderList: {
		titleText: '调拨单',
		outOrgName: '调出组织',
		inOrgName: '调入组织',
		billTime: '开单时间',
		pickMode: '提货方式',
		stateTxt: {
			1: '待提交',
			2: '待接收',
			3: '正常接收',
			4: '异常接收',
			5: '作废'
		},
		pickModeTxt: {
			1: '自提',
			3: '车辆配送'
		},
		searchOptions: {
			stateStr: {
				label: '订单状态',
				options: [{
						name: '待提交',
						value: '1'
					},
					{
						name: '待接收',
						value: '2'
					},
					{
						name: '正常接收',
						value: '3'
					},
					{
						name: '异常接收',
						value: '4'
					},
					{
						name: '作废',
						value: '5'
					}
				]
			},
			outOrgId:{
				label: '调出组织'
			},
			inOrgId:{
				label: '调入组织'
			},
			hangUpType:{
				label: '是否挂起',
				options: [{
						name: '是',
						value: '1'
					},
					{
						name: '否',
						value: '0'
					}
				]
			},
			createDateRange:{
				label: '更新日期',
				placeholder: ['开始日期', '结束日期']
			},
		},
	},
	// 业务单列表
	bizOrderList: {
		titleText: '业务单',
		customerNo: '往来对象',
		totalSaleMoney: '订单金额',
		billTime: '开单时间',
		searchOptions: {
			orgIdStr: {
				label: '业务组织',
			},
			formType: {
				label: '往来类型',
				options: [{
						name: '客户',
						value: '1'
					},
					{
						name: '供应商',
						value: '2'
					},
					{
						name: '组织',
						value: '3'
					}
				]
			},
			customerName: {
				label: '往来名称',
				placeholder: '请输入来源名称'
			},
			checkStateStr: {
				label: '单据状态',
				options: [{
						name: '待提交',
						value: '1'
					},
					{
						name: '待审核',
						value: '2'
					},
					{
						name: '已审核',
						value: '3'
					},
					{
						name: '未通过',
						value: '4'
					},
					{
						name: '已作废',
						value: '5'
					}
				]
			},
			startMoney: {
				label: '金额',
				placeholder: '请输入金额'
			},
			endMoney: {
				placeholder: '请输入金额'
			},
			createDateRange: {
				label: '开单时间',
				placeholder: ['开始时间', '结束时间']
			},
		},
	},
	// 销售单列表
	salesOrderList: {
		titleText: '销售订单',
		tabs: [{
			name: '全部',
		}, {
			name: '待支付',
		}, {
			name: '已结算',
		}, {
			name: '已完成',
		}, {
			name: '其他',
		}],
		customerNo: '客户',
		totalSaleMoney: '订单金额',
		orderTime: '销售时间',
		pickMode: '提货方式',
		payStateTxt: {
			1: '未支付',
			2: '已支付',
			3: '部分支付',
		},
		orderStateTxt: {
			1: '待支付',
			2: '已结算',
			3: '已完成',
			4: '已关闭',
			5: '已作废'
		},
		pickModeTxt: {
			1: '自提',
			2: '车辆自提',
			3: '车辆配送',
			4: '送气员配送'
		},
		deliveryStateTxt: {
			1: '待接单',
			2: '待发货',
			3: '配送中',
			4: '已送达'
		},
		searchOptions: {
			saleDateRange: {
				label: '销售时间',
				placeholder: ['开始时间', '结束时间']
			},
			orderStateStr: {
				label: '订单状态',
				options: [{
						name: '默认',
						value: '1,2,3'
					},
					{
						name: '待支付',
						value: '1'
					},
					{
						name: '已结算',
						value: '2'
					},
					{
						name: '已完成',
						value: '3'
					},
					{
						name: '已关闭',
						value: '4'
					},
					{
						name: '已作废',
						value: '5'
					}
				]
			},
			customerNo: {
				label: '客户编号',
				placeholder: '请输入客户编号'
			},
			customerName: {
				label: '客户名称',
				placeholder: '请输入客户名称'
			},
			licenseNo: {
				label: '车牌号码',
				placeholder: '请输入车牌号码'
			},
			startMoney: {
				label: '结算金额',
				placeholder: '请输入结算金额'
			},
			endMoney: {
				placeholder: '请输入结算金额'
			},
			customerTypeId: {
				label: '客户类型'
			},
			regionId: {
				label: '客户区域'
			},
			propertyId: {
				label: '客户标签'
			},
			createDateRange: {
				label: '日结日期',
				placeholder: ['开始日期', '结束日期']
			},
			createDate1: {
				label: '完成时间',
				placeholder: ['开始日期', '结束日期']
			},
			deliveryState: {
				label: '物流状态',
				options: [{
						name: '待接单',
						value: 1
					},
					{
						name: '待发货',
						value: 2
					},
					{
						name: '配送中',
						value: 3
					},
					{
						name: '已送达',
						value: 4
					}
				]
			},
			payType: {
				label: '支付类型',
				options: [{
						name: '线上支付',
						value: 1
					},
					{
						name: '线下支付',
						value: 2
					},
					{
						name: '货到付款',
						value: 3
					}
				]
			},
			collectionTypeId: {
				label: '支付方式',
			},
			pickMode: {
				label: '提货方式',
				options: [{
						name: '自提',
						value: 1
					},
					{
						name: '车辆自提',
						value: 2
					},
					{
						name: '车辆配送',
						value: 3
					},
					{
						name: '送气员配送',
						value: 4
					}
				]
			},
			orderSource: {
				label: '订单来源',
				options: [{
						name: '门店',
						value: 'store'
					},
					{
						name: '网上',
						value: 'internet'
					},
					{
						name: '电话至门店',
						value: 'phone'
					},
					{
						name: '客服中心',
						value: 'callCenter'
					}
				]
			},
			hangUpType: {
				label: '是否挂起',
				options: [{
						name: '是',
						value: '1'
					},
					{
						name: '否',
						value: '0'
					}
				]
			},
			orgIdStr: {
				label: '销售组织',
			}
		},
	},
}
