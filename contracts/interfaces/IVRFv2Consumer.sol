// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IVRFv2Consumer {
	function requestRandomWords(
		uint32 _numWords,
		address _evaluatorContract,
		address[] memory _evaluators
	) external returns (uint requestId);

	function setPermittedEvaluator(address _evaluator, bool _permitted) external;
}
