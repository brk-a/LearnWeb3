// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract SimpleStorage{
    uint256 aNumber;
    People public  adolf = People({
        name: "Adolf",
        guess: 432
    });
    People[] public people;
    mapping (string => uint256) public firstObject;

    struct  People {
        uint256 guess;
        string name;
    }

    function store(uint256 _aNumber) public virtual {
        aNumber = _aNumber;
    }

    function retrieve() public view returns(uint256) {
        return aNumber;
    }

    function add() public pure returns(uint256) {
        return (1+1);
    }

    function addPeople(string memory _name, uint256 _guess) public {
        people.push(People(_guess, _name));
        firstObject[_name] = _guess;
    }
}
