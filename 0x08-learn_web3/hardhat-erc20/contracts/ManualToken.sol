// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ManualToken {

    uint256 initialSupply;
    mapping (address => uint256) public balanceOf;
    mapping (address => mapping(address => uint256)) public allowance;
    constructor(
            uint256 initialSupply,
            string memory tokenName,
            string memory tokenSymbol
        ) {
        totalSupply = initialSupply * 10**uint256(decimals);
        balanceOf[msg.sender] = totalSupply;
        name = tokenName;
        symbol = tokenSymbol;
    }
    function transfer(
            address from,
            address to,
            uint256 amount
        )  public {
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
    }
    function transferFrom(
            address _from,
            address _to,
            uint256 _value
        ) public returns(bool success) {
        require(_value<=allowance[_from][msg.sender]);
        allowance[_from][msg.sender] -= _value;
        transfer(_from, _to, _value);
        return true;
    }
}