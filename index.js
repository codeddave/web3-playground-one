const Web3 = require("web3");
const MyContract = require("./build/contracts/MyContract.json");

const init = async () => {
  const web3 = new Web3("http://localhost:9545");
  const id = await web3.eth.net.getId();
  const deployedNetwork = MyContract.networks[id];
  console.log();
  const contract = new web3.eth.Contract(
    MyContract.abi,
    deployedNetwork.address
  );
  //CALL TRANSACTION
  const result = await contract.methods.getData().call();
  console.log(result);

  //Returns array of all addresses from Ganache
  const addresses = await web3.eth.getAccounts();

  /*  // async/await syntax
  const receipt = await contract.methods.setData(10).send({
    from: addresses[0],
  });
 */

  //promise based syntax
  /*  contract.methods
    .setData(20)
    .send({
      from: addresses[0],
    })
    .then((result) => console.log(result))
    .catch((error) => console.log(error)); */

  //console.log(receipt);

  contract.methods
    .setData(60)
    .send({
      from: addresses[0],
    })
    .on("receipt", (receipt) => {
      console.log(receipt, "helloooo");
    });
  const data = await contract.methods.getData().call();
  console.log(data);
};
init();
