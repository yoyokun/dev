<template>
  <view class="audit-info-content">
  	<view class="basic">
  		<view class="basic-item">
  			<view class="basic-tle">{{$t('auditInfo.capitalDrawInfo.basicTle')}}</view>
  			<view class="basic-box">
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.capitalDrawInfo.billNo')}}</view>
  					<view class="desc">{{info.billNo}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.capitalDrawInfo.outAccountName')[Math.ceil(info.moneyType/2)-1]}}</view>
  					<view class="desc">{{info.outAccountName}}</view>
  				</view>
  				<view class="item" v-if="info.moneyType >= 3">
  					<view class="tle">{{$t('auditInfo.capitalDrawInfo.inAccountName')}}</view>
  					<view class="desc">{{info.inAccountName}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.capitalDrawInfo.moneyType')}}</view>
  					<view class="desc">{{info.moneyType | moneyType}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.capitalDrawInfo.moneyTxt')[info.moneyType-1 - 1 >= 3 ? 2 : info.moneyType-1]}}</view>
  					<view class="desc">{{info.money | toThousandFilter}}</view>
  				</view>
  				<view class="item" v-if="info.moneyType !== 1">
  					<view class="tle">{{$t('auditInfo.capitalDrawInfo.poundage')}}</view>
  					<view class="desc">{{info.poundage | toThousandFilter}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.capitalDrawInfo.effectTime')}}</view>
  					<view class="desc">{{info.effectTime | dayjs}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.capitalDrawInfo.agentName')}}</view>
  					<view class="desc">{{info.agentName}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.capitalDrawInfo.linkNo')}}</view>
  					<view class="desc">{{info.linkNo}}</view>
  				</view>
				<view class="item">
					<view class="tle">{{$t('auditInfo.capitalDrawInfo.creator')}}</view>
					<view class="desc">{{info.creator}}</view>
				</view>
				<view class="item">
					<view class="tle">{{$t('auditInfo.capitalDrawInfo.createTime')}}</view>
					<view class="desc">{{info.createTime | dayjs}}</view>
				</view>
				<view class="item">
					<view class="tle">{{$t('auditInfo.capitalDrawInfo.billNumber')}}</view>
					<view class="desc">{{info.billNumber}}</view>
				</view>
				<view class="item">
					<view class="tle">{{$t('auditInfo.capitalDrawInfo.remarks')}}</view>
					<view class="desc">{{info.remarks}}</view>
				</view>
				<view class="item">
					<view class="tle">{{$t('auditInfo.capitalDrawInfo.credentials')}}</view>
					<view class="desc">
						<image class="img" v-for="item in info.credentials" :key="item.id" :src="item.url"></image>
					</view>
				</view>
  			</view>
  		</view>
  	</view>
  </view>
</template>
<script>
let that = null
import { financeAccountRecordFindById } from '@/api/lpgSalesManageApi'
export default {
  name: 'CapitalDrawInfo',
  components: {
  },
  // 过滤器
  filters: {
    moneyType(value) {
      const stateObj = that.$t('auditInfo.capitalDrawInfo.moneyTypeTxt')
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
  computed: {
  },
  created(){
	that = this  
  },
  mounted() {
    this.$nextTick(async() => {
      if (this.editId) {
        // 编辑
        await this.getInfo(this.editId)
      }
    })
  },
  methods: {
    // 详情
    async getInfo(id) {
      const { returnValue: res } = await financeAccountRecordFindById({ id })
      if (res) {
        res.credentials = res.credentials.length ? JSON.parse(res.credentials) : []
        this.info = res
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
