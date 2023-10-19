//SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "./PriceConverter.sol";

error  NotOwner();

contract FundMe{
    using PriceConverter for uint256;

    uint256 public constant MINIMUM_USD = 50 * 1e18; //a txn must be worth at least 50.00 USD
    address[] public funders;
    mapping(address => uint256) public addressToAmountFunded;
    address public immutable i_owner;

    constructor(){
     i_owner = msg.sender;  
    }

    function fund() public payable {
        //add funds to your account
        // keyword `payable` tells solidity that this
        // fn will be used to hold/transfer "money"
        // require(getConversionRate(msg.value)>=MINIMUM_USD, "Minimum txn value is USD 50.00");

        //refactor `require` because library `PriceConverter`
        require(msg.value.getConversionRate()>=MINIMUM_USD, "Minimum txn value is USD 50.00");
        
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] = msg.value;

    }

    function withdraw() public onlyOwner {
        //withdraw funds from your account

        //only the person executing the contract (the payee) shall call this fn
        //this is why `onlyOwner` is where it is on this fn

        for (uint256 funderIndex=0; funderIndex<funders.length; funderIndex++) {
            address funder = funders[funderIndex];
            addressToAmountFunded[funder] = 0;
        }

        funders = new address[](0);

        //send "money", method 1: transfer
        payable(msg.sender).transfer(address(this).balance); //`this` -> the contract (ghosts of vanilla JS)

        //send "money", method 2: send
        bool sendSuccess = payable(msg.sender).send(address(this).balance);
        require(sendSuccess, "fn withdraw: send function failed");

        //send "money", method 3: call
        (bool callSuccess, ) = payable(ms.sender).call{value: address(this).balance}(""); //only destructure the `bool`
        // part that was not destructured (because it is not needed here) is `bytes memory dataReturned`
        require(callSuccess, "fn withdraw: call function failed");

    }

    modifier onlyOwner{
        // require(msg.sender==i_owner, "fn withdraw: sender is not owner");

        //alt to `require` that is gas-efficient
        if(msg.sender!=i_owner){
            revert NotOwner();
        }
        _;
    }

    receive() external payable{
        fund();
    }

    fallback() external payable{
        fund();
    }

}

/**
revert -> undoing any action performed prior and sending back the remaining gas
Q: is gas spent?
A: yes. gas is spent to perform the actions that will have to be undone
Q: if so, what do you mean "remaining gas"
A: very good qn. say the whole contract requires 100 units of money to fulfill and that 80
    units were spent before reversion begun. the balance, 20 units, is the "remaining gas"
 */

 /**
* transfer -> capped at 2300 units of currency for gas and throws error on failure; reverts automatically
* send -> capped at 2300 units of currency for gas and returns boolean (T-> success, F-> fail); reverts IFF the `require` is present
    and send fails
* call -> forwards all gas or sets gas and returns boolean (T-> success, F-> fail); reverts IFF the `require` is present
    and call fails
  */

  /**
  * modifier ->  code that can be run before and / or after a fn call
  * used to: restrict access, valid8 inputs and guard against re-entrancy hacks
  * `_;` is called the merge wildcard; it is replaced by the fn definition during execution 
  * that is, after this wildcard has been used, the control is moved to the location where the appropriate fn definition is located
  * modifier may contain said wildcard anywhere
  * when the wildcard is placed at the end of the modifier, the condition is verified and the appropriate fn is executed if it is satisfied
  * when it is placed at the beginning, the appropriate fn is executed first followed by the condition verification
   */

   /**
   * constructor -> an optional function that is executed upon contract creation
   * how other languages perform OOP w. `constructor`:
        * gets called whenever an object of a class is initialised
   * how solidity works w. `constructor`:
        * invokes only once when the contract is deployed and is used to initialise the contract state
        * default `constructor` is created by the compiler if there is no explicitly defined `constructor`
   *  
    */

    /**
    * `constant` -> keyword to declare variables that cannot be modified
    * their value is hard-coded and using constants can save gas cost
    * the value of a `constant` varis set compile time, not run time, because values are known beforehand and are, by definition, known not to change
    * naming convention: ALL_CAPS_SNAKE_CASE
     */

         /**
    * `immutable` -> are like constants
    *  values of immutable variables are set inside the constructor but cannot be modified afterwards
    * can be declared outside `constructor` but must be set inside said constructor
    * the value of a `immutable` var is set compile time, not run time, because values are known beforehand and are, by definition, known not to change
    * naming convention: i_nameOfVar
     */

     /**
     * what happens when one sends "money" to this contract w/o calling the `fund` fn?
     * is there a way to do that in the first place? Yes
     * two fns: `receive` and `fallback`
     * a contract that receives "money" must have at least one of these fns:
     *        receive() external payable
     *        fallback() external payable
     * `receive()` is called if `msg.data` is empty, otherwise, `fallback()` is called
     * ea...sy, innit?
     * a contract may have, at most, one `receive()` fn declared as above (w/o using the `function` keyword)
     * `receive()` has zero args, cannot return anything and must have the following:
     *       `external` visibility
     *       `payable` state mutability
     * 
      */

