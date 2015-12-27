
/*
var Example = new Class({

	initialize: function(element, options) {

		console.log("test");
	}

});
*/

var Test = new Class({

	options: {
		test: "a"
	},

	initialize: function(options) {
		this.setOptions(options);

		if (this.options.set === "a") {
			this.options.set = "c";
		}

		console.log(this.options);


	}
});

new Test({
	set: "a",
	test: "a"
});

new Test({
	set: "b",
	test: "b"
});



