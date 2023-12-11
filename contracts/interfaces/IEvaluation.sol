// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IEvaluation {
	function selectEvaluators() external returns (bool);

	function setSelectedEvaluators(address[] memory _selectedEvaluators) external;
}
