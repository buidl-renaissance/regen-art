// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';

contract ArtNightNFT is ERC721, ERC721URIStorage {
    struct Artwork {
        uint256 id;
        string tokenURI;
        address artist;
    }

    // Mapping to store artworks by token ID
    mapping(uint256 => Artwork) public artworks;
    uint256 public artworkCounter;

    // Event to be emitted when a new artwork is minted
    event ArtworkMinted(
        uint256 tokenId,
        address artist,
        string tokenURI
    );

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    // Function to mint a new NFT artwork
    function mintNFT(address artist, string memory uri) public returns (uint256) {
        artworkCounter++;
        uint256 tokenId = artworkCounter;

        Artwork storage newArtwork = artworks[tokenId];
        newArtwork.id = tokenId;
        newArtwork.artist = artist;
        newArtwork.tokenURI = uri;
        _safeMint(artist, tokenId);
        _setTokenURI(tokenId, uri);

        emit ArtworkMinted(tokenId, artist, newArtwork.tokenURI);
        
        return tokenId;
    }

    // Function to set the token URI for an artwork
    function setTokenURI(uint256 tokenId, string memory _tokenURI) public {
        require(
            ownerOf(tokenId) == msg.sender,
            "Only token owner can set URI"
        );
        artworks[tokenId].tokenURI = _tokenURI;
        _setTokenURI(tokenId, _tokenURI);
    }

    // Function to get artwork details
    function getArtwork(uint256 tokenId) 
        public 
        view 
        returns (
            uint256 id,
            string memory uri,
            address artist
        )
    {
        Artwork storage artwork = artworks[tokenId];
        return (
            artwork.id,
            artwork.tokenURI,
            artwork.artist
        );
    }

    // Function to get all artworks
    function getArtworks() public view returns (Artwork[] memory) {
        Artwork[] memory allArtworks = new Artwork[](artworkCounter);
        
        for (uint256 i = 0; i < artworkCounter; i++) {
            uint256 tokenId = i + 1;
            Artwork storage artwork = artworks[tokenId];
            allArtworks[i] = artwork;
        }
        
        return allArtworks;
    }

    // Function to transfer artwork ownership
    function transferArtwork(address to, uint256 tokenId) public {
        require(
            ownerOf(tokenId) == msg.sender,
            'Only the artwork owner can transfer.'
        );
        _transfer(msg.sender, to, tokenId);
    }

    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        return tokenURI(tokenId);
    }

    // function tokenURI(uint256 tokenId) public view virtual override(ERC721, ERC721URIStorage) returns (string memory) {
    //     return string(abi.encodePacked(super.tokenURI(tokenId)));
    // }

    // function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC721URIStorage) returns (bool) {
    //     return super.supportsInterface(interfaceId);
    // }

        // The following functions are overrides required by Solidity.

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

}
