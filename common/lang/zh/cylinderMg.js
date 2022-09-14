module.exports = {
	// 流转信息
	circulationInfoList: {
		titleText: '钢瓶流转信息',
		modelName: '钢瓶型号',
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
	}
}