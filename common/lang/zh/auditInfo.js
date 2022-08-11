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
		},
		source:{
			sendTle:'送达钢瓶',
			recycleTle:'回收钢瓶',
		},
		tableColumn:{
			cylinderNo:'瓶身编号',
			codeKey:'钢瓶二维码',
			modelName:'钢瓶型号',
			fillingStateStr:'充装状态',
			holderName:'持有人',
			flowNodeStr:'流转环节',
			stateStr:'流转状态',
		},
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
	// 调价单
	pricePlanInfo:{
		basicTle:'基础信息',
		planNo:'调价单号',
		orgName:'应用组织',
		planName:'描述',
		planType:'调价执行方式',
		planTypeTxt:['立即生效','定时生效'],
		planTime:'计划执行时间',
		execTime:'实际执行时间',
		creator:'制单人',
		createTime:'制单时间',
		operationTime:'更新时间',
		tableColumn:{
			goodsNo:'商品编码',
			goodsName:'商品名称',
			brandName:'品牌',
			goodsClassifyName:'商品分类',
			standardName:'规格',
			unitsName:'单位',
			propertyNames:'属性参数',
			listPrice:'原价',
			nowPrice:'新价格',
		},
	},
	// 盘点单
	stockTakingInfo:{
		basicTle:'基本信息',
		tableTle:'盘点商品',
		billNo:'盘点单号',
		orgName:'盘点仓库',
		lockState:'盘点锁库',
		state:'盘点状态',
		stateTxt:{
			1: '盘点中',
			2: '盘点完成'
		},
		operator:'操作员',
		billTime:'盘点时间',
		checkState:'审核状态',
		checkStateTxt:{
			1: '待提交',
			2: '待审核',
			3: '已审核',
			4: '未通过',
			5: '已作废',
			6: '无审核'
		},
		remarks:'备注',
		tableColumn:{
			goodsNo:'商品编码',
			goodsName:'商品名称',
			brandName:'品牌',
			goodsClassifyName:'商品类型',
			standardName:'规格',
			unitsName:'单位',
			propertyNames:'属性参数',
			systemStockNum:'系统库存',
			checkStockNum:'盘点数',
			differences:'库存差异',
			inOutName:'盘点处理',
			remarks:'备注',
		},
	},
	// 采购入库
	PurGoodTankCarHouseInfo:{
		basicTle:'基础信息',
		tableTle:'入库信息',
		billNo:'入库单号',
		inDate:'入库日期',
		orderOrgName:'收货方',
		takeManagerName:'收货人',
		supplierName:'供应商',
		supplyName:'提货点',
		takeType:'物流方式',
		takeTypeTxt: {
			1: '自提',
			2: '外送',
			3: '外送自费'
		},
		vehicleNum:'车次',
		transportName:'运输方式',
		license:'车牌号',
		vehicleDriverName:'司机',
		escortName:'押运员',
		inoutReasonName:'入库原因',
		remarks:'备注信息',
		attachment:'附件',
		downloadTxt:'下载',
		tableColumn:{
			goodsName:'商品名称',
			goodsNo:'商品编码',
			standardName:'规格',
			goodsClassifyName:'分类',
			propertyNames:'属性参数',
			unitsName:'单位',
			amount:'提货数量',
			auditNum:'复核数量',
			inStorageNum:'入库数量',
		},
	},
	// 充装转换
	fillingChangeInfo:{
		basicTle:'基本信息',
		tableTle:'充装转换信息',
		billNo:'充装转换单号',
		orgName:'组织',
		inOutName:'出入库原因',
		inOutNameTxt:['入库','出库'],
		systemTotalNum:'系统数量',
		realTotalNum:'实际数量',
		systemTotalWeight:'设置重量(KG)',
		realTotalWeight:'实充重量(KG)',
		planTotalWeight:'盘盈量(KG)',
		checkState:'审核状态',
		checkStateTxt:{
			1: '待提交',
			2: '待审核',
			3: '已审核',
			4: '未通过',
			5: '已作废',
			6: '无审核'
		},
		operator:'操作员',
		operationTime:'操作时间',
		remarks:'备注信息',
		tableColumn:{
			goodsNo:'商品编码',
			goodsName:'商品名称',
			brandName:'品牌',
			goodsClassifyName:'商品分类',
			standardName:'规格',
			unitsName:'单位',
			propertyNames:'属性参数',
			systemNum:'系统充装数量(瓶)',
			realNum:'实际充装数量(瓶)',
			planWeight:'设置充装量(KG)',
			realWeight:'实际充装量(KG)',
			profit:'盘盈量(KG)',
			count:'合计'
		},
		infoData:{
			fillNums:'充装总数(瓶)',
			fillWgtSet:'设置充装总重(吨)',
			fillWgt:'实际充装总重(吨)',
			BEAmount:'盈亏量(吨)',
			BERate:'盈亏率(%)',
		},
	},
	// 商品详情
	goodsInfo:{
		tabs:[{
			name:'商品详情'
		},{
			name:'价格信息'
		},{
			name:'商品描述'
		}],
		basicTle:'基本信息',
		markTle:'商品标记',
		moneyTle:'财务信息',
		unitTle:'单位设置',
		stockTle:'库存预警',
		priceTle:'价格信息',
		goodsClassifyName:'商品分类',
		goodsNo:'商品编号',
		goodsName:'商品名称',
		brandName:'品牌',
		orgName:'应用组织',
		sortNo:'商品排序',
		remarks:'备注信息',
		goodsPath:'商品图片',
		virtualSales:'虚拟销量',
		businessTagName:'业务标记',
		isShowCustomerPrice:'显示报价',
		isShowCustomerPriceTxt:['显示','不显示'],
		isShowInter:'网上商城',
		isShowInterTxt:['显示','不显示'],
		isCostTag:'费用项标记',
		isCostTagTxt:['标记','不标记'],
		taxRate:'进项税率(%)',
		saleRate:'销项税率(%)',
		computMethod:'成本计算方式',
		staffPre:'核算精度',
		unitsName:'基本单位',
		stockWarn:'库存预警',
		stockWarnValue:'库存数小于',
		stockSendType:'通知类型',
		stockSendName:'通知人员',
		isMorePrice:'多属性价格',
		isMorePriceTxt:['启用','禁用'],
		standardName:'规格',
		listPrice:'挂牌价',
		costPrice:'成本价',
		curStock:'库存',
		toDataProperty:'属性',
		statePropertyTxt:{
			1: '启用',
			2: '禁用'
		},
		stockWarnTxt:{
			true: '启用',
			false: '禁用'
		},
		computMethodTxt:{
			0: '移动平均法',
			1: '加权平均法',
			2: '先进先出法'
		},
		stockSendTypeTxt:{
			1: '按成员',
			2: '按部门',
			3: '按组织',
			4: '按角色'
		},
		tableColumnAssist:{
			aliasName:'别名',
			unitsName:'单位',
			netContent:'计量值',
		},
		tableColumnProperty:{
			propertyValueStr:'属性参数',
			standardName:'规格',
			listPrice:'挂牌价',
			costPrice:'成本价',
			curStock:'库存',
			state:'参数状态',
		},
	},
	// 价格策略
	priceStrategyInfo:{
		basicTle:'基本信息',
		goodsTle:'商品信息',
		attrTle:'属性参数',
		strategyNo:'策略编号',
		strategyName:'策略名称',
		orgName:'应用组织',
		remarks:'策略描述',
		classifyName:'所属分类',
		creator:'操作员',
		createTime:'更新时间',
		tableColumn:{
			goodsNo:'商品编码',
			goodsName:'商品名称',
			brandName:'品牌',
			goodsClassifyName:'商品分类',
			standardName:'规格',
			unitsName:'单位',
			propertyNames:'属性参数',
			listPrice:'挂牌价',
			costPrice:'成本价',
		},
		toDataPropertyColumn:{
			propertyClassifyStr:'属性分类',
			propertyValue:'属性参数',
			price:'加减价（元）',
			state:'参数状态',
		},
		stateText:{
			1: '启用',
			2: '禁用'
		},
	},
	
}