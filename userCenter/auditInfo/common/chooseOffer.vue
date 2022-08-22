<template>
	<view>
		<view>
			<description :label="$t('auditInfo.chooseOffer.endDateOffer')">{{endDateOffer | dayjs('YYYY-MM-DD')}}
			</description>
			<description :label="$t('auditInfo.chooseOffer.goodsName')" @click.native="chooseGoods">{{goodsName}}</description>
		</view>
		<view class="info-data" v-if="infoOfferData.length">
			<total :info-data="infoOfferData" />
		</view>

		<uni-table class="us-table">
			<uni-tr v-if="tableOfferData.length === 0">
				<uni-td>{{$t('common.tableEmptyText')}}</uni-td>
			</uni-tr>
			<uni-tr class="uni-tr">
				<uni-td class="uni-td" v-for="(item, index) in tableOfferData[0]" :key="index">
					<view>{{ item }}</view>
				</uni-td>
			</uni-tr>
			<uni-tr class="uni-tr">
				<uni-td class="uni-td" v-for="(item, index) in tableOfferData[1]" :key="index">
					<view>{{ item }}</view>
				</uni-td>
			</uni-tr>
			<uni-tr class="uni-tr">
				<uni-td class="uni-td" v-for="(item, index) in tableOfferData[2]" :key="index">
					<view>{{ (item===''|| item===null) ? $t('auditInfo.chooseOffer.priceStatus')[0] : (item==='-' ? $t('auditInfo.chooseOffer.priceStatus')[1] : item) }}</view>
				</uni-td>
			</uni-tr>
			<uni-tr class="uni-tr">
				<uni-td class="uni-td" v-for="(item, index) in tableOfferData[3]" :key="index">
					<view>{{ (item===''|| item===null) ? $t('auditInfo.chooseOffer.priceStatus')[0] : (item==='-' ? $t('auditInfo.chooseOffer.priceStatus')[1] : item) }}</view>
				</uni-td>
			</uni-tr>
			<uni-tr class="uni-tr">
				<uni-td class="uni-td" v-for="(item, index) in tableOfferData[4]" :key="index">
					<view class="uni-td-c">
						<text>{{ index === 0 ? item : (item>=0?item:Math.abs(item)) }}</text>
						<u-icon v-if="item>0" name="arrow-up" color="red" size="26rpx"></u-icon>
						<u-icon v-else-if="item<0" name="arrow-down" color="green" size="26rpx"></u-icon>
					</view>
				</uni-td>
			</uni-tr>
		</uni-table>
	</view>
</template>

<script>
	import {
		purSupplierOfferContrastList
	} from '@/api/lpgSalesManageApi'
	import {
		UnixToDate
	} from '@/utils/util'
	export default {
		props: {
			endDate: {
				type: [Number, String],
				default: ''
			}, // 报价日期
			goodsObj: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		data() {
			return {
				endDateOffer: '',
				goodsDetailIdOffer: '',
				goodsIdOffer: '',
				goodsName: '',
				infoOfferData: [],
				tableOfferData: []
			}
		},
		watch: {
			goodsObj: {
				deep: true,
				handler(val) {
					this.goodsDetailIdOffer = val.goodsDetailId
					this.goodsIdOffer = val.goodsId
					this.goodsName = val.goodsName
					if (this.goodsDetailIdOffer && this.endDateOffer && this.goodsIdOffer) {
						this.getSupplierOffer()
					}
				}
			},
			endDate() {
				this.endDateOffer = this.endDate
				if (this.goodsDetailIdOffer && this.endDateOffer && this.goodsIdOffer) {
					this.getSupplierOffer()
				}
			}
		},
		mounted() {
			uni.$on('chooseGoods', (data) => {
				this.goodsName = data.goodsName + (data.propertyNames ? ('-' + data.propertyNames) : '')
				this.goodsIdOffer = data.goodsId
				this.goodsDetailIdOffer = data.goodsDetailId
				if (this.goodsDetailIdOffer && this.endDateOffer && this.goodsIdOffer) {
					this.getSupplierOffer()
				}
			})
		},
		beforeDestroy() {
			uni.$off('chooseGoods')
		},
		methods: {
			chooseGoods(e) {
				uni.navigateTo({
					url: '/infoManage/chooseGoods/chooseGoods'
				})
			},
			changeDate(e) {
				this.endDateOffer = e
				this.getSupplierOffer()
			},
			// 获取商品报价
			async getSupplierOffer() {
				const requestParameters = Object.assign({}, {
					offerDateStr: UnixToDate(this.endDateOffer, 'YYYY-MM-DD'),
					goodsDetailId: this.goodsDetailIdOffer,
					goodsId: this.goodsIdOffer
				})
				const {
					returnValue: res,
					returnObject
				} = await purSupplierOfferContrastList(requestParameters)
				if (res) {
					this.infoOfferData = [{
							name: this.$t('auditInfo.chooseOffer.infoOfferData')[0],
							value: returnObject.avgTodayPrice || 0,
							type: 'money'
						},
						{
							name: this.$t('auditInfo.chooseOffer.infoOfferData')[1],
							value: returnObject.ttotalPriceHigh || 0,
							type: 'money'
						},
						{
							name: this.$t('auditInfo.chooseOffer.infoOfferData')[2],
							value: returnObject.ttotalPriceLow || 0,
							type: 'money'
						}
					]
					this.tableOfferData = res
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.info-data{
		padding:20rpx;border-bottom:1px solid #eee;border-top:1px solid #eee
	}
	::v-deep .us-table {
		min-width: 100%;

		.uni-tr {
			.uni-td {
				font-size: 26rpx;
			}

			.uni-td:first-child {
				background: #f2f2f2;
				font-weight: bold;
			}
			.uni-td-c{
				display: flex;align-items: center;
			}
		}
	}
</style>
