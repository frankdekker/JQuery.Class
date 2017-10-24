var TestClassInheritanceResult = [];

var TestClassInheritance1 = new Class({

	var1: null,
	var5a: null,

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
	},

	test4: function()
	{
		this.var1 = 'varunittest1';
	},

	test5: function(arg1)
	{
		this.var5a = arg1;
    }

});

var TestClassInheritance2 = new Class({
	Extends: TestClassInheritance1,

	var2: null,
	var5b: null,

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
	
	test3: function()
	{
		return this.parentMethod();
	},

	test4: function()
	{
		this.parentMethod();
		this.var2 = 'varunittest2';
	},

	test5: function(arg1, arg2)
	{
		this.parentMethod(arg1);
		this.var5b = arg2;
	}
});

var TestClassInheritance3 = new Class({
	Extends: TestClassInheritance2,

	var3: null,
	var5c: null,

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
	},

	test4: function()
	{
		this.parentMethod();
		this.var3 = 'varunittest3';
	},

    test5: function(arg1, arg2, arg3)
    {
        this.parentMethod(arg1, arg2);
        this.var5c = arg3;
    }
});


QUnit.test("Inheritance", function(assert)
{
	// single inheritance
	var testClassInheritance = new TestClassInheritance2();
	testClassInheritance.test1();
	testClassInheritance.test4();
	assert.deepEqual([1, 2, 3, 4], TestClassInheritanceResult);
	assert.equal('unittest', testClassInheritance.test3());
	assert.equal('varunittest1', testClassInheritance.var1);
	assert.equal('varunittest2', testClassInheritance.var2);

	// double inheritance
	TestClassInheritanceResult = [];
	testClassInheritance = new TestClassInheritance3();
	testClassInheritance.test1();
	testClassInheritance.test4();
	testClassInheritance.test5('a', 'b', 'c');
	
	assert.deepEqual([0, 1, 2, 3, 4, 2, 3, 1, 2, 3, 4], TestClassInheritanceResult);
	assert.equal('unittest', testClassInheritance.test3());
	assert.equal('varunittest1', testClassInheritance.var1);
	assert.equal('varunittest2', testClassInheritance.var2);
	assert.equal('varunittest3', testClassInheritance.var3);

	assert.equal('a', testClassInheritance.var5a);
	assert.equal('b', testClassInheritance.var5b);
	assert.equal('c', testClassInheritance.var5c);
});
