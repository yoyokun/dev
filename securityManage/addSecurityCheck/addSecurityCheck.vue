<template>
  <view class="container">
		<view class="location" v-if="location">
			<image class="img" src="@/static/image/location.png" mode="widthFix"></image>
			{{ location }}
		</view>
		<edit-form
			ref="dialogForm"
			labelWidth="80"
			classForm="normalForm"
			@change="changeForm"
			@chooseCustomer="chooseCustomer"
			@chooseAddress="chooseAddress"
			:form-data-source="formDataSource"
			:form-data-value="formDataValue">
		</edit-form>
		<!-- 安检项目 -->
		<security-check
			v-if="templateInfo.safeTemplateItemVo && state === 2"
			ref="securityCheck"
			:safe-template-item-vo="templateInfo.safeTemplateItemVo"
		/>
		<!-- 安检结果 -->
		<edit-form
			v-if="state === 2"
			ref="dialogForm1"
			labelWidth="80"
			classForm="normalForm"
			:form-data-source="formDataSource1"
			:form-data-value="formDataValue1">
			<template v-slot:other>
				<u-form-item v-if="endDecide.includes('2')" :label="$t('security.addSecurityCheck.form.customerSign.label')" :borderBottom="endDecide.includes('3')">
					<view class="singnImg">
						<view class='sigin' @click="signCanvas(1)">
							<image class="img" v-if="customerSign" :src="customerSign" mode="widthFix"></image>
							<text v-else class="text">{{$t('security.addPatrolCheck.sigin')}}</text>
						</view>
						<u-checkbox-group>
							<u-checkbox :checked="customerSignRefuse" @change="customerSignRefuse = !customerSignRefuse" :label="$t('security.addSecurityCheck.form.customerSignRefuse.label')"></u-checkbox>
						</u-checkbox-group>
					</view>
					<u-icon name="arrow-right" color="#666666" size="15" @click="signCanvas(1)"></u-icon> 
				</u-form-item>
				<u-form-item v-if="endDecide.includes('3')" :label="$t('security.addSecurityCheck.form.managerSign.label')" :borderBottom="cylinderCode === 1 || cylinderCode === 2">
					<view class="singnImg" @click="signCanvas(2)">
						<image class="img" v-if="managerSign" :src="managerSign" mode="widthFix"></image>
						<text v-else class="text">{{$t('security.addPatrolCheck.sigin')}}</text>
					</view>
					<u-icon name="arrow-right" color="#666666" size="15" @click="signCanvas(2)"></u-icon> 
				</u-form-item>
				<u-form-item v-if="cylinderCode === 1 || cylinderCode === 2" :label="$t('security.addSecurityCheck.form.cylinderNum.label')">
					<input 
					v-if="cylinderCode === 2" 
					class="input" 
					step="1" 
					:placeholder="$t('security.addSecurityCheck.form.cylinderNum.placeholder')" 
					type="number"
					v-model="cylinderNum" />
					<view class="code-box">
						<u-input type="text" class="code-input" v-model="codeKey" shape="circle"
							:placeholder="$t('cylinderMg.addCirculation.form.codeKey.placeholder')">
							<view slot="suffix">
								<u-icon @click="toScan" size="40rpx" color="#3c9cff" name="scan"></u-icon>
							</view>
						</u-input>
						<u-button class="code-btn" type="primary" shape="circle" size="small" @click="searchCode">
							{{$t('cylinderMg.addCirculation.btn.conf')}}
						</u-button>
					</view>
				</u-form-item>
				<view class="form-item" v-if="codeKeysArr.length">
					<view class="item-bottom">
						<view class="item-cell" v-for="(item, index) in codeKeysArr" :key="index">
							<text>{{item}}</text>
							<u-icon @click.stop.native="delCodekey(index)" color="#999" class="icon"
								name="close-circle-fill" size="20"></u-icon>
						</view>
					</view>
				</view>
			</template>
		</edit-form>
		<view class="btn" v-if="isSave">
			<u-button :text="$t('common.btn.save')" type="primary" hairline shape="circle" @click="submitForm"></u-button>
		</view>
		<!-- 请求 toast 提示 -->
		<u-toast ref='uToast'></u-toast>
	</view>
