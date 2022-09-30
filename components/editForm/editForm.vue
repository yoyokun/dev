<template>
	<view :class="classForm">
		<u--form 
			:labelWidth="labelWidth" 
			:labelAlign="labelAlign" 
			:model="formData" 
			:rules="rules" 
			ref="form">
			<u-form-item
				v-for="(item,index) in renderDataSource" 
				v-if="item.show"
				:key="index"
				:label="item.labelText"
				:prop="item.fieldName"
				:required="item.required"
				:borderBottom="item.borderBottom"
				:labelWidth="item.labelWidth"
				:leftIcon="item.lIcon"
				>
				<!--文本框-->
				<view class="chooseBtnText" v-if="item.type === 'chooseBtn'" @click.native="chooseChange(item)">
					<u--textarea
						v-model="formData[item.fieldName]" 
						:disabled="true"
						border="none"
						:placeholder="item.placeholder"
						confirmType="done"
						@input="handleFiltrate(item.fieldName)"
						autoHeight
					></u--textarea>
				</view>
				<u--input 
					type="text" 
					v-if="item.type === 'text' || item.type === 'chooseText'"
					v-model="formData[item.fieldName]" 
					:readonly="item.disabled"
					:inputAlign="item.inputAlign"
					:border="item.inputBorder"
					:maxlength="item.maxlength"
					:placeholder="item.placeholder"
					@change="handleFiltrate(item.fieldName)"
					@blur="handleFiltrate(item.fieldName,'blur')"
				>
					<block v-if="item.suffix">
						<view slot="suffix">
							<u-icon @click="chooseChange(item.suffix)" size="40rpx" :color="item.suffix.color" :name="item.suffix.icon"></u-icon>
						</view>
					</block>
				</u--input>
				<!-- 选择按钮 -->
				<view class="chooseBtn" v-if="item.type === 'chooseText' && item.btnType === 'btn'">
					<u-button
						:text="item.btnText || $t('common.editForm.chooseText')" 
						:disabled="item.disabled"
						@click="chooseChange(item)">
					</u-button>
				</view>
				<u-icon 
					@click="chooseChange(item)" 
					v-if="((item.type === 'chooseText' && item.btnType !== 'btn') || item.type === 'chooseBtn') && !item.disabled" 
					:name="item.btnType || 'arrow-right'" 
					color="#666666" 
					size="18">
				</u-icon>
				<!--密码框-->
				<u--input
					type="password" 
					v-if="item.type === 'password'"
					v-model="formData[item.fieldName]" 
					:inputAlign="item.inputAlign"
					:readonly="item.disabled"
					:border="item.inputBorder"
					:maxlength="item.maxlength?item.maxlength:30"
					:placeholder="item.placeholder"
					@change="handleFiltrate(item.fieldName)"
				></u--input>
				<!--数字框-->
				<u--input
					type="number" 
					v-if="item.type === 'number'"
					v-model="formData[item.fieldName]" 
					:inputAlign="item.inputAlign"
					:readonly="item.disabled"
					:border="item.inputBorder"
					:maxlength="item.maxlength?item.maxlength:30"
					:placeholder="item.placeholder"
					@change="handleFiltrate(item.fieldName)"
				></u--input>
				<!--文本域-->
				<u--textarea 
					v-if="item.type === 'textarea'"
					v-model="formData[item.fieldName]" 
					:disabled="item.disabled"
					:border="item.inputBorder"
					:maxlength="item.maxlength?item.maxlength:30"
					:placeholder="item.placeholder"
					confirmType="done"
					@blur="handleFiltrate(item.fieldName)"
				></u--textarea>
				<!-- 省市区 -->
				<view :class="['datePicker',item.inputAlign]" v-if="item.type === 'cascader'">
					<uni-data-picker
						v-model="formData[item.fieldName]" 
						:readonly="item.disabled"
						:localdata="item.options"
						:placeholder="item.placeholder"
						:map="{ text:'label',value:'value' }"
						:popup-title="item.placeholder"
						@change="chooseProvinces($event,item.fieldName)"
					/>
					<u-icon v-if="!item.disabled" name="arrow-right" color="#666666" size="15" ></u-icon>
				</view>
				<!-- switch单选 -->
				<view v-if="item.type === 'switch'" :class="['switch',item.inputAlign]">
					<u-switch
						v-model="formData[item.fieldName]" 
						:disabled="item.disabled"
						:activeValue="item.activeValue"
						:inactiveValue="item.inactiveValue"
						@change="handleFiltrate(item.fieldName)"
					/>
				</view>
				<!--日期时间选择 太多坑-->
				<view :class="['formCell',item.inputAlign]" v-if="item.type === 'time' || item.type === 'year-month'">
					<u-cell
						v-if="formData[item.fieldName]" 
						:value="formData[item.fieldName]" 
						:isLink="item.disabled ? false : true" 
						:border="false" 
						@click="!item.disabled ? item.showOptions = true : ''"></u-cell>
					<u-cell 
						v-else 
						:value="item.placeholder" 
						:isLink="true" 
						:border="false" 
						@click="!item.disabled ? item.showOptions = true : ''" 
					></u-cell>
					<u-datetime-picker
						:show="item.showOptions" 
						v-model="formData[item.fieldName]"
						:mode="item.type"
						:minDate="item.minDate"
						:maxDate="item.maxDate"
						:closeOnClickOverlay="true"
						@close="item.showOptions = false"
						@cancel="item.showOptions = false"
						@confirm="datetimePicker($event,item.fieldName, index)"	
					></u-datetime-picker>
				</view>
				<!-- 日期时间选择日历模式 -->
				<view :class="['datePicker',item.inputAlign]" v-if="item.type === 'date' || item.type === 'datetime' || item.type === 'range' || item.type === 'datetimerange'">
					<uni-datetime-picker
						:type="item.type"
						v-model="formData[item.fieldName]" 
						:disabled="item.disabled"
						:placeholder="item.placeholder"
						:border="false"
						@change="datetimePickerChange($event,item.fieldName)"	
					></uni-datetime-picker>
					<u-icon v-if="!item.disabled" name="arrow-right" color="#666666" size="15"></u-icon>
				</view>
				<!-- action-sheet 操作菜单  -->
				<view :class="['formCell',item.inputAlign]" v-if="item.type === 'actionSheet'">
					<u-cell 
						v-if="formData[item.fieldName]" 
						:value="formData[item.fieldName] | getName(item.options)" 
						:isLink="item.disabled ? false : true" 
						:border="false" 
						@click="!item.disabled ? item.showOptions = true : ''"></u-cell>
					<u-cell 
						v-else 
						:value="item.placeholder" 
						:isLink="true" 
						:border="false" 
						@click="!item.disabled ? item.showOptions = true : ''" 
					></u-cell>
					<u-action-sheet 
						:actions="item.options" 
						:show="item.showOptions" 
						:closeOnClickOverlay="true"
					  :closeOnClickAction="true"
						:border="false"
						:cancelText="$t('common.editForm.cancelText')"
						@select="selectClick($event,item.fieldName)"
						@close="item.showOptions = false">
					</u-action-sheet>
				</view>
				<!-- picker 滑动单选  -->
				<view :class="['formCell',item.inputAlign]" v-if="item.type === 'picker'">
					<u-cell 
						v-if="formData[item.fieldName]" 
						:value="formData[item.fieldName] | getName(item.options)" 
						:isLink="item.disabled ? false : true" 
						:border="false" 
						@click="!item.disabled ? item.showOptions = true : ''"></u-cell>
					<u-cell 
						v-else 
						:value="item.placeholder" 
						:isLink="true" 
						:border="false" 
						@click="!item.disabled ? item.showOptions = true : ''" 
					></u-cell>
					<u-picker
						:show="item.showOptions" 
						:closeOnClickOverlay="true" 
						:defaultIndex="item.defaultIndex || [0]" 
						:columns="[item.options]" 
						:keyName="item.keyName || 'name'" 
						:ref="`picker${item.fieldName}`"
						@confirm="pickerConfirm($event,item.fieldName,index)" 
						@close="item.showOptions = false"
						@cancel="item.showOptions = false">
					</u-picker>
				</view>
				<!-- 多选 -->
				<view :class="['formCell',item.inputAlign]" v-if="item.type === 'multiple'">
					<view v-if="formData[item.fieldName]" class="multipleLable">
						<view class="content" @click="!item.disabled ? item.showOptions = true : ''">
							<view v-for="(subItem,indexSub) in formData[item.fieldName]" :key="indexSub" class="box-case" @click.stop>
								<text>{{subItem | getName(item.options)}}</text>
								<u-icon v-if="!item.disabled" name="close-circle-fill" color="#8C8C8C" size="20"  @click="deleteMultiple(subItem,index,item.fieldName,indexSub)"></u-icon>
							</view>
						</view>
						<u-icon v-if="!item.disabled" name="arrow-right" color="#666666" size="15" @click="!item.disabled ? item.showOptions = true : ''"></u-icon>
					</view>
					<u-cell 
						v-else 
						:value="item.placeholder" 
						:isLink="true" 
						:border="false" 
						@click="!item.disabled ? item.showOptions = true : ''" 
					></u-cell>
					<u-popup class="multiplePopup" mode="bottom" :show="item.showOptions" :closeOnClickOverlay="false">
						<view class="btn">
							<text class="cancel" @click="cancelMultiple(index,item.fieldName)">{{$t('common.editForm.cancelText')}}</text>
							<text class="confirm" @click="confirmMultiple(index,item.fieldName)">{{$t('common.editForm.confirmText')}}</text>
						</view>
						<scroll-view class="multipleBox" scroll-y="true">
							<view class="box" v-for="(subItems,subIndex) in item.options" :key="subItems.id" @click="subItems.active = !subItems.active">
								<view class="center">
									<view class="name">{{ subItems.name }}</view>
									<text class="desc" v-if="subItems.desc">{{ subItems.desc }}</text>
								</view>
								<image class="icon" v-if="subItems.active" mode="widthFix" src="/static/image/check.png" />
								<image class="icon" v-else mode="widthFix" src="/static/image/uncheck.png" />
							</view>
						</scroll-view>
					</u-popup>
				</view>
				<!-- 上传图片 -->
				<view :class="['formUpload',item.inputAlign]" v-if="item.type === 'upload'">
					<u-upload
						:fileList="formData[item.fieldName]"
						:disabled="item.disabled"
						@afterRead="afterRead"
						@delete="deletePic($event,item.disabled)"
						:name="item.fieldName"
						:maxCount="item.limit ? item.limit : 2"
					></u-upload>
				</view>
			</u-form-item>
			<!-- <block></block> -->
		  <!--其他插槽-->
			<slot name="other" />
		</u--form>
		<!--按钮插槽-->
		<slot name="extra" />
	</view>
