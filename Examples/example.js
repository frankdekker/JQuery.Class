
/*
var Example = new Class({

	initialize: function(element, options) {

		console.log("test");
	}

});
*/

var Animal = new Class({

	weight: 0,

	initialize: function(options) {
		this.setOptions(options);
		this.weight = this.options.weight;
	},

	getSpecies: function() {
		return this.options.species;
	},

	setWeight: function(w) {
		this.weight = w;
	},

	getWeight: function() {
		return this.weight;
	}
});


var Cat = new Class({
	Extends: Animal,

	initialize: function(options) {
		this.setOptions(options);
	},

	getWeight: function() {
		return 10;
	}
});

var PersianCat = new Class({
	Extends: Cat
});


var animal1 = new Animal({weight: 1, species: "feline"});
var animal2 = new Animal({weight: 2, species: "cat"});


console.log(animal1.getWeight());
console.log(animal2.getWeight());

animal1.setWeight(3);
animal2.setWeight(4);

console.log(animal1.getWeight());
console.log(animal2.getWeight());

console.log(Animal.getWeight());

Animal.setWeight(5);
console.log(animal1.getWeight());
console.log(animal2.getWeight());
console.log(Animal.getWeight());

var cat = new Cat();

console.log("cat weight: " + cat.getWeight());
console.log("cat species: " + cat.getSpecies());


//var cat = new Cat({
//	species: "feline"
//});
//console.log(cat.getWeight());
//console.log(cat.getSpecies());







