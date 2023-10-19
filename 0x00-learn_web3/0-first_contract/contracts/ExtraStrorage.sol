//SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "./SimpleStorage.sol";

contract ExtraStorage is SimpleStorage{
    function store(uint256 _aNumber) public override {
        // keyword `override`, well, overrides a function with a
        // similar name in the parent contract
        aNumber = _aNumber;
        aNumber += 5;
    }
}