</template>

<script>
import { isEqual } from 'lodash'
import { uploadFileImg } from '@/utils/request'
import { CodeToText, TextToCode } from 'element-china-area-data'
import { isNumber } from '@/utils/index.js'
export default {
	name: "EditForm",
	props: {
		classForm: {
			type: String,
			default: 'edit-form'
		},
		// lable宽度
		labelWidth: {
			type: String,
			default: '100'
		},
		// lable对齐方式
		labelAlign: {
			type: String,
			default: 'left'
		},
		// 数据源
		formDataSource: {
			type: Array,
			default: ()=>{
				return [
					{
						type: 'text', // 必填
						labelText: '控件名称', // 必填
						fieldName: 'formField1', // 必填
						placeholder: '文本输入区域',
						required: true, // 必填
						borderBottom: true,
						labelWidth: '',
						readonly: false,
						inputBorder: 'none',
						rules: [
							{
								required: true, 
								message: '请输入联系电话',
								trigger: ['change','blur']
							}
						]
					}
				]
			} 
		},
		// 赋值
		formDataValue: {
			type: Object,
			default: function() {
				return {}
			}
		}
	},
	data() {
		return {
			renderDataSource: [],
			formData: {},
			rules: {}
		};
	},
	watch: {
		// 监听 formDataSource 改变
		formDataSource: {
			handler() {
				const formDataSource = JSON.parse(JSON.stringify(this.formDataSource))
				this.renderDataSource = formDataSource.map((v,index) => {
					return Object.assign({ show: true }, v, {
						borderBottom: v.borderBottom ? v.borderBottom : v.borderBottom === undefined,
						labelWidth: v.labelWidth ? v.labelWidth : this.labelWidth,
						maxlength: v.maxlength ? v.maxlength : 50,
						disabled: v.disabled ? v.disabled : false,
						showOptions: v.showOptions ? v.showOptions : false,
						inputBorder: v.inputBorder ? v.inputBorder : 'none',
						inputAlign: v.inputAlign ? v.inputAlign : 'left',
						isProvinces: v.isProvinces ? v.isProvinces : false
					}, { defaultIndex: this.renderDataSource[index] ? this.renderDataSource[index].defaultIndex : [0] })
				})
			},
			deep: true,
			immediate: true
		},
		// 监听 formDataValue 改变
		formDataValue: {
			handler() {
				// 对象深度拷贝，不然改变对象数组会触发重新渲染
				const formDataValue = JSON.parse(JSON.stringify(this.formDataValue))
				if (!isEqual(formDataValue, this.formData)) {
					Object.keys(formDataValue).forEach(key => {
						// 判断 key 是否存在
						if (key in this.formData) {
							const findIndex = this.renderDataSource.findIndex(item=>item.fieldName === key)
							if(this.renderDataSource[findIndex].type === 'picker'){
								// 选中
								const options = this.renderDataSource[findIndex].options
								const findIndex1 = options.findIndex(item=>item.value === formDataValue[key])
								this.renderDataSource[findIndex].defaultIndex = [findIndex1]
							} else if(this.renderDataSource[findIndex].type === 'multiple'){
								// 多选
								const options = this.renderDataSource[findIndex].options
								options.forEach(v=>{
									if(formDataValue[key].includes(v.value)) {
										v.active = true
									}else{
										v.active = false
									}
								})
								this.renderDataSource[findIndex].options = options
							}
							if(this.renderDataSource[findIndex].isProvinces && formDataValue[key].length){
								// 省市区 转换成code
								if(isNumber(formDataValue[key][0]) && isNumber(formDataValue[key][1]) && isNumber(formDataValue[key][2])){
									this.formData[key] = formDataValue[key]
								} else {
									const provincesCode = TextToCode[formDataValue[key][0]]
									const provincesCode1 = TextToCode[formDataValue[key][0]][formDataValue[key][1]]
									const provincesCode2 = TextToCode[formDataValue[key][0]][formDataValue[key][1]][formDataValue[key][2]]
									this.formData[key] = [
										provincesCode.code,
										provincesCode1.code,
										provincesCode2.code
									]
								}
							} else {
								this.formData[key] = formDataValue[key] || ''
							}
						}
					})
					const queryParams = this.handleParams(this.formData)
					this.$emit('change', { queryParams, name: '' })
				}
			},
			deep: true,
			immediate: true
		}
	},
	created() {
		this.addDefaultValue()
	},
	methods: {
		// 添加初始值
		addDefaultValue() {
			const obj = {}
			const rules = {}
			this.formDataSource.forEach(v => {
				if(v.isProvinces && v.defaultValue.length){
					// 省市区 转换成code
					const provincesCode = TextToCode[v.defaultValue[0]]
					const provincesCode1 = TextToCode[v.defaultValue[0]][v.defaultValue[1]]
					const provincesCode2 = TextToCode[v.defaultValue[0]][v.defaultValue[1]][v.defaultValue[2]]
					// 省市区
					obj[v.fieldName] = [
						provincesCode.code,
						provincesCode1.code,
						provincesCode2.code
					]
				} else {
					obj[v.fieldName] = v.defaultValue ? v.defaultValue : (v.defaultValue === undefined ? '' : false)
				}
				rules[v.fieldName] = v.rules
			})
			this.formData = obj
			this.rules = rules
			this.$nextTick(() => {
				this.$refs.form.setRules(this.rules)
			});
		},
		// 处理表单数据
		handleParams(obj) {
			// 判断必须为obj
			if (!(Object.prototype.toString.call(obj) === '[object Object]')) {
				return {}
			}
			const tempObj = {}
			for (let [key, value] of Object.entries(obj)) {
				// 清除两边空格
				if (key && typeof key === 'string') {
					key = key.trim()
				}
				// 若是为字符串则清除两边空格
				if (value && typeof value === 'string') {
					value = value.trim()
				}
				const findIndex = this.renderDataSource.findIndex(item=>item.fieldName === key)
				// 处理省市区数据
				if (findIndex !== -1 && this.renderDataSource[findIndex].isProvinces) {
					tempObj.province = value.length ? CodeToText[value[0]] : ''
					tempObj.city = value.length ? CodeToText[value[1]] : ''
					tempObj.area = value.length ? CodeToText[value[2]] : ''
					tempObj.districtName = tempObj.province + tempObj.city + tempObj.area
				}
				tempObj[key] = value
			}
			return tempObj
		},
		// 校验(给外部调用)
		handleSubmit(fun) {
			this.$refs.form.validate().then(() => {
				const queryParams = this.handleParams(this.formData)
				fun && fun(queryParams)
			}).catch(()=>{
				console.log('校验不通过')
			})
		},
		// 重置picker
		resetPicker(field,index,lastIndex){
			const that = this
			setTimeout(function(){
				that.$refs[`picker${field}`][0].setIndexs(index,lastIndex)
			},100)
		},
		// 清空(给外部调用)
		resetForm(fun) {
			// 重置整个查询表单
			this.$refs.form.resetFields()
			// 初始值
			this.addDefaultValue()
			const queryParams = this.handleParams(this.formData)
			fun && fun(queryParams)
		},
		// 输入框值改变
		handleFiltrate(name,type = null) {
			if(type == 'blur'){
				const queryParams = this.handleParams(this.formData)
				this.$emit('change', { type: type, queryParams, name })
			}else{
				const queryParams = this.handleParams(this.formData)
				this.$emit('change', { queryParams, name })
			}
		},
		// 上传图片
		async afterRead(event) {
			console.log('选择文件：', event)
			// 上传
			const { returnValue: res } = await uploadFileImg(event.file.url)
			if (res) {
				this.formData[event.name].push({
					name: res.fileName,
					id: res.id,
					url: res.filePath,
					uid: res.id,
					status: 'success',
					extname: 'txt'
				})
				// 对部分字段校验
				this.$refs.form.validateField(event.name)
				this.handleFiltrate(event.name)
			}
		},
		// 删除图片
		deletePic(event,disabled) {
			if(!disabled){
				this.formData[event.name].splice(event.index, 1)
				// 对部分字段校验
				this.$refs.form.validateField(event.name)
				this.handleFiltrate(event.name)
			}
		},
		// 选择省市区
		chooseProvinces(e, fieldName) {
		  const value = e.detail.value
		  const provincesCode = []
		  value.forEach(v => {
		    provincesCode.push(v.value)
		  })
		  this.formData[fieldName] = provincesCode
			// 对部分字段校验
			this.$refs.form.validateField(fieldName)
			this.handleFiltrate(fieldName)
		},
		// 选择
		chooseChange(item) {
			if(item.func && !item.disabled){
				this.$emit(item.func, {
					item,
					queryParams: this.formData
				})
			}
		},
		// ActionSheet 操作菜单 选择
		selectClick(e,name){
			this.formData[name] = e.value
			// 对部分字段校验
			this.$refs.form.validateField(name)
			this.handleFiltrate(name)
		},
		// picker 选择
		pickerConfirm(e,name,index){
			// 过滤空值
			const arr = e.value.filter(item => item)
			if(arr.length){
				this.formData[name] = arr[0].value
				// 对部分字段校验
				this.$refs.form.validateField(name)
				this.handleFiltrate(name)
				this.renderDataSource[index].showOptions = false
			} else {
				uni.$u.toast(this.$t('common.pleaseSelect'))
			}
		},
		// 日期
		async datetimePicker(e,name,index) {
			const timeFormat = uni.$u.timeFormat;
			if(e.mode === 'year-month'){
				this.formData[name] = await timeFormat(e.value, 'yyyy-mm');
			} else if(e.mode === 'time'){
				this.formData[name] = e.value
			}
			this.renderDataSource[index].showOptions = false
			// 对部分字段校验
			this.$refs.form.validateField(name)
			this.handleFiltrate(name)
		},
		// 日期改变
		datetimePickerChange(event,name) {
			this.formData[name] = event
			// 对部分字段校验
			this.$refs.form.validateField(name)
			this.handleFiltrate(name)
		},
		// 多选确定
		confirmMultiple(index,name){
			// 获取选中的value
			const options = this.renderDataSource[index].options
			const newArr = options.filter(n => n.active === true)
			this.formData[name] = newArr.map(v => {return v.value})
			// 对部分字段校验
			this.$refs.form.validateField(name)
			this.handleFiltrate(name)
			this.renderDataSource[index].showOptions = false
		},
		// 多选取消
		cancelMultiple(index,name) {
			// 重置数据
			const options = this.renderDataSource[index].options
			options.forEach(v=>{
				v.active = false
			})
			const oldArr = this.formData[name] || []
			options.forEach(v=>{
				oldArr.forEach(m=>{
					if(v.value === m){
						v.active = true
					}
				})
			})
			this.renderDataSource[index].showOptions = false
		},
		// 删除多选
		deleteMultiple(value,index,name,indexSub) {
			this.formData[name].splice(indexSub,1)
			const options = this.renderDataSource[index].options
			options.forEach(v=>{
				if(v.value === value){
					v.active = false
				}
			})
			// 对部分字段校验
			this.$refs.form.validateField(name)
			this.handleFiltrate(name)
			this.renderDataSource[index].showOptions = false
		}
	},
	options:{
		styleIsolation: 'shared'
	}
}
</script>

