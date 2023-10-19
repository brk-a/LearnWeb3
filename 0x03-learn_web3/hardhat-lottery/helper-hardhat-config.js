const { ethers } = require("ethers")

const networkConfig = {
    31337: {
        name: "hardhat",
        //vrfCoordinatorV2 unnecessary because mocks
        entranceFee: ethers.utils.parseEther("0.01"),
        keyHash: "0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c", //value does not matter because mocks
        //subscriptionId unnessecary because we are ding in programmatically
        callbackGasLimit: "500000", //500k
        interval: "30", //seconds
    },
    1115511: {
        name: "sepolia",
        vrfCoordinatorV2: "0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625",
        entranceFee: ethers.utils.parseEther("0.01"),
        keyHash: "0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c",
        subscriptionId: "2705",
        callbackGasLimit: "500000", //500k worth of gas
        interval: "30", //seconds
    },
}

const developmentChains = ["hardhat", "localhost"]

module.exports = {
    networkConfig,
    developmentChains,
}