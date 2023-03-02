const scrollTop = () => {
	const mainEl = document.getElementById('footer-primary'),
		scrollBtn = document.querySelector('.js-scroll-top')
	const scrollObserver = entries => {
		if (entries[0].isIntersecting) {
			scrollBtn.classList.add('opacity-100', 'right-5', 'md:right-16')
			scrollBtn.classList.remove('opacity-0', '-right-5', 'md:-right-16')
		} else {
			scrollBtn.classList.remove('opacity-100', 'right-5', 'md:-right-16')
			scrollBtn.classList.add('opacity-0', '-right-5', 'md:right-16')
		}
	}
	if(scrollBtn){
		// Initiate the observations
		const observer = new IntersectionObserver(scrollObserver)
		// Find all elements wanting animated
		observer.observe(mainEl)
	}
}
export default scrollTop
