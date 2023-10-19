const { ethers, network } = require("hardhat")
const fs = require("fs")

const FRONT_END_ABI_FILE = "../nextjs-lottery/constants/abi.json"
const FRONT_END_ADDRESSES_FILE = "../nextjs-lottery/constants/contractAddresses.json"

const updateAbi = async () => {
    const raffle = await ethers.getContract("Raffle")
    fs.writeFileSync(
        FRONT_END_ABI_FILE,
        raffle.interface.format(ethers.utils.FormatTypes.json)
    )
}
const updateContractAddresses = async () => {
    const raffle = await ethers.getContract("Raffle")
    const chainId = network.config.chainId.toString()
    const currentAddresses = JSON.parse(fs.readFileSync(FRONT_END_ADDRESSES_FILE, "utf-8"))
    if(chainId in contractAddresses){
        if(!contractAddresses[chainId].includes(raffle.address)){
            contractAddresses[chainId].push(raffle.address)
        }
    } else {
        currentAddresses[chainId] = [raffle.address]
    }

    fs.writeFileSync(FRONT_END_ADDRESSES_FILE, JSON.stringify(currentAddresses))
}
module.exports = async () => {
    if (process.env.UPDATE_FRONT_END) {
        console.info("updating front end...")
        updateContractAddresses()
        updateAbi()
    }
}

module.exports.tags = ["all", "frontend"]