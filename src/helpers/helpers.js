import Handlebars from 'handlebars'

var path = require('path');

const paths = {
	views: {
		pages: './src/pages/',
		dist: './dist/'
	},
	assets: {
		dist: './dist/assets/'
	}
}

module.exports.register = function (Handlebars) {
	Handlebars.registerHelper("assets", function (options) {

		let file;

		if (options.data.file) {
			file = options.data.file;
		} else {
			file = options.data.root.file;
		}

		let relative = path.relative(paths.views.pages, path.relative(file.cwd, path.dirname(file.path)));
		let currentPath = path.join(paths.views.dist, relative);

		return new Handlebars.SafeString(path.relative(currentPath, paths.assets.dist).split('\\').join('/'));
	});
};


// Find the amount of pages based on a status
module.exports.register = function (Handlebars) {
	Handlebars.registerHelper('countByKey', function (data, key, options) {
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
	});
};


// Find the amount of pages based on a status
module.exports.register = function (Handlebars) {
	Handlebars.registerHelper('countByValue', function (data, key, value, options) {
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
	});
};


// Create an array and add it into handlebars Data
// Usage: {createArray "myColors" "bg-primary, bg-coral"}}
module.exports.register = function (Handlebars) {
	Handlebars.registerHelper('createArray', function (dataName, theData, options) {
		const array = theData.split(',')
		options.data.root[dataName] = array
	});
};

// Set a default value for a property. Usage:
// {{defaultValue pageTitle "Default page title"}}
module.exports.register = function (Handlebars) {
	Handlebars.registerHelper('defaultValue', function (value, safeValue) {
		var out = value || safeValue;
		return new Handlebars.SafeString(out);
	});
};

// IfEquals
module.exports.register = function (Handlebars) {
	Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
		return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
	});
};

module.exports.register = function (Handlebars) {
	Handlebars.registerHelper('lowerCase', function (arg1) {
		return arg1.replace(/\s/g, '').toLowerCase()
	});
};

module.exports.register = function (Handlebars) {
	Handlebars.registerHelper('object', function ({ hash }) {
		return hash;
	})
};

module.exports.register = function (Handlebars) {
	Handlebars.registerHelper('parseJSON', (string, data, options) => {
		string = string.replace(/\{\{([\w]+)\}\}/g, (str, group) => data[group] || '');

		return options.fn(JSON.parse(string));

	});

};

module.exports.register = function (Handlebars) {

	Handlebars.registerHelper("setVariable", function (varName, varValue, options) {
		if (!options.data.root) {
			options.data.root = {};
		}
		options.data.root[varName] = varValue;
	});


	Handlebars.registerHelper('assetLink', function (value) {
		return new Handlebars.SafeString(Handlebars.Utils.escapeExpression(value));
	});


};

module.exports.register = function (Handlebars) {
	Handlebars.registerHelper('switch', function (value, options) {
		this.switch_value = value;
		return options.fn(this);
	});
	Handlebars.registerHelper('case', function (value, options) {
		if (value == this.switch_value) {
			return options.fn(this);
		}
	});
};

module.exports.register = function (Handlebars) {
	Handlebars.registerHelper('times', function (n, block) {
		var accum = '';
		for (var i = 0;i < n;++i) {
			block.data.index = i;
			block.data.offsetindex = i + 1;
			block.data.first = i === 0;
			block.data.last = i === (n - 1);
			accum += block.fn(this);
		}
		return accum;
	});
};


