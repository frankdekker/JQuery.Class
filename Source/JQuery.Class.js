/**
 * A way to mimic Class functionality in javascript based on mootools
 *
 * Features:
 * - class inheritance
 * - functionality implementation
 * - a default constructor
 * - options
 */
(function()
{
	var implementF = function(newClass, object) {
		if(object === undefined) return;
		for (var key in object) {
			if (object.hasOwnProperty(key)) {
				newClass[key] = newClass.prototype[key] = object[key];
			}
		}
	};

	var inheritF = function(newClass, inherit) {

		if ($.type(inherit) !== 'array') {
			inherit = [inherit];
		}

		$.each(inherit, function(index, value) {
			if(value.prototype.$definition.Extends) {
				inheritF(newClass, value.prototype.$definition.Extends);
			}
			for (var key in value) {
				if (value.hasOwnProperty(key)) {
					newClass[key] = newClass.prototype[key] = value[key];
				}
			}
		});
	};

	var Class = this.Class = function(params)
	{
		params = params || {};

		var newClass = function()
		{
			this.extend(params);
			return (this.initialize) ? this.initialize.apply(this, arguments) : this;
		};

		newClass.prototype.$definition = $.extend(true, {}, params);
		newClass.prototype.options = {};

		implementF(newClass, {
			implement: function(object)
			{
				if (object === undefined) return;
				for (var key in object) {
					if (object.hasOwnProperty(key)) {
						this.prototype[key] = object[key];
					}
				}
			},
			extend: function(object)
			{
				if (object === undefined) return;
				for (var key in object) {
					if (object.hasOwnProperty(key)) {
						this[key] = object[key];
					}
				}
				return this;
			},
			setOption: function(key, value) {
				this.options[key] = value;
				return this;
			},
			setOptions: function(options)
			{
				if (options === undefined) return;
				for (var k in options) {
					if (options.hasOwnProperty(k)) {
						this.options[k] = options[k];
					}
				}
				return this;
			}
		});

		if (params.Extends) {
			inheritF(newClass, params.Extends);
		}

		return newClass.extend(params);
	};

}());