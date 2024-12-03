// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract XNBC is ERC20, Ownable(msg.sender) {
    constructor() ERC20("XNBC Token", "XNBC") {
        // Initial supply minted to contract deployer
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    // Only owner can mint additional tokens
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // Only owner can burn tokens from any address
    function burn(address from, uint256 amount) public onlyOwner {
        _burn(from, amount);
    }
}

