

var Animal = new Class({

	getSpecies: function() {
		return "animal";
	}
});


var Cat = new Class({
	Extends: Animal,

	getSpecies: function() {
		return this.parent() + ": Cat";
	}
});

var Persian = new Class({
	Extends: Cat,

	getSpecies: function() {
		return this.parent() + ": Persian";
	}
});

var cat1 = new Animal();
var cat2 = new Cat();
var cat3 = new Persian();

console.log(cat1.getSpecies());
console.log(cat2.getSpecies());
console.log(cat3.getSpecies());