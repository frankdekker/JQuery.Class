/**
 * Test case to verify the objects and arrays dont share variables between class instances
 */
var TestCaseOptions = new Class({
	Extends: Options,

	options: {
		name: 'UNIT TEST',
		obj: {
			key: 'value',
			parameters: {
				test1: 1,
				test2: 2
			}
		},
		arr: ['a', 'b', 'c'],
		id: 1
	},

	initialize: function(options) {
		this.setOptions(options);
	}
});


QUnit.test("Options", function(assert)
{
    var expected = {
    	name: 'UNIT TEST',
		obj: {
    		key: 'value',
            parameters: {
                test1: 1,
                test2: 2
            }
		},
		arr: ['a', 'b', 'c'],
		id: 1
    };

	var test = new TestCaseOptions();
	assert.deepEqual(test.options, expected);

	test.setOptions({id: 2});
	expected.id = 2;
	assert.deepEqual(test.options, expected);

	test = new TestCaseOptions({id: 3, name: 'TESTCASE'});
	expected.id = 3;
	expected.name = 'TESTCASE';
	assert.deepEqual(test.options, expected);

	test.setOptions({id: 4}, {name: 'TESTCASE2'});
	expected.id = 4;
	expected.name = 'TESTCASE2';
	assert.deepEqual(test.options, expected);

	// test nested options sets
	test.setOptions({
		obj: {
			parameters: {
				test2: 3,
				test3: 4
			}
		}
	});
	expected.obj.parameters.test2 = 3;
	expected.obj.parameters.test3 = 4;
	assert.deepEqual(test.options, expected);
});
