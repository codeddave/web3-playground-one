const Web3 = require("web3");
const MyContract = require("./build/contracts/MyContract.json");

const HDWalletProvider = require("@truffle/hdwallet-provider");
const address = "0x2743981379FfDeD14C2C86d552B31DEBa12d5273";
const privateKey =
  "0x431d4c862c6695058c3c5a40ddd2b58400f4310429a9f9e05a7e4b4f4fbc6866";

const init = async () => {
  const provider = new HDWalletProvider(privateKey, "http://localhost:9545");
  const web3 = new Web3(provider);
  const id = await web3.eth.net.getId();
  const deployedNetwork = MyContract.networks[id];
  const contract = new web3.eth.Contract(
    MyContract.abi,
    deployedNetwork.address
  );
  const addresses = await web3.eth.getAccounts();

  await contract.methods.setData(30).send({
    from: addresses[0],
  });

  const result = await contract.methods.getData().call();

  console.log(result);

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

  /*   await contract.methods.sendEther().send({
    from: addresses[0],
    value: "100000",
  });

  console.log(await contract.methods.functionCalled().call());
  ///wdlvn
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
  }); */

  /* await contract.methods.emitEvent("hey").send({
    from: addresses[0],
  });

  contract.events
    .MyEvent({
      fromBlock: 0,
    })
    .on("data", (event) => console.log(event));

  await new Promise((resolve) => setTimeout(() => resolve(), 2000));
  await contract.methods.emitEvent("hey, hey").send({
    from: addresses[0],
  }); */
};
init();
