export interface ScrollProgressConfig {
  // element id
  id?: string
  // element scroll offset
  offset?: number
  // scroll debounce
  debounce?: boolean
}

const config: ScrollProgressConfig = {
  id: 'scroll-progress',
  offset: 0,
}

let id: number
let scrolling = false

// https://javascript.info/size-and-scroll-window#width-height-of-the-document
const getScrollHeight = () =>
  Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  )

const initialElement = () => {
  const progressEle = document.createElement('div')
  const { id } = config
  if (id) {
    progressEle.id = id
  }
  return progressEle
}

const getElement = () => document.getElementById(config.id!)

const removeElement = (ele: HTMLElement) => {
  ele?.parentNode?.removeChild(ele)
}

const getScrollPercent = () => {
  const scrollHeight = getScrollHeight()
  const { innerHeight, pageYOffset } = window
  const scrollDistance = scrollHeight - innerHeight - config.offset!
  return Math.min(1.0, pageYOffset / scrollDistance) * 100
}

const onScroll = () => {
  const progressEle = getElement()
  if (!progressEle) {
    return
  }
  const percent = getScrollPercent()
  const { debounce } = config
  if (debounce) {
    window.clearTimeout(id)
    id = window.setTimeout(() => {
      progressEle!.style.width = `${percent}%`
    }, 50)
  } else {
    // throttled update
    // https://github.com/devjmetivier/gatsby-plugin-page-progress/blob/master/src/gatsby-browser.js#L118
    if (!scrolling) {
      window.requestAnimationFrame(() => {
        progressEle!.style.width = `${percent}%`
        scrolling = false
      })
      scrolling = true
    }
  }
}

const show = () => {
  const progressEle = initialElement()
  document.body.append(progressEle)
  const percent = getScrollPercent()
  progressEle.style.width = `${percent}%`
  window.addEventListener('scroll', onScroll)
}

const hide = () => {
  const progressEle = getElement()
  if (progressEle) {
    removeElement(progressEle)
  }
  window.removeEventListener('scroll', onScroll)
}

const setConfig = (cfg: ScrollProgressConfig) => {
  Object.assign(config, cfg)
}

const progressBar = {
  show,
  hide,
  setConfig,
}

export default progressBar
