// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// PUSH Comm Contract Interface
interface IPUSHCommInterface {
	function sendNotification(
		address _channel,
		address _recipient,
		bytes calldata _identity
	) external;
}