</template>

<script>
let that = null
import { userCustomerFindByIdList, cylinderArchivesFindByCodeKey } from '@/api/lpgManageAppApi.js'
import { safeSecuritySaveOrEdit, safeSecurityFindById, safeSecurityDeleteByIds, safeTemplateFindById } from '@/api/lpgSecurityManageApi.js'
import { settingMixin } from '@/common/settingMixin.js'
import SecurityCheck from '@/securityManage/addSecurityCheck/common/securityCheck.vue'
import permision from '@/common/wa-permission/permission.js'
export default {
	components: {
		SecurityCheck
	},
	mixins: [settingMixin],
	// 过滤器
	filters: {
		state(value) {
			const stateObj = that.$t('security.securityCheckList.stateObj')
			return stateObj[value] || ''
		}
	},
  data() {
    return {
			location: '',
			longitude: '',
			latitude: '',
			isSave: true,
			editId: '',
			info: {},
			formDataSource: [
				{
					type: 'chooseBtn',
					labelText: this.$t('security.addSecurityCheck.form.customerName.label'),
					fieldName: 'customerName',
					placeholder: this.$t('security.addSecurityCheck.form.customerName.placeholder'),
					showOptions: false,
					required: true,
					options: [],
					disabled: false,
					func: 'chooseCustomer',
					rules: [
						{
							required: true,
							message: this.$t('security.addSecurityCheck.form.customerName.placeholder'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'chooseBtn',
					labelText: this.$t('security.addSecurityCheck.form.address.label'),
					fieldName: 'address',
					placeholder: this.$t('security.addSecurityCheck.form.address.placeholder'),
					showOptions: false,
					required: true,
					options: [],
					disabled: false,
					func: 'chooseAddress',
					rules: [
						{
							required: true,
							message: this.$t('security.addSecurityCheck.form.address.placeholder'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'picker',
					labelText: this.$t('security.addSecurityCheck.form.orgId.label'),
					fieldName: 'orgId',
					placeholder: this.$t('security.addSecurityCheck.form.orgId.placeholder'),
					showOptions: false,
					required: true,
					options: [],
					disabled: false,
					rules: [
						{
							required: true,
							message: this.$t('security.addSecurityCheck.form.orgId.placeholder'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'picker',
					labelText: this.$t('security.addSecurityCheck.form.managerId.label'),
					fieldName: 'managerId',
					placeholder: this.$t('security.addSecurityCheck.form.managerId.placeholder'),
					showOptions: false,
					required: true,
					options: [],
					disabled: false,
					rules: [
						{
							required: true,
							message: this.$t('security.addSecurityCheck.form.managerId.placeholder'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'picker',
					labelText: this.$t('security.addSecurityCheck.form.templateId.label'),
					fieldName: 'templateId',
					placeholder: this.$t('security.addSecurityCheck.form.templateId.placeholder'),
					showOptions: false,
					required: true,
					options: [],
					disabled: false,
					rules: [
						{
							required: true,
							message: this.$t('security.addSecurityCheck.form.templateId.placeholder'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'actionSheet',
					labelText: this.$t('security.addSecurityCheck.form.state.label'),
					fieldName: 'state',
					placeholder: this.$t('security.addSecurityCheck.form.state.placeholder'),
					showOptions: false,
					required: true,
					options: this.$t('security.addSecurityCheck.form.state.options'),
					disabled: false,
					borderBottom: false,
					rules: [
						{
							required: true,
							type: 'number',
							message: this.$t('security.addSecurityCheck.form.state.placeholder'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'textarea',
					labelText: this.$t('security.addSecurityCheck.form.refuseNote.label'),
					fieldName: 'refuseNote',
					placeholder: this.$t('security.addSecurityCheck.form.refuseNote.placeholder'),
					maxlength: 100,
					show: false,
					borderBottom: false,
					required: true,
					rules: [
						{
							required: true,
							message: this.$t('security.addSecurityCheck.form.refuseNote.placeholder'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'textarea',
					labelText: this.$t('security.addSecurityCheck.form.refuseNote1.label'),
					fieldName: 'refuseNote',
					placeholder: this.$t('security.addSecurityCheck.form.refuseNote1.placeholder'),
					maxlength: 100,
					show: false,
					borderBottom: false,
					required: true,
					rules: [
						{
							required: true,
							message: this.$t('security.addSecurityCheck.form.refuseNote1.placeholder'),
							trigger: ['change','blur']
						}
					]
				}
			],
			formDataValue: {},
			orgId: '', // 组织id
			state: 2, // 状态 2 正常安检 3 无法安检 5客户拒检
			customerId: '', // 客户id
			addressId: '', // 客户联系人id
			classify: '', // 客户类型 用来查询模板
			endDecide: [],
			cylinderCode: '',
			formDataSource1: [
				{
					type: 'textarea',
					labelText: this.$t('security.addSecurityCheck.form.remarks.label'),
					fieldName: 'remarks',
					borderBottom: true,
					placeholder: this.$t('security.addSecurityCheck.form.remarks.placeholder'),
					maxlength: 100
				},
				{
					type: 'upload',
					labelText: this.$t('security.addSecurityCheck.form.picture.label'),
					fieldName: 'picture',
					limit: 2,
					borderBottom: true,
					show: false,
					defaultValue: []
				}
			],
			formDataValue1: {},
			customerSign: '',
			managerSign: '',
			templateInfo: {},// 模板详情
			cylinderNum: '',
			codeKeysArr: [],
			codeKey: '',
			customerSignRefuse: false
		}
  },
  async onLoad(options) {
		this.editId = options.editId || ''
		this.getLocation()
		await this.init()
		if (this.editId) {
			await this.getInfo()
			this.handleEdit()
		} else {
			this.isSave = true
			uni.setNavigationBarTitle({
				title: this.$t('security.addSecurityCheck.titleText')
			});
			this.formDataValue = {
				orgId: this.userInfo.orgId,
				managerId: this.userInfo.id,
				state: 2
			}
		}
  },
	onShow() {
		// 添加监听事件
		uni.$once('saveSignCanvas', (data) => {
			if(data.type === '1') {
				this.customerSign = data.url
			} else if(data.type === '2') {
				this.managerSign = data.url
			}
		})
		// 添加监听事件
		uni.$once('chooseCustomer', async(data) => {
			this.customerId = data.id
			await this.getCustomerInfo(this.customerId)
		})
		// 添加监听事件
		uni.$once('chooseAddress', async(data) => {
			this.addressId = data.id
			this.formDataValue = {
				address: this.$options.filters.addressSplicing(data)
			}
		})
	},
	onUnload() {
		uni.$off('saveSignCanvas')
		uni.$off('chooseCustomer')
		uni.$off('chooseAddress')
	},
	async created(){
		that = this
	},
  methods: {
		// 获取定位
		async getLocation() {
			// #ifdef APP-PLUS
			var result = await permision.requestAndroidPermission('android.permission.ACCESS_FINE_LOCATION')
			if (result === 1) {
				// 定位
				uni.getLocation({
					type: 'gcj02',
					geocode: true,
					success: (res) => {
						console.log('定位成功');
						const address = res.address
						this.location = address.city + address.district + address.street + address
							.streetNum +
							address.poiName
						this.longitude = res.longitude
						this.latitude = res.latitude
					},
					fail: (err) => {
						console.log(err)
						console.log('定位失败')
						this.location = err.errMsg
					}
				});
			} else {
				this.location = '定位失败，未开启定位服务'
			}
			// #endif
			// #ifdef H5
			uni.getLocation({
				success: (res) => {
					this.longitude = res.longitude
					this.latitude = res.latitude
					this.longitudeAndLatitude(this.longitude,this.latitude)
				},
				fail: (err) => {
					console.log(err)
					console.log('定位失败')
					this.location = err.errMsg
				}
			});
			// #endif
		},
		// 根据经纬度查地址
		longitudeAndLatitude(longitude,latitude) {
			this.$jsonp('https://apis.map.qq.com/ws/geocoder/v1/', {
			  key: this.mapKey,
			  callbackName: 'getJsonData',
			  output: 'jsonp',
			  location: latitude + ',' + longitude
			}).then(json => {
				const result = json.result
				this.location = result.address
			})
		},
		// 初始化
		async init() {
			// 获取应用组织
			await this.getOrgList()
			this.formDataSource[2].options = this.orgList
			// 查归属成员
			await this.getManagerFindList({ orgId: this.userInfo.orgId })
			this.formDataSource[3].options = this.managerList
		},
		// 选择客户
		chooseCustomer() {
			this.goto('/infoManage/chooseCustomer/chooseCustomer',{
				customerId: this.customerId,
				orgId: this.userInfo.orgId
			})
		},
		// 查询客户详情
		async getCustomerInfo(id, addressId) {
			const { returnValue: res } = await userCustomerFindByIdList({ id })
			if (res) {
				this.classify = res.classify
				if (!addressId && res.userAddress) {
					this.addressId = res.userAddress.id
					this.formDataValue = {
						address: this.$options.filters.addressSplicing(res.userAddress),
						customerName: res.customerName
					}
					// textarea 触发 input 事件bug
					this.getTemplate()
				} else if (!addressId && !res.userAddress) {
					this.addressId = ''
					this.formDataValue = {
						address: '',
						customerName: ''
					}
					this.$refs.uToast.show({
						type: 'error',
						message: '该客户无地址，请添加！',
					})
				}
			}
		},
		// 选择地址
		chooseAddress() {
			if(this.customerId) {
				this.goto('/infoManage/chooseAddress/chooseAddress',{
					customerId: this.customerId,
					addressId: this.addressId
				})
			}
		},
		// 表单改变
		async changeForm(obj) {
			const queryParams = obj.queryParams
			const name = obj.name // 改变的字段
			this.orgId = queryParams.orgId
			this.state = queryParams.state
			if (name === 'orgId' && queryParams.orgId) {
				// 组织变化，查归属成员
				await this.getManagerFindList({ orgId: queryParams.orgId })
				this.formDataSource[3].options = this.managerList
				if (queryParams.orgId === this.userInfo.orgId) {
					// 默认归属成员
					queryParams.managerId = this.userInfo.id
				} else {
					// 重置归属成员
					queryParams.managerId = ''
				}
				this.formDataValue = queryParams
				this.getTemplate(queryParams)
			} else if(name === 'templateId' && queryParams.templateId) {
				this.templateChange(queryParams.templateId)
			} else if(name === 'state' && queryParams.state) {
				if(queryParams.state === 2) {
					// 正常安检
					this.formDataSource[5].borderBottom = false
					this.formDataSource[6].show = false
					this.formDataSource[7].show = false
				} else if(queryParams.state === 3) {
					// 无法安检
					this.formDataSource[5].borderBottom = true
					this.formDataSource[6].show = true
					this.formDataSource[7].show = false
				} else if(queryParams.state === 5) {
					// 客户拒检
					this.formDataSource[5].borderBottom = true
					this.formDataSource[6].show = false
					this.formDataSource[7].show = true
				}
			}
		},
		// 查询模板
		async getTemplate(templateId) {
			if(this.orgId && this.classify){
				await this.getTemplateList({
					orgId: this.orgId,
					state: 1,
					classify: this.classify
				})
				this.formDataSource[4].options = this.templateList
				if(!templateId) {
					// 默认第一个
					this.formDataValue = {
						templateId: this.templateList[0].value
					}
					this.templateChange(this.templateList[0].value)
				} else {
					this.templateChange(templateId)
				}
			}
		},
		// 选择模板改变
		async templateChange(templateId) {
			// 查询模板详情
			const { returnValue: res } = await safeTemplateFindById({ id: templateId })
			if (res) {
				for (const key in res.safeTemplateItemVo) {
					res.safeTemplateItemVo[key].picture = []
				}
				this.templateInfo = res
				this.endDecide = res.endDecide ? res.endDecide.Split(',') : [],
				this.cylinderCode = res.cylinderCode
				if(this.endDecide.includes('1')) {
					this.formDataSource1[0].borderBottom = true
					this.formDataSource1[1].show = true
					if(this.endDecide.includes('2') || this.endDecide.includes('3')) {
						this.formDataSource1[1].borderBottom = true
					} else {
						this.formDataSource1[1].borderBottom = false
					}
				} else {
					this.formDataSource1[1].show = false
				}
				if(this.endDecide.length === 0 && res.cylinderCode === 3) {
					this.formDataSource1[0].borderBottom = false
				}
			}
		},
		// 详情
    async getInfo() {
			const { returnValue: res } = await safeSecurityFindById({ id: this.editId })
      if (res) {
				this.addressId = res.addressId
				res.address = this.$options.filters.addressSplicing(res.userCustomerVo.userAddress)
				this.orgId = res.orgId // 组织id
				this.customerId = res.customerId // 客户id
				this.addressId = res.addressId // 客户联系人id
				this.classify = res.userCustomerVo.classify // 客户类型 用来查询模板
				await this.getTemplate(res.templateId)
				if(res.state === 1) {
					res.state = 2
				}
				res.picture = this.$options.filters.pictureJsonParse(res.picture)
				this.state = res.state
				this.formDataValue = res
				this.formDataValue1 = res
				this.info = res
      }
    },
    // 提交
    submitForm() {
			if(this.state === 2) {
				// 正常安检
				this.$refs.dialogForm.handleSubmit(async(data) => {
					this.$refs.dialogForm1.handleSubmit(async(parma) => {
						const securityResultData = this.$refs.securityCheck.getSecurity()
						const obj = Object.assign(data,parma,{ securityResultData: JSON.stringify(securityResultData) })
						this.handleSave(obj)
					})
				})
			} else {
				// 无法安检 客户拒检
				this.$refs.dialogForm.handleSubmit(async(parma) => {
					this.handleSave(parma)
				})
			}
    },
		// 保存
		async handleSave(obj) {
			obj.id = this.editId || ''
			obj.addressId = this.addressId
			obj.customerId = this.customerId
			obj.managerSign = this.managerSign
			obj.customerSign = this.customerSign
			obj.picture = this.$options.filters.isArrayToString(obj.picture)
			obj.codeKeys = this.codeKeysArr.join(',')
			obj.cylinderNum = this.cylinderNum
			obj.location = this.location
			obj.longitude = this.longitude
			obj.latitude = this.latitude
			obj.customerSignRefuse = this.customerSignRefuse === true ? 1 : 2 // 客户拒签
			const { returnValue: res, message } = await safeSecuritySaveOrEdit(obj,this.$t('security.addSecurityCheck.saveTit'))
			if (res) {
				this.$refs.uToast.show({
					type: 'success',
					message: message,
				})
				uni.$emit('updateInfo', true)
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					})
				}, 2000)
			}
		},
		// 编辑
		handleEdit() {
			this.isSave = true
			uni.setNavigationBarTitle({
				title: this.$t('security.addSecurityCheck.titleTextEdit')
			});
			this.formDataSource.forEach((v,i) => {
				if(i === 0 || i === 2 || i === 3) {
					v.disabled = true
				} else {
					v.disabled = false
				}
			})
		},
		// 签名
		signCanvas(type) {
			if(this.isSave) {
				this.goto('/securityManage/signCanvas/signCanvas',{ type: type })
			}
		},
		// 查询二维码
		async searchCode(code = null) {
			this.codeKey = code || this.codeKey
			if (!this.codeKey) {
				this.$refs.uToast.show({
					type: 'error',
					message: this.$t('cylinderMg.addCirculation.tips.errCode')
				})
				return
			}
			const { returnValue: res } = await cylinderArchivesFindByCodeKey({ codeKey: this.codeKey }, this.$t('cylinderMg.addCirculation.loadTxt.finding'))
			if (res) {
				this.codeKeysArr.push(res.codeKey)
			} else {
				this.$refs.uToast.show({
					type: 'error',
					message: this.$t('cylinderMg.addCirculation.tips.errCode')
				})
			}
		},
		// 扫码
		async toScan() {
			const code = await this.decodeQr()
			if(code){
				this.searchCode(code)
			}
		},
		// 删除二维码
		delCodekey(index) {
			this.codeKeysArr.splice(index,1)
		}
  },
	options:{
		styleIsolation: 'shared'
	}
}
</script>

<style lang="scss" scoped>
.location{
	font-size: 32rpx;
	font-weight: 400;
	color: rgba(42, 130, 228, 1);
	width: 100%;
	padding: 20rpx 20rpx 0rpx 20rpx;
	box-sizing: border-box;
	@include flexMixin(row,flex-start);
	.img{
		width: 32rpx;
		height: 32rpx;
	}
}
::v-deep .u-form-item .u-line{
	border-bottom: 1rpx solid rgba(229, 229, 229, 1) !important;
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
	line-height: 40rpx;
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
}
.btn{
	width: 632rpx;
	margin: 60rpx auto;
	@include flexMixin(column);
	.u-button{
		margin: 20rpx 10rpx;
	}
}
.customerBox .title .name{
	font-size: 34rpx;
	line-height: 40rpx;
	padding: 20rpx 0rpx;
}
.customerBox .content{
	font-size: 32rpx;
	font-weight: 400;
	color: rgba(128, 128, 128, 1);
	padding: 20rpx;
}
.singnImg{
	flex: 1;
	@include flexMixin();
	.sigin{
		flex: 1;
	}
	.img{
		width: 200rpx;
	}
	.text{
		color: rgba(166, 166, 166, 1);
	}
}
.description{
	background: rgba(255, 255, 255, 1);
	box-shadow: 0rpx 4rpx 8rpx rgba(0, 0, 0, 0.04);
	border-radius: 16rpx;
	margin: 30rpx 20rpx 10rpx 20rpx;
	width: 710rpx;
}
.code-box {
	width: 100%;
	display: flex;
	align-items: center;
	.code-input {
		flex: 1;
		width: 1rpx;
		margin-right: 30rpx;
	}
	.code-btn {
		width: 100rpx !important;
	}
}
.form-item {
	padding: 0rpx 20rpx 20rpx 20rpx;
	.item-bottom {
		width: 100%;
		border-radius: 10rpx;
		background: rgba(247, 247, 247, 1);
		padding: 24rpx 20rpx;
		display: flex;
		flex-wrap: wrap;
		padding-top: 0;
		box-sizing: border-box;
		.item-cell {
			display: flex;
			align-items: center;
			padding: 0 20rpx;
			height: 56rpx;
			border-radius: 56rpx;
			background: rgba(0, 0, 0, 0.06);
			margin-right: 20rpx;
			margin-top: 24rpx;
			font-size: 30rpx;
			.icon {
				margin-left: 30rpx;
			}
		}
	}
}
</style>
