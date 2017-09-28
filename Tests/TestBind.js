var TestCaseBind = new Class({
    Extends: Events,

    arg1: null,
    arg2: null,
    arg3: null,
    arg4: null,

    initialize: function() {
        this.onClick1 = this.onClick1.bind(this);
        this.onClick2 = this.onClick2.bind(this, 'arg1');
        this.onClick3 = this.onClick3.bind(this, 'arg1', 'arg2');
    },

    onClick1: function(arg1, arg2) {
        this.arg1 = arg1;
        this.arg2 = arg2;
    },

    onClick2: function(arg1, arg2) {
        this.arg1 = arg1;
        this.arg2 = arg2;
    },

    onClick3: function(arg1, arg2, arg3, arg4) {
        this.arg1 = arg1;
        this.arg2 = arg2;
        this.arg3 = arg3;
        this.arg4 = arg4;
    }
});


QUnit.test("Bind", function(assert) {
    var tc1 = new TestCaseBind();

    // called without any arguments
    tc1.onClick1();
    assert.equal(undefined, tc1.arg1);
    assert.equal(undefined, tc1.arg2);

    // called with one argument
    tc1.onClick1('arg1');
    assert.equal('arg1', tc1.arg1);
    assert.equal(undefined, tc1.arg2);

    var tc2 = new TestCaseBind();

    // called with no arguments, but with one predefined argument
    tc2.onClick2();
    assert.equal('arg1', tc2.arg1);
    assert.equal(undefined, tc2.arg2);

    // called with one argument, and with predefined argument
    tc2.onClick2('arg2');
    assert.equal('arg1', tc2.arg1);
    assert.equal('arg2', tc2.arg2);

    var tc3 = new TestCaseBind();

    // called with two arguments, and with two predefined arguments
    tc3.onClick3('arg3', 'arg4');
    assert.equal('arg1', tc3.arg1);
    assert.equal('arg2', tc3.arg2);
    assert.equal('arg3', tc3.arg3);
    assert.equal('arg4', tc3.arg4);
});