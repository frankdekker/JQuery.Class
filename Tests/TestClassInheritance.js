var TestClassInheritanceResult = [];

var TestClassInheritance1 = new Class({

	test1: function()
	{
		TestClassInheritanceResult.push(4);
	},

	test2: function()
	{
		TestClassInheritanceResult.push(3);
	}

});

var TestClassInheritance2 = new Class({
	Extends: TestClassInheritance1,

	test1: function()
	{
		TestClassInheritanceResult.push(1);
		this.test2();
		this.parentMethod();
	},

	test2: function()
	{
		TestClassInheritanceResult.push(2);
		this.parentMethod();
	}
});

var TestClassInheritance3 = new Class({
	Extends: TestClassInheritance2,

	test1: function()
	{
		TestClassInheritanceResult.push(0);
		this.parentMethod();
		this.test2();
		this.parentMethod();
	}

});


QUnit.test("Inheritance", function(assert)
{
	// single inheritance
	new TestClassInheritance2().test1();
	assert.deepEqual([1, 2, 3, 4], TestClassInheritanceResult);

	// double inheritance
	TestClassInheritanceResult = [];
	new TestClassInheritance3().test1();
	assert.deepEqual([0, 1, 2, 3, 4, 2, 3, 1, 2, 3, 4], TestClassInheritanceResult);

});