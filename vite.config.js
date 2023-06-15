import * as path from 'path'
import glob from 'glob'
import vue from '@vitejs/plugin-vue'
import { default as handlebarsPlugin }  from 'vite-plugin-handlebars'
import handlebars from 'handlebars'
import layouts from 'handlebars-layouts'
import { svgBuilder } from './src/build/svgsprite'

const paths = {
	views: {
		pages: './src/pages/',
		dist: './build/'
	},
	assets: {
		dist: './build/assets/'
	},
	icons: 'src/assets/img/svg-sprite/'
}

// Icon sprite setup
var iconsInSprite = []
glob.sync(paths.icons + '**/*.svg').forEach(function (file) {
	var icon = path.basename(file, path.extname(file))
	iconsInSprite.push(icon)
})

function handlebarsOverride(options) {
	handlebars.registerHelper(layouts(handlebars))
    const plugin = handlebarsPlugin(options)
    delete plugin.handleHotUpdate
	return plugin
}

export default {
    root: 'src',
    build: {
        outDir: '../build',
		emptyOutDir: true,
		copyPublicDir: true,
		assetsDir: 'assets',
        rollupOptions: {
            input: glob.sync(path.resolve(__dirname, 'src/**', '*.html'), { ignore: path.resolve(__dirname, 'src/layouts/**') })
        },
    },
    plugins: [
		svgBuilder({
			path:'./src/assets/img/svg-sprite/',
			prefix: 'icon',
			output: './src/assets/img/',
			filename: 'svg-sprite',
			writeFile: true,
			position: 'end'
		}),
		handlebarsOverride({
            partialDirectory: [
				path.resolve(__dirname, 'src/components'),
				path.resolve(__dirname, 'src/layouts')
			],
            reloadOnPartialChange: true,
			helpers: {
                json: (context) => {
                    return JSON.stringify(context)
                },
				assets: (options) => {
					let file
					if (options.data.file) {
						file = options.data.file
					} else {
						file = options.data.root.file
					}
					let relative = path.relative(paths.views.pages, path.relative(file.cwd, path.dirname(file.path)))
					let currentPath = path.join(paths.views.dist, relative)
					return new handlebars.SafeString(path.relative(currentPath, paths.assets.dist).split('\\').join('/'))
				},
				countByKey: (data, key) => {
					let count = 0
					data.forEach(function (item) {
						if (item.pages) {
							item.pages.forEach(function (child) {
								if (child[key]) {
									count++
								}
							})
						} else if (item.blocks) {
							item.blocks.forEach(function (child) {
								if (child[key]) {
									count++
								}
							})
						}
					})
					return count
				},
				countByValue: (data, key, value) => {
					let count = 0
					data.forEach(function (item) {
						if (item.pages) {
							item.pages.forEach(function (child) {
								if (child[key] === value) {
									count++
								}
							})
						} else if (item.blocks) {
							item.blocks.forEach(function (child) {
								if (child[key] === value) {
									count++
								}
							})
						}
					})
					return count
				},
				createArray: (dataName, theData, options) => {
					const array = theData.split(',')
					options.data.root[dataName] = array
				},
				defaultValue: (value, safeValue) => {
					var out = value || safeValue
					return new handlebars.SafeString(out)
				},
				ifEquals: (arg1, arg2, options) => {
					return (arg1 == arg2) ? options.fn(this) : options.inverse(this)
				},
				lowerCase: (arg1) => {
					return arg1.replace(/\s/g, '').toLowerCase()
				},
				object: ({ hash }) => {
					return hash
				},
				parseJSON: (string, data, options) => {
					string = string.replace(/\{\{([\w]+)\}\}/g, (str, group) => data[group] || '')
					return options.fn(JSON.parse(string))
				},
				setVariable: (varName, varValue, options) => {
					if (!options.data.root) {
						options.data.root = {}
					}
					options.data.root[varName] = varValue
				},
				assetLink: (value) => {
					return new handlebars.SafeString(handlebars.Utils.escapeExpression(value))
				},
				switch: (value, options) => {
					this.switch_value = value
					return options.fn(this)
				},
				case: (value, options) => {
					if (value == this.switch_value) {
						return options.fn(this)
					}
				},
				times: (n, block) => {
					var accum = ''
					for (var i = 0;i < n;++i) {
						block.data.index = i
						block.data.offsetindex = i + 1
						block.data.first = i === 0
						block.data.last = i === (n - 1)
						accum += block.fn(this)
					}
					return accum
				}
            },
			runtimeOptions: {
				data: {
					blocklist: require('./src/data/blocklist.json'),
					pagelist: require('./src/data/pagelist.json'),
					author: 'Roy Barber',
					year: new Date().getFullYear(),
					iconList: iconsInSprite,
				}
			}
        }),
		vue()
    ],
	resolve: {
		alias: {
			// Fix hot reloading of dynamic components
			find: '@vue/runtime-core',
			replacement: '@vue/runtime-core/dist/runtime-core.esm-bundler.js',
			// Alias
			'@': path.resolve(__dirname, 'src/assets/js'),
			'@api': path.resolve(__dirname, 'src/assets/js/api'),
			'@helpers': path.resolve(__dirname, 'src/assets/js/helpers'),
			'@modules': path.resolve(__dirname, './src/assets/js/modules'),
			'@vendor': path.resolve(__dirname, './src/assets/js/vendor'),
			'@vueApps': path.resolve(__dirname, './src/assets/js/vue-apps')
		}
	},
    server: {
        watch: {
            usePolling: true,
        },
        host: true,
        strictPort: true,
        port: 5173,
		// Proxy mockoon server
		proxy: {
			'/api': {
				target: 'http://localhost:7078',
				changeOrigin: true,
				secure: false
			}
		}
    }
}
