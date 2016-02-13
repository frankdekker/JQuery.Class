/**
 * Test case to verify the objects and arrays dont share variables between class instances
 */
var TestCase = new Class({
	Extends: Options,

	options: {
		name: 'UNIT TEST',
		obj: {key: 'value'},
		arr: ['a', 'b', 'c'],
		id: 1
	},

	initialize: function(options) {
		this.setOptions(options);
	}
});





QUnit.test("Options", function(assert)
{
	var test = new TestCase();
	assert.deepEqual(test.options, {name: 'UNIT TEST',obj: {key: 'value'},arr: ['a', 'b', 'c'],id: 1});

	test.setOptions({id: 2});
	assert.deepEqual(test.options, {name: 'UNIT TEST',obj: {key: 'value'},arr: ['a', 'b', 'c'],id: 2});

	test = new TestCase({id: 3, name: 'TESTCASE'});
	assert.deepEqual(test.options, {name: 'TESTCASE',obj: {key: 'value'},arr: ['a', 'b', 'c'],id: 3});

	test.setOptions({id: 4}, {name: 'TESTCASE2'});
	assert.deepEqual(test.options, {name: 'TESTCASE2',obj: {key: 'value'},arr: ['a', 'b', 'c'],id: 4});
});
