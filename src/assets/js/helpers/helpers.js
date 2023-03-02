const helpers = () => { }


helpers.hasClass = function (el, className) {
	el.classList.contains(className)
}

helpers.addClass = function (el, className) {
	var classList = className.split(' ')
	el.classList.add(classList[0])
	if (classList.length > 1) {
		el.classList.add(classList.slice(1).join(' '))
	}
}

helpers.removeClass = function (el, className) {
	var classList = className.split(' ')
	el.classList.remove(classList[0])
	if (classList.length > 1) {
		el.classList.remove(classList.slice(1).join(' '))
	}
}

helpers.toggleClass = function (el, className, bool) {
	if (bool) el.classList.add(className)
	else el.classList.remove(className)
}

helpers.setAttributes = function (el, attrs) {
	for (var key in attrs) {
		el.setAttribute(key, attrs[key])
	}
}

helpers.isHidden = function (el) {
	var style = window.getComputedStyle(el)
	return (style.display === 'none')
}

helpers.getChildrenByClassName = (el, className) => {
	var children = el.children,
		childrenByClass = []
	for (var i = 0; i < children.length; i++) {
		if (children[i].classList.contains(className)) childrenByClass.push(children[i])
	}
	return childrenByClass
}

helpers.getFirstFocusable = function (el) {
	var elements = el.querySelectorAll('a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable], audio[controls], video[controls], summary'),
		firstElement = false
	for (var i = 0; i < elements.length; i++) {
		if (elements[i].offsetWidth || elements[i].offsetHeight || elements[i].getClientRects().length) {
			firstElement = elements[i]
			break
		}
	}
	return firstElement
}

helpers.getFocusableElements = function (element) {
	// return [
	// 	...element.querySelectorAll(
	// 	  'a[href], button, input, textarea, select, iframe, object, embed, details, [tabindex]:not([tabindex="-1"]), [contenteditable], audio[controls], video[controls], summary'
	// 	)
	//   ].filter(
	// 	el => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden')
	//   )
	var elements = element.querySelectorAll('a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable], audio[controls], video[controls], summary')
	return elements
}

helpers.is = function (elem, selector) {
	if (selector.nodeType) {
		return elem === selector
	}

	var qa = (typeof (selector) === 'string' ? document.querySelectorAll(selector) : selector),
		length = qa.length
	// returnArr = []

	while (length--) {
		if (qa[length] === elem) {
			return true
		}
	}

	return false
}

/* 
	Animate height of an element
*/
helpers.setHeight = function (start, to, element, duration, cb, timeFunction) {
	var change = to - start,
		currentTime = null

	var animateHeight = function (timestamp) {
		if (!currentTime) currentTime = timestamp
		var progress = timestamp - currentTime
		if (progress > duration) progress = duration
		var val = parseInt((progress / duration) * change + start)
		if (timeFunction) {
			val = Math[timeFunction](progress, start, to - start, duration)
		}
		element.style.height = val + "px"
		if (progress < duration) {
			window.requestAnimationFrame(animateHeight)
		} else {
			if (cb) cb()
		}
	}

	//set the height of the element before starting animation -> fix bug on Safari
	element.style.height = start + "px"
	window.requestAnimationFrame(animateHeight)
}

/* 
	Smooth Scroll
*/

helpers.scrollTo = function (final, duration, cb, scrollEl) {
	var element = scrollEl || window
	var start = element.scrollTop || document.documentElement.scrollTop,
		currentTime = null

	if (!scrollEl) start = window.scrollY || document.documentElement.scrollTop

	var animateScroll = function (timestamp) {
		if (!currentTime) currentTime = timestamp
		var progress = timestamp - currentTime
		if (progress > duration) progress = duration
		var val = Math.easeInOutQuad(progress, start, final - start, duration)
		element.scrollTo(0, val)
		if (progress < duration) {
			window.requestAnimationFrame(animateScroll)
		} else {
			cb && cb()
		}
	}

	window.requestAnimationFrame(animateScroll)
}

/* 
  Focus utility classes
*/

//Move focus to an element
helpers.moveFocus = function (element) {
	if (!element) element = document.getElementsByTagName("body")[0]
	element.focus()
	if (document.activeElement !== element) {
		element.setAttribute('tabindex', '-1')
		element.focus()
	}
}

/* 
  Misc
*/
helpers.getIndexInArray = function (array, el) {
	return Array.prototype.indexOf.call(array, el)
}

helpers.cssSupports = function (property, value) {
	if ('CSS' in window) {
		return CSS.supports(property, value)
	} else {
		var jsProperty = property.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase() })
		return jsProperty in document.body.style
	}
}

// merge a set of user options into plugin defaults
// https://gomakethings.com/vanilla-javascript-version-of-jquery-extend/
helpers.extend = function () {
	// Variables
	var extended = {}
	var deep = false
	var i = 0
	var length = arguments.length

	// Check if a deep merge
	if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
		deep = arguments[0]
		i++
	}

	// Merge the object into the extended object
	var merge = function (obj) {
		for (var prop in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, prop)) {
				// If deep merge and property is an object, merge properties
				if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
					extended[prop] = extend(true, extended[prop], obj[prop])
				} else {
					extended[prop] = obj[prop]
				}
			}
		}
	}

	// Loop through each object and conduct a merge
	for (;i < length;i++) {
		var obj = arguments[i]
		merge(obj)
	}

	return extended
}

// Check if Reduced Motion is enabled
helpers.osHasReducedMotion = function () {
	if (!window.matchMedia) return false
	var matchMediaObj = window.matchMedia('(prefers-reduced-motion: reduce)')
	if (matchMediaObj) return matchMediaObj.matches
	return false // return false if not supported
}


export { helpers }
