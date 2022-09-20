<template>
  <view class="container">
		<edit-form
			ref="dialogForm"
			labelWidth="80"
			classForm="normalForm"
			:form-data-source="formDataSource"
			:form-data-value="formDataValue"
			@change="changeForm"
			>
			<template v-slot:extra>
				<view class="btn">
					<u-button :text="$t('common.btn.save')" type="primary" hairline shape="circle" @click="submitForm"></u-button>
				</view>
			</template>
		</edit-form>
		<!-- 请求 toast 提示 -->
		<u-toast ref='uToast'></u-toast>
  </view>
</template>

<script>
export default {
  data() {
    return {
			formDataSource: [
				{
					type: 'picker',
					labelText: this.$t('secretKey.form.lang'),
					fieldName: 'lang',
					placeholder: this.$t('secretKey.form.langPlace'),
					showOptions: false,
					options: this.$t('secretKey.form.langOptions'),
					disabled: false
				},
				{
					type: 'text',
					labelText: this.$t('secretKey.form.title'),
					fieldName: 'title',
					placeholder: this.$t('secretKey.form.titlePlace'),
					disabled: true
				},
				{
					type: 'text',
					labelText: this.$t('secretKey.form.key'),
					fieldName: 'key',
					placeholder: this.$t('secretKey.form.keyPlace'),
					maxlength: 100,
					borderBottom: false,
					rules: [
						{
							required: true, 
							message: this.$t('secretKey.form.keyPlace'),
							trigger: ['change','blur']
						}
					]
				}
			],
			formDataValue: {}
    }
  },
	onShow() {
		uni.setNavigationBarTitle({
			title: this.$t('secretKey.titleText')
		});
	},
	mounted() {
		this.formDataValue = {
			lang: this.locale,
			title: this.$t('secretKey.form.titleValue'),
			key: this.secretKey
		}
	},
  methods: {
		// 表单改变
		async changeForm(obj) {
			const queryParams = obj.queryParams
			const name = obj.name // 改变的字段
			if (name === 'lang' && queryParams.lang) {
				this.$i18n.locale = queryParams.lang
				this.$store.commit('settings/SET_LOCALE',queryParams.lang)
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					})
				}, 1000)
			}
		},
    // 提交
    submitForm() {
			this.$refs.dialogForm.handleSubmit(async(data) => {
				this.$store.commit('settings/SET_SEXRETKEY', data.key)
				if (this.token) {
					uni.navigateBack({
						delta: 1
					});
				} else {
					uni.reLaunch({
						url: "/pages/login/login"
					})
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
::v-deep .normalForm{
	width: 100%;
	background: rgba(255, 255, 255, 1);
	margin-top: 40rpx;
	.u-form{
		border-top: 1rpx solid rgba(181, 216, 255, 1);
		border-bottom: 1rpx solid rgba(181, 216, 255, 1);
	}
	.btn{
		margin-top: 50rpx;
		margin-left: 50rpx;
		margin-right: 50rpx;
	}
}
</style>
