pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockERC20 is ERC20 {

  constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {
    _mint(msg.sender, 10**24);
  }

  function mint(address _receiver, uint256 _amount) public {
    _mint(_receiver, _amount);
  }
}