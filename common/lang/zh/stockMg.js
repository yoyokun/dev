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
	// 添加出入库单
	
}
