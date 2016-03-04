/**
 * Test case to verify the objects and arrays dont share variables between class instances
 */
var TestCaseEvents = new Class({
	Extends: [Options, Events],

	testOne: null,

	options: {
		name: 'UNIT TEST',
		obj: {key: 'value'},
		arr: ['a', 'b', 'c'],
		id: 1
		/*onTestOne: function() {} */
	},

	initialize: function(options) {
		this.setOptions(options);
	}
});



QUnit.test("Events", function(assert)
{
	var test = new TestCaseEvents({
		onTestOne: function(arg) {
			this.testOne = arg;
		}
	});

	var testTwo = null;
	var testTwoF = function(arg) { testTwo = arg; };
	test.on('testTwo', testTwoF);

	// test event listener as options value
	test.trigger('testOne', 'testOne');
	assert.equal(test.testOne, 'testOne');

	// test custom set event listener
	test.trigger('testTwo', 'testTwo');
	assert.equal(testTwo, 'testTwo');

	// test remove event listener
	testTwo = 'testThree';
	test.off('testTwo', testTwoF);
	test.trigger('testTwo', 'testTwo');
	assert.equal(testTwo, 'testThree');

});
