export const uniContext = (ctx) => {
	const ALIAS_ATTRS_MAP = [
		'lineCap',
		'strokeStyle',
		'lineWidth',
		'fillStyle',
	]
	ALIAS_ATTRS_MAP.forEach(style => {
		Object.defineProperty(ctx, style, {
			set: value => {
				if(value)
				ctx[`set${style.charAt(0).toUpperCase()}${style.slice(1)}`](value)
			}
		})
	})
	ctx.uniDrawImage = ctx.drawImage
	ctx.drawImage = (image,...agrs) => {
		ctx.uniDrawImage(image.src, ...agrs)
	}
	return ctx
}

class Image {
	constructor() {
		this.currentSrc = null
		this.naturalHeight = 0
		this.naturalWidth = 0
		this.width = 0
		this.height = 0
		this.tagName = 'IMG'
	}
	set src(src) {
		this.currentSrc = src
		uni.getImageInfo({
			src,
			success: (res) => {
				this.naturalWidth = this.width = res.width
				this.naturalHeight = this.height = res.height
				this.onload()
			},
			fail: () => {
				this.onerror()
			}
		})
	}
	get src() {
		return this.currentSrc
	}
}

export const createImage = () => {
	return new Image()
}

export const toDataURL = (canvasId, com) => {
	return new Promise((resolve, reject) => {
		uni.canvasToTempFilePath({
			canvasId,
			success: (res) => {
				resolve(res.tempFilePath)
			},
			fail: reject
		}, com)
	})
	
}