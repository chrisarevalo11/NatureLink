// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import '@openzeppelin/contracts/access/Ownable.sol';

import './Crowdfunding.sol';
import './Evaluation.sol';

import './enums/enums.sol';
import './interfaces/IHypercerts.sol';
import './interfaces/IVRFv2Consumer.sol';
import './interfaces/IPUSHCommInterface.sol';

contract NatureLink is Ownable {
	IHypercerts public immutable hypercerts;
	IVRFv2Consumer public immutable vrfConsumer;
	IPUSHCommInterface public immutable pushComm;

	address public treasury;
	address[] public users;

	struct Portfolio {
		uint projectIdCounter;
		Project[] projects;
	}

	struct Project {
		uint id;
		uint amount;
		uint[] projectTime;
		string info;
		status status;
		Crowdfunding crowdfunding;
		Evaluation evaluation;
		address creator;
	}

	mapping(address => bool) public isUser;
	mapping(address => Portfolio) public portfolios;

	event ProjectCreated(
		uint indexed projectId,
		uint amount,
		uint[] projectTime,
		string info,
		uint status,
		address indexed crowdfunding,
		address indexed evaluation,
		address creator
	);

	constructor(
		address _vrfConsumerAddress,
		address _pushCommAddresspushCommAddress,
		address _hypercertsAddress,
		address _treasury
	) {
		hypercerts = IHypercerts(_hypercertsAddress);
		vrfConsumer = IVRFv2Consumer(_vrfConsumerAddress);
		pushComm = IPUSHCommInterface(_pushCommAddresspushCommAddress);
		treasury = _treasury;
	}

	// ************************ //
	// *      NatureLink      * //
	// ************************ //

	function createProject(
		uint _amount,
		uint _planning,
		uint[] memory _projectTime,
		uint _evaluationTime,
		string memory _info
	) public {
		require(_amount > 0, 'createProject: Amount must be greater than 0');
		require(
			_planning > block.timestamp,
			'createProject: Deadline must be greater than current time'
		);
		require(
			_projectTime.length == 2,
			'createProject: Project time must have 2 elements'
		);
		require(
			_planning <= _projectTime[uint(createProjectArgs.start)],
			'createProject: Deadline must be less or equal than project start time'
		);
		require(
			_projectTime[uint(createProjectArgs.start)] <
				_projectTime[uint(createProjectArgs.end)],
			'createProject: Project start time must be less than project end time'
		);

		uint projectId = portfolios[msg.sender].projectIdCounter + 1;
		portfolios[msg.sender].projectIdCounter = projectId;

		uint bounty = (_amount * 5) / 100; // 5% of amount
		uint fee = (bounty * 10) / 100; // 10% of bounty

		uint evaluationTime = _projectTime[uint(createProjectArgs.end)] +
			_evaluationTime;

		Crowdfunding crowdfunding = new Crowdfunding(
			_amount,
			bounty,
			fee,
			_planning,
			msg.sender,
			treasury,
			address(hypercerts),
			address(pushComm),
			_info
		);

		Evaluation evaluation = new Evaluation(
			address(vrfConsumer),
			address(pushComm),
			address(crowdfunding),
			msg.sender,
			_planning,
			_projectTime,
			evaluationTime
		);

		vrfConsumer.setPermittedEvaluator(address(evaluation), true);

		crowdfunding.setEvaluation(address(evaluation));
		crowdfunding.transferOwnership(address(this));
		evaluation.transferOwnership(address(this));

		Project memory project = Project({
			id: projectId,
			amount: _amount,
			projectTime: _projectTime,
			info: _info,
			status: status.ongoing,
			crowdfunding: crowdfunding,
			evaluation: evaluation,
			creator: msg.sender
		});

		if (!isUser[msg.sender]) {
			isUser[msg.sender] = true;
			users.push(msg.sender);
		}

		portfolios[msg.sender].projects.push(project);

		emit ProjectCreated(
			projectId,
			_amount,
			_projectTime,
			_info,
			uint(status.ongoing),
			address(crowdfunding),
			address(evaluation),
			msg.sender
		);
	}

	function refundStakesForFailedProjects() public {
		for (uint i = 0; i < users.length; i++) {
			address user = users[i];
			Portfolio storage portfolio = portfolios[user];
			for (uint j = 0; j < portfolio.projects.length; j++) {
				Project storage project = portfolio.projects[j];
				if (project.status == status.ongoing) {
					Crowdfunding crowdfunding = project.crowdfunding;
					if (
						block.timestamp > crowdfunding.deadline() &&
						crowdfunding.getBalance() < crowdfunding.threshold()
					) {
						crowdfunding.refundAll();
						project.status = status.failed;
					}
				}
			}
		}
	}

	function _updateProjectStatus(
		address _creator,
		uint _projectId,
		status _newStatus
	) private {
		Portfolio storage portfolio = portfolios[_creator];
		bool projectFound = false;

		for (uint i = 0; i < portfolio.projects.length; i++) {
			if (portfolio.projects[i].id == _projectId) {
				portfolio.projects[i].status = _newStatus;
				projectFound = true;
				break;
			}
		}

		require(projectFound, 'Project not found');
	}

	// ************************ //
	// *  Getters y Setters   * //
	// ************************ //

	function getAllProjects() public view returns (Project[] memory) {
		uint totalProjectsCount = 0;

		for (uint i = 0; i < users.length; i++) {
			totalProjectsCount += portfolios[users[i]].projects.length;
		}

		Project[] memory allProjects = new Project[](totalProjectsCount);

		if (users.length == 0) return allProjects;

		uint counter = 0;

		for (uint i = 0; i < users.length; i++) {
			Project[] memory projects = portfolios[users[i]].projects;

			for (uint j = 0; j < projects.length; j++) {
				allProjects[counter] = projects[j];
				counter++;
			}
		}

		return allProjects;
	}

	function setProjectStatus(address _creator, status _newStatus) public {
		Portfolio storage userPortfolio = portfolios[_creator];

		bool projectFound = false;
		for (uint i = 0; i < userPortfolio.projects.length; i++) {
			address evaluationAddress = address(userPortfolio.projects[i].evaluation);
			if (evaluationAddress == msg.sender) {
				userPortfolio.projects[i].status = _newStatus;
				projectFound = true;
				break;
			}
		}

		require(projectFound, 'setProjectStatus: Project not found');
	}

	function setTreasury(address _treasury) public onlyOwner returns (address) {
		treasury = _treasury;
		return treasury;
	}
}
