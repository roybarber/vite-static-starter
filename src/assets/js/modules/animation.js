// Observe elements on scroll and animate
const observeAnimation = () => {
	// function animateFrom(elem, direction) {
	// 	direction = direction || 1;
	// 	var x = 0,
	// 		y = direction * 100;
	// 	if(elem.classList.contains("gs_reveal_fromLeft")) {
	// 	  x = -100;
	// 	  y = 0;
	// 	} else if (elem.classList.contains("gs_reveal_fromRight")) {
	// 	  x = 100;
	// 	  y = 0;
	// 	}
	// 	elem.style.transform = "translate(" + x + "px, " + y + "px)";
	// 	elem.style.opacity = "0";
	// 	gsap.fromTo(elem, {x: x, y: y, autoAlpha: 0}, {
	// 	  duration: 1.25, 
	// 	  x: 0,
	// 	  y: 0, 
	// 	  autoAlpha: 1, 
	// 	  ease: "expo", 
	// 	  overwrite: "auto"
	// 	});
	//   }
	//   function hide(elem) {
	// 	gsap.set(elem, {autoAlpha: 0});
	//   }
	//   document.addEventListener("DOMContentLoaded", function() {
	// 	gsap.registerPlugin(ScrollTrigger);
		
	// 	gsap.utils.toArray(".gs_reveal").forEach(function(elem) {
	// 	  hide(elem); // assure that the element is hidden when scrolled into view  
	// 	  ScrollTrigger.create({
	// 		trigger: elem,
	// 		onEnter: function() { animateFrom(elem) }, 
	// 		onEnterBack: function() { animateFrom(elem, -1) },
	// 		onLeave: function() { hide(elem) } // assure that the element is hidden when scrolled into view
	// 	  });
	// 	});
	//   });
	
	const animateCallback = entries => {
		entries.forEach((entry) => {
			const animationType = entry.target.dataset.animateType
			if (entry.isIntersecting) {
				if (animationType) {
					entry.target.classList.add(animationType)
				} else {
					entry.target.classList.add('motion-safe:animate-fadein')
				}
				entry.target.classList.remove('opacity-0')
			} else {
				if (animationType) {
					entry.target.classList.remove(animationType)
				} else {
					entry.target.classList.remove('motion-safe:animate-fadein')
				}
				entry.target.classList.add('opacity-0')
			}
		})
	}
	
	// Initiate the observations
	const observer = new IntersectionObserver(animateCallback)
	
	// Find all elements wanting animated
	const targets = document.querySelectorAll('.js-show-on-scroll')
	targets.forEach((target) => observer.observe(target))

}

export default observeAnimation
