//require("dotenv").config() //not necessary; my system pre-imports it
const ethers = require("ethers")
const fs = require("fs-extra")

const deploy = async () => {
    const wallet = new ethers.Wallet(process.env.GANACHE_WALLET_PRIVATE_KEY)
    const encryptedJsonKey = await ethers.encryptKeystoreJson(
        process.env.PRIVATE_KEY_PASSWORD,
        process.env.GANACHE_WALLET_PRIVATE_KEY
    )
    fs.writeFileSync("./.encryptedKey.json", encryptedJsonKey)
}

deploy()
    .then(() => process.exit(0))
    .catch((error) => {
        console.info(error)
        process.exit(1)
    })
