//require("@nomiclabs/hardhat-waffle") //HH plugin for integration with Waffle (tests smart contracts)
import "@nomicfoundation/hardhat-toolbox";
// require("@nomiclabs/hardhat-etherscan") //not necessary in HH v ^2.14.0
import "./tasks/block-number"
import "hardhat-gas-reporter"
import "solidity-coverage"
import "@typechain/hardhat"

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const LOCALHOST_URL = process.env.LOCALHOST_URL
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      url: LOCALHOST_URL,
      //accounts: [], //unnessecary; hardhat resolves this
      chainId: 31337, //hardhat's chainId
    },
    rinkeby: {
      url: RINKEBY_RPC_URL,
      accounts: [
        PRIVATE_KEY,
      ],
      chainId: 4,
    },
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [
        PRIVATE_KEY,
      ],
      chainId: 5,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: COINMARKETCAP_API_KEY,
  },
  solidity: "0.8.19",
};
