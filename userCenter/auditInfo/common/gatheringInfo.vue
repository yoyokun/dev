<template>
  <view class="audit-info-content">
  	<view class="basic">
  		<view class="basic-item">
  			<view class="basic-tle">{{$t('auditInfo.gatheringInfo.basicTle')}}</view>
  			<view class="basic-box">
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.gatheringInfo.billNo')}}</view>
  					<view class="desc">{{info.billNo}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.gatheringInfo.orgName')}}</view>
  					<view class="desc">{{info.orgName}}</view>
  				</view>
				<view class="item">
					<view class="tle">{{$t('auditInfo.gatheringInfo.payer')}}</view>
					<view class="desc">{{info.payer}}</view>
				</view>
				<view class="item">
					<view class="tle">{{$t('auditInfo.gatheringInfo.shroffer')}}</view>
					<view class="desc">{{info.shroffer}}</view>
				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.gatheringInfo.transTypeName')}}</view>
  					<view class="desc">{{info.transTypeName}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.gatheringInfo.formType')}}</view>
  					<view class="desc">{{info.formType | formType}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.gatheringInfo.customerNo')}}</view>
  					<view class="desc">{{info.customerNo}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.gatheringInfo.customerName')}}</view>
  					<view class="desc">{{info.customerName }}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.gatheringInfo.moneyTxt')}}</view>
  					<view class="desc">{{info.money | toThousandFilter}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.gatheringInfo.collectionTypeName')}}</view>
  					<view class="desc">{{info.collectionTypeName}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.gatheringInfo.checkState')}}</view>
  					<view class="desc">{{info.checkState | checkState}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.gatheringInfo.moneySourceType')}}</view>
  					<view class="desc">{{info.moneySourceType | moneySourceType}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.gatheringInfo.linkBillNo')}}</view>
  					<view class="desc">{{info.linkBillNo}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.gatheringInfo.linkType')}}</view>
  					<view class="desc">{{info.linkType | linkType}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.gatheringInfo.billTime')}}</view>
  					<view class="desc">{{info.billTime | dayjs}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.gatheringInfo.operator')}}</view>
  					<view class="desc">{{info.operator}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.gatheringInfo.operationTime')}}</view>
  					<view class="desc">{{info.operationTime | dayjs}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.gatheringInfo.remarks')}}</view>
  					<view class="desc">{{info.remarks}}</view>
  				</view>
  			</view>
  		</view>
  	</view>
  </view>
</template>
<script>
let that = null
import { financeMoneyBillLogFindById } from '@/api/lpgSalesManageApi'
export default {
  name: 'GatheringInfo',
  components: {
  },
  // 过滤器
  filters: {
    formType(value) {
      const stateObj = that.$t('auditInfo.gatheringInfo.formTypeTxt')
      return stateObj[value] || ''
    },
    linkType(value) {
      const stateObj = that.$t('auditInfo.gatheringInfo.linkTypeTxt')
      return stateObj[value] || ''
    },
    moneySourceType(value) {
      const stateObj = that.$t('auditInfo.gatheringInfo.moneySourceTypeTxt')
      return stateObj[value] || ''
    },
    checkState(value) {
      const stateObj = that.$t('auditInfo.gatheringInfo.checkStateTxt')
      return stateObj[value] || ''
    }
  },
  props: {
    editId: {
      type: [Number, String],
      default: ''
    }
  },
  data() {
    return {
      info: {}
    }
  },
  created(){
  	that = this  
  },
  mounted() {
    this.$nextTick(() => {
      if (this.editId) {
        // 编辑
        this.getInfo(this.editId)
      }
    })
  },
  methods: {
    // 详情
    async getInfo(id) {
      const { returnValue: res } = await financeMoneyBillLogFindById({ id })
      if (res) {
        this.info = res
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
