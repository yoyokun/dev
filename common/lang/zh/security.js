module.exports = {
	securityCheckList: {
		titleText: '安检记录',
		totalNum: '安检总数',
		customerName: '客户名称',
		result: '安检结果',
		managerName: '安检员',
		endTime: '截止时间',
		search: {
			levelId: '风险等级',
			classify: '客户分类',
			result: '安检结果',
			state: '安检状态',
			rectifyState: '整改状态',
			classifyOptions: [
			 {
					name: '居民',
					value: 1
				},
				{
					name: '非居民',
					value: 2
				}
			],
			resultOptions: [
				{
					name: '合格',
					value: 1
				},
				{
					name: '不合格',
					value: 2
				}
			],
			stateOptions: [
				{
					name: '未安检',
					value: 1
				},
				{
					name: '已安检',
					value: 2
				},
				{
					name: '无法安检',
					value: 3
				},
				{
					name: '已超时',
					value: 4
				},
				{
					name: '客户拒检',
					value: 5
				}
			],
			rectifyStateOptions: [
				{
					name: '未整改',
					value: 1
				},
				{
					name: '已整改',
					value: 2
				},
				{
					name: '无法整改',
					value: 3
				},
				{
					name: '已作废',
					value: 4
				},
				{
					name: '已超时',
					value: 5
				},
				{
					name: '拒绝整改',
					value: 6
				}
			]
		},
		resultObj: {
			1: '合格',
			2: '不合格'
		},
		stateObj: {
			1: '未安检',
			2: '已安检',
			3: '无法安检',
			4: '已超时'
		}
	},
	rectificationList: {
		titleText: '整改记录',
		totalNum: '整改总数',
		customerName: '客户名称',
		managerName: '整改员',
		rectifyTime: '整改时间',
		search: {
			classify: '客户分类',
			state: '整改状态',
			classifyOptions: [
			 {
					name: '居民',
					value: 1
				},
				{
					name: '非居民',
					value: 2
				}
			],
			stateOptions: [
				{
					name: '未整改',
					value: 1
				},
				{
					name: '已整改',
					value: 2
				},
				{
					name: '无法整改',
					value: 3
				},
				{
					name: '已作废',
					value: 4
				},
				{
					name: '已超时',
					value: 5
				},
				{
					name: '拒绝整改',
					value: 6
				}
			]
		},
		stateObj: {
			1: '未整改',
			2: '已整改',
			3: '无法整改',
			4: '已作废',
			5: '已超时'
		}
	},
	patrolCheckList: {
		titleText: '巡检记录',
		totalNum: '巡检总数',
		unitName: '往来名称',
		levelName: '巡检结果',
		managerName: '巡检员',
		checkTime: '巡检时间',
		search: {
			unitId: '风险单元',
			state: '巡检状态',
			stateOptions: [
				{
					name: '未巡检',
					value: 1
				},
				{
					name: '已巡检',
					value: 2
				},
				{
					name: '无法巡检',
					value: 3
				},
				{
					name: '已超时',
					value: 4
				}
			]
		},
		stateObj: {
			1: '未巡检',
			2: '已巡检',
			3: '无法巡检',
			4: '已超时'
		}
	}
}