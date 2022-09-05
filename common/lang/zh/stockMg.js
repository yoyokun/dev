module.exports = {
	// 出入库单
	stockOrderList: {
		titleText: '出入库单',
		totalTxt: '总数',
		checkStateTxt: ['已审核', '待提交', '待审核', '已作废', '未通过', '无审核'],
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
				label: '业务组织',
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
		orderChildTxt:'子单',
		orderReasonTxt:'出入库原因',
		orderReasonPlaceholder: '请选择出入库原因',
		addGoodsTxt:'商品',
		propertyNames:'属性参数',
		standardName:'规格',
		unitsName:'基本单位',
		brandName:'品牌',
		goodsClassifyName:'商品分类',
		netContent:'重量(kg)',
		costMoney:'金额',
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
				placeholder: '请输入关联单号',
			},
			licenseNo: {
				label: '车牌号',
				placeholder: '请输入车牌号',
			},
			deliverManId: {
				label: '请运输员',
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
	

}
