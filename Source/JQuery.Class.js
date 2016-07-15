/**
 * A way to mimic Class functionality in javascript based on mootools
 */
(function() {

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
		newClass.$definition = classDefinition;

		// apply params to class
		extend(newClass.prototype, classDefinition);

		// parent function
		newClass.prototype.parentMethod = function() {
			try {
				if (arguments.callee.caller === this.$parent) {
					if (window.console) {
						console.error('This function has no parent.');
					}
					return false;
				}
			}catch(O_o) {}

			return this.$parent.apply(this, arguments);
		};

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

	var extend = function(target, object) {
		var key, value;

		for (key in object) {

			if (object.hasOwnProperty(key) === false || object[key] === undefined ) {
				continue;
			}

			if (key === 'Extends') {
				// class overloading
				$.each($.type(object.Extends) === 'array' ? object.Extends : [object.Extends], function() {
					extend(target, this.$definition);
				});

			} else if ($.isFunction(target[key]) && $.isFunction(object[key])) {
				// function overloading
				target[key] = overload(object[key], target[key]);
			} else {
				// regular assigning
				target[key] = object[key];
			}
		}
	};

	var overload = function(overloadFunction, parentFunction) {
		return function() {
			var oldParent = this.$parent;
			this.$parent = parentFunction;
			var result = overloadFunction.apply(this, arguments);
			this.$parent = oldParent;
			return result;
		};
	};

}());
