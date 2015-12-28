
var TestCaseC1 = new Class({

	name: "C1"
});

var TestCaseC2 = new Class({
	Extends: TestCaseC2,

	getName: function() {
		return this.name;
	}
});

QUnit.test("Variable overloading", function(assert)
{
	var tcC1 = new TestCaseC1();
	var tcC2 = new TestCaseC2();
	var tcC3 = new TestCaseC3();

	assert.equal(tcC1.name, "C1", "TestCaseC1 is called C1!");
	assert.equal(tcC2.name, "C1", "TestCaseC2 is called C1!");
	assert.equal(tcC2.getName(), "C1", "TestCaseC2 is called C1!");
	assert.equal(tcC2.test, "test", "Test");
	assert.equal(tcC3.name, "C3", "TestCaseC3 is called C3!");

});