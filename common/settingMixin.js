import {
	sysPropertyClassifySelectPropertyBox
} from '@/api/lpgManageAppApi'
export const settingMixin = {
	data() {
	    return {
			propertyClassifySelectProperty:[],  //属性分类
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
	}
}
