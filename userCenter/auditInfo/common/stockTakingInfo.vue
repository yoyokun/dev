<template>
  <view class="audit-info-content">
  	<view class="basic">
  		<view class="basic-item">
  			<view class="basic-tle">{{$t('auditInfo.stockTakingInfo.basicTle')}}</view>
  			<view class="basic-box">
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.stockTakingInfo.billNo')}}</view>
  					<view class="desc">{{info.billNo}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.stockTakingInfo.orgName')}}</view>
  					<view class="desc">{{info.orgName}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.stockTakingInfo.lockState')}}</view>
  					<view class="desc">{{info.lockState}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.stockTakingInfo.state')}}</view>
  					<view class="desc">{{info.state | state}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.stockTakingInfo.operator')}}</view>
  					<view class="desc">{{info.operator}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.stockTakingInfo.billTime')}}</view>
  					<view class="desc">{{info.billTime | dayjs}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.stockTakingInfo.checkState')}}</view>
  					<view class="desc">{{info.checkState | checkState}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.stockTakingInfo.remarks')}}</view>
  					<view class="desc">{{info.remarks}}</view>
  				</view>
  			</view>
  		</view>
  		<view class="basic-item">
  			<view class="basic-tle">{{$t('auditInfo.stockTakingInfo.tableTle')}}</view>
  			<view class="basic-box">
  				<UTable :table-column="tableColumn" :table-data="stockCheckLogDetailsList"></UTable>
  			</view>
  		</view>
  	</view>
  </view>
</template>
<script>
import UTable from './uTable'
import { stockCheckLogFindById } from '@/api/lpgSalesManageApi'
let that = null
export default {
  name: 'StockTakingInfo',
  components: {
    UTable
  },
  // 过滤器
  filters: {
    state(value) {
      const stateObj = that.$t('auditInfo.stockTakingInfo.stateTxt')
      return stateObj[value] || ''
    },
    checkState(value) {
      const stateObj = that.$t('auditInfo.stockTakingInfo.checkStateTxt')
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
      info: {},
      tableColumn: [
        {
          prop: 'goodsNo',
          label: this.$t('auditInfo.stockTakingInfo.tableColumn.goodsNo')
        },
        {
          prop: 'goodsName',
          label: this.$t('auditInfo.stockTakingInfo.tableColumn.goodsName')
        },
        {
          prop: 'brandName',
          label: this.$t('auditInfo.stockTakingInfo.tableColumn.brandName')
        },
        {
          prop: 'goodsClassifyName',
          label: this.$t('auditInfo.stockTakingInfo.tableColumn.goodsClassifyName')
        },
        {
          prop: 'standardName',
          label: this.$t('auditInfo.stockTakingInfo.tableColumn.standardName')
        },
        {
          prop: 'unitsName',
          label: this.$t('auditInfo.stockTakingInfo.tableColumn.unitsName')
        },
        {
          prop: 'propertyNames',
          label: this.$t('auditInfo.stockTakingInfo.tableColumn.propertyNames')
        },
        {
          prop: 'systemStockNum',
          label: this.$t('auditInfo.stockTakingInfo.tableColumn.systemStockNum')
        },
        {
          prop: 'checkStockNum',
          label: this.$t('auditInfo.stockTakingInfo.tableColumn.checkStockNum')
        },
        {
          prop: 'differences',
          label: this.$t('auditInfo.stockTakingInfo.tableColumn.differences')
        },
        {
          prop: 'inOutName',
          label: this.$t('auditInfo.stockTakingInfo.tableColumn.inOutName')
        },
        {
          prop: 'remarks',
          label: this.$t('auditInfo.stockTakingInfo.tableColumn.remarks')
        }
      ],
      stockCheckLogDetailsList: []
    }
  },
  created() {
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
      const { returnValue: res } = await stockCheckLogFindById({ id })
      if (res) {
        this.info = res
        res.stockCheckLogDetailsList.forEach((v) => {
          v.differences = this.$bigDecimal.round(this.$bigDecimal.subtract(v.checkStockNum, v.systemStockNum), 2)
          v.inOutName = v.inOutName + (v.inOutType === 1 ? '入库' : '出库')
        })
        this.stockCheckLogDetailsList = res.stockCheckLogDetailsList
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
