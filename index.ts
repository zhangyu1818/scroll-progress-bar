export interface ScrollProgressConfig {
  // element id
  id?: string
  // element scroll offset
  offset?: number
  // scroll debounce
  debounce?: boolean
  // element transition class name, effective when debounce is true
  transitionCls?: string
}

const config: ScrollProgressConfig = {
  id: 'scroll-progress',
  transitionCls: 'progress-transition',
  offset: 0,
}

let id: number
const progressEle = document.createElement('div')
progressEle.id = config.id!
progressEle.className = config.transitionCls!

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

const onScroll = () => {
  const scrollHeight = getScrollHeight()
  const { innerHeight, pageYOffset } = window
  const scrollDistance = scrollHeight - innerHeight - config.offset!
  const percent = Math.min(1.0, pageYOffset / scrollDistance) * 100
  const { debounce } = config
  if (debounce) {
    window.clearTimeout(id)
    id = window.setTimeout(() => {
      progressEle.style.width = `${percent}%`
    }, 50)
  } else {
    progressEle.style.width = `${percent}%`
  }
}

const show = () => {
  document.body.append(progressEle)
  progressEle.style.width = `0%`
  window.addEventListener('scroll', onScroll)
}

const hide = () => {
  document.body.removeChild(progressEle)
  window.removeEventListener('scroll', onScroll)
  progressEle.style.width = ``
}

const setConfig = (cfg: ScrollProgressConfig) => {
  Object.assign(config, cfg)
  const { id, debounce, transitionCls } = config
  if (debounce && transitionCls) {
    progressEle.className = transitionCls
  }

  if (id) {
    progressEle.id = id
  }
}

const progressBar = {
  show,
  hide,
  setConfig,
}

export default progressBar
