// SPDX-LIcense-Identifier: MIT

pragma solidity ^0.8.9;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

error TokenDoesNotExist();
error WithdrawFailed();
error MintNotEnabled();
error WrongMintValue();
error SoldOut();
error ExceededMaxWallet();

contract RoboPunkNFT is ERC721, Ownable {
    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxSupply;
    uint256 public maxPerWallet;
    bool public isPublicMintEnabled;
    string internal baseTokenUri;
    address payable public withdrawWallet;
    mapping (address => uint256) public addressToWalletMints;

    constructor() payable ERC721('RoboPunks', 'RP') {
        mintPrice = 0.02 ether;
        totalSupply = 0;
        maxSupply = 1000;
        maxPerWallet = 3;
        //to do: set withdraw wallet address
    }

    function  setIsPublicMintEnabled(bool _isPublicMintEnabled)
        external onlyOwner {
            isPublicMintEnabled = _isPublicMintEnabled;
    }

    function setBaseTokenUri(string calldata _baseTokenUri)
        external onlyOwner {
            baseTokenUri = _baseTokenUri;
    }

    function tokenURI(uint256 _tokenId)
        public view override
        returns(string memory){
            if(!_exists(_tokenId)){
                revert TokenDoesNotExist;
            }
            return string(
                abi.encodePacked(
                    baseTokenUri,
                    Strings.toString(_tokenId),
                    ".json"
            ));
    }

    function withdraw()
        external onlyOwner{
            (bool success,) = withdrawWallet.call{value: address(this).balance}('');
            if(!success){
                revert WithdrawFailed;
            }
    }

    function mint(uint256 _quantity)
        public payable{
            if(!isPublicMintEnabled){
                revert MintNotEnabled;
            }
            if(!(msg.value==_quantity+mintPrice)){
                revert WrongMintValue;
            }
            if(!(totalSupply+_quantity<=maxSupply)){
                revert SoldOut;
            }
            if(!(addressToWalletMints[msg.sender]+_quantity<=maxPerWallet)){
                revert ExceededMaxWallet;
            }

            for(uint256 i=0; i<_quantity; ++i){
                uint256 newTokenId = totalSupply + 1;
                totalSupply++;
                _safeMint(msg.sender, newTokenId);
            }
    }
}