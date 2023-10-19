const {network} = require("hardhat")
const {developmentChains, networkConfig} = require("../helper-hardhat-config")
const { ethers } = require("ethers")

const BASE_FEE = ethers.utils.parseEther("0.25") //0.25 LINK per transaction
const GAS_PRICE_LINK = 1e9 //1 wei //based on gas value of chain

modules.exports = async ({getNamedAccounts, deployments}) => {
    const {deploy, log} = deployments
    const {deployer} = await getNamedAccounts()
    const chainId = network.config.chainId || 1115511
    const args = [BASE_FEE, GAS_PRICE_LINK]

    if(developmentChains.includes(network.name)){
        log("local network detected. deploying mocks...")

        await deploy("VRFCoordinatorV2Mock.sol", {
            from: deployer,
            log: true,
            args,
        })
        log("deployed mocks")
        log("==============================================================")
    }
}

modules.exports.tags = ["all", "mocks"]