// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';

contract CollectiveArt is ERC721, ERC721URIStorage {
    struct Artwork {
        uint256 id;
        string tokenURI;
        address collective;
    }

    // Mapping to store artworks by token ID
    mapping(uint256 => Artwork) public artworks;
    uint256 public artworkCounter;

    // Mapping to store collaborators
    mapping(address => bool) public collaborators;
    address[] public collaboratorList;

    // Event to be emitted when a new artwork is minted
    event ArtworkMinted(
        uint256 tokenId,
        address collective,
        string tokenURI
    );

    // Event for collaborator changes
    event CollaboratorAdded(address collaborator);
    event CollaboratorRemoved(address collaborator);

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    // Function to add a collaborator
    function addCollaborator(address collaborator) public {
        require(!collaborators[collaborator], "Already a collaborator");
        collaborators[collaborator] = true;
        collaboratorList.push(collaborator);
        emit CollaboratorAdded(collaborator);
    }

    // Function to remove a collaborator
    function removeCollaborator(address collaborator) public {
        require(collaborators[collaborator], "Not a collaborator");
        collaborators[collaborator] = false;
        
        // Remove from list
        for (uint i = 0; i < collaboratorList.length; i++) {
            if (collaboratorList[i] == collaborator) {
                collaboratorList[i] = collaboratorList[collaboratorList.length - 1];
                collaboratorList.pop();
                break;
            }
        }
        
        emit CollaboratorRemoved(collaborator);
    }

    // Function to get all collaborators
    function getCollaborators() public view returns (address[] memory) {
        return collaboratorList;
    }

    // Function to mint a new NFT artwork
    function mintNFT(address collective, string memory uri) public returns (uint256) {
        artworkCounter++;
        uint256 tokenId = artworkCounter;

        Artwork storage newArtwork = artworks[tokenId];
        newArtwork.id = tokenId;
        newArtwork.collective = collective;
        newArtwork.tokenURI = uri;
        _safeMint(collective, tokenId);
        _setTokenURI(tokenId, uri);

        emit ArtworkMinted(tokenId, collective, newArtwork.tokenURI);
        
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
            artwork.collective
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

    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        return tokenURI(tokenId);
    }

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
