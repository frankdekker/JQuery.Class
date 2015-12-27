

var Animal = new Class({
	name: "animal",
	options: {
		name: "no name"
	},

	initialize: function(options) {
		this.setOptions(options);
	},

	setName: function(name) {
		this.options.name = name;
		return this;
	},

	getName: function() {
		return this.options.name;
	},

	getSpecies: function() {
		return "animal";
	},

	toDescription: function() {
		return this.getSpecies() + " " + this.getName();
	}
});


var Cat = new Class({
	name: "cat",
	Extends: Animal,

	getSpecies: function() {
		return this.parent() + ": Cat";
	}
});


var Persian = new Class({
	name: "persian",
	Extends: Cat,

	getSpecies: function() {
		return this.parent() + ": Persian";
	}
});




//var cat1 = new Animal();
//var cat2 = new Cat();
var cat3 = new Persian().setName("Miauw");


//console.log(cat1.getSpecies());
//console.log(cat2.getSpecies());
//console.log(cat3.getSpecies());
console.log(cat3.toDescription());