const MyContract = artifacts.require("MyContract");

module.exports = async function (deployer, _, accounts) {
  await deployer.deploy(MyContract);
  await web3.eth.sendTransaction({
    from: accounts[0],
    to: "0x2743981379FfDeD14C2C86d552B31DEBa12d5273",
    value: web3.utils.toWei("1", "ether"),
  });
};
