// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Strings.sol';

import './enums/enums.sol';
import './interfaces/IPUSHCommInterface.sol';
import './interfaces/IVRFv2Consumer.sol';
import './interfaces/ICrowdfunding.sol';

import 'hardhat/console.sol';

contract Evaluation is Ownable {
	using Strings for address;
	using Strings for string;
	using Strings for uint;

	bool public openForEvaluate = true;
	uint public bounty;
	uint public deadline;
	uint public evaluationTime;
	uint public evaluationCounter;
	uint public evaluatorCounter;
	uint[] public projectTime;

	address public creator;

	IVRFv2Consumer public vrfConsumer;
	IPUSHCommInterface public pushComm;
	ICrowdfunding public crowdfunding;
	address[] public selectedEvaluators;
	address[] public evaluators;
	Judge[] public allJudges;
	string public evidence;

	struct Judge {
		bool images;
		bool georeference;
		bool document;
		bool links;
	}

	mapping(address => Judge) public judges;
	mapping(address => bool) public isEvaluator;
	mapping(address => bool) public isJudged;

	event SelectedEvaluators(address[]);

	modifier onlyCreator() {
		require(msg.sender == creator, 'onlyCreator: caller is not the creator');
		_;
	}

	constructor(
		address _vrfAddress,
		address _epnsCommAddress,
		address _crowdfundingAddress,
		address _creator,
		uint _deadline,
		uint[] memory _projectTime,
		uint _evaluationTime
	) {
		vrfConsumer = IVRFv2Consumer(_vrfAddress);
		pushComm = IPUSHCommInterface(_epnsCommAddress);
		crowdfunding = ICrowdfunding(_crowdfundingAddress);

		projectTime = _projectTime;
		evaluationTime = _evaluationTime;

		creator = _creator;
		deadline = _deadline;
	}

	// ************************ //
	// *      Evaluation      * //
	// ************************ //

	receive() external payable {
		require(
			msg.sender == address(crowdfunding),
			'receiver: Not the crowdfunding contract'
		);

		bounty == msg.value;
	}

	function proposeEvaluator() public {
		require(
			block.timestamp < deadline,
			'becomeEvaluator: the selection period is over'
		);
		require(!isEvaluator[msg.sender], 'becomeEvaluator: Already an evaluator');

		evaluatorCounter++;
		evaluators.push(msg.sender);
		isEvaluator[msg.sender] = true;
	}

	function selectEvaluators() external returns (bool) {
		require(
			msg.sender == address(crowdfunding),
			'selectEvaluators: Not the crowdfunding contract'
		);

		if (evaluators.length > 3) {
			vrfConsumer.requestRandomWords(3, address(this), evaluators);
			return true;
		} else if (evaluators.length == 3) {
			for (uint i = 0; i < evaluators.length; i++) {
				selectedEvaluators.push(evaluators[i]);
			}
			emit SelectedEvaluators(evaluators);
			return true;
		} else {
			return false;
		}
	}

	function evaluateEvidence(
		bool _images,
		bool _georeference,
		bool _document,
		bool _links
	) external {
		require(openForEvaluate, 'evaluateEvidence: The evaluation period is over');
		require(
			block.timestamp > deadline && block.timestamp < evaluationTime,
			'evaluateEvidence: The selection period is not over'
		);
		require(!evidence.equal(''), 'evaluateEvidence: The evidence is empty');
		require(isEvaluator[msg.sender], 'evaluateEvidence: Not an evaluator');
		require(!isJudged[msg.sender], 'evaluateEvidence: Already evaluated');

		judges[msg.sender] = Judge(_images, _georeference, _document, _links);
		isJudged[msg.sender] = true;
		allJudges.push(judges[msg.sender]);

		evaluationCounter++;

		if (evaluationCounter == 3) {
			for (uint i = 0; i < selectedEvaluators.length; i++) {
				(bool response, ) = selectedEvaluators[i].call{value: bounty / 3}('');
				require(response, 'evaluateEvidence: Transfer failed');

				if (selectedEvaluators[i] != msg.sender) {
					// pushComm.sendNotification(
					// 	0xaA7880DB88D8e051428b5204817e58D8327340De, // from channel
					// 	selectedEvaluators[i], // to address
					// 	bytes(
					// 		string(
					// 			abi.encodePacked(
					// 				'0',
					// 				'+',
					// 				'3',
					// 				'+',
					// 				'Congrats!',
					// 				'+',
					// 				'You have just receiver a bounty of ',
					// 				(bounty / 3).toString(),
					// 				' for evaluating: ',
					// 				address(this).toHexString(),
					// 				' project'
					// 			)
					// 		)
					// 	)
					// );
				}
			}

			(bool response, ) = owner().call(
				abi.encodeWithSignature(
					'setProjectStatus(address,uint8)',
					creator,
					uint8(2)
				)
			);
			require(response, 'evaluateEvidence: Set project status failed');

			openForEvaluate = false;
		}
	}

	// ************************ //
	// *  Getters y Setters   * //
	// ************************ //

	function getAllJudges() external view returns (Judge[] memory) {
		Judge[] memory _judges = new Judge[](evaluators.length);

		if (evaluators.length == 0) return _judges;

		for (uint i = 0; i < evaluators.length; i++) {
			_judges[i] = judges[evaluators[i]];
		}

		return _judges;
	}

	function getAllEvaluatorsSelected() external view returns (address[] memory) {
		return selectedEvaluators;
	}

	function setEvidence(string memory _evidence) external onlyCreator {
		require(
			block.timestamp >= projectTime[uint(createProjectArgs.end)],
			'setEvidence: The project has ended'
		);
		require(
			block.timestamp < evaluationTime,
			'setEvidence: The evaluation period has ended'
		);

		for (uint i = 0; i < selectedEvaluators.length; i++) {
			// pushComm.sendNotification(
			// 	0xaA7880DB88D8e051428b5204817e58D8327340De, // from channel
			// 	selectedEvaluators[i], // to address
			// 	bytes(
			// 		string(
			// 			abi.encodePacked(
			// 				'0',
			// 				'+',
			// 				'3',
			// 				'+',
			// 				'Evidence updated!',
			// 				'+',
			// 				'The project evendence just got updated: ',
			// 				owner().toHexString()
			// 			)
			// 		)
			// 	)
			// );
		}

		evidence = _evidence;
	}

	function setSelectedEvaluators(
		address[] memory _selectedEvaluators
	) external {
		require(
			msg.sender == address(vrfConsumer),
			'setSelectedEvaluators: Not the VRF contract'
		);

		for (uint i = 0; i < _selectedEvaluators.length; i++) {
			// pushComm.sendNotification(
			// 	0xaA7880DB88D8e051428b5204817e58D8327340De, // from channel
			// 	_selectedEvaluators[i], // to address
			// 	bytes(
			// 		string(
			// 			abi.encodePacked(
			// 				'0',
			// 				'+',
			// 				'3',
			// 				'+',
			// 				'Congrats!',
			// 				'+',
			// 				'You have just become an evaluator for: ',
			// 				owner().toHexString(),
			// 				' project'
			// 			)
			// 		)
			// 	)
			// );
		}

		selectedEvaluators = _selectedEvaluators;

		emit SelectedEvaluators(_selectedEvaluators);
	}
}
