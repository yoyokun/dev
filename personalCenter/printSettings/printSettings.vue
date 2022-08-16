<template>
  <view class="container">
		<view class="personalInfo">
			<edit-form
				ref="dialogForm"
				labelWidth="80"
				classForm="normalForm"
				:form-data-source="formDataSource"
				:form-data-value="formDataValue"
				@change="changeForm"
				>
			</edit-form>
		</view>
		<!-- 请求 toast 提示 -->
		<u-toast ref='uToast'></u-toast>
  </view>
</template>

<script>
import { sysManagerEditPwd } from '@/api/loginApi.js'
export default {
  data() {
    return {
			formDataSource: [
				{
					type: 'switch',
					labelText: this.$t('printSettings.form.printSettings'),
					fieldName: 'printSettings',
					inputAlign: 'right',
					borderBottom: false,
					labelWidth: 150,
					activeValue: 1,
					inactiveValue: 2,
					defaultValue: 1
				}
			],
			formDataValue: {}
    }
  },
	onShow() {
		uni.setNavigationBarTitle({
			title: this.$t('printSettings.titleText')
		});
		this.$nextTick(()=>{
			this.formDataValue = {
				printSettings: this.printSettings
			}
		})
	},
  methods: {
		// 表单改变
		changeForm(obj) {
			if(obj.name === 'printSettings'){
				this.$store.commit('settings/SET_PRINTSETTINGS', obj.queryParams.printSettings)
				this.$refs.uToast.show({
					type: 'success',
					message: this.$t('printSettings.saveCuccess'),
				})
				setTimeout(() => {
				  uni.navigateBack({
				    delta: 1
				  })
				}, 2000)
			}
		}
  },
	options:{
		styleIsolation: 'shared'
	}
}
</script>

<style lang="scss" scoped>
.personalInfo{
	height: 100vh;
	position: relative;
	padding-top: 20rpx;
	box-sizing: border-box;
	::v-deep .normalForm{
		margin: 20rpx 20rpx;
		width: 710rpx;
		box-sizing: border-box;
		.u-form-item{
			background: rgba(255, 255, 255, 1);
			box-shadow: 0rpx 4rpx 8rpx rgba(0, 0, 0, 0.04);
			border-radius: 16rpx;
			&:first-child{
				margin-bottom: 20rpx;
				border: 1rpx solid rgba(181, 216, 255, 1);
				box-shadow: none;
			}
		}
	}
}
</style>
