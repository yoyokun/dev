<template>
  <view class="container">
		<edit-form
			ref="dialogForm"
			labelWidth="80"
			classForm="normalForm"
			:form-data-source="formDataSource"
			:form-data-value="formDataValue"
			>
			<template v-slot:other>
				<u-form-item required :label="$t('addManager.form.identitiesList')">
					<view class="addRole" @click="addRole">
						<u-icon name="plus-circle" color="#2A82E4" size="20"></u-icon>
						{{$t('addManager.form.addIdentities')}}
					</view>
				</u-form-item>
				<view class="draggable" v-if="toData.length">
					<draggable
					  :disabled="!isSave"
						v-model="toData"
						item-key="id"
						group="toData"
						@start="drag=true" @end="drag=false">
						<view v-for="(item,index) in toData" :key="item.id" class="org-box">
							<view class="center">
								<text class="org-label">{{$t('addManager.form.orgLabel')}}：{{ item.name }}</text>
								<block v-for="(itemBox,indexBox) in item.children" :key="indexBox">
									<view v-for="(subItem,indexSub) in itemBox.children" :key="indexSub" class="box-case">
										<text>{{ itemBox.name }}/{{subItem.name}}</text>
										<u-icon name="close-circle-fill" color="#8C8C8C" size="20"  @click="deleteRole(index,indexBox,indexSub)"></u-icon>
									</view>
								</block>
							</view>
							<image class="icon" src="/static/image/del.png" mode="widthFix" @click="deleteOrg(index)"></image>
						</view>
					</draggable>
				</view>
			</template>
			<template v-slot:extra>
				<view class="btn" v-if="isSave">
					<u-button :text="$t('common.btn.save')" type="primary" hairline shape="circle" @click="submitForm"></u-button>
				</view>
				<view class="btn" v-else>
					<u-button v-permission="{ permission:'app_managerList_edit'}" :text="$t('common.btn.edit')" type="primary" hairline shape="circle" @click="handleEdit"></u-button>
					<u-button v-permission="{ permission:'app_managerList_delete'}" :text="$t('common.btn.delete')" type="error" hairline shape="circle" plain @click="handleDelete"></u-button>
				</view>
			</template>
		</edit-form>
		<!-- 请求 toast 提示 -->
		<u-toast ref='uToast'></u-toast>
	</view>
</template>

