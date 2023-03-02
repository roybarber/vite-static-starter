// Show and hide a group of fields by a radio.
// Example markup:
//<div class="form-group">
//	<label id="business-helper-message">Are you a business?</label>
//	<div class="js-optional-fields" data-fields-to-show="optional-fields">
//		<label class="radio-wrapper inline-flex mb-0">
//			<input type="radio" name="business" value="true" id="business-0" aria-labeledby="business-helper-message" data-error-label="Please select an option" required>
//			<span class="pl-2 font-normal">Yes</span>
//		</label>
//		<label class="radio-wrapper inline-flex mb-0 ml-8">
//			<input type="radio" name="business" value="false" id="business-1" aria-labeledby="business-helper-message" data-error-label="Please select an option" required>
//			<span class="pl-2 font-normal">No</span>
//		</label>
//	</div>
//</div>
//<div id="optional-fields" class="mb-6 space-y-6 hidden">
//	<div class="form-group">
//		<label for="job-title">Job title</label>
//		<input type="text" name="job-title" id="job-title"/>
//	</div>
//</div>

const initFormAdditionalFields = (fieldBoxs) => {

	var AdditionalFields = function (options) {
		this.index = options.index
		// Elements
		this.container = options.container
		this.dataFieldsToShow = this.container.dataset.fieldsToShow
		this.elementsToShow = document.getElementById(this.dataFieldsToShow)
		this.inputs = this.container.querySelectorAll('input[type=radio]')
		this.hiddenInputs = this.elementsToShow.querySelectorAll('input, select, textarea')

		// If we dont have the goods, exit!
		if(!this.inputs || !this.elementsToShow) return

		// Add event listeners
		attachEventListeners(this)
	}

	const attachEventListeners = (fieldGroup) => {
		for (var index = 0; index < fieldGroup.inputs.length; index++) {
			(function (index) {
				fieldGroup.inputs[index].addEventListener('change', function (event) {
					if(event.target.value === 'true'){
						fieldGroup.elementsToShow.classList.remove('hidden')
					} else {
						fieldGroup.elementsToShow.classList.add('hidden')
						clearInputs(fieldGroup)
					}
				})
			})(index)
		}
	}

	const clearInputs = (fieldGroup) => {
		for (var index = 0; index < fieldGroup.hiddenInputs.length; index++) {
			(function (index) {
				if (fieldGroup.hiddenInputs[index].tagName == 'INPUT') {
					fieldGroup.hiddenInputs[index].value = ''
				}
				if (fieldGroup.hiddenInputs[index].tagName == 'SELECT') {
					fieldGroup.hiddenInputs[index].selectedIndex = null
				}
			})(index)
		}
	}

	if (fieldBoxs.length > 0) {
		for (var index = 0; index < fieldBoxs.length; index++) {
			(function (index) {
				var options = { container: fieldBoxs[index], index: index }
				new AdditionalFields(options)
			})(index)
		}
	}
}

export default initFormAdditionalFields
