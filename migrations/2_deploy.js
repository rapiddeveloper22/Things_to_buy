var Things = artifacts.require("./Things.sol");

module.exports = function (deployer) {
    deployer.deploy(Things);
};