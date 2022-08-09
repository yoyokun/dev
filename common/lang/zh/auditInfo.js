module.exports = {
	titleText: '审核详情',
	trendsTle:'审核动态',
	dealTimeTxt:['提交时间：','审批时间：'],
	statusTxt:{
		1:'审批通过',
		2:'审批不通过',
		3:'提交审批'
	},
	auditOptTxt:'审批意见：',
	copyNoteTxt:'通知抄送：',
	// 业务单
	businessInfo: {
		tabs:{
			basicTle:'基本信息',
			sourceTle:'溯源信息'
		},
		basic:{
			basicTle:'基本信息',
			goodsTle:'商品信息',
			deliverTle:'运输信息',
			orderTle:'订单折扣',
			// ======================
			orgName:'业务组织',
			billNo:'单号',
			formType:'往来类型',
			formTypeTxt:{
				1: '客户',
				2: '供应商',
				3: '组织 '
			},
			customerNo:'往来编号',
			customerName:'往来名称',
			checkState:'订单状态',
			checkStateTxt:{
				1: '待提交',
				2: '待审核',
				3: '已审核',
				4: '未通过',
				5: '已作废'
			},
			goodsTotalMoney:'订单金额',
			payItemsMoney:'收费项金额',
			couponTotalMoney:'优惠金额',
			totalMoney:['应收金额','金额（元）','成交金额（元）'],
			creator:'开单人',
			billTime:'开单时间',
			totalWeight:'重量',
			totalNum:'数量',
			linkBillNo:'关联单号',
			linkType:'单据类型',
			linkTypeTxt:{
				order: '订单',
				transfer: '调拨单',
				purchase: '采购 '
			},
			printCount:'打印',
			remarks:'备注',
			operator:'操作人',
			operationTime:'操作时间',
			pickMode:'运输方式',
			pickModeTxt:{
				1: '自提',
				2: '车辆自提',
				3: '车辆配送'
			},
			bookingTime:'预约时间',
			licenseNo:'车牌号',
			deliverMan:'配送员/运输员',
			addressSplicing:'收货地址',
			payItemsMoney:'物流费用',
			payItemsName:'费用详细',
			couponNo:'优惠券号',
			couponMoney:'优惠券金额',
			integralValue:'抵扣积分',
			integralMoney:'抵扣金额',
			disCountMoney:'折扣金额',
			disCountRate:'折扣率（%）',
			couponTotalMoney:'合计优惠',
		}
	},
	// 资金期初
	accountPeriodInfo:{
		basicTle:'基本信息',
		billNo:'流水号',
		outAccountId:'资金账号',
		balanceMoney:'发生金额',
		lastMoney:'原始金额',
		effectTime:'发生时间',
		agentName:'经手人',
		creator:'操作人',
		createTime:'操作时间',
		remarks:'备注信息',
	},
	// 资金支取
	capitalDrawInfo:{
		basicTle:'基本信息',
		billNo:'流水号',
		outAccountName:['资金账号','转出账号'],
		inAccountName:'转入账号',
		moneyType:'收支类型',
		moneyTypeTxt:{
			1: '收入',
			2: '支出',
			3: '转账支出',
			4: '转账收入'
		},
		moneyTxt:['收入金额','支出金额','转账金额'],
		poundage:'手续费',
		effectTime:'发生时间',
		agentName:'经手人',
		linkNo:'关联单据',
		creator:'操作人',
		createTime:'操作时间',
		billNumber:'单据编号',
		remarks:'备注信息',
		credentials:'凭证',
	},
	// 应收单
	receivableInfo:{
		basicTle:'应收单详情',
		billNo:'应收单号',
		orgName:'应收组织',
		moneySourceType:'应收单类型',
		moneySourceTypeTxt:{
			order: '订单应收',
			money: '其他应收单'
		},
		formType:'来源类型',
		formTypeTxt:{
			1: '客户',
			2: '供应商',
			3: '组织'
		},
		customerNo:'来源编号',
		customerName:'来源名称',
		totalMoney:'应收金额',
		settleMoney:'已核销金额',
		errearMoney:'未核销金额',
		state:'核销状态',
		stateTxt:{
			1: '待核销',
			2: '部分核销',
			3: '已核销',
			4: '已作废'
		},
		checkState:'应收单状态',
		checkStateTxt:{
			1: '待提交',
			2: '待审核',
			3: '已审核',
			4: '未通过',
			5: '已作废',
			6: '无审核'
		},
		linkBillNo:'关联订单编号',
		linkType:'关联类型',
		linkTypeTxt:{
			order: '订单',
			transfer: '调拨单',
			purchase: '采购 '
		},
		orderTime:'开单时间',
		operator:'操作人',
		operationTime:'操作时间',
		remarks:'备注信息',
	},
	// 应付单
	copeInfo:{
		basicTle:'应付单详情',
		billNo:'应付单号',
		orgName:'应付组织',
		moneySourceType:'应付单类型',
		moneySourceTypeTxt:{
			purchase: '采购应付',
			money: '其他应付单'
		},
		formType:'来源类型',
		formTypeTxt:{
			1: '客户',
			2: '供应商',
			3: '组织'
		},
		customerNo:'来源编号',
		customerName:'来源名称',
		totalMoney:'应付金额',
		settleMoney:'已核销金额',
		errearMoney:'未核销金额',
		state:'核销状态',
		stateTxt:{
			1: '待核销',
			2: '部分核销',
			3: '已核销',
			4: '已作废'
		},
		checkState:'应付单状态',
		checkStateTxt:{
			1: '待提交',
			2: '待审核',
			3: '已审核',
			4: '未通过',
			5: '已作废',
			6: '无审核'
		},
		linkBillNo:'关联订单编号',
		linkType:'关联类型',
		linkTypeTxt:{
			order: '订单',
			transfer: '调拨单',
			purchase: '采购 '
		},
		orderTime:'开单时间',
		operator:'操作人',
		operationTime:'操作时间',
		remarks:'备注信息',
	},
	// 收款单
	gatheringInfo:{
		basicTle:'应付单详情',
		billNo:'收款单号',
		orgName:'收款组织',
		payer:'付款人',
		shroffer:'收款人',
		transTypeName:'交易类型',
		formType:'来源类型',
		formTypeTxt:{
			1: '客户',
			2: '供应商',
			3: '组织'
		},
		customerNo:'来源编号',
		customerName:'来源名称',
		moneyTxt:'收款金额',
		collectionTypeName:'支付方式',
		checkState:'审核状态',
		checkStateTxt:{
			1: '待提交',
			2: '待审核',
			3: '已审核',
			4: '未通过',
			5: '已作废',
			6: '无审核'
		},
		moneySourceType:'操作类型',
		moneySourceTypeTxt:{
			order: '订单',
			purchase: '采购',
			money: '钱款录入'
		},
		linkBillNo:'关联订单编号',
		linkType:'关联类型',
		linkTypeTxt:{
			order: '订单',
			transfer: '调拨单',
			purchase: '采购 '
		},
		billTime:'收款时间',
		operator:'操作人',
		operationTime:'操作时间',
		remarks:'备注信息',
	},
	// 付款单
	paymentInfo:{
		basicTle:'付款单详情',
		billNo:'付款单号',
		orgName:'付款组织',
		payer:'收款人',
		shroffer:'付款人',
		transTypeName:'交易类型',
		formType:'来源类型',
		formTypeTxt:{
			1: '客户',
			2: '供应商',
			3: '组织'
		},
		customerNo:'来源编号',
		customerName:'来源名称',
		moneyTxt:'付款金额',
		collectionTypeName:'付款方式',
		checkState:'审核状态',
		checkStateTxt:{
			1: '待提交',
			2: '待审核',
			3: '已审核',
			4: '未通过',
			5: '已作废',
			6: '无审核'
		},
		moneySourceType:'操作类型',
		moneySourceTypeTxt:{
			order: '订单',
			purchase: '采购',
			money: '钱款录入'
		},
		linkBillNo:'关联订单编号',
		linkType:'关联类型',
		linkTypeTxt:{
			order: '订单',
			transfer: '调拨单',
			purchase: '采购 '
		},
		billTime:'付款时间',
		operator:'操作人',
		operationTime:'操作时间',
		remarks:'备注信息',
	},
}