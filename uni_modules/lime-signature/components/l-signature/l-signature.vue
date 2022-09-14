<template>
	<view class="lime-signature" :style="[canvasStyle, styles]" ref="limeSignature">
		<!-- #ifndef APP-VUE || APP-NVUE -->
		<canvas 
		v-if="useCanvas2d"
		class="lime-signature__canvas"
		:id="canvasId" 
		type="2d"
		:disableScroll="disableScroll"
		@touchstart="touchStart"
		@touchmove="touchMove"
		@touchend="touchEnd"
		></canvas>
		<canvas 
		v-else
		:disableScroll="disableScroll"
		class="lime-signature__canvas"
		:canvas-id="canvasId" 
		:id="canvasId"
		@touchstart="touchStart"
		@touchmove="touchMove"
		@touchend="touchEnd"
		@mousedown="touchStart"
		@mousemove="touchMove"
		@mouseup="touchEnd"
		></canvas>
		<!-- #endif -->
		<!-- #ifdef APP-VUE -->
		<view 
		:id="canvasId"
		:disableScroll="disableScroll"
		:rparam="param"
		:change:rparam="sign.update"
		
		:rclear="rclear"
		:change:rclear="sign.clear"
		
		:rundo="rundo"
		:change:rundo="sign.undo"
		
		:rsave="rsave"
		:change:rsave="sign.save"
		
		:rempty="rempty"
		:change:rempty="sign.isEmpty"
		
		></view>	
		<!-- #endif -->
		<!-- #ifdef APP-NVUE -->
		<web-view 
		src="/uni_modules/lime-signature/static/index.html"
		class="lime-signature__canvas"
		ref="webview"
		@pagefinish="onPageFinish"
		@error="onError"
		@onPostMessage="onMessage"
		></web-view>
		<!-- #endif -->
	</view>
</template>
<!-- #ifdef APP-VUE -->
<script module="sign" lang="renderjs">
// #ifdef APP-VUE 
// import { Signature } from '@signature'
import { Signature } from './signature'
// import {base64ToPath} from './utils'

export default {
	data() {
		return {
			canvasid: null,
			signature: null,
			observer: null,
			options: {},
			saveCount: 0,
		}
	},
	mounted() {
		this.$nextTick(this.init)
	},
	methods: {
		init() {
			const el = this.$refs.limeSignature;
			const canvas = document.createElement('canvas')
			canvas.style = 'width:100%; height: 100%;'
			el.appendChild(canvas)
			this.signature = new Signature({el: canvas})
			this.signature.pen.setOption(this.options)
			const width = this.signature.canvas.get('width')
			const height = this.signature.canvas.get('height')
			
			this.emit({
				changeSize: {width, height}
			})
		},
		undo(v) {
			if(v && this.signature) {
				this.signature.undo()
			}
		},
		clear(v) {
			if(v && this.signature) {
				this.signature.clear()
			}
		},
		save(v) {
			if(v !== this.saveCount) {
				this.saveCount = v;
				const image = this.signature.canvas.get('el').toDataURL()
				this.emit({save: image})
				// base64ToPath(image).then((res) => {
				// 	this.emit({save: res})
				// })
			}
		},
		isEmpty(v) {
			if(v && this.signature) {
				const isEmpty = this.signature.isEmpty()
				this.emit({isEmpty})
			}
		},
		emit(event) {
			this.$ownerInstance.callMethod('onMessage', {
				detail: {
					data: [
						{
							event
						}
					]
				}
			})
		},
		update(v) {
			if(v) {
				if(this.signature) {
					this.options = v
					this.signature.pen.setOption(v)
				} else {
					this.options = v
				}
			}
		}
	}
}
// #endif
</script>		
<!-- #endif -->


