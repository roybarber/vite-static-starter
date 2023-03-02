// DEV ONLY
console.error("CAUTION: Development Scripts are Loaded")

// Select all .btn-loading elements and demo a loading style
const btnLoading = document.querySelectorAll(".btn-loading.DEVDEMO")
btnLoading.forEach(btn => {
	btn.addEventListener("click", function (e) {
		if (btn.tagName !== "BUTTON") {
			btn.disabled = true
		}
		e.preventDefault()
		btn.classList.add("is-loading")
		setTimeout(() => {
			btn.classList.remove("is-loading")
			if (btn.tagName !== "BUTTON") {
				btn.disabled = false
			}
		}, 5000)
	})
});
