const SecondContract = artifacts.require("SecondContract");

module.exports = function (deployer) {
  deployer.deploy(SecondContract);
};
