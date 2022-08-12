<template>
  <div>
    <el-tabs v-model="type">
      <el-tab-pane label="基本信息" name="1">
        <description-list title="基础信息" col="12" :content="info" border>
          <description label="订单编号">{{ info.billNo }}</description>
          <description label="订单来源">{{ info.orderSource | orderSource }}</description>
          <description label="订单金额">{{ info.goodsTotalMoney }}</description>
          <description label="收费项金额">{{ info.payItemsMoney }}</description>
          <description label="优惠金额">{{ info.couponTotalMoney }}</description>
          <description label="应收金额">{{ info.totalMoney }}</description>
          <description label="订单状态">{{ info.orderState | orderState }}</description>
          <description label="物流状态">{{ info.deliveryState | deliveryState }}</description>
          <description label="支付状态">{{ info.payState | payState }}</description>
          <description label="支付类型">{{ info.payType | payType }}</description>
          <description label="支付方式">{{ info.payTypeName }}</description>
          <description label="销售时间">{{ info.orderTime ? UnixToDate(info.orderTime) : '' }}</description>
          <description label="制单时间">{{ info.createTime | dayjs }}</description>
          <description label="完成时间">{{ info.finishTime ? UnixToDate(info.finishTime) : '' }}</description>
          <description label="操作时间">{{ info.operationTime ? UnixToDate(info.operationTime) : '' }}</description>
          <description label="备注信息">{{ info.remarks }}</description>
        </description-list>
        <description-list title="客户信息" col="12" :content="info" border>
          <description label="客户编号">{{ info.customerNo }}</description>
          <description label="客户名称">{{ info.customerName }}</description>
          <description label="客户电话">{{ salesOrderExtend.customerPhone }}</description>
          <description label="会员编号">{{ salesOrderExtend.customerAccount }}</description>
          <description label="客户分类">{{ salesOrderExtend.customerClassify | customerClassify }}</description>
          <description label="客户区域">{{ salesOrderExtend.regionName }}</description>
          <description label="客户类型">{{ salesOrderExtend.customerTypeName }}</description>
          <description label="客户标签">{{ salesOrderExtend.propertyNames }}</description>
        </description-list>
        <description-list title="运输信息" col="12" :content="info" border>
          <description label="提货方式">{{ salesOrderTransport.pickMode | pickMode }}</description>
          <description label="预约时间">{{ salesOrderTransport.bookingTime | dayjs }}</description>
          <description label="车牌号">{{ (salesOrderTransport.pickMode !==1 && salesOrderTransport.pickMode !==4) ? salesOrderTransport.licenseNo : '' }}</description>
          <description label="收货人">{{ salesOrderTransport.linkman }}</description>
          <description label="收货电话">{{ salesOrderTransport.phone }}</description>
          <description label="收货地址">{{ salesOrderTransport | addressSplicing }}</description>
          <description label="配送组织">{{ salesOrderTransport.pickMode === 4 ? salesOrderTransport.deliverOrgName : '' }}</description>
          <description label="配送员/运输员">{{ (salesOrderTransport.pickMode === 3 || salesOrderTransport.pickMode === 4) ? salesOrderTransport.deliverMan : '' }}</description>
          <description label="费用详细">{{ info.payItemsName }}</description>
          <description label="合计运费">{{ info.payItemsMoney }}</description>
        </description-list>
        <description-list title="订单折扣" col="12" :content="info" border>
          <description label="优惠券号">{{ info.coupon ? info.coupon.couponNo : '' }}</description>
          <description label="优惠券金额">{{ info.couponMoney }}</description>
          <description label="抵扣积分">{{ info.integralValue }}</description>
          <description label="抵扣金额">{{ info.integralMoney }}</description>
          <description label="折扣金额">{{ info.disCountMoney }}</description>
          <description label="折扣率（%）">{{ info.disCountRate }}%</description>
          <description label="合计优惠">{{ info.couponTotalMoney }}</description>
          <description label="成交金额（元）">{{ info.totalMoney }}</description>
        </description-list>
      </el-tab-pane>
      <el-tab-pane label="订单信息" name="2">
        <div v-for="item in salesOrderDetailList" :key="item.id">
          <div class="titleInfo"><i class="el-icon-s-flag" />{{ item.billName }}
            <label class="m-l20">子单编号：{{ item.subBillNo }}</label>
          </div>
          <s-table
            ref="stable"
            :table-column="item.printSetVo.tableColumn"
            :table-data="item.salesOrderDetailGoodsList || []"
            :operate="false"
            :pagination="false"
          />
        </div>
        <description-list v-if="salesOrderPayitemsList.length" title="收费项" col="12" :content="info" border>
          <description
            v-for="(item,index) in salesOrderPayitemsList"
            :key="item.id"
            :label="item.payItemsName"
            :col="index === (salesOrderPayitemsList.length-1) ? (salesOrderPayitemsList.length%2 ===0 ? '12': '24') : '12'">{{ item.payItemsMoney }},共{{item.payItemsTotalMoney}}</description>
        </description-list>
        <!--合计 -->
        <total class="total-box m-t20" :info-data="infoData" />
      </el-tab-pane>
      <el-tab-pane label="回瓶信息" name="3">
        <s-table
          ref="stable2"
          index="序号"
          :table-column="tableColumnBack"
          :table-data="salesOrderBackDetailList || []"
          :show-summary="true"
          :summary-method="getSummaries"
          :operate="false"
          :pagination="false"
        />
      </el-tab-pane>
      <el-tab-pane label="溯源信息" name="4">
        <service-cylinder-info v-if="editId" title="送达钢瓶" node-type="confirmDelivery" :link-id="editId" />
        <service-cylinder-info v-if="editId" title="回收钢瓶" node-type="recycleCylinder" :link-id="editId" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { salesOrderFindById } from '@/api/lpgSalesManageApi'
