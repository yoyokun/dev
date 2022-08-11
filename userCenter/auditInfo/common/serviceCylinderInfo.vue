<template>
    <UTable
      :table-column="tableColumn"
      :table-data="tableData"
    ></UTable>
</template>
<script>
import UTable from './uTable'
import { cylinderFlowFindFlowList } from '@/api/lpgManageAppApi'

export default {
  name: 'ServiceCylinderInfo',
  components: {
    UTable
  },
  // 过滤器
  filters: {
  },
  props: {
    linkId: {
      type: [Number, String],
      default: ''
    },
    nodeType: {
      type: [Number, String],
      default: ''
    }
  },
  data() {
    return {
      tableColumn: [
        { prop: 'cylinderNo', label: this.$t('auditInfo.businessInfo.tableColumn.cylinderNo') },
        { prop: 'codeKey', label: this.$t('auditInfo.businessInfo.tableColumn.codeKey') },
        { prop: 'modelName', label: this.$t('auditInfo.businessInfo.tableColumn.modelName') },
        { prop: 'fillingStateStr', label: this.$t('auditInfo.businessInfo.tableColumn.fillingStateStr') },
        { prop: 'holderName', label: this.$t('auditInfo.businessInfo.tableColumn.holderName') },
        { prop: 'flowNodeStr', label: this.$t('auditInfo.businessInfo.tableColumn.flowNodeStr') },
        { prop: 'stateStr', label: this.$t('auditInfo.businessInfo.tableColumn.stateStr') }
      ],
      tableData: []
    }
  },
  mounted() {
    this.getCylinderFlowFindFlowList()
  },
  methods: {
    async getCylinderFlowFindFlowList() {
      const { returnValue: res } = await cylinderFlowFindFlowList({ linkId: this.linkId, nodeType: this.nodeType })
      if (res) {
        this.tableData = res
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
