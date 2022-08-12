<template>
  <description-list :title="$t('auditInfo.accountPeriodInfo.basicTle')" :content="info" border>
    <description :label="$t('auditInfo.accountPeriodInfo.billNo')">{{ info.billNo }}</description>
    <description :label="$t('auditInfo.accountPeriodInfo.outAccountId')">{{ info.outAccountId }}</description>
    <description :label="$t('auditInfo.accountPeriodInfo.balanceMoney')">{{ info.balanceMoney | toThousandFilter }}</description>
    <description :label="$t('auditInfo.accountPeriodInfo.lastMoney')">{{ info.lastMoney | toThousandFilter }}</description>
    <description :label="$t('auditInfo.accountPeriodInfo.effectTime')">{{ info.effectTime | dayjs }}</description>
    <description :label="$t('auditInfo.accountPeriodInfo.agentName')">{{ info.agentName }}</description>
    <description :label="$t('auditInfo.accountPeriodInfo.creator')">{{ info.creator }}</description>
    <description :label="$t('auditInfo.accountPeriodInfo.createTime')">{{ info.createTime | dayjs }}</description>
    <description :label="$t('auditInfo.accountPeriodInfo.remarks')">{{ info.remarks }}</description>
  </description-list>
</template>
<script>
import descriptionList from '@/components/descriptionList'
import {
  financeAccountRecordFindById
} from '@/api/lpgSalesManageApi'
export default {
  name: 'AccountPeriodInfo',
  components: { descriptionList },
  // 过滤器
  filters: {
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
  mounted() {
    this.$nextTick(async () => {
      if (this.editId) {
        // 编辑
        await this.getInfo(this.editId)
      }
    })
  },
  methods: {
    // 详情
    async getInfo(id) {
      const {
        returnValue: res
      } = await financeAccountRecordFindById({
        id
      })
      if (res) {
        res.lastMoney = this.$bigDecimal.round(this.$bigDecimal.subtract(res.balanceMoney, res.money), 2)
        this.info = res
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
