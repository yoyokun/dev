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
        if (v.tag && v.tag === 'img') {
          const src = v.data.attrs.src
          vnodes.push(<img onClick={() => priveImg(src)} class={['img']} src={src} />)
        } else if (v.tag && v.tag === 'view') {
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
