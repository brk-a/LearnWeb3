require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy")

/** @type import('hardhat/config').HardhatUserConfig */

const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY

module.exports = {
  // solidity: "0.8.19",
  solidity: {
    compilers: [
      {version: "0.8.19"},
      {version: "0.6.6"},
      {version: "0.4.19"}
    ],
  },
  defaultNetwork: "hardhat",
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: COINMARKETCAP_API_KEY,
    token: "MATIC",
  },
};
