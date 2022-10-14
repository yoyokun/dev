<template>
	<view class="project">
		<view :class="['group',item.result === 2 ? 'result' : '']" v-for="(item,index) in safeTemplateItemVoArr" :key="item.id">
			<view v-if="item.itemType === 1" class="box">
				<view class="itemName" >
					<text>{{ item.projectName }}-{{ item.itemName }}</text>
					<view class="right" @click="changeUpDown(index)" v-if="isResult">
						<u-icon v-if="item.result === 2" name="arrow-down" color="#666666" size="18"></u-icon>
						<u-icon v-else name="arrow-right" color="#666666" size="18"></u-icon>
					</view>
					<u-switch
						v-else
						v-model="item.result" 
						:disabled="disabled"
						:activeValue="1"
						:inactiveValue="2"
						activeColor='#2A82E4'
						inactiveColor='#D43030'
						size='22'
						@change="changeResult(index)"
					/>
				</view>
				<view class="itemValue">
					<u-checkbox-group v-model="item.resultData" :disabled="disabled">
						<u-checkbox v-for="(itemBox,index) in item.cehckData" :disabled="itemBox.disabled" :key="index" :label="itemBox.name" :name="itemBox.name"></u-checkbox>
					</u-checkbox-group>
				</view>
			</view>
			<view v-if="item.itemType === 2" class="box">
				<view class="itemName">
					<text>{{ item.projectName }}-{{ item.itemName }}</text>
					<view class="right" @click="changeUpDown(index)" v-if="isResult">
						<u-icon v-if="item.result === 2" name="arrow-down" color="#666666" size="18"></u-icon>
						<u-icon v-else name="arrow-right" color="#666666" size="18"></u-icon>
					</view>
					<u-switch
						v-else
						v-model="item.result" 
						:disabled="disabled"
						:activeValue="1"
						:inactiveValue="2"
						activeColor='#2A82E4'
						inactiveColor='#D43030'
						size='22'
						@change="changeResult(index)"
					/>
				</view>
				<view class="itemValue">
					<u-radio-group v-model="item.resultData" :disabled="disabled">
						<u-radio v-for="(itemBox,index) in item.cehckData" :disabled="itemBox.disabled" :key="index" :label="itemBox.name" :name="itemBox.name"></u-radio>
					</u-radio-group>
				</view>
			</view>
			<view v-if="item.itemType === 3" class="box">
				<view class="itemName" @click="changeUpDown(index)">
					<text>{{ item.projectName }}-{{ item.itemName }}</text>
					<u-icon v-if="item.result === 2" name="arrow-down" color="#666666" size="18"></u-icon>
					<u-icon v-else name="arrow-right" color="#666666" size="18"></u-icon>
				</view>
				<view :class="['itemValue', isResult ? 'borderNo' : '']">
					<u--input
						v-model="item.resultData"
						:disabled="disabled"
						type="text"
						:placeholder="item.cehckData"
						:value="item.defData"
						maxlength="30"
						showWordLimit
					></u--input>
				</view>
			</view>
			<view v-if="item.itemType === 4" class="box">
				<view class="itemName" @click="changeUpDown(index)">
					<text>{{ item.projectName }}-{{ item.itemName }}</text>
					<u-icon v-if="item.result === 2" name="arrow-down" color="#666666" size="18"></u-icon>
					<u-icon v-else name="arrow-right" color="#666666" size="18"></u-icon>
				</view>
				<view :class="['itemValue', isResult ? 'borderNo' : '']">
					<uni-datetime-picker
						type="datetime"
						v-model="item.resultData"
						:disabled="disabled"
						:placeholder="$t('security.securityCheck.datetimePlace')"
					></uni-datetime-picker>
				</view>
			</view>
			<view v-if="item.itemType === 5" class="box">
				<view class="itemName" @click="changeUpDown(index)">
					<text>{{ item.projectName }}-{{ item.itemName }}</text>
					<u-icon v-if="item.result === 2" name="arrow-down" color="#666666" size="18"></u-icon>
					<u-icon v-else name="arrow-right" color="#666666" size="18"></u-icon>
				</view>
				<view class="itemValue">
					<u-upload
						:fileList="item.resultData"
						:disabled="disabled"
						:deletable="!disabled"
						@afterRead="afterRead"
						@delete="deletePic($event,disabled)"
						:name="item.id"
						:maxCount="disabled ? item.resultData.length : item.limit"
					></u-upload>
				</view>
			</view>
			<view v-if="item.isPicture === 1 || item.picture.length" class="boxPic" >
				<view class="itemName">{{$t('security.securityCheck.pictureName')}}</view>
				<u-upload
					:fileList="item.picture"
					:disabled="disabled || (!isSafeSecurity && item.picture.length>0)"
					:deletable="!(disabled || (!isSafeSecurity && item.picture.length>0))"
					@afterRead="afterReadCheck"
					@delete="deletePicCheck($event,(disabled || (!isSafeSecurity && item.picture.length>0)))"
					:name="item.id"
					:maxCount="(disabled || (!isSafeSecurity && item.picture.length>0)) ? item.picture.length : 5"
				></u-upload>
			</view>
			<view v-if="!isSafeSecurity" class="boxPic">
				<view v-if="(disabled && item.rectifyPicture.length) || !disabled" class="itemName">{{$t('security.securityCheck.rectifyPicture')}}</view>
				<u-upload
					v-if="(disabled && item.rectifyPicture.length) || !disabled"
					:fileList="item.rectifyPicture"
					:disabled="disabled"
					:deletable="!disabled"
					@afterRead="afterReadRectify"
					@delete="deletePicRectify($event,disabled)"
					:name="item.id"
					:maxCount="disabled ? item.rectifyPicture.length : 5"
				></u-upload>
			</view>
		</view>
	</view>