<style lang="scss" scoped>
.datePicker{
	display: flex;
	width: 100%;
}
.formCell{
	width: 100%;
}
::v-deep .formCell .u-cell__body{
	justify-content: space-between;
}
::v-deep .formCell .u-cell__value{
	text-align: left;
	flex: 1;
}
::v-deep .formCell .u-cell__body__content{
	flex: inherit;
}
::v-deep .uni-data-tree .input-value-border{
	padding: 0rpx 8rpx 0 0 !important;
	border: none;
}
::v-deep .uni-data-tree .input-value{
	height: 26px;
}
::v-deep .uni-data-tree .arrow-area{
	margin-bottom: 0rpx;
}
::v-deep .uni-data-tree .arrow-area{
	display: none;
}
::v-deep .uni-data-tree .selected-area{
	font-size: 26rpx;
	color: #606266;
}
::v-deep .uni-date .uni-date-x--border{
	border: none;
}
::v-deep .uni-date .uni-date__x-input{
	height: 26px;
	padding: 0 8rpx 0 0;
}
::v-deep .uni-date .uni-date-x{
	padding: 0;
}
::v-deep .uni-date .uniui-calendar{
	display: none;
}
::v-deep .u-cell__body{
	padding: 0rpx;
}
::v-deep .u-cell__body .u-icon__icon--info{
	color: #666666;
}
::v-deep .u-form-item__body__right__content__slot{
	flex-direction: row !important;
	flex-wrap: wrap;
}
/deep/ uni-data-picker{
	width: 100% !important;
}
::v-deep .u-textarea{
	padding: 0rpx;
}
.chooseBtn /deep/ button {
	background: rgba(42, 130, 228, 1) !important;
	box-shadow: 0rpx 4rpx 8rpx rgba(219, 236, 255, 1) !important;
	border-radius: 12rpx !important;
	color: rgba(255, 255, 255, 1) !important;
	font-size: 24rpx !important;
	width: 200rpx !important;
	height: 60rpx !important;
	line-height: 60rpx !important;
	padding: 0 16rpx !important;
	margin: 0rpx !important;
	display: inline-flex !important;
}
// 表单添加
.edit-form{
	padding: 0rpx 20rpx;
	::v-deep .u-form-item__body{
		padding: 32rpx 0rpx 0rpx 0rpx !important;
		min-height: 72rpx;
		line-height: 72rpx;
	}
	::v-deep .u-form-item__body__left__content__label{
		color: rgba(56, 56, 56, 1) !important;
		font-size: 28rpx !important;
	}
	::v-deep .u-input{
		background: rgba(245, 245, 245, 1);
		border-radius: 8rpx !important;
		padding: 0rpx 14rpx !important;
		min-height: 72rpx;
		line-height: 72rpx;
	}
	::v-deep .u-textarea{
		padding: 0rpx !important;
	}
	::v-deep .uni-textarea-textarea{
		background: rgba(245, 245, 245, 1);
		border-radius: 8rpx !important;
		padding: 10rpx 14rpx !important;
		min-height: 72rpx;
		line-height: 44rpx;
		box-sizing: border-box;
	}
	::v-deep .u-form-item__body__left__content__required{
		top: 26rpx !important;
	}
	::v-deep .u-form-item__body__right__message{
		padding-bottom: 0rpx;
		padding-top: 8rpx;
	}
	::v-deep .uni-data-tree{
		width: 100%;
		.input-value-border{
			background: rgba(245, 245, 245, 1);
			border-radius: 8rpx !important;
			.placeholder{
				color: rgb(192, 196, 204);
			}
		}
	}
	::v-deep .switch{
		width: 100%;
		@include flexMixin(row,flex-end)
	}
	/deep/ .u-textarea__field{
		background: rgba(245, 245, 245, 1) !important;
		border-radius: 8rpx !important;
		padding: 10rpx 14rpx !important;
		min-height: 72rpx !important;
		line-height: 44rpx !important;
		box-sizing: border-box !important;
	}
}
// 右边
.right{
	width: 100%;
}
.right /deep/ .u-upload__wrap{
	justify-content: flex-end;
}
.right /deep/ .uni-date .uni-input-placeholder{
	text-align: right;
}
.right /deep/ .uni-date .uni-input-input{
	text-align: right;
}
.right /deep/ .uni-data-tree .selected-area{
	display: block;
	text-align: right;
}
.right /deep/ .uni-data-tree .selected-list{
	justify-content: end;
	padding-right: 20rpx;
}
::v-deep .formCell.right .u-cell__value{
	text-align: right;
}
.right.switch{
	display: flex;
	justify-content: end;
}
.chooseBtnText{
	font-size: 28rpx;
	line-height: 44rpx;
	color: #606266;
	flex: 1;
	::v-deep .uni-textarea-wrapper{
		min-height: 20px;
	}
}
.multipleLable{
	@include flexMixin();
	.content{
		flex: 1;
		.box-case{
			@include flexMixin(row,flex-start);
			background: #E8E8E8;
			font-size: 28rpx;
			font-weight: 400;
			color: rgba(56, 56, 56, 1);
			display: inline-flex;
			padding: 8rpx 20rpx;
			border-radius: 28rpx;
			margin: 10rpx 20rpx 10rpx 0rpx;
			.u-icon{
				margin-left: 20rpx;
			}
		}
	}
}
.multiplePopup{
	.btn{
		@include flexMixin();
		height: 80rpx;
		.confirm{
			font-size: 30rpx;
			padding: 0 30rpx;
			color: rgb(60, 156, 255);
		}
		.cancel{
			font-size: 30rpx;
			padding: 0 30rpx;
			color: rgb(144, 145, 147);
		}
	}
	.multipleBox{
		height: 600rpx;
		padding: 0rpx 20rpx;
		box-sizing: border-box;
		.box{
			padding: 20rpx;
			border-bottom: 1rpx solid #eee;
			@include flexMixin();
			&:last-child{
				border-bottom: 0rpx;
			}
			.center{
				flex: 1;
				.name{
					flex: 1;
					color: rgba(56, 56, 56, 1);
					font-size: 36rpx;
					font-weight: 500;
				}
				.desc{
					flex: 1;
					font-size: 32rpx;
					color: #707070;
					margin-right: 20rpx;
				}
			}
			.icon{
				width: 48rpx;
				height: 48rpx;
			}
		}
	}
}
</style>
