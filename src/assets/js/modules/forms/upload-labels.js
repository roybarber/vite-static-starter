function findLableForControl(el) {
	var idVal = el.id
	var labels = document.getElementsByTagName('label')
	for( var i = 0; i < labels.length; i++ ) {
		if (labels[i].htmlFor == idVal) return labels[i]
	}
}
const fileInputLabels = () => {
	const fileInputs = document.querySelectorAll('input[type="file"]')

	fileInputs.forEach((fileInput) => {
		let label = findLableForControl(fileInput)
		if(label){
			let labelSpan = label.querySelector('span')
			fileInput.addEventListener('change', () => {
				for (const file of fileInput.files) {
					labelSpan.innerText = ''
					labelSpan.innerText = file.name
				}
			})
		}
	})

}
export default fileInputLabels

