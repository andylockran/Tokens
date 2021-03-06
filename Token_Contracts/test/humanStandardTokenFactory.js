//This currently throws a stack underflow, and thus commented out. Contract is correctly deployed, but createHumanStandardToken throws underflow.
//Replicated under testrpc and debugging to fix this.

contract("HumanStandardTokenFactory", function(accounts) {

    it("Verify A Human Standard Token Once Deployed", function(done) {
        var factory = null;
        var newTokenAddr = null;
        HumanStandardTokenFactory.new().then(function(ctr) {
        factory = ctr;

        return factory.createHumanStandardToken.call(100000, "Simon Bucks", 2, "SBX", {from: accounts[0]});
        }).then(function(tokenContractAddr) {
            console.log(tokenContractAddr);
            newTokenAddr = tokenContractAddr;
            return factory.createHumanStandardToken(100000, "Simon Bucks", 2, "SBX", {from: accounts[0]});
        }).then(function(result) {
            console.log(result);
            return factory.verifyHumanStandardToken.call(newTokenAddr, {from: accounts[0]});
        }).then(function (result) {
            console.log(result);
            assert.strictEqual(result, true);
            done();
        }).catch(done);
    });
});
