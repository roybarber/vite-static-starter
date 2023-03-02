// Read all compoents we have in source to match against
const files = import.meta.globEager('./components/*.vue')
var vueComponentInSource = []
for (const key in files) {
	vueComponentInSource.push(key)
}

// object of vue components in format [name]:path
const vueComponentsData = {}
vueComponentInSource.forEach(filePath => {
	let appName = filePath.replace(/^.*[\\\/]/, '') // eslint-disable-line
		.split('.')
		.slice(0, -1)
		.join('.')
	vueComponentsData[appName] = filePath.replace(/^\.\//, './')
})


// // selector we use to check if vue is child of vue
const vueComponentsSelector = Object.keys(vueComponentsData).join(',')

// // array of components visible in DOM
const VueComponentsInDom = []

// // loop components that are available
Object.keys(vueComponentsData).forEach(appName => {
	// get vue components in DOM
	let els = document.querySelectorAll(appName)
	if (els.length) {
		// remove slots from the list as they will be rendered within vue component itself
		els = [...els].filter(el => !el.parentNode.closest(vueComponentsSelector))
		VueComponentsInDom.push({
			path: vueComponentsData[appName],
			name: appName,
			els: els
		})
	}
})

// check if we have vue components in DOM
if (VueComponentsInDom.length) {
	// Define custom components way of setting vue SFCs into Dom -> shadowRoot
	// vueApps.forEach(async (app) => {
		// Using defineCustomElement
		// var element = await import(`./components/${app.name}.ce.vue`)
		// const componentToDeclare = defineCustomElement(element.default)
		// customElements.define(app.name, componentToDeclare)
	// })

	import(/* webpackChunkName: "vue-boilerplate"*/ './vue-instance').then(module => {
		const createApp = module.default
		VueComponentsInDom.forEach(async (component) => {
			const componentImport = await import(`./components/${component.name}.vue`)
			component.els.forEach(el => {
				let App = createApp(componentImport.default, { ...el.dataset })
				App.mount(el)
				App.config.productionTip = false
			})
		})
	})

}