</template>

<script>
import { uploadFileImg } from '@/utils/request'
export default{
	data() {
		return {
			safeTemplateItemVoArr: [], // 记录安检结果
		}
	},
	props: {
		// 整改数组
		safeSecurityResultNot: {
			type: Array,
			default: () => {
				return []
			} 
		},
		// 安检项数据对象
		safeTemplateItemVo: {
			type: Object,
			default: function() {
				return {}
			}
		}, 
		// 限制图片数
		limit: {
			type: Number,
			default: 5
		}, 
		// 是否是安检
		isSafeSecurity: {
			type: Boolean,
			default: true
		},
		// 是否展示安检结果（安检详情）
		isResult: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		} // 整改结算
	},
	watch: {
		// 监听 safeTemplateItemVo 改变
		safeTemplateItemVo: {
			handler() {
				this.initData()
			},
			deep: true
		}
	},
	mounted() {
		this.initData()
	},
	methods: {
		// 初始化数据
		initData() {
			const safeTemplateItemVoArr = []
			if (this.isSafeSecurity) {
				// 安检
				if (!this.safeTemplateItemVo) {
					this.safeTemplateItemVoArr = safeTemplateItemVoArr
					return false
				}
				Object.keys(this.safeTemplateItemVo).forEach(key => {
					const obj = this.safeTemplateItemVo[key]
					if (obj.itemType === 1) {
						const cehckData = obj.cehckData.Split(',')
						const arr = []
						cehckData.forEach(v => {
							arr.push({
								name: v,
								disabled: !!this.isResult
							})
						})
						// 多选
						safeTemplateItemVoArr.push({
							cehckData: arr,
							defData: obj.defData.Split(','),
							id: obj.id,
							itemId: obj.itemId,
							projectName: obj.projectName,
							itemKey: obj.itemKey,
							itemName: obj.itemName,
							itemType: obj.itemType,
							templateId: obj.templateId,
							resultData: this.isResult ? obj.resultData.Split(',') : obj.defData.Split(','),
							isPicture: obj.isPicture,
							result: 1, //  1 合格 2不合格
							picture: this.isResult ? this.$options.filters.pictureConversion(obj.picture) : []
						})
					} else if (obj.itemType === 2) {
						const cehckData = obj.cehckData.Split(',')
						const arr = []
						cehckData.forEach(v => {
							arr.push({
								name: v,
								disabled: !!this.isResult
							})
						})
						// 单选
						safeTemplateItemVoArr.push({
							cehckData: arr,
							defData: obj.defData,
							id: obj.id,
							itemId: obj.itemId,
							projectName: obj.projectName,
							itemKey: obj.itemKey,
							itemName: obj.itemName,
							itemType: obj.itemType,
							templateId: obj.templateId,
							resultData: this.isResult ? obj.resultData : obj.defData,
							isPicture: obj.isPicture,
							result: 1, //  1 合格 2不合格
							picture: this.isResult ? this.$options.filters.pictureConversion(obj.picture) : []
						})
					} else if (obj.itemType === 3 || obj.itemType === 4) {
						// 文本 时间
						safeTemplateItemVoArr.push({
							cehckData: obj.cehckData, // 提示
							defData: obj.defData, // 默认值
							id: obj.id,
							itemId: obj.itemId,
							projectName: obj.projectName,
							itemKey: obj.itemKey,
							itemName: obj.itemName,
							itemType: obj.itemType,
							templateId: obj.templateId,
							resultData: this.isResult ? obj.resultData : obj.defData, // 安检数据
							isPicture: obj.isPicture,
							result: 1, //  1 合格 2不合格
							picture: this.isResult ? this.$options.filters.pictureConversion(obj.picture) : []
						})
					} else if (obj.itemType === 5) {
						// 图片
						safeTemplateItemVoArr.push({
							cehckData: obj.cehckData, // 提示
							defData: obj.defData || [], // 默认值
							id: obj.id,
							itemId: obj.itemId,
							projectName: obj.projectName,
							itemKey: obj.itemKey,
							itemName: obj.itemName,
							itemType: obj.itemType,
							templateId: obj.templateId,
							resultData: this.isResult ? this.$options.filters.pictureConversion(obj.resultData) : (obj.defData || []), // 安检数据
							limit: 5,
							isPicture: obj.isPicture,
							result: 1, //  1 合格 2不合格
							picture: this.isResult ? this.$options.filters.pictureConversion(obj.picture) : []
						})
					}
				})
			} else {
				// 整改
				this.safeSecurityResultNot.forEach((obj) => {
					if (obj.itemType === 1) {
						const cehckData = obj.cehckData.Split(',')
						const arr = []
						cehckData.forEach(v => {
							arr.push({
								name: v,
								disabled: !!this.isResult
							})
						})
						// 多选
						safeTemplateItemVoArr.push({
							cehckData: arr,
							defData: obj.defData.Split(','),
							id: obj.id,
							projectName: obj.projectName,
							itemKey: obj.itemKey,
							itemName: obj.itemName,
							itemType: obj.itemType,
							templateItemId: obj.templateItemId,
							resultData: obj.resultData.Split(','),
							picture: this.$options.filters.pictureConversion(obj.picture),
							score: obj.score,
							result: this.isResult ? 1 : 2, //  1 合格 2不合格
							rectifyPicture: this.isResult ? this.$options.filters.pictureConversion(obj.rectifyPicture) : []
						})
					} else if (obj.itemType === 2) {
						const cehckData = obj.cehckData.Split(',')
						const arr = []
						cehckData.forEach(v => {
							arr.push({
								name: v,
								disabled: !!this.isResult
							})
						})
						// 单选
						safeTemplateItemVoArr.push({
							cehckData: arr,
							defData: obj.defData,
							id: obj.id,
							projectName: obj.projectName,
							itemKey: obj.itemKey,
							itemName: obj.itemName,
							itemType: obj.itemType,
							templateItemId: obj.templateItemId,
							resultData: obj.resultData,
							picture: this.$options.filters.pictureConversion(obj.picture),
							score: obj.score,
							result: this.isResult ? 1 : 2, //  1 合格 2不合格
							rectifyPicture: this.isResult ? this.$options.filters.pictureConversion(obj.rectifyPicture) : []
						})
					} else if (obj.itemType === 3 || obj.itemType === 4) {
						// 文本  时间
						safeTemplateItemVoArr.push({
							cehckData: obj.cehckData, // 提示
							defData: obj.defData, // 默认值
							id: obj.id,
							projectName: obj.projectName,
							itemKey: obj.itemKey,
							itemName: obj.itemName,
							itemType: obj.itemType,
							templateItemId: obj.templateItemId,
							resultData: obj.resultData, // 安检数据
							picture: this.$options.filters.pictureConversion(obj.picture),
							score: obj.score,
							result: this.isResult ? 1 : 2, //  1 合格 2不合格
							rectifyPicture: this.isResult ? this.$options.filters.pictureConversion(obj.rectifyPicture) : []
						})
					} else if (obj.itemType === 5) {
						// 图片
						safeTemplateItemVoArr.push({
							cehckData: obj.cehckData, // 提示
							defData: obj.defData || [], // 默认值
							id: obj.id,
							projectName: obj.projectName,
							itemKey: obj.itemKey,
							itemName: obj.itemName,
							itemType: obj.itemType,
							templateItemId: obj.templateItemId,
							resultData: this.$options.filters.pictureConversion(obj.resultData), // 安检数据
							limit: 5,
							picture: this.$options.filters.pictureConversion(obj.picture),
							score: obj.score,
							result: this.isResult ? 1 : 2, //  1 合格 2不合格
							rectifyPicture: this.isResult ? this.$options.filters.pictureConversion(obj.rectifyPicture) : []
						})
					}
				})
			}
			this.safeTemplateItemVoArr = safeTemplateItemVoArr
		},
		// 修改安检项目结果
		changeResult(index) {
			// 合格 回填默认值  不合格 默认值不可选
			const result = this.safeTemplateItemVoArr[index].result
			const itemType = this.safeTemplateItemVoArr[index].itemType
			const cehckData = this.safeTemplateItemVoArr[index].cehckData
			const defData = this.safeTemplateItemVoArr[index].defData
			if(result === 1) {
				// 合格 回填默认值
				if(itemType === 1 || itemType === 2) {
					cehckData.forEach(v => {
						v.disabled = false
					})
					this.safeTemplateItemVoArr[index].cehckData = cehckData
					this.safeTemplateItemVoArr[index].resultData = this.safeTemplateItemVoArr[index].defData
				}
			} else {
				// 不合格
				if(itemType === 1) {
					cehckData.forEach(v => {
						defData.forEach(m => {
							if(v.name === m) {
								v.disabled = true
							}
						})
					})
					this.safeTemplateItemVoArr[index].resultData = []
					this.safeTemplateItemVoArr[index].cehckData = cehckData
				} else if(itemType === 2) {
					cehckData.forEach(v => {
						if(v.name === defData) {
							v.disabled = true
						}
					})
					this.safeTemplateItemVoArr[index].resultData = ''
					this.safeTemplateItemVoArr[index].cehckData = cehckData
				}
			}
		},
		// 展开收起
		changeUpDown(index) {
			const result = this.safeTemplateItemVoArr[index].result
			if(result === 1) {
				this.safeTemplateItemVoArr[index].result = 2
			} else {
				this.safeTemplateItemVoArr[index].result = 1
			}
		},
		// 上传图片
		async afterRead(event) {
			console.log('选择文件：', event)
			// 上传
			const { returnValue: res } = await uploadFileImg(event.file.url)
			if (res) {
				const findIndex = this.safeTemplateItemVoArr.findIndex(item => item.id === event.name)
				if(findIndex !== -1){
					this.safeTemplateItemVoArr[findIndex].resultData.push({
						name: event.name,
						id: res.id,
						url: res.filePath,
						uid: res.id,
						status: 'success',
						extname: 'txt'
					})
				}
			}
		},
		// 删除图片
		deletePic(event,disabled) {
			if(!disabled){
				const findIndex = this.safeTemplateItemVoArr.findIndex(item => item.id === event.name)
				this.safeTemplateItemVoArr[findIndex].resultData.splice(event.index, 1)
			}
		},
		// 安检照片
		async afterReadCheck(event) {
			// 上传
			const { returnValue: res } = await uploadFileImg(event.file.url)
			if (res) {
				const findIndex = this.safeTemplateItemVoArr.findIndex(item => item.id === event.name)
				if(findIndex !== -1){
					this.safeTemplateItemVoArr[findIndex].picture.push({
						name: event.name,
						id: res.id,
						url: res.filePath,
						uid: res.id,
						status: 'success',
						extname: 'txt'
					})
				}
			}
		},
		// 删除安检照片
		deletePicCheck(event,disabled) {
			if(!disabled){
				const findIndex = this.safeTemplateItemVoArr.findIndex(item => item.id === event.name)
				this.safeTemplateItemVoArr[findIndex].picture.splice(event.index, 1)
			}
		},
		// 整改照片
		async afterReadRectify(event) {
			// 上传
			const { returnValue: res } = await uploadFileImg(event.file.url)
			if (res) {
				const findIndex = this.safeTemplateItemVoArr.findIndex(item => item.id === event.name)
				if(findIndex !== -1){
					this.safeTemplateItemVoArr[findIndex].rectifyPicture.push({
						name: event.name,
						id: res.id,
						url: res.filePath,
						uid: res.id,
						status: 'success',
						extname: 'txt'
					})
				}
			}
		},
		// 删除整改照片
		deletePicRectify(event,disabled) {
			if(!disabled){
				const findIndex = this.safeTemplateItemVoArr.findIndex(item => item.id === event.name)
				this.safeTemplateItemVoArr[findIndex].rectifyPicture.splice(event.index, 1)
			}
		},
		// 获取结果
		getSecurity() {
			const arr = []
			this.safeTemplateItemVoArr.forEach((v) => {
				if (v.resultData && this.isSafeSecurity) {
					// 安检
					if (v.itemType === 1) {
						// 多选
						arr.push({
							templateItemId: v.id,
							resultData: v.resultData.join(','),
							picture: JSON.stringify(v.picture)
						})
					} else if (v.itemType === 2 || v.itemType === 3) {
						arr.push({
							templateItemId: v.id,
							resultData: v.resultData,
							picture: JSON.stringify(v.picture)
						})
					} else if (v.itemType === 4) {
						arr.push({
							templateItemId: v.id,
							resultData: v.resultData,
							picture: JSON.stringify(v.picture)
						})
					} else if (v.itemType === 5) {
						arr.push({
							templateItemId: v.id,
							resultData: JSON.stringify(v.resultData),
							picture: JSON.stringify(v.picture)
						})
					}
				} else if (v.resultData && !this.isSafeSecurity) {
					// 整改
					if (v.itemType === 1) {
						// 多选
						arr.push({
							templateItemId: v.templateItemId,
							id: v.id,
							score: v.score,
							resultData: v.resultData.join(','),
							rectifyPicture: JSON.stringify(v.rectifyPicture)
						})
					} else if (v.itemType === 2 || v.itemType === 3) {
						arr.push({
							templateItemId: v.templateItemId,
							id: v.id,
							score: v.score,
							resultData: v.resultData,
							rectifyPicture: JSON.stringify(v.rectifyPicture)
						})
					} else if (v.itemType === 4) {
						arr.push({
							templateItemId: v.templateItemId,
							id: v.id,
							score: v.score,
							resultData: v.resultData,
							rectifyPicture: JSON.stringify(v.rectifyPicture)
						})
					} else if (v.itemType === 5) {
						arr.push({
							templateItemId: v.templateItemId,
							id: v.id,
							score: v.score,
							resultData: JSON.stringify(v.resultData),
							rectifyPicture: JSON.stringify(v.rectifyPicture)
						})
					}
				}
			})
			return arr
		}
	},
	options:{
		styleIsolation: 'shared'
	}
}
</script>

