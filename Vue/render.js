// const vnode = {
//   tag: 'div',
//   props: {},
//   children: ''
// }

function render(vnode, container) {
  const el = document.createElement(vnode.tag)
  for (const key in vnode.props) {
    // 以“on”开头的表明是个事件 
    if (/^on/.test(vnode.props)) {
      el.addEventListener(
        key.substring(2).toLowerCase(),
        vnode.props[key]
      )
    }
    // 处理children
    if (typeof vnode.children === 'string') {
      const textNode = document.createTextNode(vnode.children)
      el.appendChild(textNode)
    } else if (Array.isArray(vnode.children)) {
      vnode.children.forEach(child => {
        render()
      });
    }
  }
}