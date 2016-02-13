# JQuery.Class
Class function based on Mootools functionality

`
var Cat = new Class({

	name: null,
	weight: 0,
	color: null,

	initialize: function(weight, color) {
		this.weight = weight;
		this.color = color;
	},

	getWeight: function() {
		return this.weight;
	},

	getColor: function() {
		return this.color;
	}
})


var cat1 = new Cat(10, 'red');
var cat2 = new Cat(5, 'black');
`
