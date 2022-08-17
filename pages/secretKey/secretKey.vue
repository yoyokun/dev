<template>
  <view class="container">
		<view class="form-box" @click="show = true">
			<view class="title">{{$t('secretKey.title')}}</view>
			<view class="value">{{localeText}}</view>
			<u-icon name="arrow-right" color="#666666" size="15"></u-icon>
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
		<!--选择语言-->
		<u-picker 
		:show="show" 
		ref="uPicker" 
		:closeOnClickOverlay="true" 
		:columns="columns" 
		@confirm="switchLang" 
		@close="show = false"
		@cancel="show = false"></u-picker>
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
					type: 'text',
					labelText: this.$t('secretKey.form.title'),
					fieldName: 'title',
					placeholder: this.$t('secretKey.form.titlePlace'),
					readonly: true,
					borderBottom: true
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
			formDataValue: {},
			show: false,
			columns: [
				[this.$t('secretKey.chinese'), this.$t('secretKey.english')],
			]
    }
  },
	computed: {
		localeText() {
			if(this.locale === 'zh-CN'){
				return this.$t('secretKey.chinese')
			} else if(this.locale === 'en-US'){
				return this.$t('secretKey.english')
			}
		}
	},
	onShow() {
		uni.setNavigationBarTitle({
			title: this.$t('secretKey.titleText')
		});
	},
	mounted() {
		this.formDataValue = {
			title: this.$t('secretKey.form.titleValue'),
			key: this.secretKey
		}
	},
  methods: {
		switchLang({indexs}) {
			if(indexs[0] === 0){
				// 中文
				this.$i18n.locale = 'zh-CN'
				this.$store.commit('settings/SET_LOCALE','zh-CN')
			} else if(indexs[0] === 1){
				// 英文
				this.$i18n.locale = 'en-US'
				this.$store.commit('settings/SET_LOCALE','en-US')
			}
			this.show = false
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
