


//var Class = function(params) {};

//Class.prototype.test = "test";
//Class.prototype.run = function() { console.log("run"); };


var Animal = function(params) {};
Animal.prototype.species = "cat";
Animal.prototype.properties = {"fur": true, "tail": false, "legs": 0};
Animal.prototype.setProperty = function(key, value) { this.properties[key] = value };
Animal.prototype.run = function() { console.log("run"); };


var Cat = function() {};
$.extend(Cat.prototype, Animal.prototype);
Cat.prototype.run = function() { console.log( "cat runs" ) };

var Persian = function() {};
$.extend(Persian.prototype, Cat.prototype);

var cat = new Cat();
cat.setProperty("legs", 4);
cat.species = "cat";

var persian = new Persian();
persian.setProperty("legs", 6);
persian.species = "persian";


console.log(cat.properties);
console.log(persian.properties);

console.log(cat.species);
console.log(persian.species);



