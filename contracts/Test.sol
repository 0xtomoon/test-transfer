//SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

/**
 * @title Test token contract
 */
contract Test is OwnableUpgradeable, ReentrancyGuardUpgradeable {
    
    function initialize() public initializer {
        __Ownable_init();
    }

    /**
     * @dev Called by owner to transfer tokens from the contract
     * @param recipient The recipient address
     * @param amount The amount to transfer
     */
    function transferToken(address tokenAddress, address recipient, uint256 amount) public onlyOwner {
        IERC20Upgradeable(tokenAddress).transfer(recipient, amount);
    }

    /**
     * @dev Called by owner to transfer ETH from the contract
     * @param recipient The recipient address
     */
    function transferEth(address payable recipient) public onlyOwner {
        AddressUpgradeable.sendValue(recipient, address(this).balance);
    }
}
