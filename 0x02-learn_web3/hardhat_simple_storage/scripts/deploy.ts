import { BaseContract, ContractFactory } from "ethers"
// import {SimpleStorage, SimpleStorage__factory} from "../typechain-types" //use these in prod
import {ethers, run, network} from "hardhat"
const main = async () => {
  const simpleStorageFactory: ContractFactory = await ethers.getContractFactory("SimpleStorage")
  // const simpleStorageFactory: SimpleStorage__factory = await ethers.getContractFactory("SimpleStorage")

  console.info(`deploying contract SimpleStorage... `)
  const simpleStorage: BaseContract = await simpleStorageFactory.deploy()
  // conat simpleStorage: SimpleStorage = await simpleStorageFactory.deploy()
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

const verify = async (contractAddress: string, args: any[]) => {
  console.info("verifying contract... ")
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (error: any) {
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