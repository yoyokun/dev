import {
	sysPropertyClassifySelectPropertyBox,
	auditFormFindList,
	sysFieldFindList,
	sysOrgFindList
} from '@/api/lpgManageAppApi'
import { sysManagerFindList } from '@/api/loginApi.js'
import { riskUnitFindList } from '@/api/lpgSecurityManageApi.js'
export const settingMixin = {
	data() {
	  return {
			propertyClassifySelectProperty:[],  //属性分类
			workType: [], // 工单类型
			workLevel: [], // 工单等级
			orgList: [], // 组织列表
			managerList: [], // 人员列表
			riskUnitList: [], // 风险单元
		}
	},
	methods: {
		// 获取属性分类值（树结构）
		async getPropertyClassifySelectPropertyBox(obj = {}) {
		  const { returnValue: res } = await sysPropertyClassifySelectPropertyBox(obj)
		  this.propertyClassifySelectProperty = this.getchildsProperty(res)
		},
		// 获取子节点
		getchildsProperty(array, id) {
		  const childs = []
		  // 循环获取子节点
		  array.forEach((v, i) => {
			const obj = {
			  name: v.name,
			  id: v.id,
			  type: v.type,
			  children: [],
			  pid: id || 0,
			  isDefaultExpanded: true,
			  disabled: v.type !== 3
			}
			obj.children = this.getchildsProperty(v.childrens, v.id) // 递归获取子节点
			childs.push(obj)
		  })
		  return childs
		},
		// 获取工单类型剔除等于2的
		async getWorkType(obj = {}, type = 'formKey') {
			const { returnValue: res } = await auditFormFindList(Object.assign({}, { dataType: 'work' }, obj))
			const workType = []
			res.forEach(v => {
				if (v.auditSwitch === 1) {
					workType.push({
						name: v.name,
						value: v[type]
					})
				}
			})
			this.workType = workType
		},
		// 获取工单等级
		async getWorkLevel(obj = {}, type = 'id') {
			const { returnValue: res } = await sysFieldFindList(Object.assign({}, { groups: 'audit_work_level' }, obj))
			const workLevel = []
			res.forEach(v => {
				workLevel.push({
					name: v.name,
					value: v[type]
				})
			})
			this.workLevel = workLevel
		},
		// 查询组织（查询自己及以下组织）下拉结构
		async getOrgList(obj = {}, type = 'id') {
			const { returnValue: res } = await sysOrgFindList(obj || {})
			const orgList = []
			res.forEach(v => {
				orgList.push({
					name: v.name,
					value: v[type]
				})
			})
			this.orgList = orgList
		},
		// 获取人员
		async getManagerFindList(obj, type = 'id') {
			const { returnValue: res } = await sysManagerFindList(obj || {})
			const managerList = []
			res.forEach((v, i) => {
				managerList.push({
					name: v.name,
					value: v[type]
				})
			})
			this.managerList = managerList
		},
		// 获取风险单元
		async getRiskUnitList(data = {}, type = 'id') {
			const { returnValue: res } = await riskUnitFindList(data)
			const riskUnitList = []
			res.forEach(v => {
				riskUnitList.push({
					name: v.name,
					value: v[type]
				})
			})
			this.riskUnitList = riskUnitList
		},
	}
}
