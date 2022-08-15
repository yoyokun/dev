<script>
export default {
  name: 'ItemDes',
  functional: true,
  props: {
    detail: {
      type: Array,
      default: () => {
        return []
      }
    },
    priveImg: { type: Function }
  },
  render(h, context) {
    const { detail, priveImg } = context.props
    const vnodes = []
    if (detail) {
      detail.forEach((v, i) => {
        if (v.tag && v.tag.search(/image/i)!=-1) {
          const src = v.data.attrs.src
          vnodes.push(<image onClick={() => priveImg(src)} class={['img']} src={src} />)
        } else if (v.tag && v.tag.search(/view/i)!=-1) {
          vnodes.push(v)
        } else {
          vnodes.push(<text>{(v.text)}</text>)
        }
      })
    }
    return vnodes
  }
}
</script>
