var fs = require('fs')
import { join } from'path'

const findSvgTitleReg = /<svg([^>+].*?)>/
const findHeightWidthReg = /(width|height)="([^>+].*?)"/g
const findViewBoxReg = /(viewBox="[^>+].*?")/g
const findReturnStrReg = /(\r)|(\n)/g

const extractSvgHeightWidth = (svgTagStr) => {
	let width = '0'
	let height = '0'
	const res = svgTagStr.replace(findHeightWidthReg, ($1, type, value) => {
		if (type === 'width') {
			width = value
		} else if (type === 'height') {
			height = value
		}
		return ''
	})
	return {
		str: res,
		width,
		height
	}
}
const getSvgName = (filename) => filename.replace('.svg', '')
const clearReturnStr = (svgStr) => svgStr.replace(findReturnStrReg, '')
const formatSvgTagAsSymbolTag = (svgStr, filename, idPrefix = '') => {
	const id = idPrefix ? `${idPrefix}-${getSvgName(filename)}` : getSvgName(filename)
	return svgStr.replace(findSvgTitleReg, ($1, svgTagStr) => {
		const extractRes = extractSvgHeightWidth(svgTagStr)
		if (!findViewBoxReg.test(extractRes.str)) {
			// const { width, height } = extractRes
			// extractRes.str += `width="${width}" height="${height}"`
		}
		return `<symbol id="${id}" ${extractRes.str}>`
	}).replace('</svg>', '</symbol>')
}
const isSvg = (name) => {
	const splitList = name.split('.')
	const fileType = splitList[splitList.length - 1]
	return fileType === 'svg'
}

let idPrefix = ''
const findSvgFile = (dir) => {
	const svgContents = []
	if (dir === '')
		return svgContents
	const direntList = fs.readdirSync(dir, {
		withFileTypes: true
	})
	direntList.forEach((dirent) => {
		const path = `${dir}${dirent.name}`
		if (dirent.isDirectory()) {
			svgContents.push(...findSvgFile(`${path}/`))
		} else if (isSvg(dirent.name)) {
			const fileContent = fs.readFileSync(path).toString()
			const svgContent = formatSvgTagAsSymbolTag(clearReturnStr(fileContent), dirent.name, idPrefix)
			svgContents.push(svgContent)
		}
	})
	return svgContents
}
const svgBuilder = (option) => {
	const { path = '', prefix = '', output = '', filename = 'svg-sprite',  writeFile = false, position = 'start'} = option
	idPrefix = prefix
	const res = findSvgFile(path)
	
	if(writeFile){
		fs.writeFile(join(process.cwd(), output, `/${filename}.svg`), 
		`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">${res.join('')}</svg>`, function(err) {
			if(err) {
				return console.log(err, {color: 'red'})
			}
			console.log('The spritemap.svg saved!')
		})
		return {
			name: 'svg-transform'
		}
	} else {
		return {
			name: 'svg-transform',
			transformIndexHtml(html) {
				if(position === 'end'){
					return res.length > 0 ? html.replace('</body>', `
							<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" style="position: absolute; width: 0; height: 0">
								${res.join('')}
							</svg>
						</body>
					`) : html
				} else {
					return res.length > 0 ? html.replace(/<body(.*?)>/, `
						<body $1>
							<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" style="position: absolute; width: 0; height: 0">
								${res.join('')}
						  	</svg>
					`) : html
				}
				
			}
		}
	}
}

exports.svgBuilder = svgBuilder
