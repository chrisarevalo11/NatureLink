// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import '@openzeppelin/contracts/access/Ownable.sol';
import '../interfaces/IEvaluation.sol';

contract VRFv2ConsumerMock is Ownable {
	uint64 s_subscriptionId;
	uint public requestIdCounter;
	uint public lastRequestId;
	uint[] public requestIds;

	IEvaluation public evaluation;
	address public natureLinkAddress;
	address public s_evaluatorContract;
	address[] public s_evaluators;
	address[] public s_evaluatorsSelected = new address[](3);

	struct RequestStatus {
		bool fulfilled;
		bool exists;
		uint[] randomWords;
	}

	mapping(uint => RequestStatus) public s_requests;
	mapping(address => bool) public permitted;

	event RequestSent(uint requestId, uint32 numWords);
	event RequestFulfilled(uint requestId, uint[] randomWords);

	constructor(uint64 _subscriptionId) {
		s_subscriptionId = _subscriptionId;
	}

	// ************************ //
	// *     VRFv2Consumer    * //
	// ************************ //

	function requestRandomWords(
		uint32 _numWords,
		address _evaluatorContract,
		address[] memory _evaluators
	) external returns (uint requestId) {
		require(permitted[msg.sender], 'requestRandomWords: Not permitted');
		require(
			_evaluators.length >= 3,
			'requestRandomWords: Not enough addresses'
		);

		evaluation = IEvaluation(_evaluatorContract);

		s_evaluators = _evaluators;
		s_evaluatorsSelected = new address[](3);

		requestIdCounter++;
		requestId = requestIdCounter;

		uint[] memory randomWords = new uint[](3);
		randomWords[0] = 11579208923731619541312963993;
		randomWords[1] = 11579208923731619541312963993;
		randomWords[2] = 115792089237316195413163954131541315413194;

		s_requests[requestId] = RequestStatus({
			fulfilled: false,
			exists: true,
			randomWords: randomWords
		});

		requestIds.push(requestId);
		lastRequestId = requestId;

		emit RequestSent(requestId, _numWords);
		return requestId;
	}

	function fulfillRandomWordsMock(
		uint _requestId,
		uint[] memory _randomWords
	) public {
		fulfillRandomWords(_requestId, _randomWords);
	}

	function fulfillRandomWords(
		uint _requestId,
		uint[] memory _randomWords
	) internal {
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
	}

	// ************************ //
	// *  Getters y Setters   * //
	// ************************ //

	function getRequestStatus(
		uint _requestId
	) external view returns (bool fulfilled, uint[] memory randomWords) {
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
