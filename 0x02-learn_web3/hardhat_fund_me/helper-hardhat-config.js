const networkConfig = {
    5: {
        name:"goerli",
        ethUsdPriceFeed: "0x8204C193ade6A1bB59BeF25B6A310E417953013f",
    },
    11155111: {
        name:"sepolia",
        ethUsdPriceFeed: "0x447Fd5eC2D383091C22B8549cb231a3bAD6d3fAf",
    },
    137: {
        name:"polygon",
        ethUsdPriceFeed: "0x4e9fc7480c16F3FE5d956C0759eE6b4808d1F5D7",
    },
}

const developmentChains = ["hardhat", "localhost"]

const DECIMALS = 8
const INITIAL_ANSWER = 200000000000

module.exports = {
    networkConfig,
    developmentChains,
    DECIMALS,
    INITIAL_ANSWER,
}