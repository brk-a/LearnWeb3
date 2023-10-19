//SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

contract FallbackExample{
    uint256 public result;

    receive() external payable { //notice: keyword `function` is not needed
        result = 1;
    }
}

/**
* `receive()` is called every time "money" is sent to a contract with no calldata
* when a fn is called, the fn's params are passed to `calldata`; if there are none,
* `receive()` is called and if `receive()` is absent, `fallback()` is called
* catch-all: return error is none of the above exist
 */

 /**
                                is `msg.data` empty
                                        |
                                --------------------
                                |                  |
                                y                  n
                                |                  |
                                |                  |
                         `receive()`?         `fallback()?`
                                |                  |
                         -----------            -------------
                         |         |            |           |
                         y         n            y           n
                         |         |            |           |
                     `receive()` `fallback()?``fallback()`  error
                                        |
                                    -------------
                                    |           |
                                    y           n
                                    |           |
                                `fallback()`   error
 
  */