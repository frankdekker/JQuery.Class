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
	var implementF = function(newClass, object)
	{
		if (object === undefined) return;
		for (var key in object) {
			if (key != "Extends" && object.hasOwnProperty(key)) {

				var func = object[key],
					wrap = func,
					fParent = newClass[key];

				// wrap function for parent call
				if ($.type(func) == "function"
					&& newClass[key] != undefined
					&& newClass.prototype.$definition[key]
				    && func.$wrapped != true
				) {
					wrap = function()
					{
						this.$parent = fParent;
						return func.apply(this, arguments);
					}
					wrap.$wrapped = true;
				}

				newClass[key] = newClass.prototype[key] = wrap;
			}
		}
	};

	var inheritF = function(newClass, inherit)
	{
		if ($.type(inherit) !== 'array') {
			inherit = [inherit];
		}

		$.each(inherit, function(index, value)
		{
			if (value.prototype.$definition.Extends) {
				inheritF(newClass, value.prototype.$definition.Extends);
			}
			implementF(newClass, value);
		});
	};

	var Class = this.Class = function(params)
	{
		params = params || {};

		var newClass = function()
		{
			return (this.initialize) ? this.initialize.apply(this, arguments) : this;
		};

		newClass.prototype.$definition = $.extend(true, {}, params);
		newClass.prototype.options = {};

		// add some default class functions
		implementF(newClass, {
			parent: function()
			{
				if (this.$parent && $.type(this.$parent) == "function") {
					return this.$parent.apply(this, arguments);
				}
				throw new Exception("Can't call parent function");
			},
			setOption: function(key, value)
			{
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

		// class extends another class, inherit functionality
		if (params.Extends) {
			inheritF(newClass, params.Extends);
		}

		// apply params to class functionality
		implementF(newClass, params);

		return newClass;
	};

}());