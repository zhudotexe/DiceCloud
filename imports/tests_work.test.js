import chai from 'chai';
describe('mocha runs our tests successfully', function() {
    it('asserts with chai', function() {
        var expect = chai.expect;
        expect(true).to.equal(true);
        expect(false).not.to.equal(true);
    });
});

