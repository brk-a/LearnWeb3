const { getNamedAccounts, ethers } = require("hardhat")

const AMOUNT = ethers.utils.parseEther("0.02")

const getWeth = async () => {
    const contractAddress = "0xE90E3C55c5cE9FC3D7a96733F421852158Af7808"
    const {deployer} = await getNamedAccounts()
    const iWeth = await ethers.getContractAt("IWeth", contractAddress, deployer)
    const tx = await iWeth.deposit({value: AMOUNT})
    await tx.wait(1)
    const wethBalance = await iWeth.balanceOf(deployer)
    console.info(`Balance is ${wethBalance} WETH`)
}

module.exports = {
    getWeth,
    AMOUNT
}