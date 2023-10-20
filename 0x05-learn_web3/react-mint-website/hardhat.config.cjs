require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan")

const dotenv = require("dotenv")

dotenv.config()

const TELOS_RPC_URL = process.env.TELOS_RPC_URL
const ETHERSCAN_KEY = process.env.ETHERSCAN_KEY
const ACCOUNT_PRIVATE_KEY = process.env.ACCOUNT_PRIVATE_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {version: "0.8.19"},
      {version: "0.8.20"},
    ]
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    // telos: {
    //   url: TELOS_RPC_URL,
    //   accounts: [ACCOUNT_PRIVATE_KEY],
    //   // chainId: 41,
    // },
  },
  etherscan: {
    apiKey: ETHERSCAN_KEY,
  },
};
