import {
	sysPropertyClassifySelectPropertyBox,
	auditFormFindList,
	sysFieldFindList,
	sysOrgFindList,
	sysSpecificationFindList,
	purSupplierFindList,
	sysPropertyFindDefaultProperty
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
			orgTypeList: [], // 组织类型列表
			managerList: [], // 人员列表
			managerDeliveryman: [], // 配送员列表
			riskUnitList: [], // 风险单元
			sysSpecification: [], // 钢瓶型号
			purSupplierList: [], // 供应商
			customerSourceList: [], // 客户来源
			customerAreaList: [], // 客户区域
			customerCollectionType: [], // 支付方式
			customerBalanceType: [], // 结算账期
			subOrderType: [], // 开单类型
			customertProperty: [], // 客户标签
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
		// 查询门市下拉
		async getOrgListType(obj = {}, type = 'id') {
			const { returnValue: res } = await sysOrgFindList(obj || {})
			const orgTypeList = []
			res.forEach((v, i) => {
				orgTypeList.push({
					name: v.name,
					value: v[type]
				})
			})
			this.orgTypeList = orgTypeList
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
    // 获取配送员
    async getManagerDeliveryman(obj) {
      const { returnValue: res } = await sysManagerFindList(obj || {})
      const managerDeliveryman = []
      res.forEach((v, i) => {
        managerDeliveryman.push({
          name: v.name,
          value: v.id
        })
      })
      this.managerDeliveryman = managerDeliveryman
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
		// 获取钢瓶型号
		async getSysSpecificationFindList(obj = {}, type = 'id') {
			const { returnValue: res } = await sysSpecificationFindList(Object.assign({}, { type: 'cylinder' }, obj))
			const sysSpecification = []
			res.forEach((v, i) => {
				sysSpecification.push({
					name: v.modelNumber + '-' + v.standardName,
					value: v[type],
					maxVolume: v.maxVolume, // 最大充装量
					fillingMedium: v.fillingMedium, // 充装介质
					cylinderVolume: v.cylinderVolume, // 公称容积
					designThickness: v.designThickness // 设计壁厚
				})
			})
			this.sysSpecification = sysSpecification
		},
		// 获取供应商列表
		async getPurSupplier(obj = {}, type = 'id') {
			const { returnValue: res } = await purSupplierFindList(obj)
			if (res) {
				const purSupplierList = []
				res.forEach(v => {
					purSupplierList.push({
						name: v.supplierName,
						value: v[type]
					})
				})
				this.purSupplierList = purSupplierList
			}
		},
		// 获取客户来源
		async getCustomerSource(obj = {}, type = 'id') {
			const { returnValue: res } = await sysFieldFindList(Object.assign({}, { groups: 'field_customer_source' }, obj))
			const customerSourceList = []
			res.forEach(v => {
				customerSourceList.push({
					name: v.name,
					value: v[type]
				})
			})
			this.customerSourceList = customerSourceList
		},
		// 获取客户类型
		async getCustomerType(obj = {}, type = 'id') {
			const { returnValue: res } = await sysPropertyFindDefaultProperty(Object.assign({}, { type: 'customer_type' }, obj))
			const customerTypeList = []
			if (!res) {
				return
			}
			res.propertyDetails.forEach(v => {
				customerTypeList.push({
					name: v.propertyValue,
					value: v[type]
				})
			})
			this.customerTypeList = customerTypeList
		},
		// 获取客户区域
		async getCustomerArea(obj = {}, type = 'id') {
			const { returnValue: res } = await sysPropertyFindDefaultProperty(Object.assign({}, { type: 'customer_area' }, obj))
			const customerAreaList = []
			if (!res) {
				return
			}
			res.propertyDetails.forEach(v => {
				customerAreaList.push({
					name: v.propertyValue,
					value: v[type]
				})
			})
			this.customerAreaList = customerAreaList
		},
		// 获取支付方式
		async getCustomerCollectionType(obj = {}, type = 'id') {
			const { returnValue: res } = await sysFieldFindList(Object.assign({}, { groups: 'field_customer_collectionType' }, obj))
			const customerCollectionType = []
			res.forEach(v => {
				customerCollectionType.push({
					name: v.name,
					value: v[type],
					type: v.type
				})
			})
			this.customerCollectionType = customerCollectionType
		},
		// 获取结算账期
		async getCustomerBalanceType(obj = {}, type = 'id') {
			const { returnValue: res } = await sysFieldFindList(Object.assign({}, { groups: 'field_customer_balanceType' }, obj))
			const customerBalanceType = []
			res.forEach(v => {
				customerBalanceType.push({
					name: v.name,
					value: v[type]
				})
			})
			this.customerBalanceType = customerBalanceType
		},
		// 获取开单类型
		async getSubOrderType(obj = {}, type = 'id') {
			const { returnValue: res } = await sysPropertyFindDefaultProperty(Object.assign({}, { type: 'subOrder_type' }, obj))
			const subOrderType = []
			if (!res) {
				return
			}
			res.propertyDetails.forEach(v => {
				subOrderType.push({
					name: v.propertyValue,
					value: v[type],
					active: false
				})
			})
			this.subOrderType = subOrderType
		},
		// 获取客户标签（除了类型和区域,下拉树）
		async geCustomerProperty(obj = {}) {
			const { returnValue: res } = await sysPropertyClassifySelectPropertyBox(Object.assign({}, { type: 'customer', typepropertyNames: 'customerTag' }, obj))
			this.customertProperty = this.getchildsProperty(res)
		},
		// 属性标签最后一级数组合并
		arrayMergingCommon(res, childs=[] ,name = '') {
			res.forEach((v, i) => {
				if (v.type === 3) {
					// 最后一级
					const obj = {
						name: v.name,
						value: v.id,
						desc: name + '/' + v.name,
						active: false,
						pid: v.pid
					}
					childs.push(obj)
				} else {
					const label = name ? name + '/' + v.name : v.name
					childs = this.arrayMergingCommon(v.children, childs, label) // 获取子节点
				}
			})
			return childs
		}
	}
}
