const ethers = require("ethers")
const fs = require("fs-extra")

const deploy = async () => {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
    // const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider) //use encrypted key instead
    const encryptedJsonKey = fs.readFileSync("./.encryptedKey.json", "utf-8")
    let wallet = new ethers.Wallet.fromEncryptedJsonSync(
        encryptedJsonKey,
        process.env.PRIVATE_KEY_PASSWORD 
    )
    wallet = await wallet.connect(provider)
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8")
    const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf-8")
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet)

    console.info("deploying... Please wait.")

    const contract = await contractFactory.deploy()
    console.info("contract is running...", contract)

    const deploymentReceipt = await contract.deployTransaction.wait(1)
    console.info(deploymentReceipt)
    console.info(contract.deploymentTransaction)

    const nonce = await wallet.getTransactionCount()
    const tx = {
        nonce,
        gasPrice: process.env.GAS_PRICE,
        gasLimit: process.env.GAS_LIMIT,
        to: null,
        value: 0,
        data: process.env.SIMPLE_STORAGE_BIN_STRING,
        chainId: process.env.CHAIN_ID, //use the network ID 31337
    }
    const signedTxResponse = await wallet.signTransaction(tx) //not necessary; `sendTransaction` signs and sends
    console.info(signedTxResponse)

    const sentTxResponse = await wallet.sendTransaction(tx)
    await sentTxResponse.wait(1)
    console.info(sentTxResponse)
}

deploy()
    .then(() => process.exit(0))
    .catch((error) => {
        console.info(error)
        process.exit(1)
    })


/**
 * equivalent in terminal
 * solcjs --bin --abi --include-path node_modules/ --basepath . -o . SimpleStorage.sol
 */