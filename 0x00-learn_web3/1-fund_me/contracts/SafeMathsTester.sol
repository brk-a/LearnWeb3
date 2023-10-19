//SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

contract SafeMathsTester{
    uint8 public bigNumber = 255;

    function add() public {
        unchecked {
            bigNumber++; //bigNumber += 1; works too
        }
    }
}

/**
* largest value a `uint8` can hold is 255 (0d255 == 0b11111111)
Q: what happens when one is added to a uint8-type 255?
A: it "resets"; that is, goes back to zero
* recall, range of an 8-bit unsigned int is [0, 255]
* this behaviour is called overflow

* smallest value a `uint8` can hold is zero (0d0 == 0b00000000)
Q: what happens when one is subtracted from a uint8-type zero?
A: it "resets"; that is, goes back to 255
* recall, range of an 8-bit unsigned int is [0, 255]
* this behaviour is called underflow

* think of overflow as a clock going from 23:59 to 00:00
* think of underflow as the reverse (a clock going from 00:00 to 23:59)

* good practice: use `uint256` because it is unlikely that a `uint256` will
* either over or underflow while updating values; 2^256 is a large number
* flip side: resource-extensive; you pay for convenience using mem space and
* execution time

 */