const {run} = require("hardhat")

const verify = async (contractAddress, args) => {
    console.info("verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (err) {
        if(err.toLowerCase().includes("already verified")){
            console.info("already verified.")
        } else {
            console.info(err)
        }
    }
}

module.exports = {verify}