const config = {
    id: 'scroll-progress',
    transitionCls: 'progress-transition',
    offset: 0,
};
let id;
// https://javascript.info/size-and-scroll-window#width-height-of-the-document
const getScrollHeight = () => Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
const initialElement = () => {
    const progressEle = document.createElement('div');
    const { id, debounce, transitionCls } = config;
    if (debounce && transitionCls) {
        progressEle.className = transitionCls;
    }
    if (id) {
        progressEle.id = id;
    }
    return progressEle;
};
const getElement = () => document.getElementById(config.id);
const removeElement = (ele) => {
    ele?.parentNode?.removeChild(ele);
};
const onScroll = () => {
    const progressEle = getElement();
    if (!progressEle) {
        return;
    }
    const scrollHeight = getScrollHeight();
    const { innerHeight, pageYOffset } = window;
    const scrollDistance = scrollHeight - innerHeight - config.offset;
    const percent = Math.min(1.0, pageYOffset / scrollDistance) * 100;
    const { debounce } = config;
    if (debounce) {
        window.clearTimeout(id);
        id = window.setTimeout(() => {
            progressEle.style.width = `${percent}%`;
        }, 50);
    }
    else {
        progressEle.style.width = `${percent}%`;
    }
};
const show = () => {
    const progressEle = initialElement();
    document.body.append(progressEle);
    progressEle.style.width = `0%`;
    window.addEventListener('scroll', onScroll);
};
const hide = () => {
    const progressEle = getElement();
    if (progressEle) {
        removeElement(progressEle);
    }
    window.removeEventListener('scroll', onScroll);
};
const setConfig = (cfg) => {
    Object.assign(config, cfg);
};
const progressBar = {
    show,
    hide,
    setConfig,
};
export default progressBar;
