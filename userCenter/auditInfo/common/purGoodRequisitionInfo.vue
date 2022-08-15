<template>
  <view class="audit-info-content">
  	<view class="basic">
  		<view class="basic-item">
  			<view class="basic-tle">{{$t('auditInfo.purGoodRequisitionInfo.basicTle')}}</view>
  			<view class="basic-box">
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.purGoodRequisitionInfo.applyTime')}}</view>
  					<view class="desc">{{info.applyTime | dayjs}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.purGoodRequisitionInfo.purOrgName')}}</view>
  					<view class="desc">{{info.purOrgName}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.purGoodRequisitionInfo.creator')}}</view>
  					<view class="desc">{{info.creator}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.purGoodRequisitionInfo.orgName')}}</view>
  					<view class="desc">{{info.orgName}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.purGoodRequisitionInfo.remarks')}}</view>
  					<view class="desc">{{info.remarks}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.purGoodRequisitionInfo.state')}}</view>
  					<view class="desc">{{info.state | state}}</view>
  				</view>
  				<view class="item">
  					<view class="tle">{{$t('auditInfo.purGoodRequisitionInfo.attachment')}}</view>
  					<view class="desc">
  						<view class="down-list" v-for="(item,index) in info.attachment" :key="item.id">
  							<text>{{ index+1 }}.{{ item.name }}</text>
  							<text @click="downFile(item.url)">{{$t('auditInfo.purGoodRequisitionInfo.downloadTxt')}}</text>
  						</view>
  					</view>
  				</view>
  			</view>
  		</view>
  		<view class="basic-item">
  			<view class="basic-tle">{{$t('auditInfo.purGoodRequisitionInfo.goodsTle')}}</view>
  			<view class="basic-box">
  				<us-table :table-column="tableColumn" :table-data="tableData">
					<!-- #ifdef H5 || APP-PLUS -->
					<view slot="vehicleNote" slot-scope="row">
						<view v-for="(item,index) in row.data.vehicleNote" :key="item">{{ index+1 }}.{{ item }}</view>
					</view>
					<view slot="startingTime" slot-scope="row">
						{{ row.data.startingTime | dayjs }}
					</view>
					<!-- #endif -->
					<!-- #ifdef MP-->
					<view slot="vehicleNote" slot-scope="{row}">
						<view v-for="(item,index) in row.data.vehicleNote" :key="item">{{ index+1 }}.{{ item }}</view>
					</view>
					<view slot="startingTime" slot-scope="{row}">
						{{ row.data.startingTime | dayjs }}
					</view>
					<!-- #endif -->
				</us-table>
  			</view>
  		</view>
  	</view>
  </view>
</template>
<script>
let that = null
import { purApplyFindById } from '@/api/lpgSalesManageApi'
export default {
  name: 'PurGoodRequisitionInfo',
  components: {
  },
  // 过滤器
  filters: {
    state(value) {
      const stateObj = that.$t('auditInfo.purGoodRequisitionInfo.stateTxt')
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
          label: this.$t('auditInfo.purGoodRequisitionInfo.tableColumn.goodsNo')
        },
        {
          prop: 'goodsName',
          label: this.$t('auditInfo.purGoodRequisitionInfo.tableColumn.goodsName')
        },
        {
          prop: 'unitsName',
          label: this.$t('auditInfo.purGoodRequisitionInfo.tableColumn.unitsName')
        },
        {
          prop: 'propertyNames',
          label: this.$t('auditInfo.purGoodRequisitionInfo.tableColumn.propertyNames')
        },
        {
          prop: 'curStock',
          label: this.$t('auditInfo.purGoodRequisitionInfo.tableColumn.curStock')
        },
        {
          prop: 'amount',
          label: this.$t('auditInfo.purGoodRequisitionInfo.tableColumn.amount')
        },
        {
          prop: 'vehicleNum',
          label: this.$t('auditInfo.purGoodRequisitionInfo.tableColumn.vehicleNum')
        },
        {
          prop: 'vehicleNote',
          label: this.$t('auditInfo.purGoodRequisitionInfo.tableColumn.vehicleNote'),
          slot:'vehicleNote',
        },
        {
          prop: 'startingTime',
          label: this.$t('auditInfo.purGoodRequisitionInfo.tableColumn.startingTime'),
		  slot:'startingTime',
        },
        {
          prop: 'schedulingId',
          label: this.$t('auditInfo.purGoodRequisitionInfo.tableColumn.schedulingId')
        }
      ],
      tableData: [] // 商品
    }
  },
  computed: {
  },
  async created() {
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
      const { returnValue: res } = await purApplyFindById({ id })
      if (res) {
        res.attachment = res.attachment.length ? JSON.parse(res.attachment) : []
        this.info = res
        res.purApplyGoodss.forEach(v => {
          v.vehicleNote = JSON.parse(v.vehicleNote)
        })
        this.tableData = res.purApplyGoodss
      }
    },
    // 下载
    downFile(url) {
      // #ifdef APP-PLUS
      plus.runtime.openURL(url)
      // #endif
      // #ifdef H5
      window.open(url)
      // #endif
      // #ifdef MP
      uni.setClipboardData({
      	data: url,
      	success: () => {
      		this.$nextTick(() => {
      			uni.showToast({
      				title: '链接已复制，请在浏览器打开',
      				duration: 2000
      			});
      		})
      	}
      });
      // #endif
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
