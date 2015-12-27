var Shape = new Class({

	options: {
		color: 'white'
	},

	initialize: function(options)
	{
		this.setOptions(options);
	},

	getColor: function()
	{
		return this.options.color;
	},

	setColor: function(c)
	{
		this.options.color = c;
		return this;
	},

	getCircumference: function()
	{
		throw new Exception("Not implemented")
	},

	getSurface: function()
	{
		throw new Exception("Not implemented");
	}

});

var Circle = new Class({
	Extends: Shape,

	options: {
		diameter: 1
	},

	initialize: function(options)
	{
		this.setOptions(options);
	},

	getCircumference: function()
	{
		return Math.PI * this.options.diameter;
	},

	getSurface: function()
	{
		return Math.PI * Math.pow(this.options.diameter/2, 2);
	}
});

var Rectangle = new Class({
	Extends: Shape,

	options: {
		width: 10,
		height: 10
	},

	initialize: function(options)
	{
		this.setOptions(options);
	},

	getCircumference: function()
	{
		return this.options.width * 2 + this.options.height * 2;
	},

	getSurface: function()
	{
		return this.options.width * this.options.height;
	}
});

var Square = new Class({
	Extends: Rectangle,

	options: {
		size: 5
	},

	initialize: function(options) {
		this.setOptions(options);
		this.options.width = this.options.height = this.options.size;
	}
});


var shape = new Shape({
	color: 'orange'
});

var rect = new Rectangle({
	color: 'red',
	width: 50,
	height: 70
});

var circ = new Circle({
	color: 'yellow',
	diameter: 10
});

var sqr = new Square({
	color: 'pink',
	size: 70
});


QUnit.test("Rectangle", function(assert)
{
	assert.equal(rect.getCircumference(), 240, "Circumference is 240");
	assert.equal(rect.getSurface(), 3500, "Surface is 3500");
	assert.equal(rect.getColor(), 'red', "Color is red");

	rect.setColor('blue');
	assert.equal(rect.getColor(), 'blue', "Color is blue");

	rect.setOption('color', 'green');
	assert.equal(rect.getColor(), 'green', "Color is green");
});

QUnit.test("Circle", function(assert)
{
	assert.equal(Math.round(circ.getCircumference()), 31, "Circumference is 31");
	assert.equal(Math.round(circ.getSurface()), 79, "Surface is 79");
	assert.equal(circ.getColor(), 'yellow', "Color is yellow");

	circ.setColor('blue');
	assert.equal(circ.getColor(), 'blue', "Color is blue");

	circ.setOption('color', 'green');
	assert.equal(circ.getColor(), 'green', "Color is green");
});

QUnit.test("Square", function(assert)
{
	assert.equal(sqr.getCircumference(), 280, "Circumference is 280");
	assert.equal(sqr.getSurface(), 4900, "Surface is 4900");
	assert.equal(sqr.getColor(), 'pink', "Color is pink");

	sqr.setColor('blue');
	assert.equal(sqr.getColor(), 'blue', "Color is blue");

	sqr.setOption('color', 'green');
	assert.equal(sqr.getColor(), 'green', "Color is green");
});

QUnit.test("Scopes", function(assert)
{
	rect.setColor('blue');
	sqr.setColor('black');
	shape.setColor('white');

	assert.equal(rect.getColor(), 'blue', "Rectangle is blue");
	assert.equal(sqr.getColor(), 'black', "Square is black");
	assert.equal(shape.getColor(), 'white', "Shape is white");
});