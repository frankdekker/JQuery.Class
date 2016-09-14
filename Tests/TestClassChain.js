/**
 * Test case to test the chain functionality
 */
var TestCaseChain = new Class({
    Extends: Chain,

    asyncCall: function() {
        setTimeout(function() {
            this.callChain(1, 2, 3);
        }.bind(this), 1);

        return this;
    }

});

QUnit.test("Chain", function(assert)
{
    var test = new TestCaseChain();
    var fn1 = function() {};
    var fn2 = function() {};
    var done = assert.async();

    // test chaining
    test.chain(fn1);
    test.chain(fn2);

    assert.equal(test.$chains.length, 2);

    // test clearing chain
    test.clearChain();
    assert.equal(test.$chains.length, 0);

    // test chaining
    test.asyncCall().chain(function(arg1, arg2, arg3) {
        assert.deepEqual([arg1, arg2, arg3], [1,2,3]);
        assert.equal(test.$chains.length, 0);
        done();
    });
});