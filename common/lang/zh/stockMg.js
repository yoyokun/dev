module.exports = {
	common: {
		totalTxt: '总数',
		checkStateTxt: ['已审核', '待提交', '待审核', '已作废', '未通过', '无审核'],
		propertyNames: '属性参数',
		standardName: '规格',
		unitsName: '基本单位',
		brandName: '品牌',
		goodsClassifyName: '商品分类',
		stockTypeTxt: {
			in: '入库',
			out: '出库'
		},
		btn: {
			dealStock: '开始盘点',
			addGoodsTxt: '商品'
		}
	},
	// 出入库单
	stockOrderList: {
		titleText: '出入库单',
		customerName: '来往对象',
		linkBillNo: '关联单据',
		operationTime: '开单时间',
		searchOptions: {
			orgIdStr: {
				label: '业务组织',
			},
			stockFormType: {
				label: '来源类型',
				options: [{
						name: '全部',
						value: ''
					},
					{
						name: '客户',
						value: 1
					},
					{
						name: '供应商',
						value: 2
					},
					{
						name: '组织',
						value: 3
					}
				]
			},
			linkType: {
				label: '关联类型',
				options: [{
						name: '销售单',
						value: 'order'
					},
					{
						name: '调拨单',
						value: 'transfer'
					},
					{
						name: '业务单',
						value: 'business'
					},
					{
						name: '退款单',
						value: 'refund'
					},
					{
						name: '订单回瓶',
						value: 'orderBackBottle'
					},
					{
						name: '充装转换单',
						value: 'fillingChange'
					},
					{
						name: '盘点单',
						value: 'check'
					},
					{
						name: '无',
						value: 'none'
					}
				]
			},
			checkState: {
				label: '审批状态',
				options: [{
						name: '待提交',
						value: 1
					},
					{
						name: '待审核',
						value: 2
					},
					{
						name: '已审核',
						value: 3
					},
					{
						name: '未通过',
						value: 4
					},
					{
						name: '已作废',
						value: 5
					},
					{
						name: '无审核',
						value: 6
					}
				]
			},
		},
	},
	// 出入库单
	addStockOrder: {
		titleText: '添加出入库单',
		titleTextEdit: '编辑出入库单',
		orderChildTxt: '子单',
		orderReasonTxt: '出入库原因',
		orderReasonPlaceholder: '请选择出入库原因',
		stockNumsTxt: '库存',
		netContent: '重量(kg)',
		costMoney: '金额',
		addChildBtn: '添加子单',
		errNumsTxt: '请输入正确的单号',
		errQrTxt: '二维码图片错误，请重新上传',
		form: {
			orgId: {
				label: '组织',
				placeholder: '请选择组织',
			},
			stockFormType: {
				label: '往来类型',
				placeholder: '请选择往来类型',
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
			customerId: {
				label: '来源名称',
				placeholder: '请选择来源名称',
			},
			linkBillNo: {
				label: '关联单号',
				placeholder: '请选择关联单号',
			},
			licenseNo: {
				label: '车牌号',
				placeholder: '请输入车牌号',
			},
			deliverManId: {
				label: '运输员',
				placeholder: '请选择运输员',
			},
			remarks: {
				label: '备注',
				placeholder: '请输入备注',
			},
			filePath: {
				label: '附件',
			},
		},
	},
	// 库存盘点
	stockCheckList: {
		titleText: '库存盘点',
		orgName: '盘点仓库',
		state: '盘点状态',
		operationTime: '盘点时间',
		stateTxt: {
			1: '盘点中',
			2: '盘点完成'
		},
		searchOptions: {
			orgIdStr: {
				label: '盘点仓库',
			},
			lockState: {
				label: '是否锁盘',
				options: [{
						name: '否',
						value: '0'
					},
					{
						name: '是',
						value: '1'
					}
				]
			},
			checkStateStr: {
				label: '审核状态',
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
					},
					{
						name: '无审核',
						value: '6'
					}
				]
			},
			createDateRange: {
				label: '盘点日期',
				placeholder: ['开始日期', '选择日期'],
			},
		},
	},

	// 添加库存盘点
	addStockCheck: {
		titleText: '添加库存盘点',
		titleTextEdit: '编辑库存盘点',
		titleTextInfo: '库存盘点详情',
		baseTle: '基础信息',
		billNo: '单据编号',
		orgName: '盘点仓库',
		checkState: '审核状态',
		lockState: '盘点锁库',
		state: '盘点状态',
		billTime: '开单时间',
		creator: '开单人',
		operationTime: '更新时间',
		operator: '操作员',
		remarks: '备注',
		stockGoodsTle: '盘点商品',
		reasonTxt: '选择原因',
		curStock: '系统库存',
		checkNums: '盘点数量',
		diffNums: '差异',
		checkStateTxt: {
			1: '待提交',
			2: '待审核',
			3: '已审核',
			4: '未通过',
			5: '已作废',
			6: '无审核'
		},
		lockStateTxt: {
			true: '是',
			false: '否',
		},
		form: {
			orgName: {
				label: '盘点仓库',
			},
			lockState: {
				label: '锁库',
			},
			remarks: {
				label: '备注',
				placeholder: '请输入备注',
			},
		},
	},
	// 添加充装转换
	addFillOrder:{
		titleText: '添加充装转换',
		titleTextEdit: '编辑充装转换',
		titleTextInfo: '充装详情',
		baseTle: '基础信息',
		billNo: '单据编号',
		orgName: '充装组织',
		checkState: '单据状态',
		fillTime:'充装时间',
		inOutName:'出入库原因',
		operationTime:'更新时间',
		operator:'操作员',
		remarks:'备注',
		goodsTle:'商品',
		profit:'盘盈量',
		systemNum:'系统充装',
		planWeight:'设置充装',
		realNum:'实际充装',
		realWeight:'实际充装',
		unit:'瓶',
		tips:'请添加商品',
		form:{
			orgName:{
				label:'充装组织',
			},
			fillingRange:{
				label:'充装组织',
			},
			inOutReasonId:{
				label: '出入库原因',
				placeholder: '请选择出入库原因',
			},
			remarks:{
				label: '备注',
				placeholder: '请输入备注',
			}
		},
		checkStateTxt: {
			1: '待提交',
			2: '待审核',
			3: '已审核',
			4: '未通过',
			5: '已作废',
			6: '无审核'
		},
	},
	// 转换单
	fillOrderList: {
		titleText: '充装转换单',
		fillTime: '充装时间',
		systemTotalNum: '系统数量',
		planTotalWeight: '设置重量',
		realTotalNum: '实际数量',
		realTotalWeight: '实际重量',
		profit: '盘盈量',
		unit: '瓶',
		searchOptions: {
			orgIdStr: {
				label: '充装组织',
			},
			checkStateStr: {
				label: '审核状态',
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
					},
					{
						name: '无审核',
						value: '6'
					}
				]
			},
			createDateRange: {
				label: '更新日期',
				placeholder: ['开始日期', '选择日期'],
			},
		},
	},
	// 转换单
	stockList: {
		titleText: '库存查询',
		systemStockNum: '系统库存',
		inWayStockNum: '在途库存',
		realStockNum: '实际库存',
		unit: '单位',
		searchOptions: {
			orgIdStr: {
				label: '充装组织',
			},
			goodsClassifyId: {
				label: '商品分类',
			},
			propertyIds: {
				label: '属性参数',
			},
			state: {
				label: '商品状态',
				options: [{
						name: '全部',
						value: ''
					},
					{
						name: '待上架',
						value: 3
					},
					{
						name: '已上架',
						value: 4
					}
				]
			},
		},
	},
}
