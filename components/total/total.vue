<template>
  <view class="alert-info">
    <view class="bottom">
      <view v-for="(item,index) in infoData" :key="index" class="box">
        <text>{{ item.name }}：</text>
        <text v-if="item.type==='money'" class="green">{{ item.value | rounded(2) | toThousandFilter }}</text>
        <text v-else-if="item.type==='number'" class="green">{{ item.value | toThousandFilter }}</text>
        <text v-else-if="item.type==='weight'" class="green">{{ item.value | rounded(5) | toThousandFilter }}</text>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: 'Total',
  props: {
    infoData: {
      type: Array,
      default() {
        return [
          {
            name: '合计重量(KG)',
            value: '-1585.5',
            type: 'weight'
          },
          {
            name: '合计数量(瓶)',
            value: '1000',
            type: 'number'
          },
          {
            name: '应收金额(元)',
            value: '-1234.665',
            type: 'money'
          },
          {
            name: '实收金额(元)',
            value: '-1234.665',
            type: 'money'
          }
        ]
      }
    }
  }
}
</script>
<style scoped lang="scss">
.alert-info{
  background: #F6FFED;
  padding: 5px;
  border: 1px solid #B7EB8F;
  .bottom{
    .box{
      display: inline-block;
      line-height: 30rpx;
      font-size: 26rpx;
      margin-right: 20rpx;
      .green{
        color: #52c41a;
        font-weight: bold;
      }
    }
  }
}
</style>
