// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ArtNightNFTMarketplace is Ownable(msg.sender) {
    IERC721 public nftContract;
    mapping(uint256 => uint256) public nftPrices; // Price per token ID
    mapping(uint256 => address payable[]) public tokenRecipients; // Recipients per token ID  
    mapping(uint256 => uint256[]) public tokenPercentages; // Percentages per token ID

    event NFTPurchased(address indexed buyer, uint256 tokenId, uint256 amount);
    event FundsDistributed(uint256 tokenId, uint256 amount);
    event TokenConfigured(uint256 tokenId, uint256 price, address payable[] recipients, uint256[] percentages);

    constructor(address _nftContract) {
        nftContract = IERC721(_nftContract);
    }

    function setTokenPrice(uint256 tokenId, uint256 _price) external {
        require(nftContract.ownerOf(tokenId) == msg.sender, "Only NFT owner can set price");
        nftPrices[tokenId] = _price;
    }

    function configureToken(
        uint256 tokenId,
        uint256 _price,
        address payable[] memory _recipients,
        uint256[] memory _percentages
    ) external {
        require(nftContract.ownerOf(tokenId) == msg.sender, "Only NFT owner can configure token");
        require(_recipients.length == _percentages.length, "Mismatched inputs");
        uint256 total;
        for (uint256 i = 0; i < _percentages.length; i++) {
            total += _percentages[i];
        }
        require(total == 10000, "Total must be 100%");

        nftPrices[tokenId] = _price;
        tokenRecipients[tokenId] = _recipients;
        tokenPercentages[tokenId] = _percentages;

        emit TokenConfigured(tokenId, _price, _recipients, _percentages);
    }

    function purchaseNFT(uint256 tokenId) external payable {
        require(nftContract.ownerOf(tokenId) == address(this), "NFT not available for sale");
        require(nftPrices[tokenId] > 0, "Token price not set");
        require(msg.value == nftPrices[tokenId], "Incorrect ETH amount");
        require(tokenRecipients[tokenId].length > 0, "Token not configured");

        // Distribute funds
        uint256 totalAmount = msg.value;
        address payable[] memory recipients = tokenRecipients[tokenId];
        uint256[] memory percentages = tokenPercentages[tokenId];
        
        for (uint256 i = 0; i < recipients.length; i++) {
            uint256 amountToSend = (totalAmount * percentages[i]) / 10000;
            recipients[i].transfer(amountToSend);
        }

        // Transfer NFT to buyer
        nftContract.safeTransferFrom(address(this), msg.sender, tokenId);

        emit NFTPurchased(msg.sender, tokenId, msg.value);
        emit FundsDistributed(tokenId, totalAmount);
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
