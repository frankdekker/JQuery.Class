var TestClassInheritanceResult = [];

var TestClassInheritance1 = new Class({

	test1: function()
	{
		TestClassInheritanceResult.push(4);
	},

	test2: function()
	{
		TestClassInheritanceResult.push(3);
	},
	
	test3: function()
	{
		return 'unittest';
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
	},
	
	test3: function() {
		return this.parentMethod();
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
	},
	
	test3: function() 
	{
		return this.parentMethod();	
	}

});


QUnit.test("Inheritance", function(assert)
{
	// single inheritance
	var testClassInheritance = new TestClassInheritance2();
	testClassInheritance.test1();
	assert.deepEqual([1, 2, 3, 4], TestClassInheritanceResult);
	assert.equals('unittest', testClassInheritance.test3());

	// double inheritance
	TestClassInheritanceResult = [];
	testClassInheritance = new TestClassInheritance3();
	testClassInheritance.test1();
	
	assert.deepEqual([0, 1, 2, 3, 4, 2, 3, 1, 2, 3, 4], TestClassInheritanceResult);
	assert.equals('unittest', testClassInheritance.test3());
});
