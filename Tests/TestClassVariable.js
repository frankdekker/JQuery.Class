/**
 * Test case to verify the objects and arrays dont share variables between class instances
 */
var TestCaseVariable = new Class({

	name: 'UNITTEST',

	testObject: {
		a: {
			a1: 'a1',
			a2: 'a2',
			a3: 'a3'
		},
		b: {
			b1: 'b1',
			b2: 'b2',
			b3: 'b3'
		}
	},

	testArray: [
		['a', 'b', 'c'],
		['d', 'e', 'f'],
		'f'
	],

	testMixed: [
		{a: 'a', b: 'b'}
	],

	setName:function(name) {
		this.name = name;
		return this;
	},

	getName: function() {
		return this.name;
	},

	addToObject: function(value) {
		this.testObject[value] = value;
	},

	addToInnerObject: function(value) {
		this.testObject.a[value] = value;
	},

	addToArray: function(value) {
		this.testArray.push(value);
	},

	addToInnerArray: function(value) {
		this.testArray[0].push(value);
	},

	addToMixed: function(value) {
		this.testMixed[0][value] = value;
	}

});


QUnit.test("Variables", function(assert)
{
	var tc1 = new TestCaseVariable();
	var tc2 = new TestCaseVariable();

	// test string class variable
	tc2.setName('UNITTEST 2');

	assert.equal(tc1.getName(), 'UNITTEST');
	assert.equal(tc2.getName(), 'UNITTEST 2');

	// test object class variable
	tc2.addToObject('c');
	assert.notEqual(getObjectSize(tc1.testObject), getObjectSize(tc2.testObject));

	tc2.addToInnerObject('d');
	assert.notEqual(getObjectSize(tc1.testObject.a), getObjectSize(tc2.testObject.a));

	// test array class variable
	tc2.addToArray('g');
	assert.notEqual(tc1.testArray.length, tc2.testArray.length);

	tc2.addToInnerArray('d');
	assert.notEqual(tc1.testArray[0].length, tc2.testArray[0].length);

	// test mixed class variable
	tc2.addToMixed('c');
	assert.notEqual(getObjectSize(tc1.testMixed[0]), getObjectSize(tc2.testMixed[0]));
});
