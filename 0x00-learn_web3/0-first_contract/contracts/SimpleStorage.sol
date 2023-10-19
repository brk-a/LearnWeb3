//SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

contract SimpleStorage{
    uint256 aNumber; 
    People public adolf = People({
        //public vars are read and/or written externally & internally
        name: "Adolf",
        guess: 432
    });
    People[] public people; //automate the process this way
    mapping(string => uint256) public firstObject;

    struct People{
        uint256 guess;
        string name;
    }

    function store(uint256 _aNumber) public virtual {
        // public functions are called externally and internally
        // keyword `virtual` tells solidity that there is a function with a
        // similar name in a child contract that will overwrite it
        // in other words: expect a function with a similar name in a child
        // contract to overwrite this one
        aNumber = _aNumber;
        // aNumber += 1;
    }

    function retrieve() public view returns(uint256){
        // view functions read, not modify, state; no gas unless
        // called by a gas-consuming function
        return aNumber;
    }

    function add() public pure returns(uint256){
        // pure functions cannot read or modify state; no gas unless
        // called by a gas-consuming function
        return (1+1);
    }

    function addPeople(string memory _name, uint256 _guess) public {
        people.push(People(_guess, _name)); //list args in the same order
        // as the definition in the struct
        // notice that order did not matter when defining var `adolf`
        firstObject[_name] = _guess; //create k-v pairs (dict in py or obj in JS)
    }
}