<script>
	// #ifndef APP-NVUE
	import {getCanvas2d, wrapEvent, requestAnimationFrame, sleep} from './utils'
	import {Signature} from './signature'
	// import {Signature} from '@signature';
	import {uniContext, createImage, toDataURL} from './context'
	// #endif
	import {base64ToPath} from './utils'
	export default {
		props: {
			styles: String,
			disableScroll: Boolean,
			type: {
				type: String,
				default: '2d'
			},
			// 画笔颜色
			penColor: {
				type: String,
				default: 'black'
			},
			penSize: {
				type: Number,
				default: 2
			},
			// 画板背景颜色 未实现
			backgroundColor: String,
			// 笔锋
			openSmooth: Boolean,
			// 画笔最小值
			minLineWidth: {
				type: Number,
				default: 2
			},
			// 画笔最大值
			maxLineWidth: {
				type: Number,
				default: 6
			},
			// 画笔达到最小宽度所需最小速度(px/ms)，取值范围1.0-10.0，值越小，画笔越容易变细，笔锋效果会比较明显，可以自行调整查看效果，选出自己满意的值。
			minSpeed: {
				type: Number,
				default: 1.5
			},
			// 相邻两线宽度增(减)量最大百分比，取值范围1-100，为了达到笔锋效果，画笔宽度会随画笔速度而改变，如果相邻两线宽度差太大，过渡效果就会很突兀，使用maxWidthDiffRate限制宽度差，让过渡效果更自然。可以自行调整查看效果，选出自己满意的值。
			maxWidthDiffRate: {
				type: Number,
				default: 20
			},
			// 限制历史记录数，即最大可撤销数，传入0则关闭历史记录功能
			maxHistoryLength: {
				type: Number,
				default: 20
			},
			beforeDelay: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				canvasWidth: null,
				canvasHeight: null,
				useCanvas2d: true,
				// #ifdef APP-PLUS
				rclear: 0,
				rundo: 0,
				rsave: 0,
				rempty: 0,
				risEmpty: true,
				toDataURL: null,
				tempFilePath: [],
				// #endif
			}
		},
		computed: {
			canvasId() {
				return `lime-signature${this._uid||this._.uid}`
			},
			canvasStyle() {
				const {canvasWidth, canvasHeight} = this
				return {
					width: canvasWidth && (canvasWidth + 'px'),
					height: canvasHeight && (canvasHeight + 'px'),
				}
			},
			param() {
				const {penColor, penSize, backgroundColor, openSmooth, minLineWidth, maxLineWidth, minSpeed, maxWidthDiffRate, maxHistoryLength, disableScroll} = this
				return JSON.parse(JSON.stringify({penColor, penSize, backgroundColor, openSmooth, minLineWidth, maxLineWidth, minSpeed, maxWidthDiffRate, maxHistoryLength, disableScroll}))
			}
		},
		// #ifdef APP-NVUE
		watch: {
			param(v) {
				this.$refs.webview.evalJS(`update(${JSON.stringify(v)})`)
			}
		},
		// #endif
		// #ifndef APP-PLUS
		created() {
			this.useCanvas2d = this.type=== '2d' && getCanvas2d()
		},
		// #endif
		// #ifndef APP-PLUS
		async mounted() {
			if(this.beforeDelay) {
				await sleep(this.beforeDelay)
			}
			const config = await this.getContext()
			this.signature = new Signature(config)
			this.canvasEl =  this.signature.canvas.get('el')
			this.canvasWidth = this.signature.canvas.get('width')
			this.canvasHeight = this.signature.canvas.get('height')
			
			this.stopWatch = this.$watch('param' , (v) => {
				this.signature.pen.setOption(v)
			}, {immediate: true})
		},
		// #endif
		// #ifndef APP-PLUS
		// #ifdef VUE3
		beforeUnmount() {
			this.stopWatch()
			this.signature.destroy()
		},
		// #endif
		// #ifdef VUE2
		beforeDestroy() {
			this.stopWatch()
			this.signature.destroy()
		},
		// #endif
		// #endif
		methods: {
			// #ifdef APP-PLUS
			onPageFinish() {
				this.$refs.webview.evalJS(`update(${JSON.stringify(this.param)})`)
			},
			onMessage(e = {}) {
				const {detail: {data: [res]}} = e
				if(res.event?.save) {
					 this.toDataURL = res.event.save
				}
				if(res.event?.changeSize) {
					const {width, height} = res.event.changeSize
				}
				if(res.event.hasOwnProperty('isEmpty')) {
					this.risEmpty = res.event.isEmpty
				}
				if (res.event?.file) {
					this.tempFilePath.push(res.event.file)
					if (this.tempFilePath.length > 7) {
						this.tempFilePath.shift()
					}
					return
				}
				if (res.event?.success) {
					if (res.event.success) {
						this.tempFilePath.push(res.event.success)
						if (this.tempFilePath.length > 8) {
							this.tempFilePath.shift()
						}
						this.toDataURL = this.tempFilePath.join('')
						this.tempFilePath = []
						// base64ToPath(this.tempFilePath.join('')).then(res => {
							
						// })
					} else {
						this.$emit('fail', 'canvas no data')
					}
					return
				}
			},
			// #endif
			undo() {
				// #ifdef APP-VUE || APP-NVUE
				this.rundo += 1
				// #endif
				// #ifdef APP-NVUE
				this.$refs.webview.evalJS(`undo()`)
				// #endif
				// #ifndef APP-VUE
				if(this.signature)
					this.signature.undo()
				// #endif
			},
			clear() {
				// #ifdef APP-VUE || APP-NVUE
				this.rclear += 1
				// #endif
				// #ifdef APP-NVUE
				this.$refs.webview.evalJS(`clear()`)
				// #endif
				// #ifndef APP-VUE
				if(this.signature)
					this.signature.clear()
				// #endif
			},
			isEmpty() {
				// #ifdef APP-NVUE
				this.$refs.webview.evalJS(`isEmpty()`)
				// #endif
				// #ifdef APP-VUE || APP-NVUE
				this.rempty += 1
				// #endif
				// #ifndef APP-VUE || APP-NVUE
				return this.signature.isEmpty()
				// #endif
			},
			canvasToTempFilePath(param) {
				const isEmpty = this.isEmpty()
				// #ifdef APP-NVUE
				this.$refs.webview.evalJS(`save()`)
				// #endif
				// #ifdef APP-VUE || APP-NVUE
				const stopURLWatch = this.$watch('toDataURL', (v, n) => {
					if(v && v !== n) {
						if(param.pathType == 'url') {
							base64ToPath(v).then(res => {
								param.success({tempFilePath: res,isEmpty: this.risEmpty })
							})
						} else {
							param.success({tempFilePath: v,isEmpty: this.risEmpty })
						}
						
					}
					stopURLWatch && stopURLWatch()
				})
				this.rsave += 1
				// #endif
				// #ifndef APP-VUE || APP-NVUE
				const success = (success) => param.success && param.success(success)
				const fail = (fail) => param.fail && param.fail(err)
				if(this.useCanvas2d) {
					try{
						// #ifndef MP-ALIPAY
						const {canvas} = this.signature.canvas.get('el')
						const tempFilePath = canvas.toDataURL()
						success({tempFilePath, isEmpty})
						// #endif
						// #ifdef MP-ALIPAY
						canvas.toTempFilePath({
							canvasid: this.canvasid,
							success(res){success({tempFilePath: res, isEmpty})},
							fail
						})
						// #endif
					}catch(err){
						console.warn(err)
						fail(err)
					}
				} else {
					toDataURL(this.canvasId, this).then(res => {
						success({tempFilePath: res, isEmpty})
					}).catch(err => {
						console.warn(err)
						fail(err)
					})
				}
				// #endif
			},
			// #ifndef APP-PLUS
			getContext() {
				const {pixelRatio} = uni.getSystemInfoSync()
				return new Promise(resolve => {
					if(this.useCanvas2d) {
						uni.createSelectorQuery().in(this)
						.select(`#${this.canvasId}`)
						.fields({
							node: true,
							size: true,
							rect: true,
						})
						.exec(res => {
							if(res) {
								const {width, height, node, left, top, right} = res[0]
								const context = node.getContext('2d')
								node.width = width * pixelRatio;
								node.height = height * pixelRatio;
								resolve({ left, top, right, width, height, context, canvas: node, pixelRatio})
							}
						})
					} else {
						uni.createSelectorQuery().in(this)
						.select(`#${this.canvasId}`)
						.boundingClientRect()
						.exec(res => {
							if(res) {
								const {width, height,  left, top, right} = res[0]
								const context = uniContext(uni.createCanvasContext(this.canvasId, this))
								const canvas = {
									createImage, 
									toDataURL: () => toDataURL(this.canvasId, this), 
									requestAnimationFrame
								}
								resolve({ left, top, right, width, height, context, pixelRatio:1, canvas})
							}
						})
					}
				})
			},
			touchStart(e) {
				if(!this.canvasEl) return
				this.isStart = true
				this.canvasEl.dispatchEvent('touchstart', wrapEvent(e))
			},
			touchMove(e) {
				if(!this.canvasEl || !this.isStart && this.canvasEl) return
				this.canvasEl.dispatchEvent('touchmove', wrapEvent(e))
			},
			touchEnd(e) {
				if(!this.canvasEl) return
				this.isStart = false
				this.canvasEl.dispatchEvent('touchend', wrapEvent(e))
			},
			// #endif
		}
	}
</script>
<style lang="stylus">
	.lime-signature,.lime-signature__canvas
		// #ifndef APP-NVUE
		width: 100%;
		height: 100%
		// #endif
		// #ifdef APP-NVUE
		flex: 1;
		// #endif
</style>