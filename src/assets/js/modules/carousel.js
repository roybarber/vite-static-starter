import Swiper, { Navigation, Pagination, A11y } from 'swiper'

const carousel = () => {
	// Initiate the sliders
	const buildSwiperSlider = sliderElm => {
		return new Swiper(`#${sliderElm.id}`, {
			modules: [Navigation, Pagination, A11y],
			a11y: {
				enabled: true,
				prevSlideMessage: 'Previous slide',
				nextSlideMessage: 'Next slide',
			},
			keyboard: {
				enabled: true,
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'progressbar',
			},
			autoHeight: true
		})
	}
	
	// Get all of the swipers on the page
	const allSliders = document.querySelectorAll('.js-carousel-block')
	
	// Loop over all of the fetched sliders and apply Swiper on each one.
	allSliders.forEach(slider => buildSwiperSlider(slider))

}

export default carousel
