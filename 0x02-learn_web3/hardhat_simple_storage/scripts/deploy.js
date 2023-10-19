const {ethers, run, network} = require("hardhat")
const main = async () => {
  const simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
  
  console.info(`deploying contract SimpleStorage... `)
  const simpleStorage = await simpleStorageFactory.deploy()
  await simpleStorage.deployed()
  console.info(`deployed contract to ${simpleStorage.address}`)

  if(network.config.chainId!==31337 && process.env.ETHERSCAN_API_KEY){ //31337 is for hardhat
    console.info("awaiting block transactions... ")
    await simpleStorage.deploymentTransaction.wait(6)
    await verify(simpleStorage.address, [])
  }

  const currentGuess = await simpleStorage.retrieve()
  console.info(`current guess is ${currentGuess}`)

  const txResponse = await simpleStorage.store(144)
  await txResponse.wait(1)
  const updatedGuess = await simpleStorage.retrieve()
  console.info(`guess updated to ${updatedGuess}`)
}

const verify = async (contractAddress, args) => {
  console.info("verifying contract... ")
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (error) {
    if(error.message.toLowerCase.includes("already verified")){
      console.info(`verify: Already verified`)
    } else {
      console.info(error)
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.info(`function main: ${error}`)
    process.exit(1)
  })