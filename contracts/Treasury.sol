// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import '@openzeppelin/contracts/access/Ownable.sol';

contract Treasury is Ownable {
	constructor() {}

	// ************************ //
	// *       Treasury       * //
	// ************************ //

	receive() external payable {}

	function withdraw() external onlyOwner {
		require(address(this).balance > 0, 'withdraw: no funds to withdraw');

		(bool success, ) = msg.sender.call{value: address(this).balance}('');
		require(success, 'withdraw: failed to send Ether');
	}

	// ************************ //
	// *  Getters y Setters   * //
	// ************************ //

	function getBalance() public view returns (uint) {
		return address(this).balance;
	}
}
