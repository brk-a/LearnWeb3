import {ethers} from "ethers" 
import * as fs from "fs-extra"
 
const deploy = async () => {
    const provider = new ethers.BrowserProvider.JsonRpcProvider(process.env.RPC_URL)
    // const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider) //use encrypted key instead
    const encryptedJsonKey = fs.readFileSync("./.encryptedKey.json", "utf-8")
    let wallet = /**new */ ethers.Wallet.fromEncryptedJsonSync(
        encryptedJsonKey,
        process.env.PRIVATE_KEY_PASSWORD!
    )
    wallet = await wallet.connect(provider)
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8")
    const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf-8")
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet)

    console.info("deploying... Please wait.")

    const contract = await contractFactory.deploy()
    console.info("contract is running...", contract)

    //use a fn in the contract
    const newGuess = await contract.retrieve()
    console.info(`guess: ${newGuess.toString()}`)

    const txnResponse = await contract.store("3141519")
    const txnReceipt = await txnResponse.wait(1)
    const updatedGuess = await contract.retrieve()
    console.info(`updated guess: ${updatedGuess}`)
}

deploy()
    .then(() => process.exit(0))
    .catch((error) => {
        console.info(error)
        process.exit(1)
    })
