const Web3 = require("web3");
const MyContract = require("./build/contracts/SecondContract.json");

const init = async () => {
  const web3 = new Web3("http://localhost:9545");
  const id = await web3.eth.net.getId();
  const deployedNetwork = MyContract.networks[id];
  console.log();
  const contract = new web3.eth.Contract(
    MyContract.abi,
    deployedNetwork.address
  );
  const addresses = await web3.eth.getAccounts();

  //CALL TRANSACTION
  /*   const result = await contract.methods.getData().call();
  console.log(result); */

  //Returns array of all addresses from Ganache

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

  /*  contract.methods
    .setData(60)
    .send({
      from: addresses[0],
    })
    .on("receipt", (receipt) => {
      console.log(receipt, "helloooo");
    }).on('confirmation', (confirmationNumber, receipt)=> {



    }).on('error', (erro, receipt)=> {

    }) */
  // const data = await contract.methods.getData().call();
  //Wei(a fraction of Ether)
  //web3.utils.toBN('100000')

  await contract.methods.sendEther().send({
    from: addresses[0],
    value: "100000",
  });

  console.log(await contract.methods.functionCalled().call());

  await web3.eth.sendTransaction({
    from: addresses[0],
    to: contract.options.address,
    value: "10000",
  });
  console.log(await contract.methods.functionCalled().call());

  await web3.eth.sendTransaction({
    from: addresses[0],
    to: addresses[1],
    value: "10000",
  });
};
init();