<script>
import { regionData } from 'element-china-area-data'
import { sysManagerSaveOrEdit, sysManagerFindById, sysManagerDeleteByIds } from '@/api/loginApi.js'
import { formatDate } from '@/utils/util.js'
export default {
  data() {
    return {
			isSave: true,
			editId: '',
			formDataSource: [
				{
					type: 'text',
					labelText: this.$t('addManager.form.empNo'),
					fieldName: 'empNo',
					placeholder: this.$t('addManager.form.empNoPlace'),
					maxlength: 30,
					required: true,
					disabled: false,
					rules: [
						{
							required: true,
							message: this.$t('addManager.form.empNoPlace'),
							trigger: ['change','blur']
						},
						{
							pattern: /^[0-9a-zA-Z]*$/,
							// 正则检验前先将值转为字符串
							transform(value) {
								return String(value);
							},
							message: this.$t('addManager.form.empNoMessage'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'text',
					labelText: this.$t('addManager.form.name'),
					fieldName: 'name',
					placeholder: this.$t('addManager.form.namePlace'),
					maxlength: 30,
					required: true,
					rules: [
						{
							required: true,
							message: this.$t('addManager.form.namePlace'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'actionSheet',
					labelText: this.$t('addManager.form.sex'),
					fieldName: 'sex',
					placeholder: this.$t('addManager.form.sexPlace'),
					required: true,
					showOptions: false,
					options: this.$t('addManager.form.sexOptions'),
					defaultValue: this.$t('addManager.form.sexOptions')[0].value,
					rules: [
						{
							required: true,
							message: this.$t('addManager.form.sexPlace'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'text',
					labelText: this.$t('addManager.form.phone'),
					fieldName: 'phone',
					placeholder: this.$t('addManager.form.phonePlace'),
					maxlength: 11,
					required: true,
					rules: [
						{
							required: true,
							message: this.$t('addManager.form.phonePlace'),
							trigger: ['change','blur']
						},
						{
							pattern: /^1[0-9]{10}$/,
							// 正则检验前先将值转为字符串
							transform(value) {
								return String(value);
							},
							message: this.$t('addManager.form.phoneMessage'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'text',
					labelText: this.$t('addManager.form.account'),
					fieldName: 'account',
					placeholder: this.$t('addManager.form.accountPlace'),
					required: true,
					maxlength: 12,
					rules: [
						{
							required: true,
							message: this.$t('addManager.form.accountPlace'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'actionSheet',
					labelText: this.$t('addManager.form.customerAuth'),
					fieldName: 'customerAuth',
					placeholder: this.$t('addManager.form.customerAuthPlace'),
					showOptions: false,
					options: this.$t('addManager.form.customerAuthOptions'),
					defaultValue: 2
				},
				{
					type: 'date',
					labelText: this.$t('addManager.form.birthdayStr'),
					fieldName: 'birthdayStr',
					placeholder: this.$t('addManager.form.birthdayStrPlace')
				},
				{
					type: 'cascader',
					labelText: this.$t('addManager.form.nativePlace'),
					fieldName: 'nativePlace',
					placeholder: this.$t('addManager.form.nativePlacePlace'),
					isProvinces: true,
					options: regionData,
					defaultValue: []
				},
				{
					type: 'actionSheet',
					labelText: this.$t('addManager.form.education'),
					fieldName: 'education',
					placeholder: this.$t('addManager.form.educationPlace'),
					showOptions: false,
					options: this.$t('addManager.form.educationOptions')
				},
				{
					type: 'switch',
					labelText: this.$t('addManager.form.state'),
					fieldName: 'state',
					inputAlign: 'right',
					required: true,
					activeValue: 1,
					inactiveValue: 2,
					defaultValue: 1,
					rules: [
						{
							type: 'number',
							required: true,
							message: this.$t('addManager.form.statePlace'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'text',
					labelText: this.$t('addManager.form.price'),
					fieldName: 'price',
					placeholder: this.$t('addManager.form.pricePlace'),
					maxlength: 12
				},
				{
					type: 'text',
					labelText: this.$t('addManager.form.idNumber'),
					fieldName: 'idNumber',
					placeholder: this.$t('addManager.form.idNumberPlace'),
					maxlength: 18
				},
				{
					type: 'textarea',
					labelText: this.$t('addManager.form.remarks'),
					fieldName: 'remarks',
					placeholder: this.$t('addManager.form.remarksPlace'),
					maxlength: 100
				},
				{
					type: 'upload',
					labelText: this.$t('addManager.form.headPhoto'),
					fieldName: 'headPhoto',
					limit: 1,
					defaultValue: [],
					required: true,
					rules: [
						{
							type: 'array',
							required: true,
							message: this.$t('addManager.form.headPhotoPlace'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'upload',
					labelText: this.$t('addManager.form.idPhoto'),
					fieldName: 'idPhoto',
					limit: 2,
					defaultValue: []
				}
			],
			formDataValue: {},
			toData: [] // 选中的组织
		}
  },
  onLoad(options) {
		this.editId = options.editId || ''
		if (this.editId) {
			this.isSave = false
			uni.setNavigationBarTitle({
				title: this.$t('addManager.titleTextInfo')
			});
			this.formDataSource.forEach(v=>{
				v.disabled = true
			})
			this.getInfo()
		} else {
			this.isSave = true
			uni.setNavigationBarTitle({
				title: this.$t('addManager.titleText')
			});
		}
  },
	onShow() {
		// 添加监听事件
		uni.$once('chooseData', (data) => {
			this.toData = data
		})
	},
  methods: {
    // 详情
    async getInfo() {
			const { returnValue: res } = await sysManagerFindById({ id: this.editId })
      if (res) {
				// 图片转换
				res.headPhoto = this.$options.filters.pictureConversion(res.headPhoto)
				res.idPhoto = this.$options.filters.pictureConversion(res.idPhoto)
				res.nativePlace = res.nativePlace.Split(',')
				res.birthdayStr = res.birthday ? formatDate(res.birthday) : ''
				this.formDataValue = res
				// 渲染岗位
				this.switchTree(res.inIdentityList)
      }
    },
		// 转换树结构
		switchTree(arr) {
			const toData = []
			arr.forEach((v, i) => {
				const obj = {
					children: [],
					id: v.orgId,
					name: v.orgName
				}
				v.roleGroupShow.forEach((m, n) => {
					// 判断有没有部门id
					if (obj.children.length !== 0) {
						const index = obj.children.findIndex((item) => item.id === m.deptId)
						if (index === -1) {
							// 不存在的部门
							const obj1 = {
								children: [],
								id: m.deptId,
								name: m.deptName
							}
							obj1.children.push({
								children: [],
								id: m.roleId,
								name: m.roleName
							})
							obj.children.push(obj1)
						} else {
							// 存在部门
							obj.children[index].children.push({
								children: [],
								id: m.roleId,
								name: m.roleName
							})
						}
					} else {
						// 不存在部门
						const obj1 = {
							children: [],
							id: m.deptId,
							name: m.deptName,
						}
						obj1.children.push({
							children: [],
							id: m.roleId,
							name: m.roleName
						})
						obj.children.push(obj1)
					}
				})
				toData.push(obj)
			})
			this.toData = toData
		},
    // 提交
    submitForm() {
			this.$refs.dialogForm.handleSubmit(async(data) => {
				if (this.toData.length === 0) {
					this.$refs.uToast.show({
						type: 'error',
						message: this.$t('addManager.form.addIdentitiesPlace'),
					})
					return false
				}
				data.id = this.editId || ''
				data.headPhoto = this.$options.filters.isArrayToString(data.headPhoto)
				data.idPhoto = this.$options.filters.isArrayToString(data.idPhoto)
				data.nativePlace = data.nativePlace.length ? [data.province,data.city,data.area].join(',') : ''
				// 组织id
				data.identitiesList = []
				this.toData.forEach((v, i) => {
					const obj = {
						id: '',
						orgId: v.id,
						label: v.name,
						deptIds: [],
						roleIds: [],
						roleGroup: [],
						isDef: i === 0 ? 1 : 0,
						sortNo: i + 1
					}
					v.children.forEach((m, n) => {
						obj.deptIds.push(m.id)
						m.children.forEach((k, l) => {
							obj.roleIds.push(k.id)
							obj.roleGroup.push(m.id + '-' + k.id)
						})
					})
					obj.deptIds = obj.deptIds.join(',')
					obj.roleIds = obj.roleIds.join(',')
					obj.roleGroup = obj.roleGroup.join(',')
					data.identitiesList.push(obj)
				})
				data.identitiesList = JSON.stringify(data.identitiesList)
				const { returnValue: res, message } = await sysManagerSaveOrEdit(data)
				if (res) {
					this.$refs.uToast.show({
						type: 'success',
						message: message,
					})
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 2000)
				}
			})
    },
		// 删除组织
		deleteOrg(index) {
			if(this.isSave){
				this.toData.splice(index, 1)
			}
		},
		// 删除角色
		deleteRole(index,indexBox,indexSub){
			if(this.isSave){
				this.toData[index].children[indexBox].children.splice(indexSub,1)
				if(this.toData[index].children[indexBox].children.length === 0){
					// 角色删完了，删除部门
					this.toData[index].children.splice(indexBox,1)
				}
				// 部门删完了
				if(this.toData[index].children.length === 0){
					// 删除对应组织
					this.deleteOrg(index)
				}
			}
		},
		// 岗位角色
		addRole() {
			if(this.isSave){
				const roleId = []
				this.toData.forEach(v=>{
					v.children.forEach(m=>{
						m.children.forEach(n=>{
							roleId.push(n.id)
						})
					})
				})
				this.goto('/infoManage/postRole/postRole',{
					roleId: roleId.join(',')
				})
			}
		},
		// 删除
		handleDelete() {
			uni.showModal({
				title: this.$t('common.deleteTitle'),
				content: this.$t('common.deleteContent'),
				success: async(param) => {
					if (param.confirm) {
						const { returnValue: res, message } = await sysManagerDeleteByIds({ ids: [this.editId] })
						if(res){
							this.$refs.uToast.show({
								type: 'success',
								message: message,
							})
							setTimeout(() => {
							  uni.navigateBack({
							    delta: 1
							  })
							}, 2000)
						}
					}
				}
			})
		},
		// 编辑
		handleEdit() {
			this.isSave = true
			uni.setNavigationBarTitle({
				title: this.$t('addManager.titleTextEdit')
			});
			this.formDataSource.forEach(v=>{
				v.disabled = false
			})
		}
  },
	options:{
		styleIsolation: 'shared'
	}
}
</script>

<style lang="scss" scoped>
::v-deep .u-form-item .u-line{
	border-bottom: 1rpx solid rgba(229, 229, 229, 1) !important;
}
::v-deep .normalForm{
	margin: 20rpx 20rpx;
	.u-form{
		background: rgba(255, 255, 255, 1);
		box-shadow: 0rpx 4rpx 8rpx rgba(0, 0, 0, 0.04);
		border-radius: 16rpx;
		width: 710rpx;
		padding: 10rpx 10rpx;
		box-sizing: border-box;
	}
	::v-deep .u-upload__button{
		margin: 0rpx;
	}
	.btn{
		width: 632rpx;
		margin: 60rpx auto;
		@include flexMixin(column);
		.u-button{
			margin: 20rpx 10rpx;
		}
	}
	.addRole{
		@include flexMixin(row,flex-end);
		font-size: 32rpx;
		font-weight: 400;
		color: rgba(42, 130, 228, 1);
		width: 100%;
	}
	.draggable{
		padding: 10rpx 16rpx;
	}
	.org-box{
		width: 100%;
		background: rgba(247, 247, 247, 1);
		@include flexMixin(row,flex-start,flex-start);
		padding: 20rpx;
		border-radius: 10rpx;
		box-sizing: border-box;
		margin-bottom: 20rpx;
		.center{
			flex: 1;
			.org-label{
				color: rgba(56, 56, 56, 1);
				font-size: 32rpx;
				display: block;
			}
			.box-case{
				@include flexMixin(row,flex-start);
				background: #E8E8E8;
				font-size: 28rpx;
				font-weight: 400;
				color: rgba(56, 56, 56, 1);
				display: inline-flex;
				padding: 8rpx 20rpx;
				border-radius: 28rpx;
				margin: 10rpx 20rpx 10rpx 0rpx;
				.u-icon{
					margin-left: 20rpx;
				}
			}
		}
		.icon{
			width: 36rpx;
			height: 40rpx;
		}
	}
}
</style>