<style lang="scss" scoped>
.project{
	margin: 20rpx 20rpx;
	background: rgba(255, 255, 255, 1);
	box-shadow: 0rpx 4rpx 8rpx rgba(0, 0, 0, 0.04);
	border-radius: 16rpx;
	width: 710rpx;
	padding: 10rpx 10rpx;
	box-sizing: border-box;
	.group{
		border-bottom: 1rpx solid rgba(229, 229, 229, 1);
		&:last-child{
			border-bottom: none;
		}
		&.result{
			.boxPic{
				display: block !important;
			}
			.itemValue{
				display: block !important;
			}
		}
		.box{
			.itemName{
				font-size: 32rpx;
				font-weight: bold;
				color: rgba(56, 56, 56, 1);
				line-height: 40rpx;
				padding: 20rpx 0rpx;
				@include flexMixin();
				.right{
					flex: 1;
					::v-deep .u-icon--right{
						justify-content: end;
					}
				}
			}
			.itemValue{
				display: none;
				padding-bottom: 20rpx;
				&.borderNo{
					::v-deep .u-input {
						background: transparent !important;
						border: none !important;
					}
					::v-deep .uni-date .uni-date-x--border{
						border: none !important;
					}
					::v-deep .uni-date .uniui-calendar{
						display: none;
					}
					::v-deep .uni-date .uni-date-x{
						padding: 0;
					}
				}
			}
			::v-deep .u-checkbox-group{
				flex-wrap: wrap;
				background: rgba(247, 247, 247, 1);
				padding: 10rpx 0rpx;
				border-radius: 8rpx;
				.u-checkbox {
					margin: 15rpx 30rpx 15rpx 20rpx;
				}
			}
			::v-deep .u-radio-group{
				flex-wrap: wrap;
				background: rgba(247, 247, 247, 1);
				padding: 10rpx 0rpx;
				border-radius: 8rpx;
				.u-radio{
					margin: 15rpx 30rpx 15rpx 20rpx;
				}
			}
		}
		.boxPic{
			display: none;
			.itemName{
				font-size: 32rpx;
				font-weight: 400;
				color: rgba(56, 56, 56, 1);
				line-height: 40rpx;
				padding-bottom: 20rpx;
			}
		}
	}
}
</style>
