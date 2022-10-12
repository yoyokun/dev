<template>
  <view>
		<view class="customerBox">
			<view class="title">
				<text class="name">整改前</text>
			</view>
			<view class="content">
				<security-check
					v-if="safeTemplateItemVoArr1.length"
					ref="securityCheck"
					:safeSecurityResultNot="safeTemplateItemVoArr1"
					:disabled="true"
					:isSafeSecurity="false"
					:isResult="true"
				/>
			</view>
		</view>
		<view class="customerBox">
			<view class="title">
				<text class="name">整改后</text>
			</view>
			<view class="content">
				<!-- 整改后 -->
				<security-check
					v-if="safeTemplateItemVoArr2.length && state === 2"
					ref="securityCheck"
					:safeSecurityResultNot="safeTemplateItemVoArr2"
					:disabled="true"
					:isSafeSecurity="false"
					:isResult="true"
				/>
			</view>
		</view>
  </view>
</template>
<script>
import SecurityCheck from '@/securityManage/addSecurityCheck/common/securityCheck.vue'
export default {
  components: {
    SecurityCheck
  },
  props: {
    safeSecurityResultNot: {
      type: Array,
      default: () => {
        return []
      } // 整改数组
    },
    state: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      safeTemplateItemVoArr1: [],
      safeTemplateItemVoArr2: []
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    // 初始化数据
    initData() {
      const safeTemplateItemVoArr1 = []
      const safeTemplateItemVoArr2 = []
      this.safeSecurityResultNot.forEach((obj) => {
				safeTemplateItemVoArr1.push({
					cehckData: obj.cehckData,
					defData: obj.defData,
					id: obj.id,
					projectName: obj.projectName,
					itemKey: obj.itemKey,
					itemName: obj.itemName,
					itemType: obj.itemType,
					templateItemId: obj.templateItemId,
					resultData: this.state === 2 ? obj.rectifyData : obj.resultData,
					picture: obj.picture,
					score: obj.score,
					rectifyPicture: ''
				})
				safeTemplateItemVoArr2.push({
					cehckData: obj.cehckData,
					defData: obj.defData,
					id: obj.id,
					projectName: obj.projectName,
					itemKey: obj.itemKey,
					itemName: obj.itemName,
					itemType: obj.itemType,
					templateItemId: obj.templateItemId,
					resultData: obj.resultData,
					picture: '',
					score: obj.score,
					rectifyPicture: obj.rectifyPicture
				})
      })
      this.safeTemplateItemVoArr1 = safeTemplateItemVoArr1
      this.safeTemplateItemVoArr2 = safeTemplateItemVoArr2
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .project{
	margin: 0rpx;
	box-shadow: none;
	width: 690rpx;
}
</style>
