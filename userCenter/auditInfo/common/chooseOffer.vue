<template>
	<view>
		<view>
			<!-- <uni-datetime-picker type="date" v-model="endDateOffer" @change="changeDate"> -->
				<description style="border-bottom:1px solid #eee" label="日期">{{endDateOffer | dayjs('YYYY-MM-DD')}}</description>
			<!-- </uni-datetime-picker> -->
			<description label="商品" @click.native="chooseGoods">{{goodsName}}</description>
		</view>
		<view style="padding:20rpx;border-bottom:1px solid #eee;border-top:1px solid #eee" v-if="infoOfferData.length">
			<total :info-data="infoOfferData" />
		</view>

		<uni-table class="us-table">
			<uni-tr v-if="tableOfferData.length === 0">
				<uni-td>无数据</uni-td>
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
					<view>{{ (item===''|| item===null) ? '无报价' : (item==='-' ? '停出' : item) }}</view>
				</uni-td>
			</uni-tr>
			<uni-tr class="uni-tr">
				<uni-td class="uni-td" v-for="(item, index) in tableOfferData[3]" :key="index">
					<view>{{ (item===''|| item===null) ? '无报价' : (item==='-' ? '停出' : item) }}</view>
				</uni-td>
			</uni-tr>
			<uni-tr class="uni-tr">
				<uni-td class="uni-td" v-for="(item, index) in tableOfferData[4]" :key="index">
					<view style="display: flex;align-items: center;">
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
		methods: {
			chooseGoods(e){
				console.log(e)
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
							name: '平均报价',
							value: returnObject.avgTodayPrice || 0,
							type: 'money'
						},
						{
							name: '最高报价',
							value: returnObject.ttotalPriceHigh || 0,
							type: 'money'
						},
						{
							name: '最低报价',
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
		}
	}
</style>
