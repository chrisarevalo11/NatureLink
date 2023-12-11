// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import '@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol';
import '@chainlink/contracts/src/v0.8/vrf/VRFConsumerBaseV2.sol';
import '@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol';

import './interfaces/IEvaluation.sol';

contract VRFv2Consumer is VRFConsumerBaseV2, ConfirmedOwner {
	uint64 s_subscriptionId;
	uint256 public lastRequestId;
	uint256[] public requestIds;

	VRFCoordinatorV2Interface COORDINATOR;
	IEvaluation public evaluation;
	address public natureLinkAddress;
	address public s_evaluatorContract;
	address[] public s_evaluators;
	address[] public s_evaluatorsSelected = new address[](3);

	uint16 requestConfirmations = 3;
	uint32 callbackGasLimit = 600000;
	bytes32 keyHash =
		0x4b09e658ed251bcafeebbc69400383d49f344ace09b9576fe248bb02c003fe9f;

	struct RequestStatus {
		bool fulfilled;
		bool exists;
		uint256[] randomWords;
	}

	mapping(uint256 => RequestStatus) public s_requests;
	mapping(address => bool) public permitted;

	event RequestSent(uint256 requestId, uint32 numWords);
	event RequestFulfilled(uint256 requestId, uint256[] randomWords);

	/**
	 * HARDCODED FOR MUMBAI
	 * COORDINATOR: 0x7a1BaC17Ccc5b313516C5E16fb24f7659aA5ebed
	 */

	constructor(
		uint64 _subscriptionId
	)
		VRFConsumerBaseV2(0x7a1BaC17Ccc5b313516C5E16fb24f7659aA5ebed)
		ConfirmedOwner(msg.sender)
	{
		COORDINATOR = VRFCoordinatorV2Interface(
			0x7a1BaC17Ccc5b313516C5E16fb24f7659aA5ebed
		);
		s_subscriptionId = _subscriptionId;
	}

	// ************************ //
	// *     VRFv2Consumer    * //
	// ************************ //

	function requestRandomWords(
		uint32 _numWords,
		address _evaluatorContract,
		address[] memory _evaluators
	) external returns (uint256 requestId) {
		require(permitted[msg.sender], 'requestRandomWords: Not permitted');
		require(
			_evaluators.length >= 3,
			'requestRandomWords: Not enough addresses'
		);

		evaluation = IEvaluation(_evaluatorContract);
		requestId = COORDINATOR.requestRandomWords(
			keyHash,
			s_subscriptionId,
			requestConfirmations,
			callbackGasLimit,
			_numWords
		);

		s_evaluators = _evaluators;
		s_evaluatorsSelected = new address[](3);

		s_requests[requestId] = RequestStatus({
			randomWords: new uint256[](0),
			exists: true,
			fulfilled: false
		});

		requestIds.push(requestId);
		lastRequestId = requestId;

		emit RequestSent(requestId, _numWords);
		return requestId;
	}

	function fulfillRandomWords(
		uint256 _requestId,
		uint256[] memory _randomWords
	) internal override {
		require(s_requests[_requestId].exists, 'request not found');
		require(_randomWords.length >= 3, 'Not enough random words');

		s_requests[_requestId].fulfilled = true;
		bool[] memory isSelected = new bool[](s_evaluators.length);

		for (uint i = 0; i < _randomWords.length && i < 3; i++) {
			uint index = (_randomWords[i] % 10) % s_evaluators.length;
			while (isSelected[index]) {
				index = (index + 1) % s_evaluators.length;
			}
			isSelected[index] = true;
			s_evaluatorsSelected[i] = s_evaluators[index];
		}

		evaluation.setSelectedEvaluators(s_evaluatorsSelected);

		s_requests[_requestId].fulfilled = true;
		s_requests[_requestId].randomWords = _randomWords;

		emit RequestFulfilled(_requestId, _randomWords);
	}

	// ************************ //
	// *  Getters y Setters   * //
	// ************************ //

	function getRequestStatus(
		uint256 _requestId
	) external view returns (bool fulfilled, uint256[] memory randomWords) {
		require(s_requests[_requestId].exists, 'request not found');
		RequestStatus memory request = s_requests[_requestId];
		return (request.fulfilled, request.randomWords);
	}

	function setPermittedEvaluator(address _evaluator, bool _permitted) external {
		require(
			msg.sender == natureLinkAddress,
			'setPermittedEvaluator: Not authorized'
		);
		permitted[_evaluator] = _permitted;
	}

	function setNaturelinkAddress(
		address _natureLinkAddress
	) external onlyOwner returns (address) {
		natureLinkAddress = _natureLinkAddress;
		return natureLinkAddress;
	}
}
