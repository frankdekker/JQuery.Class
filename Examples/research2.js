

var reset = function(object){
	for (var key in object){
		var value = object[key];
		switch ($.type(value)){
			case 'object':
				object[key] = $.extend(true, {}, value);
				break;

			case 'array':
				object[key] = $.extend(true, [], value);
				break;
		}
	}
	return object;
};

var Function = window.Function;

Function.prototype.overloadSetter = function(usePlural){
	var self = this;
	return function(a, b){
		if (a == null) return this;
		if (usePlural || typeof a != 'string'){
			for (var k in a) self.call(this, k, a[k]);
			/*<ltIE8>*/
			forEachObjectEnumberableKey(a, self, this);
			/*</ltIE8>*/
		} else {
			self.call(this, a, b);
		}
		return this;
	};
};

Function.prototype.extend = function(key, value){
	this[key] = value;
}.overloadSetter();

var Class = function(name, params, superClass) {

	params = params || {};

	var newClass = function() {
		reset(this);
	}.extend({
		$origin: "origin",
	});

	// create a new class
	newClass.$constructor = params;
	newClass.prototype.$constructor = params;
	newClass.$_name = "class.name: " + name;
	newClass.prototype.$_name = "class.prototype.name: " + name;
	$.extend(newClass.prototype, params);

	if(superClass) {
		newClass.prototype = $.extend({}, superClass.prototype, newClass.prototype);
	}

	return newClass;
};

