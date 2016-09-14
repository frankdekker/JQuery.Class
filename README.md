# JQuery.Class
Class function based on Mootools functionality

# Requires
JQuery

# Example
Simple class

	var Animal = new Class({
		name: null,
		age: null,
		initialize: function(name, age) {
			this.name = name;
			this.age = age;
		},
		introduce: function() {
			 alert("My name is " + this.name + ", " + this.age + " years.old");
		}
	});

Inheritance

	var Cat = new Class({
		Extends: Animal,
		color: null,
		initialize: function(name, age, color) {
			this.parentMethod(name, age);
			this.color = color;
		}
	});

Options

	var Human = new Class({
		options: {
			length: 200,
			weight: 80,
			hair: 'long'
		},
		initialize: function(options) {
			this.setOptions(options);
		}
	});

	var person = new Human({
		length: 175,
		weight: 70
	});

Events

	var Human = new Class({
		weapon: null,
		initialize: function(weapon) {
			this.weapon = weapon;
			this.on('attacked', this.defend.bind(this));
		},
		defend: function() {
			alert("Use " + this.weapon);
		}
	});

	var person = new Human();
	person.trigger('attacked');

Chain

    var Ajax = new Class({
        Extends: [Chain],
        
        post: function() {
            // do asynchronous callback
            $.post('', {}, function() {
                this.callChain('done');
            }.bind(this));            
        }    
    });
    
    var ajax = new Ajax();
    ajax.post().chain(function(response) {
        console.log(response); // output is "done"
    });    
    
