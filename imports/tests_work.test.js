describe('mocha runs our tests successfully', function() {
    it('asserts true things without chai', function() {
        assert(true);
    });
    it('asserts with chai', function() {
        var expect = chai.expect;
        expect(true).to.be(true);
        expect(false).not.to.be(true);
    });
});

