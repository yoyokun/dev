<template>
  <view class="audit-info-content">
  	<view class="basic">
  		<view class="basic-item">
  			<view class="basic-tle">{{$t('auditInfo.receivableInfo.basicTle')}}</view>
  			<view class="basic-box">
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.receivableInfo.billNo')}}</view>
  					<view class="desc">{{info.billNo}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.receivableInfo.orgName')}}</view>
  					<view class="desc">{{info.orgName}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.receivableInfo.moneySourceType')}}</view>
  					<view class="desc">{{info.moneySourceType | moneySourceType}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.receivableInfo.formType')}}</view>
  					<view class="desc">{{info.formType | formType}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.receivableInfo.customerNo')}}</view>
  					<view class="desc">{{info.customerNo}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.receivableInfo.customerName')}}</view>
  					<view class="desc">{{info.customerName }}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.receivableInfo.totalMoney')}}</view>
  					<view class="desc">{{info.totalMoney | toThousandFilter}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.receivableInfo.settleMoney')}}</view>
  					<view class="desc">{{info.settleMoney | toThousandFilter}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.receivableInfo.errearMoney')}}</view>
  					<view class="desc">{{info.errearMoney | toThousandFilter}}</view>
  				</view>
				<view class="item">
					<view class="tle">{{$t('auditInfo.receivableInfo.state')}}</view>
					<view class="desc">{{info.state | state}}</view>
				</view>
				<view class="item">
					<view class="tle">{{$t('auditInfo.receivableInfo.checkState')}}</view>
					<view class="desc">{{info.checkState | checkState}}</view>
				</view>
				<view class="item">
					<view class="tle">{{$t('auditInfo.receivableInfo.linkBillNo')}}</view>
					<view class="desc">{{info.linkBillNo}}</view>
				</view>
				<view class="item">
					<view class="tle">{{$t('auditInfo.receivableInfo.linkType')}}</view>
					<view class="desc">{{info.linkType | linkType}}</view>
				</view>
				<view class="item">
					<view class="tle">{{$t('auditInfo.receivableInfo.orderTime')}}</view>
					<view class="desc">{{info.orderTime | dayjs}}</view>
				</view>
				<view class="item">
					<view class="tle">{{$t('auditInfo.receivableInfo.operator')}}</view>
					<view class="desc">{{info.operator}}</view>
				</view>
				<view class="item">
					<view class="tle">{{$t('auditInfo.receivableInfo.operationTime')}}</view>
					<view class="desc">{{info.operationTime | dayjs}}</view>
				</view>
				<view class="item">
					<view class="tle">{{$t('auditInfo.receivableInfo.remarks')}}</view>
					<view class="desc">{{info.remarks}}</view>
				</view>
  			</view>
  		</view>
  	</view>
  </view>
</template>
<script>
let that = null
import { financeMoneyLogFindById } from '@/api/lpgSalesManageApi'
export default {
  name: 'ReceivableInfo',
  components: {
  },
  // 过滤器
  filters: {
    formType(value) {
      const stateObj = that.$t('auditInfo.receivableInfo.formTypeTxt')
      return stateObj[value] || ''
    },
    linkType(value) {
      const stateObj = that.$t('auditInfo.receivableInfo.linkTypeTxt')
      return stateObj[value] || ''
    },
    moneySourceType(value) {
      const stateObj = that.$t('auditInfo.receivableInfo.moneySourceTypeTxt')
      return stateObj[value] || ''
    },
    state(value) {
      const stateObj = that.$t('auditInfo.receivableInfo.stateTxt')
      return stateObj[value] || ''
    },
    checkState(value) {
      const stateObj = that.$t('auditInfo.receivableInfo.checkStateTxt')
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
      const { returnValue: res } = await financeMoneyLogFindById({ id })
      if (res) {
        this.info = res
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
