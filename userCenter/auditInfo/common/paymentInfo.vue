<template>
  <view class="audit-info-content">
  	<view class="basic">
  		<view class="basic-item">
  			<view class="basic-tle">{{$t('auditInfo.paymentInfo.basicTle')}}</view>
  			<view class="basic-box">
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.paymentInfo.billNo')}}</view>
  					<view class="desc">{{info.billNo}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.paymentInfo.orgName')}}</view>
  					<view class="desc">{{info.orgName}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.paymentInfo.payer')}}</view>
  					<view class="desc">{{info.payer}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.paymentInfo.shroffer')}}</view>
  					<view class="desc">{{info.shroffer}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.paymentInfo.transTypeName')}}</view>
  					<view class="desc">{{info.transTypeName}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.paymentInfo.formType')}}</view>
  					<view class="desc">{{info.formType | formType}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.paymentInfo.customerNo')}}</view>
  					<view class="desc">{{info.customerNo}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.paymentInfo.customerName')}}</view>
  					<view class="desc">{{info.customerName }}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.paymentInfo.moneyTxt')}}</view>
  					<view class="desc">{{info.money | toThousandFilter}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.paymentInfo.collectionTypeName')}}</view>
  					<view class="desc">{{info.collectionTypeName}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.paymentInfo.checkState')}}</view>
  					<view class="desc">{{info.checkState | checkState}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.paymentInfo.moneySourceType')}}</view>
  					<view class="desc">{{info.moneySourceType | moneySourceType}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.paymentInfo.linkBillNo')}}</view>
  					<view class="desc">{{info.linkBillNo}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.paymentInfo.linkType')}}</view>
  					<view class="desc">{{info.linkType | linkType}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.paymentInfo.billTime')}}</view>
  					<view class="desc">{{info.billTime | dayjs}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.paymentInfo.operator')}}</view>
  					<view class="desc">{{info.operator}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.paymentInfo.operationTime')}}</view>
  					<view class="desc">{{info.operationTime | dayjs}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.paymentInfo.remarks')}}</view>
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
  name: 'PaymentInfo',
  components: {
  },
  // 过滤器
  filters: {
    formType(value) {
      const stateObj = that.$t('auditInfo.paymentInfo.formTypeTxt')
      return stateObj[value] || ''
    },
    linkType(value) {
      const stateObj = that.$t('auditInfo.paymentInfo.linkTypeTxt')
      return stateObj[value] || ''
    },
    moneySourceType(value) {
      const stateObj = that.$t('auditInfo.paymentInfo.moneySourceTypeTxt')
      return stateObj[value] || ''
    },
    checkState(value) {
      const stateObj = that.$t('auditInfo.paymentInfo.checkStateTxt')
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
