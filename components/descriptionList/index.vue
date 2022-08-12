<!--详情组件-->
<template>
  <view class="description-text">
    <view v-if="title" class="title">{{ title }}</view>
    <view v-for="(item, key) in dataSource" :key="key" :class="['box',{ 'border': key !== dataSource.length-1 }]">
      <view class="label">{{ item.label }}</view>
      <view class="detail">
        <item-des :detail="item.detail" :prive-img="priveImg" />
      </view>
    </view>
    <!--预览图片-->
    <u-popup mode="center" :show="dialogVisible" @close="dialogVisible = false">
      <img class="priveImg" :src="dialogImageUrl" alt="">
    </u-popup>
  </view>
</template>

<script>
import ItemDes from './itemDes'
const handleArrayObj = data => {
  return data.filter(item => item.tag === 'description').map(item => ({
    tag: item.tag,
    label: (item.data && item.data.attrs.label) || '暂无',
    col: (item.data && item.data.attrs.col) || '',
    detail: item.children
  }))
}
export default {
  name: 'DescriptionList',
  components: {
    ItemDes
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: [Object, Array],
      default: () => {
        return []
      }
    },
    border: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dataSource: [],
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  watch: {
    content() {
      this.dataSource = handleArrayObj(this.$slots.default || [])
    } // 监听重渲染
  },
  mounted() {
    this.dataSource = handleArrayObj(this.$slots.default || [])
  },
  methods: {
    priveImg(src) {
      this.dialogVisible = true
      this.dialogImageUrl = src
    }
  },
  options:{
    styleIsolation: 'shared'
  }
}
</script>
<style lang="scss" scoped>
.description-text{
  background: white;
  border-radius: 16rpx;
  box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(42, 130, 228, 0.15);
  .title{
    padding: 0 20rpx;
    line-height: 80rpx;
    font-weight: bold;
    border-bottom: 1rpx solid #eee;
    font-size: 28rpx;
  }
  .box{
    line-height: 70rpx;
    padding: 0 20rpx;
    display: flex;
    &.border{
      border-bottom: 1rpx solid #eee;
    }
    .label{
      font-size: 24rpx;
      &::after {
        display: inline-block;
        content: '：';
      }
    }
    .detail{
      font-size: 24rpx;
    }
  }
}
</style>
