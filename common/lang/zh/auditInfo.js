module.exports = {
	titleText: '审核详情',
	trendsTle: '审核动态',
	dealTimeTxt: ['提交时间：', '审批时间：'],
	statusTxt: {
		1: '审批通过',
		2: '审批不通过',
		3: '提交审批'
	},
	auditOptTxt: '审批意见：',
	copyNoteTxt: '通知抄送：',
	// 业务单
	businessInfo: {
		tabs: [{
			name: '基本信息'
		}, {
			name: '溯源信息'
		}],
		basicTle: '基本信息',
		goodsTle: '商品信息',
		deliverTle: '运输信息',
		orderTle: '订单折扣',
		sendTle: '送达钢瓶',
		recycleTle: '回收钢瓶',
		// ======================
		orgName: '业务组织',
		billNo: '单号',
		formType: '往来类型',
		formTypeTxt: {
			1: '客户',
			2: '供应商',
			3: '组织 '
		},
		customerNo: '往来编号',
		customerName: '往来名称',
		checkState: '订单状态',
		checkStateTxt: {
			1: '待提交',
			2: '待审核',
			3: '已审核',
			4: '未通过',
			5: '已作废'
		},
		goodsTotalMoney: '订单金额',
		payItemsMoney: '收费项金额',
		couponTotalMoney: '优惠金额',
		totalMoney: ['应收金额', '金额（元）', '成交金额（元）'],
		creator: '开单人',
		billTime: '开单时间',
		totalWeight: '重量',
		totalNum: '数量',
		linkBillNo: '关联单号',
		linkType: '单据类型',
		linkTypeTxt: {
			order: '订单',
			transfer: '调拨单',
			purchase: '采购 '
		},
		printCount: '打印',
		remarks: '备注',
		operator: '操作人',
		operationTime: '操作时间',
		pickMode: '运输方式',
		pickModeTxt: {
			1: '自提',
			2: '车辆自提',
			3: '车辆配送'
		},
		bookingTime: '预约时间',
		licenseNo: '车牌号',
		deliverMan: '配送员/运输员',
		addressSplicing: '收货地址',
		payItemsMoney: '物流费用',
		payItemsName: '费用详细',
		couponNo: '优惠券号',
		couponMoney: '优惠券金额',
		integralValue: '抵扣积分',
		integralMoney: '抵扣金额',
		disCountMoney: '折扣金额',
		disCountRate: '折扣率（%）',
		couponTotalMoney: '合计优惠',
		tableColumn: {
			cylinderNo: '瓶身编号',
			codeKey: '钢瓶二维码',
			modelName: '钢瓶型号',
			fillingStateStr: '充装状态',
			holderName: '持有人',
			flowNodeStr: '流转环节',
			stateStr: '流转状态',
		},
	},
	// 资金期初
	accountPeriodInfo: {
		basicTle: '基本信息',
		billNo: '流水号',
		outAccountId: '资金账号',
		balanceMoney: '发生金额',
		lastMoney: '原始金额',
		effectTime: '发生时间',
		agentName: '经手人',
		creator: '操作人',
		createTime: '操作时间',
		remarks: '备注信息',
	},
	// 资金支取
	capitalDrawInfo: {
		basicTle: '基本信息',
		billNo: '流水号',
		outAccountName: ['资金账号', '转出账号'],
		inAccountName: '转入账号',
		moneyType: '收支类型',
		moneyTypeTxt: {
			1: '收入',
			2: '支出',
			3: '转账支出',
			4: '转账收入'
		},
		moneyTxt: ['收入金额', '支出金额', '转账金额'],
		poundage: '手续费',
		effectTime: '发生时间',
		agentName: '经手人',
		linkNo: '关联单据',
		creator: '操作人',
		createTime: '操作时间',
		billNumber: '单据编号',
		remarks: '备注信息',
		credentials: '凭证',
	},
	// 应收单
	receivableInfo: {
		basicTle: '应收单详情',
		billNo: '应收单号',
		orgName: '应收组织',
		moneySourceType: '应收单类型',
		moneySourceTypeTxt: {
			order: '订单应收',
			money: '其他应收单'
		},
		formType: '来源类型',
		formTypeTxt: {
			1: '客户',
			2: '供应商',
			3: '组织'
		},
		customerNo: '来源编号',
		customerName: '来源名称',
		totalMoney: '应收金额',
		settleMoney: '已核销金额',
		errearMoney: '未核销金额',
		state: '核销状态',
		stateTxt: {
			1: '待核销',
			2: '部分核销',
			3: '已核销',
			4: '已作废'
		},
		checkState: '应收单状态',
		checkStateTxt: {
			1: '待提交',
			2: '待审核',
			3: '已审核',
			4: '未通过',
			5: '已作废',
			6: '无审核'
		},
		linkBillNo: '关联订单编号',
		linkType: '关联类型',
		linkTypeTxt: {
			order: '订单',
			transfer: '调拨单',
			purchase: '采购 '
		},
		orderTime: '开单时间',
		operator: '操作人',
		operationTime: '操作时间',
		remarks: '备注信息',
	},
	// 应付单
	copeInfo: {
		basicTle: '应付单详情',
		billNo: '应付单号',
		orgName: '应付组织',
		moneySourceType: '应付单类型',
		moneySourceTypeTxt: {
			purchase: '采购应付',
			money: '其他应付单'
		},
		formType: '来源类型',
		formTypeTxt: {
			1: '客户',
			2: '供应商',
			3: '组织'
		},
		customerNo: '来源编号',
		customerName: '来源名称',
		totalMoney: '应付金额',
		settleMoney: '已核销金额',
		errearMoney: '未核销金额',
		state: '核销状态',
		stateTxt: {
			1: '待核销',
			2: '部分核销',
			3: '已核销',
			4: '已作废'
		},
		checkState: '应付单状态',
		checkStateTxt: {
			1: '待提交',
			2: '待审核',
			3: '已审核',
			4: '未通过',
			5: '已作废',
			6: '无审核'
		},
		linkBillNo: '关联订单编号',
		linkType: '关联类型',
		linkTypeTxt: {
			order: '订单',
			transfer: '调拨单',
			purchase: '采购 '
		},
		orderTime: '开单时间',
		operator: '操作人',
		operationTime: '操作时间',
		remarks: '备注信息',
	},
	// 收款单
	gatheringInfo: {
		basicTle: '收款单详情',
		billNo: '收款单号',
		orgName: '收款组织',
		payer: '付款人',
		shroffer: '收款人',
		transTypeName: '交易类型',
		formType: '来源类型',
		formTypeTxt: {
			1: '客户',
			2: '供应商',
			3: '组织'
		},
		customerNo: '来源编号',
		customerName: '来源名称',
		moneyTxt: '收款金额',
		collectionTypeName: '支付方式',
		checkState: '审核状态',
		checkStateTxt: {
			1: '待提交',
			2: '待审核',
			3: '已审核',
			4: '未通过',
			5: '已作废',
			6: '无审核'
		},
		moneySourceType: '操作类型',
		moneySourceTypeTxt: {
			order: '订单',
			purchase: '采购',
			money: '钱款录入'
		},
		linkBillNo: '关联订单编号',
		linkType: '关联类型',
		linkTypeTxt: {
			order: '订单',
			transfer: '调拨单',
			purchase: '采购 '
		},
		billTime: '收款时间',
		operator: '操作人',
		operationTime: '操作时间',
		remarks: '备注信息',
	},
	// 付款单
	paymentInfo: {
		basicTle: '付款单详情',
		billNo: '付款单号',
		orgName: '付款组织',
		payer: '收款人',
		shroffer: '付款人',
		transTypeName: '交易类型',
		formType: '来源类型',
		formTypeTxt: {
			1: '客户',
			2: '供应商',
			3: '组织'
		},
		customerNo: '来源编号',
		customerName: '来源名称',
		moneyTxt: '付款金额',
		collectionTypeName: '付款方式',
		checkState: '审核状态',
		checkStateTxt: {
			1: '待提交',
			2: '待审核',
			3: '已审核',
			4: '未通过',
			5: '已作废',
			6: '无审核'
		},
		moneySourceType: '操作类型',
		moneySourceTypeTxt: {
			order: '订单',
			purchase: '采购',
			money: '钱款录入'
		},
		linkBillNo: '关联订单编号',
		linkType: '关联类型',
		linkTypeTxt: {
			order: '订单',
			transfer: '调拨单',
			purchase: '采购 '
		},
		billTime: '付款时间',
		operator: '操作人',
		operationTime: '操作时间',
		remarks: '备注信息',
	},
	// 调价单
	pricePlanInfo: {
		basicTle: '基础信息',
		planNo: '调价单号',
		orgName: '应用组织',
		planName: '描述',
		planType: '调价执行方式',
		planTypeTxt: ['立即生效', '定时生效'],
		planTime: '计划执行时间',
		execTime: '实际执行时间',
		creator: '制单人',
		createTime: '制单时间',
		operationTime: '更新时间',
		tableColumn: {
			goodsNo: '商品编码',
			goodsName: '商品名称',
			brandName: '品牌',
			goodsClassifyName: '商品分类',
			standardName: '规格',
			unitsName: '单位',
			propertyNames: '属性参数',
			listPrice: '原价',
			nowPrice: '新价格',
		},
	},
	// 盘点单
	stockTakingInfo: {
		basicTle: '基本信息',
		tableTle: '盘点商品',
		billNo: '盘点单号',
		orgName: '盘点仓库',
		lockState: '盘点锁库',
		state: '盘点状态',
		stateTxt: {
			1: '盘点中',
			2: '盘点完成'
		},
		operator: '操作员',
		billTime: '盘点时间',
		checkState: '审核状态',
		checkStateTxt: {
			1: '待提交',
			2: '待审核',
			3: '已审核',
			4: '未通过',
			5: '已作废',
			6: '无审核'
		},
		remarks: '备注',
		tableColumn: {
			goodsNo: '商品编码',
			goodsName: '商品名称',
			brandName: '品牌',
			goodsClassifyName: '商品类型',
			standardName: '规格',
			unitsName: '单位',
			propertyNames: '属性参数',
			systemStockNum: '系统库存',
			checkStockNum: '盘点数',
			differences: '库存差异',
			inOutName: '盘点处理',
			remarks: '备注',
		},
	},
	// 采购入库
	PurGoodTankCarHouseInfo: {
		basicTle: '基础信息',
		tableTle: '入库信息',
		billNo: '入库单号',
		inDate: '入库日期',
		orderOrgName: '收货方',
		takeManagerName: '收货人',
		supplierName: '供应商',
		supplyName: '提货点',
		takeType: '物流方式',
		takeTypeTxt: {
			1: '自提',
			2: '外送',
			3: '外送自费'
		},
		vehicleNum: '车次',
		transportName: '运输方式',
		license: '车牌号',
		vehicleDriverName: '司机',
		escortName: '押运员',
		inoutReasonName: '入库原因',
		remarks: '备注信息',
		attachment: '附件',
		downloadTxt: '下载',
		tableColumn: {
			goodsName: '商品名称',
			goodsNo: '商品编码',
			standardName: '规格',
			goodsClassifyName: '分类',
			propertyNames: '属性参数',
			unitsName: '单位',
			amount: '提货数量',
			auditNum: '复核数量',
			inStorageNum: '入库数量',
		},
	},
	// 充装转换
	fillingChangeInfo: {
		basicTle: '基本信息',
		tableTle: '充装转换信息',
		billNo: '充装转换单号',
		orgName: '组织',
		inOutName: '出入库原因',
		inOutNameTxt: ['入库', '出库'],
		systemTotalNum: '系统数量',
		realTotalNum: '实际数量',
		systemTotalWeight: '设置重量(KG)',
		realTotalWeight: '实充重量(KG)',
		planTotalWeight: '盘盈量(KG)',
		checkState: '审核状态',
		checkStateTxt: {
			1: '待提交',
			2: '待审核',
			3: '已审核',
			4: '未通过',
			5: '已作废',
			6: '无审核'
		},
		operator: '操作员',
		operationTime: '操作时间',
		remarks: '备注信息',
		tableColumn: {
			goodsNo: '商品编码',
			goodsName: '商品名称',
			brandName: '品牌',
			goodsClassifyName: '商品分类',
			standardName: '规格',
			unitsName: '单位',
			propertyNames: '属性参数',
			systemNum: '系统充装数量(瓶)',
			realNum: '实际充装数量(瓶)',
			planWeight: '设置充装量(KG)',
			realWeight: '实际充装量(KG)',
			profit: '盘盈量(KG)',
			count: '合计'
		},
		infoData: {
			fillNums: '充装总数(瓶)',
			fillWgtSet: '设置充装总重(吨)',
			fillWgt: '实际充装总重(吨)',
			BEAmount: '盈亏量(吨)',
			BERate: '盈亏率(%)',
		},
	},
	// 商品详情
	goodsInfo: {
		tabs: [{
			name: '商品详情'
		}, {
			name: '价格信息'
		}, {
			name: '商品描述'
		}],
		basicTle: '基本信息',
		markTle: '商品标记',
		moneyTle: '财务信息',
		unitTle: '单位设置',
		stockTle: '库存预警',
		priceTle: '价格信息',
		goodsClassifyName: '商品分类',
		goodsNo: '商品编号',
		goodsName: '商品名称',
		brandName: '品牌',
		orgName: '应用组织',
		sortNo: '商品排序',
		remarks: '备注信息',
		goodsPath: '商品图片',
		virtualSales: '虚拟销量',
		businessTagName: '业务标记',
		isShowCustomerPrice: '显示报价',
		isShowCustomerPriceTxt: ['显示', '不显示'],
		isShowInter: '网上商城',
		isShowInterTxt: ['显示', '不显示'],
		isCostTag: '费用项标记',
		isCostTagTxt: ['标记', '不标记'],
		taxRate: '进项税率(%)',
		saleRate: '销项税率(%)',
		computMethod: '成本计算方式',
		staffPre: '核算精度',
		unitsName: '基本单位',
		stockWarn: '库存预警',
		stockWarnValue: '库存数小于',
		stockSendType: '通知类型',
		stockSendName: '通知人员',
		isMorePrice: '多属性价格',
		isMorePriceTxt: ['启用', '禁用'],
		standardName: '规格',
		listPrice: '挂牌价',
		costPrice: '成本价',
		curStock: '库存',
		toDataProperty: '属性',
		statePropertyTxt: {
			1: '启用',
			2: '禁用'
		},
		stockWarnTxt: {
			true: '启用',
			false: '禁用'
		},
		computMethodTxt: {
			0: '移动平均法',
			1: '加权平均法',
			2: '先进先出法'
		},
		stockSendTypeTxt: {
			1: '按成员',
			2: '按部门',
			3: '按组织',
			4: '按角色'
		},
		tableColumnAssist: {
			aliasName: '别名',
			unitsName: '单位',
			netContent: '计量值',
		},
		tableColumnProperty: {
			propertyValueStr: '属性参数',
			standardName: '规格',
			listPrice: '挂牌价',
			costPrice: '成本价',
			curStock: '库存',
			state: '参数状态',
		},
	},
	// 价格策略
	priceStrategyInfo: {
		basicTle: '基本信息',
		goodsTle: '商品信息',
		attrTle: '属性参数',
		strategyNo: '策略编号',
		strategyName: '策略名称',
		orgName: '应用组织',
		remarks: '策略描述',
		classifyName: '所属分类',
		creator: '操作员',
		createTime: '更新时间',
		tableColumn: {
			goodsNo: '商品编码',
			goodsName: '商品名称',
			brandName: '品牌',
			goodsClassifyName: '商品分类',
			standardName: '规格',
			unitsName: '单位',
			propertyNames: '属性参数',
			listPrice: '挂牌价',
			costPrice: '成本价',
		},
		toDataPropertyColumn: {
			propertyClassifyStr: '属性分类',
			propertyValue: '属性参数',
			price: '加减价（元）',
			state: '参数状态',
		},
		stateText: {
			1: '启用',
			2: '禁用'
		},
	},
	// 出入库单
	singleOutputInfo: {
		basicTle: '基本信息',
		orderTle: '子单信息',
		billNo: '出入库单号',
		orgName: '组织',
		stockFormType: '来源类型',
		stockFormTypeTxt: {
			1: '客户',
			2: '供应商',
			3: '组织'
		},
		customerName: '来源名称',
		linkBillNo: '关联单据号',
		linkType: '关联单据类型',
		linkTypeTxt: {
			check: '盘点单',
			order: '订单',
			transfer: '调拨单',
			purchase: '采购'
		},
		licenseNo: '车牌号',
		deliverMan: '运输员',
		remarks: '备注信息',
		filePath: '附件',
		subBillNo: '库存单号',
		inOutName: '出入库原因',
		inOutNameTxt: ['入库', '出库'],
		tableColumn: {
			goodsNo: '商品编码',
			goodsName: '商品名称',
			brandName: '品牌',
			goodsClassifyName: '商品分类',
			standardName: '规格',
			unitsName: '单位',
			propertyNames: '属性参数',
			stockNum: '库存数量',
		},
	},
	// 退款单
	refundInfo: {
		tabs: [{
			name: '基本信息'
		}, {
			name: '溯源信息'
		}],
		basicTle: '基本信息',
		orderTle: '订单信息',
		refundTle: '售后信息',
		moneyTle: '收费项',
		sourceTle: '溯源信息',
		orgName: '退款组织',
		billNo: '单号',
		formType: '往来类型',
		formTypeTxt: {
			1: '客户',
			2: '供应商',
			3: '组织 '
		},
		customerNo: '客户编号',
		customerName: '客户名称',
		customerPhone: '联系电话',
		checkState: '订单状态',
		checkStateTxt: {
			1: '待提交',
			2: '待审核',
			3: '已审核',
			4: '未通过',
			5: '已作废'
		},
		creator: '开单人',
		createTime: '开单时间',
		totalMoney: '退款金额（元）',
		refundTime: '退款时间',
		linkBillNo: '关联单号',
		linkType: '单据类型',
		linkTypeTxt: {
			order: '订单',
			transfer: '调拨单',
			purchase: '采购 '
		},
		operator: '操作人',
		operationTime: '操作时间',
		orderStateTxt: {
			1: '待支付',
			2: '已结算',
			3: '已完成',
			4: '已关闭',
			5: '已作废 '
		},
		payTypeTxt: {
			1: '线上支付',
			2: '线下支付',
			3: '货到付款 '
		},
		deliveryStateTxt: {
			1: '待接单',
			2: '待发货',
			3: '配送中',
			4: '已送达'
		},
		tableColumn: {
			billNo: '订单编号',
			orderTime: '销售时间',
			totalWeight: '销售重量(kg)',
			totalMoney: '订单金额（元）',
			orderState: '订单状态',
			deliveryState: '物流状态',
			payType: '支付类型',
			collectionTypeName: '支付方式',
			remarks: '备注',
		},
		tableColumnRefund: {
			goodsName: '商品名称',
			linkGoodsName: '关联商品名称',
			linkPropertyNames: '属性参数',
			standardName: '规格',
			unitsName: '单位',
			unitPrice: '单价',
			totalNum: '总数',
			totalMoney: '总金额',
			refundNum: '数量',
			refundMoney: '金额',
			remarks: '备注',
		},
	},
	// 销售单
	salesOrdersInfo: {
		tabs: [{
			name: '基本信息'
		}, {
			name: '订单信息'
		}, {
			name: '回瓶信息'
		}, {
			name: '溯源信息'
		}],
		basicTle: '基础信息',
		customTle: '客户信息',
		deliverTle: '运输信息',
		orderTle: '订单折扣',
		orderNums: '子单编号',
		costMoney: '收费项',
		totalUnit: '共',
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
		salesOrderTransport: '收货地址',
		deliverOrgName: '配送组织',
		deliverMan: '配送员/运输员',
		payItemsName: '费用详细',
		payItemsMoney: '合计运费',
		couponNo: '优惠券号',
		couponMoney: '优惠券金额',
		integralValue: '抵扣积分',
		integralMoney: '抵扣金额',
		disCountMoney: '折扣金额',
		disCountRate: '折扣率（%）',
		couponTotalMoney: '合计优惠',
		totalMoney: '成交金额（元）',
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
	},
	// 采购申请
	purGoodRequisitionInfo: {
		basicTle: '基础信息',
		goodsTle: '商品信息',
		downloadTxt: '下载',
		applyTime: '申请日期',
		purOrgName: '申请组织',
		creator: '申请人',
		orgName: '采购组织',
		remarks: '备注/摘要',
		state: '单据状态',
		attachment: '档案资料',
		stateTxt: {
			1: '待提交',
			2: '待审批',
			3: '审批通过',
			4: '审批不通过',
			5: '已作废'
		},
		tableColumn: {
			goodsNo: '商品编码',
			goodsName: '商品名称',
			unitsName: '单位',
			propertyNames: '属性',
			curStock: '系统库存',
			amount: '预计采购数量',
			vehicleNum: '车次',
			vehicleNote: '运输信息',
			startingTime: '首发车时间',
			schedulingId: '调度计划',
		},
	},
	// 采购单
	purGoodOrderInfo: {
		basicTle: '基础信息',
		buyTle: '采购信息',
		feeTle: '费用信息',
		downloadTxt: '下载',
		billNo: '采购单号',
		orderDate: '采购日期',
		orgName: '采购组织',
		businessTypeName: '业务类型',
		state: '状态',
		remarks: '备注/摘要',
		attachment: '档案资料',
		stateTxt: {
			1: '待提交',
			2: '待审批',
			3: '审批通过',
			4: '审批不通过',
			5: '已作废'
		},
		payStateTxt: {
			1: '未付款',
			2: '已付款'
		},
		takeTypeTxt: {
			1: '自提',
			2: '外送',
			3: '外送自费'
		},
		tableColumn: {
			goodsNo: '商品编码',
			goodsName: '商品名称',
			standardName: '规格',
			goodsClassifyName: '分类',
			propertyNames: '属性参数',
			unitsName: '单位',
			mainorgName: '采购主体',
			orderOrgName: '订货方',
			inStorageBillNo: '关联入库单',
			supplierName: '供应商',
			supplyName: '提货点',
			takeType: '提货类型',
			transportName: '运输商',
			license: '车牌号',
			vehicleNum: '车次',
			amount: '提货数量',
			auditNum: '复核数量',
			inStorageNum: '入库数量',
			settleNum: '结算数量',
			goodsPrice: '商品单价',
			otherPrice: '其他单价',
			otherMoneyData: '其他单价名称',
			settlePrice: '结算单价',
			goodsMoney: '结算金额',
			freightPrice: '运费单价',
			freightMoney: '运费',
			totalMoney: '总金额',
			priceSpread: '价差值',
			salesPrice: '销售单价',
			salesMoney: '销售总价',
			vehicleDriverName: '司机',
			escortName: '押运员',
			arrivalTime: '到货\入库时间',
			attachment: '附件',
			takeManagerName: '收货人',
		},
		planCostsDataColumn: {
			mainorgName: '结算主体',
			supplierModelName: '供应商类型',
			supplierNo: '供应商编号',
			supplierName: '供应商名称',
			balanceTypeName: '结算账期',
			supplierMoney: '供应商余额',
			linkPaybillNo: '关联单号',
			remarks: '摘要/备注',
			shouldMoney: '应付金额',
			payMoney: '已付金额',
			proportion: '付款比例',
			payState: '付款状态'
		},
	},
	// 采购计划
	purGoodPlanInfo: {
		basicTle: '基础信息',
		priceTle: '报价信息',
		buyTle: '采购信息',
		feeTle: '费用申请',
		billNo: '计划单号',
		planDate: '计划日期',
		creator: '操作人',
		state: '状态',
		remarks: '备注/摘要',
		attachment: '档案资料',
		downloadTxt: '下载',
		stateTxt: {
			1: '待提交',
			2: '待审批',
			3: '审批通过',
			4: '审批不通过',
			5: '已作废'
		},
		payStateTxt: {
			1: '未付款',
			2: '已付款'
		},
		takeTypeTxt: {
			1: '自提',
			2: '外送',
			3: '外送自费'
		},
		tableColumn: {
			goodsName: '商品名称',
			mainorgName: '采购主体',
			orderOrgName: '订货方',
			supplierName: '供应商',
			supplyName: '提货点',
			takeType: '提货类型',
			transportName: '运输商',
			license: '车牌号',
			vehicleNum: '车次',
			unitsName: '单位',
			amount: '预计提货数量',
			goodsPrice: '商品单价',
			otherPrice: '其他单价',
			otherMoneyData: '其他单价名称',
			goodsMoney: '预计提货金额',
			freightPrice: '运费单价',
			freightMoney: '运费',
			totalMoney: '总金额',
			priceSpread: '价差值',
			salesPrice: '销售单价',
			salesMoney: '销售总价',
			vehicleDriverName: '司机',
			escortName: '押运员',
			arrivalTime: '计划到货时间',
			takeManagerName: '收货人',
		},
		planCostsDataColumn: {
			mainorgName: '结算主体',
			supplierModelName: '供应商类型',
			supplierNo: '供应商编号',
			supplierName: '供应商名称',
			balanceTypeName: '结算账期',
			supplierMoney: '供应商余额',
			linkPaybillNo: '关联单号',
			remarks: '摘要/备注',
			shouldMoney: '应付金额',
			payMoney: '已付金额',
			proportion: '付款比例',
			payState: '付款状态',
		},
	},
	// 优惠券
	couponInfo: {
		tabs: [{
			name: '基本信息'
		}, {
			name: '优惠券详情'
		}],
		basicTle: '基本信息',
		goodsTle: '适用商品',
		classifyName: '优惠券分类',
		couponName: '优惠券名称',
		orgName: '适用组织',
		couponType: '优惠券类型',
		couponNum: '发行数量',
		couponMoney: '面额',
		drawPropertyNames: '领取资格',
		receiveNum: '限领张数',
		validType: '有效期',
		vaildStartTime: '日期范围',
		vaildDay: '固定天数',
		useGoodsType: '使用商品',
		useType: '使用门槛',
		reduceMoney: '满减',
		stateTxt: {
			1: '已发行',
			2: '已领取',
			3: '已使用',
			4: '已过期'
		},
		couponTypeTxt: {
			1: '线上',
			2: '线下'
		},
		validTypeTxt: {
			1: '日期范围',
			2: '固定天数'
		},
		useTypeTxt: {
			1: '无门槛',
			2: '满减'
		},
		useGoodsTypeTxt: {
			1: '全部商品',
			2: '部分商品'
		},
		tableColumn: {
			goodsNo: '商品编码',
			goodsName: '商品名称',
			brandName: '品牌',
			goodsClassifyName: '商品分类',
		},
		tableColumnCoupon: {
			couponNo: '优惠券号',
			vaildEndTime: '有效期结束时间',
			state: '状态',
			receiveTime: '领取时间',
			useTime: '使用时间',
			customerName: '关联客户',
			linkType: '关联类型',
		},
		searchOptions: {
			state: {
				label: '状态',
				placeholder: '请选择状态',
				options: [{
						label: '已发行',
						value: 1
					},
					{
						label: '已领取',
						value: 2
					},
					{
						label: '已使用',
						value: 3
					},
					{
						label: '已过期',
						value: 4
					}
				]
			},
			createDateRange: {
				label: '日期范围',
				placeholder: ['开始日期', '选择日期'],
			},
		},

	},
	// 客户价格策略
	priceCustomerInfo: {
		basicTle: '调整价格',
		customTle: '客户报价',
		goodsTle: '商品详情',
		ployTle: '策略详情',
		customerNo: '客户编号',
		customerName: '客户名称',
		typeName: '客户类型',
		regionName: '客户区域',
		propertyNames: '客户标签',
		salePropertyNames: '优惠标签',
		customerPriceStateTxt: {
			1: '启用',
			2: '禁用'
		},
		tableColumnGoods: {
			goodsNo: '商品编码',
			goodsName: '商品名称',
			brandName: '品牌',
			goodsClassifyName: '商品分类',
			standardName: '规格',
			unitsName: '单位',
			propertyNames: '属性参数',
			listPrice: '挂牌价',
			unitPrice: '客户报价',
			act: '操作'
		},
		tableColumnGoodsInfo: {
			goodsNo: '商品编码',
			goodsName: '商品名称',
			brandName: '品牌',
			goodsClassifyName: '商品分类',
			standardName: '规格',
			unitsName: '单位',
			propertyNames: '属性参数',
			listPrice: '挂牌价',
		},
		tableColumnStrategy: {
			strategyNo: '策略编号',
			strategyName: '策略名称',
			linkValue: '关联参数',
			strategyValue: '策略值',
			curListPrice: '策略价',
			customerPriceState: '状态',
		},
	},
	// 客户钢瓶盘点
	userCylinderCheckInfo: {
		basicTle: '基本信息',
		checkTle: '盘点信息',
		billNo: '盘点单号',
		billTime: '盘点时间',
		creator: '盘点人',
		remarks: '备注',
		customerStateTxt: {
			1: '正常',
			2: '冻结'
		},
	},
}
