// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol';

import './interfaces/IHypercerts.sol';
import './interfaces/IPUSHCommInterface.sol';
import './interfaces/IEvaluation.sol';
import './Evaluation.sol';

contract Crowdfunding is IERC1155Receiver, Ownable {
	using Strings for address;
	using Strings for uint;

	bool public openForStake = true;
	bool public openForWithdraw = false;
	uint public deadline;
	uint public threshold;
	uint public bounty;
	uint public fee;
	uint public tokenIdCounter;
	IHypercerts public hypercerts;
	IEvaluation public evaluation;
	IPUSHCommInterface public pushComm;

	address public creator;
	address public treasuryAddress;
	address[] public stakers;

	string public info;

	mapping(address => uint) public balances;
	mapping(address => bool) public isContributor;

	event Stake(address, uint);
	event Withdraw(address, uint);

	modifier onlyCreator() {
		require(msg.sender == creator, 'onlyCreator: caller is not the creator');
		_;
	}

	constructor(
		uint _amount,
		uint _bounty,
		uint _fee,
		uint _deadline,
		address _creator,
		address _treasuryAddress,
		address _hypercertsAddress,
		address _pushCommAddress,
		string memory _info
	) {
		require(
			_amount > 0,
			'constructorCrowdfunding: amount must be greater than 0'
		);
		require(
			_deadline > block.timestamp,
			'constructorCrowdfunding: deadline must be greater than current time'
		);

		threshold = _amount;
		bounty = _bounty;
		fee = _fee;

		deadline = _deadline;

		creator = _creator;
		treasuryAddress = _treasuryAddress;
		hypercerts = IHypercerts(_hypercertsAddress);
		pushComm = IPUSHCommInterface(_pushCommAddress);

		info = _info;
	}

	// ************************ //
	// *     Crowdfunding     * //
	// ************************ //

	receive() external payable {
		stake();
	}

	function stake() public payable {
		require(msg.sender != creator, 'stake: the creator cannot stake');
		require(openForStake, 'stake: the staker is closed');
		require(block.timestamp < deadline, 'stake: the stake time is over');
		require(msg.value > 0, 'stake: stake amount must be greater than 0');
		require(
			address(this).balance <= threshold,
			'stake: exceeded the threshold'
		);

		if (address(this).balance == threshold) {
			openForStake = false;
			openForWithdraw = true;
		}

		if (!isContributor[msg.sender]) {
			isContributor[msg.sender] = true;
			stakers.push(msg.sender);
		}

		balances[msg.sender] += msg.value;

		emit Stake(msg.sender, msg.value);
	}

	function execute() external onlyCreator {
		require(openForWithdraw, 'execute: the withdraw is closed');
		require(
			block.timestamp >= deadline,
			'execute: the deadline has not passed'
		);
		require(
			address(this).balance == threshold,
			'execute: the threshold has not been met'
		);

		bool successSelection = evaluation.selectEvaluators();
		require(successSelection, 'execute: failed to select evaluators');

		uint[] memory fractions = new uint[](stakers.length);

		for (uint i = 0; i < stakers.length; i++) {
			address staker = stakers[i];
			uint porcentage = _fraction(staker);

			fractions[i] = porcentage;
		}

		uint hypercertId = hypercerts.mint(
			address(this),
			tokenIdCounter,
			100, // 100%
			abi.encodePacked(''),
			info
		);

		tokenIdCounter++;

		hypercerts.fractionateToken(
			address(this),
			stakers,
			hypercertId,
			fractions,
			abi.encodePacked('')
		);

		(bool response1, ) = treasuryAddress.call{value: fee}('');
		require(response1, 'execute: failed to send ether to treasury');

		uint bountyWithouFee = bounty - fee;

		(bool response, ) = address(evaluation).call{value: bountyWithouFee}('');
		require(response, 'execute: failed to send ether to evaluation');

		(bool response2, ) = msg.sender.call{value: address(this).balance}('');
		require(response2, 'execute: failed to send ether to owner');

		openForWithdraw = false;
	}

	function timeLeft() public view returns (uint) {
		if (block.timestamp < deadline) {
			return deadline - block.timestamp;
		}
		return 0;
	}

	function refundAll() public {
		require(
			address(this).balance < threshold,
			'Crowdfunding: No refunds available'
		);

		for (uint i = 0; i < stakers.length; i++) {
			address staker = stakers[i];
			uint balance = balances[staker];
			if (balance > 0) {
				balances[staker] = 0;
				(bool sent, ) = staker.call{value: balance}('');
				require(sent, 'Failed to send Ether');
				emit Withdraw(staker, balance);
			}
		}
	}

	// ************************ //
	// *  Getters y Setters   * //
	// ************************ //

	function getBalance() public view returns (uint) {
		return address(this).balance;
	}

	function getMissingAmount() public view returns (uint) {
		return threshold - address(this).balance;
	}

	function getStakers() public view returns (address[] memory) {
		return stakers;
	}

	function setEvaluation(
		address _evaluation
	) external onlyOwner returns (address) {
		evaluation = IEvaluation(_evaluation);
		return address(evaluation);
	}

	// ************************ //
	// *       private        * //
	// ************************ //

	function _fraction(address _staker) private view returns (uint) {
		uint balance = balances[_staker];
		return (balance * 100) / threshold;
	}

	// The following functions are overrides required by Solidity.

	function onERC1155Received(
		address operator,
		address from,
		uint256 id,
		uint256 value,
		bytes calldata data
	) external override returns (bytes4) {
		return
			bytes4(
				keccak256('onERC1155Received(address,address,uint256,uint256,bytes)')
			);
	}

	function onERC1155BatchReceived(
		address operator,
		address from,
		uint256[] calldata ids,
		uint256[] calldata values,
		bytes calldata data
	) external override returns (bytes4) {
		return
			bytes4(
				keccak256(
					'onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)'
				)
			);
	}

	function supportsInterface(
		bytes4 interfaceId
	) public view override(IERC165) returns (bool) {
		return interfaceId == type(IERC1155Receiver).interfaceId;
	}
}
