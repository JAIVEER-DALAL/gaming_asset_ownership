// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GamingAssetOwnership is ERC1155, Ownable {
    uint256 public constant GOLD = 0;
    uint256 public constant SILVER = 1;
    uint256 public constant BRONZE = 2;

    constructor() ERC1155("https://example.com/token/{id}.json") {
        _mint(msg.sender, GOLD, 10**18, "");
        _mint(msg.sender, SILVER, 10**27, "");
        _mint(msg.sender, BRONZE, 10**36, "");
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data) public onlyOwner {
        _mint(account, id, amount, data);
    }

    function burn(address account, uint256 id, uint256 amount) public {
        require(msg.sender == account || msg.sender == owner(), "Caller is not owner nor account");
        _burn(account, id, amount);
    }
}
