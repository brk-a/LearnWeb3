const {getNamedAccounts, ethers} = require("hardhat")

const main = async () => {
    const {deployer} = getNamedAccounts()
    const fundMe = await ethers.getContract("FundMe", deployer)
    const sendValue = ethers.utils.parseEther("0.2")

    console.info("withdrawing funds...")
    const txResponse =  await fundMe.withdraw()
    await txResponse.wait(1)
    console.info("funds withdrawn.")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.info(`script fund: ${error}`)
        process.exit(1)
    })