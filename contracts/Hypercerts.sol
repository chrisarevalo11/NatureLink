// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import '@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol';

contract Hypercerts is ERC1155, ERC1155Supply, Ownable {
	constructor() ERC1155('') {}

	// ************************ //
	// *      Hypercerts      * //
	// ************************ //

	function mint(
		address account,
		uint id,
		uint amount,
		bytes memory data,
		string memory uri
	) public returns (uint) {
		_setURI(uri);
		_mint(account, id, amount, data);

		return id;
	}

	function mintBatch(
		address to,
		uint[] memory ids,
		uint[] memory amounts,
		bytes memory data
	) public onlyOwner {
		_mintBatch(to, ids, amounts, data);
	}

	function fractionateToken(
		address from,
		address[] calldata recipients,
		uint tokenId,
		uint[] calldata fractions,
		bytes memory data
	) public {
		require(
			recipients.length == fractions.length,
			'fractionateToken: Mismatch between recipients and fractions'
		);

		uint totalFractions = 0;

		for (uint i = 0; i < fractions.length; i++) {
			totalFractions += fractions[i];
		}

		require(
			totalFractions <= balanceOf(from, tokenId),
			'Not enough tokens to fractionate'
		);

		for (uint i = 0; i < recipients.length; i++) {
			safeTransferFrom(from, recipients[i], tokenId, fractions[i], data);
		}
	}

	// The following functions are overrides required by Solidity.

	function _beforeTokenTransfer(
		address operator,
		address from,
		address to,
		uint[] memory ids,
		uint[] memory amounts,
		bytes memory data
	) internal override(ERC1155, ERC1155Supply) {
		super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
	}
}
