/**
 * A way to mimic Class functionality in javascript based on mootools
 *
 * Features:
 * - a default constructor
 */
(function()
{
	this.Class = function(params)
	{
		params = params || {};

		var newClass = function()
		{
			reset(this);
			return (this.initialize) ? this.initialize.apply(this, arguments) : this;
		};

		// apply
		$.extend(newClass.prototype, params);

		return newClass;
	};

	var reset = function(object){
		for (var key in object){
			var value = object[key];
			switch ($.type(value)) {
				case 'object': object[key] = $.extend(true, {}, value); break;
				case 'array':  object[key] = $.extend(true, [], value); break;
			}
		}
		return object;
	};

}());