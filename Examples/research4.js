
var reset = function(object){
	for (var key in object){
		var value = object[key];
		switch ($.type(value)){
			case 'object': object[key] = $.extend(true, {}, value); break;
			case 'array':  object[key] = $.extend(true, [], value); break;
		}
	}
	return object;
};

var extendClass = function(newClass, superClass, className) {

	console.log("class: ", newClass);
	console.log("superclass: ", superClass);
	for(var key in superClass.prototype) {
		console.log("superclass.prototype.key: " + key);
	}

	console.log("superclass.constructor: ", superClass.$constructor);
	for(var key in superClass.$constructor) {
		console.log("superclass.constructor.key: " + key);
	}

	if(superClass.$constructor) {
		for(var key in superClass.$constructor) {

			(function(c, k, currentFunc, superClassFunc)
			{
				console.log("newclass.prototype.name: " + currentFunc);

				if (currentFunc && superClassFunc) {

					var F = function()
					{
						console.log("wrap.classname: " + className, superClassFunc, 'wraps', currentFunc);
						this.parent = superClassFunc;
						currentFunc.apply(this, arguments);
					};
					c.prototype[k] = F;

				} else {
					c.prototype[k] = superClassFunc;
				}
			})(newClass, key, newClass.prototype[key], superClass.$constructor[key]);
		}
	}


};


var Class = function(params)
{
	params = params || {};

	var newClass = function()
	{
		reset(this);
		console.log("new class");
		return this;
	};

	newClass.$constructor = params;
	newClass.prototype.$var = "variable";
	newClass.prototype.$function = function() { console.log("function")};
	newClass.prototype.name = params['name'];

	return newClass;
};

// returns function
var Animal = new Class({
	name: function() {
		console.log("animal");
	}
});

var Beast = new Class({
	name: function() {
		console.log("beast");
		if(this.parent) this.parent();
	}
});


var Cat = new Class({
	name: function() {
		console.log("cat");
		if(this.parent) this.parent();
	}
});


//extendClass(Beast, Animal);
//extendClass(Cat, Animal, 'Animal');
//extendClass(Cat, Beast, 'Beast');
//
//var c = new Cat();
//console.log("------------");
//c.name();

var f1 = function() {
	console.log("f1: ", this.$parent);
};

var f2 = function() {
	f1.apply(this, arguments);
};
f2.prototype.$parent = "parent";
f2.prototype.$parentF = f1;


var f3 = function() {
	return new f2();
};



var f4 = function() {
	console.log("f4: ", this.$parent);
	f3.apply(this, arguments);
};
f4.prototype.$parent = "parent2";
f4.prototype.$parentF = f3;

var f5 = function() {
	return new f4();
};




f5();











