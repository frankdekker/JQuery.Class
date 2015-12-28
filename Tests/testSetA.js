
var TestCaseA1 = new Class({

	name: "TestCaseA1",

	setName: function(name) {
		this.name = name;
		return this;
	},

	getName: function() {
		return this.name;
	}
});

var TestCaseA2 = new Class({
	Extends: TestCaseA1,

	getName: function() {
		return "TestCaseA2";
	}
});

var TestCaseA3 = new Class({
	Extends: TestCaseA1,

	name: "TestCaseA3"
});

var TestCaseA4 = new Class({
	Extends: [TestCaseA1, TestCaseA2]
});

var TestCaseA5 = new Class({
	Extends: [TestCaseA1, TestCaseA3]
});


QUnit.test("Inheritance", function(assert)
{
	var tcA1 = new TestCaseA1();
	var tcA2 = new TestCaseA2();
	var tcA3 = new TestCaseA3();
	var tcA4 = new TestCaseA4();
	var tcA5 = new TestCaseA5();

	assert.equal(tcA1.getName(), "TestCaseA1", "TestCase A1 name is TestCaseA1");
	assert.equal(tcA2.getName(), "TestCaseA2", "TestCase A2 name is TestCaseA2");
	assert.equal(tcA3.getName(), "TestCaseA3", "TestCase A3 name is TestCaseA3");
	assert.equal(tcA4.getName(), "TestCaseA2", "TestCase A4 name is TestCaseA2");
	assert.equal(tcA5.getName(), "TestCaseA3", "TestCase A5 name is TestCaseA3");

	tcA5.setName("A5");
	tcA4.setName("A4");
	tcA3.setName("A3");
	tcA2.setName("A2");
	tcA1.setName("A1");

	assert.equal(tcA1.getName(), "A1", "TestCase A1 name is now A1");
	assert.equal(tcA2.getName(), "TestCaseA2", "TestCase A2 name is still TestCaseA2");
	assert.equal(tcA3.getName(), "A3", "TestCase A3 name is now A3");
	assert.equal(tcA4.getName(), "TestCaseA2", "TestCase A4 name is still TestCaseA2");
	assert.equal(tcA5.getName(), "A5", "TestCase A5 name is A5");
});
