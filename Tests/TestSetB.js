

var TestCaseB1 = new Class({
	id: "TestCaseB1",

	getName: function() {
		return "TestCaseB1";
	}

});


var TestCaseB2 = new Class({
	Extends: TestCaseB1,
	id: "TestCaseB2",

	getName: function() {
		return this.parent() + " -> TestCaseB2";
	}
});


var TestCaseB3 = new Class({
	Extends: TestCaseB2,

	getName: function() {
		return this.parent() + " -> TestCaseB3";
	}
});


QUnit.test("Function overloading", function(assert)
{
	var tcB1 = new TestCaseB1();
	var tcB2 = new TestCaseB2();
	var tcB3 = new TestCaseB3();

	assert.equal(tcB1.getName(), "TestCaseB1", "TestCaseB1 is called TestCaseB1!");
	assert.equal(tcB2.getName(), "TestCaseB1 -> TestCaseB2", "TestCaseB2 is called TestCaseB1 TestCase B2");
	assert.equal(tcB3.getName(), "TestCaseB1 -> TestCaseB2 -> TestCaseB3", "TestCaseB3 is called TestCaseB1 TestCase B2 TestCase B3");

});
