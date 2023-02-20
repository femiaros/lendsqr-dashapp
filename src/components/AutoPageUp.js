import { animateScroll as scroll } from "react-scroll"

const upScroll = ()=>{
  scroll.scrollToTop()
}

const AutoPageUp = () => {
  return upScroll();
}

export default AutoPageUp;