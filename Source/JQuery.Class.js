/**
 * A way to mimic Class functionality in javascript based on mootools
 */
(function()
{
	this.Class = function(classDefinition)
	{
		classDefinition = classDefinition || {};

		// create class structure
		var newClass = function()
		{
			// reset class variables. Clone arrays and objects
			reset(this);

			// run constructor
			return (this.initialize) ? this.initialize.apply(this, arguments) : this;
		};

		// store class definition
		newClass.$definition = $.extend(true, {}, classDefinition);

		// apply params to class
		extend(newClass, classDefinition);

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

	var extend = function(klass, object) {

		if (object.Extends) {
			$.each($.type(object.Extends) == 'array' ? object.Extends : [object.Extends], function() {
				extend(klass, this.$definition);
			});
			delete object.Extends;
		}

		$.extend(klass.prototype, object);
	}

}());