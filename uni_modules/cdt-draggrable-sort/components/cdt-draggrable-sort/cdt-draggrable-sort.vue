<template>
	<view class="draggable_box" ref="draggable_box" :key="hash">
		<view class="draggable_box_item" v-for="(item,index) in data" :key="index" :class="itemClass" :data-id="isActive && index == currentIndex ? 'active': ''"
			@longpress="onTouchStart(index,$event)" @touchend="onTouchEnd" @touchmove="onTouchMove">
			<slot :row="item" :index="index"></slot>
		</view>
		<block v-for="(item,index) in data" :key="item.id">
			<view class="draggable_box_item_select" :style="selectStyle" :id="'draggable_box_item_'+index"
				v-if="isActive && index == currentIndex" :class="activeItemClass">
				<slot :row="item" :index="index"></slot>
			</view>
		</block>
	</view>
</template>

<script>
	let parentElement, childrenElement;
	export default {
		name: "draggrable-sort",
		props: {
			value: {
				type: Array,
				default: () => {
					return []
				}
			},
			itemClass: {
				type: String | Object,
				default: ''
			},
			activeItemClass: {
				type: String | Object,
				default: ''
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				isActive: false,
				currentIndex: 0,
				top: 0,
				left: 0,
				bottom: 0,
				right: 0,
				point: {
					x: 0,
					y: 0
				},
				tapPoint: {
					x: 0,
					y: 0
				},
				stylePoint: {
					x: 0,
					y: 0
				},
				els: [],
				sizes: [],
				data: [],
				selectStyle: {},
				isMove: false,
				hash: null,
				isInit: false,
				isScroll: false
			};
		},
		mounted() {
			this.data = this.value
			this.$nextTick(() => {
				this.init()
			})
		},
		watch: {
			value: {
				deep: true,
				handler(v, o) {
					this.data = this.value
					// this.$nextTick(() => {
					// 	this.initDrag()
					// })
				}
			}
		},
		methods: {
			// 外部初始化
			init() {
				parentElement = uni.createSelectorQuery().in(this).select(".draggable_box")
				childrenElement = uni.createSelectorQuery().in(this).selectAll(
					".draggable_box .draggable_box_item")
				this.initDrag()
			},
			initDrag() {
				// 获取节点距离顶部
				parentElement.boundingClientRect((res) => {
					this.top = res.top
					this.left = res.left
					this.bottom = res.top + res.height
					this.right = res.left + res.width
					this.currentIndex = 0
					this.initChildren()
					this.$emit('init', {
						top: this.top,
						left: this.left,
						bottom: this.bottom,
						right: this.right
					})
				}).exec()
			},
			initChildren() {
				if (!this.isInit) {
					this.isInit = true
					childrenElement.boundingClientRect((res) => {
						this.sizes = []
						res.forEach(n => {
							this.sizes.push(n)
						})
						this.isInit = false
					}).exec()
				}
			},
			onTouchStart(i, e) {
				if (!this.isInit && !this.disabled) {
					this.currentIndex = i
					this.isActive = true
					this.stylePoint = {
						x: this.sizes[this.currentIndex].left - this.left,
						y: this.sizes[this.currentIndex].top - this.top
					}
					this.selectStyle = {
						position: 'absolute',
						left: this.stylePoint.x + 'px',
						top: this.stylePoint.y + 'px'
					}
					this.point = {
						x: e.touches[0].pageX,
						y: e.touches[0].pageY
					}
					this.$emit("start", {
						currentIndex: i,
						touch: e.touches[0],
						data: this.data
					})
				}
			},
			onTouchMove(e) {
				if (!this.isMove && !this.disabled) {
					this.isMove = true
					this.tapPoint = {
						x: this.point.x - e.touches[0].pageX,
						y: this.point.y - e.touches[0].pageY
					}
					this.point = {
						x: e.touches[0].pageX,
						y: e.touches[0].pageY
					}
					this.stylePoint = {
						x: this.stylePoint.x - this.tapPoint.x,
						y: this.stylePoint.y - this.tapPoint.y
					}
					this.selectStyle.left = this.stylePoint.x + 'px';
					this.selectStyle.top = this.stylePoint.y + 'px';
					this.isMove = false
				}
				this.$emit("move", {
					currentIndex: this.currentIndex,
					touch: e.touches[0],
					data: this.data
				})
			},
			onTouchEnd(e) {
				if (this.isActive && !this.disabled) {
					this.tapPoint = {
						x: this.point.x - e.changedTouches[0].pageX,
						y: this.point.y - e.changedTouches[0].pageY
					}
					this.point = {
						x: e.changedTouches[0].pageX,
						y: e.changedTouches[0].pageY
					}
					
					this.stylePoint = {
						x: this.stylePoint.x - this.tapPoint.x,
						y: this.stylePoint.y - this.tapPoint.y
					}
					var newData = [],
						hash = '',
						arr = [],
						oldData = this.data,
						currentIndex = false;
					this.sizes.forEach((n, i) => {
						if (this.point.x >= n.left && this.point.x <= n.right && this.point.y >= n.top && this
							.point
							.y <= n.bottom) {
							currentIndex = i
						}
					})
					if (currentIndex === false) {
						currentIndex = this.sizes.length - 1
					}
					if (currentIndex != this.currentIndex) {
						oldData.forEach((z, x) => {
							if (currentIndex == x && this.currentIndex > currentIndex) {
								arr.push(this.currentIndex)
							}
							if (x != this.currentIndex) {
								arr.push(x)
							}
							if (currentIndex == x && this.currentIndex < currentIndex) {
								arr.push(this.currentIndex)
							}
						})
						arr.forEach((v, c) => {
							newData.push(oldData[v])
						})
						hash = this.encode(JSON.stringify(newData))
						if (hash != this.hash) {
							this.hash = hash
							this.data = newData
						}
					}
					this.isActive = false
					this.$emit('update:value', this.data)
					this.$emit('change', this.data)
					this.$emit('end', {
						currentIndex: this.currentIndex,
						touch: e.changedTouches[0],
						data: this.data
					})
				}
			},
			encode(code) {
				var c = String.fromCharCode(code.charCodeAt(0) + code.length);
				for (var i = 1; i < code.length; i++) {
					c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
				}
				return escape(c);
			}
		}
	}
</script>

<style>
	.draggable_box {
		width: 100%;
		height: auto;
		position: relative;
	}

	.draggable_box_item {
		display: inline-block;
		width: auto;
		height: auto;
	}

	.draggable_box_item[data-id="acitve"] {
		opacity: .5;
	}
</style>
