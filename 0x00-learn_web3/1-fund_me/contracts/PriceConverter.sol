//SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

// import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol"; // first, `npm install @chainlink/contracts`
import "https://github.com/smartcontractkit/chainlink/blob/2ff268163d5d10b5d8066db2f7cfcda0277709af/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library PriceConverter{

    function getPrice() internal view returns(uint256){
        //get ETH:USD price
        // address: 0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419
        //AggregatorV3Interface(0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419); //ABI call to  contract
        AggregatorV3Interface priceFeed =  AggregatorV3Interface(0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419);
        (, int price,,,) = priceFeed.latestRoundData(); // Solidity's equivalent of JS's destructuring `price` from  `priceFeed.latestRoundData()`
        
        //return ETH:USD with 18 decimal places and cast it to `uint256`
        return uint256(price * 1e10); // had 8 by default; add 10 more
    }

    function getConversionRate(uint256 ethAmount) internal view returns(uint256) {
        //return x USD given y ETH
        uint256 ethPrice = getPrice();
        uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1e18;

        return ethAmountInUsd;
    }
}

 /**
 library -> similar to contracts, however, you cannot declare any state vars nor send "money"
 * lib is embedded in the contract if all lib fns are internal
 * lib must be deployed then linked before contract is deployed if lib is not embedded
  */