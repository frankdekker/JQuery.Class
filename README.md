# JQuery.Class
Class function based on Mootools functionality

# Example
	var Cat = new Class({
		Extends: [Options, Events]
	
		options: {
			name: 'None',
			weight: 5,
			legs: 4
			/* onMiauw: function() {} */
		}
	
		initialize: function(options) {
			this.setOptions(options);
			this.on('miauw', function() {
				console.log('Miauw...');
			});
		},
	
		getWeight: function() {
			return this.options.weight;
		},
	
		getColor: function() {
			return this.options.color;
		}
	});
	
	var cat = new Cat({
		name: 'Garfield',
		weight: 20,
		legs: 4
	});
	cat.trigger('miauw');

