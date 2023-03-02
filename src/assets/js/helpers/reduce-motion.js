
const detectReducedMotion = () => {
	var root = document.getElementsByTagName('html')[0]
	// Add a class if a user prefers reduced motion:
	const userNoMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
	// Add a cass to the document body if a user prefers reduced motion:
	const addMotionClass = () => {
		if (!userNoMotion || userNoMotion.matches) {
			root.classList.add('reduced-motion')
			
		} else {
			root.classList.add('motion-ok')
		}
	}
	// Run on load
	addMotionClass() 
	
	// Watch for user settings change
	userNoMotion.addEventListener('change', () => addMotionClass())
}
export default detectReducedMotion
