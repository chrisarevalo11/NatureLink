// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import '@openzeppelin/contracts/token/ERC1155/IERC1155.sol';

interface IHypercerts is IERC1155 {
	function mint(
		address account,
		uint id,
		uint amount,
		bytes memory data,
		string memory uri
	) external returns (uint);

	function mintBatch(
		address to,
		uint[] memory ids,
		uint[] memory amounts,
		bytes memory data
	) external;

	function fractionateToken(
		address from,
		address[] calldata recipients,
		uint tokenId,
		uint[] calldata fractions,
		bytes memory data
	) external;
}
