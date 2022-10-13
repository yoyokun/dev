module.exports = {
	common: {
		totalTxt: '总数',
		orderStateTxt: ['待支付', '已结算', '已完成', '已关闭', '已作废'],
		checkStateTxt: ['已审核', '待提交', '待审核', '已作废', '未通过', '无审核'],
		allotStateTxt: ['待提交', '待接收', '正常接收', '异常接收', '已作废'],
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
		countInfoTle: '结算信息',
		totalFee: '合计收费项(元)',
		totalOrderMoney: '合计订单金额(元)',
		totalMoney: '合计金额(元)',
		dicountMoney: '优惠金额(元)',
		payMoney: '应收金额(元)',
		countPay: '应收合计(元)',
		remarks: {
			label: '备注',
			placeholder: '请输入备注',
		},
		btn: {
			save: '保存',
			pay: '结算',
			add: '添加',
			conf: '确认送达',
			submit: '保存提交',
		},
		message: ['该客户无地址，请添加！', '配送员不能为空', '支付金额跟应收金额不一致', '无打印内容,请先设置打印模板'],
		loading: '加载中...',
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
	// 优惠券
	discount: {
		couponName: '优惠券',
		couponNo: '优惠券号',
		couponNoPlaceholder: '请输入优惠券号',
		chooseBtn: '选择',
		discountName: '订单折扣',
		disCountMoney: '折扣金额',
		disCountRate: '折扣率%',
		discountDeal: '成交金额',
		pointName: '积分抵扣',
		integralUse: '客户积分',
		maxIntegral: '可用积分',
		integralValue: '抵扣积分',
		integralMoney: '抵扣金额',
		tips: '请选择客户',
	},
	// 运输信息
	delivery: {
		tle: '运输信息',
		pickMode: '提货方式',
		defDeliveryName: '配送点',
		defDeliveryNamePlaceholder: '请选择配送点',
		transportName: ['配送员', '运输员'],
		transportNamePlaceholder: ['请选择配送员', '请输入运输员'],
		chooseLicenseNum: '车牌号',
		chooseLicenseNumPlaceholder: '请输入车牌号',
		bookingTime: '预约时间',
		address: '地址',
		addressPlaceholder: '请选择地址',
		floor: '楼',
		feeName: ['配送费', '运费'],
		feePlaceholder: '请输入费用',
		total: '共',
	},
	// 快速下单
	placeOrder: {
		titleText: '快速下单',
	},
	// 接收列表
	allotReciveList: {
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
			outOrgId: {
				label: '调出组织'
			},
			createDateRange: {
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
			outOrgId: {
				label: '调出组织'
			},
			inOrgId: {
				label: '调入组织'
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
			createDateRange: {
				label: '更新日期',
				placeholder: ['开始日期', '结束日期']
			},
		},
	},
	// 业务开单
	addBizOrder: {
		titleText: '业务开单',
		titleTextEdit: '编辑业务开单',
		form:{
			orgId:{
				label:'业务组织',
				placeholder:'请选择业务组织'
			},
			billTimeStr:{
				label:'开单时间',
				placeholder:'选择开单时间'
			},
			inOutReasonId:{
				label:'出入库原因',
				placeholder:'选择出入库原因'
			},
			businessTypeId:{
				label:'业务类型',
				placeholder:'选择业务类型'
			},
			formType:{
				label:'往来类型',
				placeholder:'请选择往来类型',
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
				],
			},
			customerName:{
				label:'来源名称',
				placeholder:'请选择来源名称',
			},
			linkBillNo:{
				label:'关联单号',
				placeholder:'请选择关联单号'
			}
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
	// 添加销售单
	addSalesOrder: {
		titleText: '销售开单',
	},
	// 销售单详情
	salesOrderInfo: {
		btn: {
			receive: '接单',
			sub: '提交审批',
			void: '作废',
			del: '删除',
			up: '挂起',
			down: '解挂',
			count: '结算',
			delivery: '配送',
			conf: '确认送达',
		},
		titleText: '订单详情',
		tab: [{
			name: '基本信息'
		}, {
			name: '订单信息'
		}, {
			name: '回瓶信息'
		}, {
			name: '溯源信息'
		}],
		basicTle: '基础信息',
		customerTle: '客户信息',
		deliverTle: '运输信息',
		discountTle: '订单折扣',
		orderTle: '订单信息',
		backTle: '回瓶信息',
		sourceTle: '溯源信息',
		sendTle: '送达钢瓶',
		recycleTle: '回收钢瓶',
		billNo: '订单编号',
		orderSource: '订单来源',
		goodsTotalMoney: '订单金额',
		payItemsMoney: '收费项金额',
		couponTotalMoney: '优惠金额',
		totalMoney: '应收金额',
		orderState: '订单状态',
		deliveryState: '物流状态',
		payState: '支付状态',
		payType: '支付类型',
		payTypeName: '支付方式',
		orderTime: '销售时间',
		createTime: '制单时间',
		finishTime: '完成时间',
		operationTime: '操作时间',
		remarks: '备注信息',
		customerNo: '客户编号',
		customerName: '客户名称',
		customerPhone: '客户电话',
		customerAccount: '会员编号',
		customerClassify: '客户分类',
		regionName: '客户区域',
		customerTypeName: '客户类型',
		propertyNames: '客户标签',
		pickMode: '提货方式',
		bookingTime: '预约时间',
		licenseNo: '车牌号',
		linkman: '收货人',
		phone: '收货电话',
		addressSplicing: '收货地址',
		deliverOrgName: '配送组织',
		deliverMan: '配送员/运输员',
		payItemsName: '费用详细',
		payItemsMoney: '合计运费',
		couponNo: '优惠券号',
		couponMoney: '优惠券金额',
		integralValue: '抵扣积分',
		integralMoney: '抵扣积分金额',
		disCountMoney: '折扣金额',
		disCountRate: '折扣率（%）',
		couponTotalMoney: '合计优惠',
		totalMoney: '成交金额（元）',
		orderNums: '子单编号',
		costMoney: '收费项',
		totalUnit: '共',
		orderStateTxt: {
			1: '待支付',
			2: '已结算',
			3: '已完成',
			4: '已关闭',
			5: '已作废 '
		},
		customerClassifyTxt: {
			1: '居民',
			2: '非居民'
		},
		payStateTxt: {
			1: '待支付',
			2: '已支付',
			3: '已取消'
		},
		pickModeTxt: {
			1: '自提',
			2: '车辆自提',
			3: '车辆配送',
			4: '送气员配送'
		},
		payTypeTxt: {
			1: '线上支付',
			2: '线下支付',
			3: '线下支付 '
		},
		deliveryStateTxt: {
			1: '待接单',
			2: '待发货',
			3: '配送中',
			4: '已送达'
		},
		orderSourceTxt: {
			store: '门店',
			internet: '网上',
			phone: '电话至门店',
			callCenter: '客服中心'
		},
		tableColumnBack: {
			goodsName: '商品名称',
			propertyNames: '属性参数',
			standardName: '规格',
			unitsName: '单位',
			totalNum: '出库数',
			backNum: '回瓶数',
			lendNum: '借瓶数',
			returnNum: '还瓶数',
			count: '合计',
		},
		infoData: {
			countFee: '合计收费项(元)',
			countOrder: '合计订单金额(元)',
			freeMoney: '优惠金额(元)',
			money: '应收金额(元)',
		},
		form: {
			deliverOrgId: {
				label: '配送点',
				placeholder: '请选择配送点',
			},
			deliverManId: {
				label: '配送员',
				placeholder: '请选择配送员',
			},
			bookingTimeStr: {
				label: '预约时间',
				placeholder: '请选择预约时间',
			},
			licenseNo: {
				label: '车牌号',
				placeholder: '请输入车牌号',
			},
			deliverMan: {
				label: '运输员',
				placeholder: '请输入运输员',
			},
		},
		popup: {
			tle: '',
			address: ''
		},
	},
	// 确认送达
	confSend: {
		titleText: '确认送达',
		backTle: '回单',
		sendTle: '送达钢瓶',
		collectTle: '回收钢瓶',
		sourceTle: '钢瓶溯源',
		outGoods: '出库商品',
		inGoods: '回瓶商品',
		outNum: '出库数',
		backNum: '回瓶数',
		lendNum: '借瓶数',
		returnNum: '还瓶数',
		codeKey: {
			label: '钢瓶码',
			placeholder: '请输入钢瓶二维码'
		},
		cylinderNo: '瓶身编号',
		codeKeyNo: '钢瓶二维码',
		modelName: '钢瓶型号',
		fillingStateStr: '充装状态',
		holderName: '持有人',
		cylinderFlow: '流转环节',
		stateStr: '流转状态',
		tips: '该二维码已存在',
		nodeTxt: {
			1: '存放',
			2: '充装',
			3: '运输',
			4: '配送',
			5: '使用',
			6: '回收',
			7: '检测'
		},
		table: {
			act: '操作',
			send: '确认送达',
			model: '钢瓶型号',
			back: '客户回瓶',
			placeholder: '钢瓶二维码',
		},
	},
	// 调拨接收
	receiveAllotOrder: {
		titleText: '调拨接收',
		codeOrder: '请输入单号',
		codeKey: '请输入钢瓶二维码',
		baseTle: '基础信息',
		deliveryTle: '运输信息',
		sourceTle: '钢瓶溯源',
		state:'单据状态',
		orgAddress:'组织地址',
		inOrgName:'调入组织',
		billTime:'开单时间',
		totalWeight:'重量(KG)',
		licenseNo:'车牌号',
		deliverMan:'配送员/运输员',
		address:'收货地址',
		btn: {
			conf: '确定',
			normal: '正常接收',
			error: '异常接收',
		},
		billNo: '调拨单号',
		outOrgName: '调出组织',
		pickMode: '运输方式',
		bookingTime: '预约时间',
		remarks: '备注',
		inReason: {
			label: '出入库原因',
			placeholder: '请选择出入库原因',
		},
		goodsTle: '商品信息',
		sku: '规格',
		amount: '数量',
		receiptNum: '接收数量',
		diff: '差异',
		backTotalMoney: '回款金额',
		unitsName: '单位',
		payType: '支付方式',
		pickModeTxt: {
			1: '自提',
			3: '车辆配送'
		},
		tableColumn: {
			remove: '移除',
			cylinderNo: '瓶身编号',
			codeKey: '二维码',
			modelName: '型号',
		},
		stateTxt: {
			1: '待提交',
			2: '待接收',
			3: '正常接收',
			4: '异常接收',
			5: '作废 '
		}
	},
	// 调拨单详情
	allotOrderInfo: {
		titleText: '调拨单详情',
		tabs: [{
			name: '基本信息',
		}, {
			name: '溯源信息',
		}],
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
		baseTle: '基础信息',
		payTle: '往来信息',
		goodsTle: '商品信息',
		deliveryTle: '物流信息',
		sourceTle: '溯源信息',
		billNo: '单据编号',
		state: '单据状态',
		outOrgName: '调出组织',
		outOrgAddress: '组织地址',
		outName: '调出原因',
		inOrgName: '调入组织',
		inName: '接收原因',
		inOrgAddress: '组织地址',
		creator: '操作人',
		operationTime: '更新时间',
		billTime: '开单时间',
		totalNum: '数量',
		totalWeight: '重量(KG)',
		remarks: '备注',
		payTypeName: '支付类型',
		backTotalMoney: '调拨金额（元）',
		pickMode: '运输方式',
		bookingTime: '预约时间',
		licenseNo: '车牌号',
		deliverMan: '配送员/运输员',
		address: '收货地址',
		in: '入库',
		out: '出库',
	},
}