import { UnixToDate } from '@/utils/util'
export default {
  name: 'SalesOrdersInfo',
  components: {
  },
  // 过滤器
  filters: {
    orderState(value) {
      const stateObj = {
        1: '待支付',
        2: '已结算',
        3: '已完成',
        4: '已关闭',
        5: '已作废 '
      }
      return stateObj[value] || ''
    },
    customerClassify(value) {
      const stateObj = {
        1: '居民',
        2: '非居民'
      }
      return stateObj[value] || ''
    },
    payState(value) {
      const stateObj = {
        1: '待支付',
        2: '已支付',
        3: '已取消'
      }
      return stateObj[value] || ''
    },
    pickMode(value) {
      const stateObj = {
        1: '自提',
        2: '车辆自提',
        3: '车辆配送',
        4: '送气员配送'
      }
      return stateObj[value] || ''
    },
    payType(value) {
      const stateObj = {
        1: '线上支付',
        2: '线下支付',
        3: '线下支付 '
      }
      return stateObj[value] || ''
    },
    deliveryState(value) {
      const stateObj = {
        1: '待接单',
        2: '待发货',
        3: '配送中',
        4: '已送达'
      }
      return stateObj[value] || ''
    },
    orderSource(value) {
      const stateObj = {
        store: '门店',
        internet: '网上',
        phone: '电话至门店',
        callCenter: '客服中心'
      }
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
      UnixToDate: UnixToDate,
      type: '1',
      info: {},
      salesOrderTransport: {},
      salesOrderDetailList: [],
      salesOrderBackDetailList: [],
      salesOrderPayitemsList: [],
      salesOrderExtend: {},
      tableColumnBack: [
        {
          prop: 'goodsName',
          label: '商品名称'
        },
        {
          prop: 'propertyNames',
          label: '属性参数'
        },
        {
          prop: 'standardName',
          label: '规格'
        },
        {
          prop: 'unitsName',
          label: '单位'
        },
        {
          prop: 'totalNum',
          label: '出库数'
        },
        {
          prop: 'backNum',
          label: '回瓶数'
        },
        {
          prop: 'lendNum',
          label: '借瓶数'
        },
        {
          prop: 'returnNum',
          label: '还瓶数'
        }
      ],
      infoData: [
        {
          name: '合计收费项(元)',
          value: '0',
          type: 'money'
        },
        {
          name: '合计订单金额(元)',
          value: '0',
          type: 'money'
        },
        {
          name: '优惠金额(元)',
          value: '0',
          type: 'money'
        },
        {
          name: '应收金额(元)',
          value: '0',
          type: 'money'
        }
      ]
    }
  },
  computed: {
  },
  async created() {
  },
  mounted() {
    this.$nextTick(async() => {
      if (this.editId) {
        // 编辑
        this.getInfo(this.editId)
      }
    })
  },
  methods: {
    // 详情
    async getInfo(id) {
      const { returnValue: res } = await salesOrderFindById({ id })
      if (res) {
        const payTypeName = []
        const payItemsName = []
        // 结算信息
        res.salesOrderPayDetailList.forEach((v) => {
          payTypeName.push(`${v.collectionTypeName}:${v.payMoney}`)
        })
        res.payTypeName = payTypeName.join(',')
        // 收费项
        res.salesOrderPayitemsList.forEach((v) => {
          payItemsName.push(`${v.payItemsName}:${v.payItemsMoney},共${v.payItemsTotalMoney} `)
        })
        res.payItemsName = payItemsName.join(',')
        this.info = res
        this.salesOrderTransport = res.salesOrderTransport
        res.salesOrderDetailList.forEach((v) => {
          v.salesOrderDetailGoodsList.forEach((o) => {
            o.goodsPath = o.goodsPath.length ? (JSON.parse(o.goodsPath).length ? JSON.parse(o.goodsPath)[0].url : '') : ''
            o.assistUnitsList.forEach((n, j) => {
              v.printSetVo.tableColumn.forEach(m => {
                if (m.propValue === 'assistName-' + n.assistUnitsId) {
                  o[m.propValue] = n.netContent
                }
                if (m.propValue === 'netContent-' + n.assistUnitsId) {
                  o[m.propValue] = n.netContent
                }
              })
            })
          })
          v.salesOrderDetailGoodsList.push({
            amount: v.fillingNum,
            totalMoney: v.totalMoney,
            totalWeight: v.totalWeight,
            goodsName: '',
            propertyNames: '',
            unitsName: '合计',
            unitPrice: '',
            remarks: ''
          })
        })
        this.salesOrderDetailList = res.salesOrderDetailList
        this.salesOrderBackDetailList = res.salesOrderBackDetailList
        this.salesOrderExtend = res.salesOrderExtend
        this.salesOrderPayitemsList = res.salesOrderPayitemsList
        this.infoData[0].value = res.payItemsMoney
        this.infoData[1].value = res.goodsTotalMoney
        this.infoData[2].value = res.couponTotalMoney
        this.infoData[3].value = res.totalMoney
      }
    },
    // 合计
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      // 合计
      columns.forEach((column, index) => {
        if (index === 5) {
          sums[index] = '合计'
          return
        }
        // 出库数数量
        if (index === 6) {
          // 获取值
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
          } else {
            sums[index] = ''
          }
        }
        // 回瓶数量
        if (index === 7) {
          // 获取值
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return this.BigDecimal.add(prev, curr)
              } else {
                return prev
              }
            }, 0)
          } else {
            sums[index] = ''
          }
        }
        // 借瓶数
        if (index === 8) {
          // 获取值
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return this.BigDecimal.add(prev, curr)
              } else {
                return prev
              }
            }, 0)
          } else {
            sums[index] = ''
          }
        }
        // 还瓶数
        if (index === 9) {
          // 获取值
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return this.BigDecimal.add(prev, curr)
              } else {
                return prev
              }
            }, 0)
          } else {
            sums[index] = ''
          }
        }
      })
      this.totalNum = sums[7] // 实际充装数量
      return sums
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
