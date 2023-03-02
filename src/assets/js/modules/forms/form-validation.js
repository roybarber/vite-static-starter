import FormValidation from '@modules/forms/validation-api'

const formValidation = () => {

	// If debug is true then show all debugging messages in the console
	const debug = false
	
	const setupFormValidation = () => {
		return new FormValidation('.js-form-validation', {
			// Options go here if needed
		})
	}

	// Events
	// validationShowError is emitted on a field when an error is displayed for it.
	// validationRemoveError is emitted on a field when an error is removed from it.
	// validationFormValid is emitted on a form is successfully validated.
	// validationFormInvalid is emitted on a form that fails validation.
	// validationInitialized is emitted when validation initializes.
	// validationDestroy
	
	// Detect show error events
	document.addEventListener('validationShowError', function (event) {
		if(debug){
			console.log('validationShowError event', event)
			console.log('validationShowError target', event.target)
			console.log('validationShowError errors', event.detail.errors)
		}
	}, false)

	// Detect remove error events
	document.addEventListener('validationRemoveError', function (event) {
		if(debug){
			console.log('validationRemoveError event', event)
			console.log('validationRemoveError target', event.target)
			console.log('validationRemoveError errors', event.detail.errors)
		}
	}, false)

	// Detect a successful form validation
	document.addEventListener('validationFormValid', function (event) {
		if(debug){
			console.log('validationFormValid event', event)
			console.log('validationFormValid form', event.target)
			console.log('validationFormValid details', event.detail)
		}
		const form = event.target
		if(form.dataset.submitLoading && form.querySelector('.btn-loading')){
			let loadingButton = form.querySelector('.btn-loading')
			loadingButton.classList.add('is-loading')
		}
	}, false)
	

	// Detect unsuccessful form validation
	document.addEventListener('validationFormInvalid', function (event) {
		if(debug){
			console.log('validationFormInvalid event', event)
			console.log('validationFormInvalid', event.target)
			console.log('validationFormInvalid details', event.detail)
		}
	}, false)

	// detect validationInitialized
	document.addEventListener('validationInitialized', function (event) {
		if(debug){
			console.log('validationInitialized event', event)
			console.log('validationInitialized settings', event.detail.settings)
			console.log('validationInitialized details', event.detail)
		}
	}, false)

	// Destroy validation event
	document.addEventListener('validationDestroy', function (event) {
		if(debug){
			console.log('validationDestroy event', event)
		}
	}, false)

	return setupFormValidation()

}

export default formValidation
