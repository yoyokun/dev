<template>
  <view class="container">
		<view class="personalInfo">
			<view class="editInfo">
				<view class="form-box" @click="goto('/personalCenter/editPhone/editPhone',{},true)">
					<view class="title">{{$t('editInfo.phone')}}</view>
					<view class="value">{{ phone }}</view>
					<u-icon name="arrow-right" color="#666666" size="15"></u-icon>
				</view>
				<view class="form-box" @click="goto('/personalCenter/editPassword/editPassword',{},true)">
					<view class="title">{{$t('editInfo.password')}}</view>
					<view class="value">******</view>
					<u-icon name="arrow-right" color="#666666" size="15"></u-icon>
				</view>
			</view>
			<edit-form
				ref="dialogForm"
				labelWidth="80"
				classForm="normalForm"
				:form-data-source="formDataSource"
				:form-data-value="formDataValue"
				>
				<template v-slot:extra>
					<view class="btn">
						<u-button :text="$t('common.btn.save')" type="primary" hairline shape="circle" @click="submitForm"></u-button>
					</view>
				</template>
			</edit-form>
		</view>
		<!-- 请求 toast 提示 -->
		<u-toast ref='uToast'></u-toast>
	</view>
</template>

<script>
import { regionData } from 'element-china-area-data'
import { sysManagerFindBytoken, sysManagerEditManager } from '@/api/loginApi.js'
import { formatDate } from '@/utils/util.js'
export default {
  data() {
    return {
      phone: '',
			formDataSource: [
				{
					type: 'text',
					labelText: this.$t('editInfo.form.name'),
					fieldName: 'name',
					placeholder: this.$t('editInfo.form.namePlace'),
					inputAlign: 'right',
					maxlength: 30,
					required: true,
					rules: [
						{
							required: true,
							message: this.$t('editInfo.form.namePlace'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'actionSheet',
					labelText: this.$t('editInfo.form.sex'),
					fieldName: 'sex',
					placeholder: this.$t('editInfo.form.sexPlace'),
					inputAlign: 'right',
					required: true,
					showOptions: false,
					options: this.$t('editInfo.form.sexOptions'),
					defaultValue: '',
					rules: [
						{
							required: true,
							message: this.$t('editInfo.form.sexPlace'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'text',
					labelText: this.$t('editInfo.form.account'),
					fieldName: 'account',
					placeholder: this.$t('editInfo.form.accountPlace'),
					inputAlign: 'right',
					required: true,
					maxlength: 12,
					rules: [
						{
							required: true,
							message: this.$t('editInfo.form.accountPlace'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'date',
					labelText: this.$t('editInfo.form.birthdayStr'),
					fieldName: 'birthdayStr',
					placeholder: this.$t('editInfo.form.birthdayStrPlace'),
					inputAlign: 'right'
				},
				{
					type: 'cascader',
					labelText: this.$t('editInfo.form.nativePlace'),
					fieldName: 'nativePlace',
					placeholder: this.$t('editInfo.form.nativePlacePlace'),
					inputAlign: 'right',
					isProvinces: true,
					options: regionData,
					defaultValue: []
				},
				{
					type: 'actionSheet',
					labelText: this.$t('editInfo.form.education'),
					fieldName: 'education',
					placeholder: this.$t('editInfo.form.educationPlace'),
					inputAlign: 'right',
					showOptions: false,
					options: this.$t('editInfo.form.educationOptions'),
					defaultValue: ''
				},
				{
					type: 'text',
					labelText: this.$t('editInfo.form.idNumber'),
					fieldName: 'idNumber',
					placeholder: this.$t('editInfo.form.idNumberPlace'),
					inputAlign: 'right',
					maxlength: 18
				},
				{
					type: 'upload',
					labelText: this.$t('editInfo.form.headPhoto'),
					fieldName: 'headPhoto',
					inputAlign: 'right',
					limit: 1,
					defaultValue: [],
					required: true,
					rules: [
						{
							type: 'array',
							required: true,
							message: this.$t('editInfo.form.headPhotoPlace'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'upload',
					labelText: this.$t('editInfo.form.idPhoto'),
					fieldName: 'idPhoto',
					inputAlign: 'right',
					borderBottom: false,
					limit: 2,
					defaultValue: []
				}
			],
			formDataValue: {},
		}
  },
	onShow() {
		uni.setNavigationBarTitle({
			title: this.$t('editInfo.titleText')
		});
	},
  onLoad() {
		this.getUserInfo()
  },
  methods: {
    // 获取用户信息
    async getUserInfo() {
			const { returnValue: res } = await sysManagerFindBytoken()
      if (res) {
        // 图片转换
        res.headPhoto = this.$options.filters.pictureConversion(res.headPhoto)
        res.idPhoto = this.$options.filters.pictureConversion(res.idPhoto)
				res.nativePlace = res.nativePlace.Split(',')
				res.birthdayStr = res.birthday ? formatDate(res.birthday) : ''
        this.phone = res.phone
				this.formDataValue = res
      }
    },
    // 提交
    submitForm() {
			this.$refs.dialogForm.handleSubmit(async(data) => {
				data.headPhoto = this.$options.filters.isArrayToString(data.headPhoto)
				data.idPhoto = this.$options.filters.isArrayToString(data.idPhoto)
				data.nativePlace = data.nativePlace.length ? [data.province,data.city,data.area].join(',') : ''
				const { returnValue: res, message } = await sysManagerEditManager(data)
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
	box-sizing: border-box;
	padding-top: 20rpx;
	.grayred{
		margin-top: 24rpx;
	}
	.editInfo{
	  background: rgba(255, 255, 255, 1);
	  box-shadow: 0rpx 4rpx 8rpx rgba(0, 0, 0, 0.04);
	  border-radius: 16rpx;
		margin: 0rpx 20rpx;
		width: 710rpx;
		padding: 10rpx 10rpx;
		box-sizing: border-box;
		.form-box{
			.value{
				text-align: right;
				color: rgba(128, 128, 128, 1);
				font-size: 28rpx;
			}
			&:first-child{
				border-bottom: 1rpx solid rgba(181, 216, 255, 1);
			}
		}
	}
	::v-deep .normalForm{
		background: rgba(255, 255, 255, 1);
		box-shadow: 0rpx 4rpx 8rpx rgba(0, 0, 0, 0.04);
		border-radius: 16rpx;
		margin: 20rpx 20rpx;
		width: 710rpx;
		padding: 10rpx 10rpx;
		box-sizing: border-box;
		::v-deep .u-upload__button{
			margin: 0rpx;
		}
		.btn{
			width: 632rpx;
			margin: 60rpx auto;
		}
	}
}
</style>
