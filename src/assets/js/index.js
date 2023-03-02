// NO JS Fallbacks for css
var root = document.getElementsByTagName('html')[0]
root.classList.add('js')

// SVG
// import 'virtual:svg-icons-register'
// import ids from 'virtual:svg-icons-names'
// console.log(ids)

// Reduce motion
import detectReducedMotion from './helpers/reduce-motion'
detectReducedMotion()

// Lazyload images / video
import './modules/lazyload'

// Enable Vue3 SFC custom elements
import './vue/vue-dynamic'

// Scroll top button
import scrollTop from './modules/scroll-top'
scrollTop()

// Animations
import observeAnimation from './modules/animation'
observeAnimation()

// Sliders
if (document.querySelector('.js-carousel-block')) {
  import(/* webpackChunkName: "carousel" */ './modules/carousel').then(carousel => carousel.default())
}

if (document.querySelector('.grid-visual') && document.querySelector('.breakpoint') ) {
	const breakpointEl = document.querySelector('.breakpoint')
	const gridVisual = document.querySelector('.grid-visual')
	breakpointEl.addEventListener('click', function() {
		gridVisual.classList.toggle('hidden')
	})
}
