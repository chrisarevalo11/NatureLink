import { BigNumber, ethers } from 'ethers'
import {
	BigIntDto,
	Propousal,
	PropousalDto,
	Stake,
	StakeDto
} from '@/models/contract-functions-args.model'

export function propousalDtoToPropousal(
	projectsDto: PropousalDto[]
): Propousal[] {
	return projectsDto.map((projectDto: any) => {
		const idDto: BigIntDto = projectDto[0]
		const idBN: BigNumber = BigNumber.from(idDto._hex)
		let id: string | number = idBN.toNumber()
		id = Number(id)

		const amountDto: BigIntDto = projectDto[1]
		const amountBN: BigNumber = BigNumber.from(amountDto._hex)
		let amount: string | number = ethers.utils.formatEther(amountBN)
		amount = Number(amount)

		const projectTimeDto: BigIntDto[] = projectDto[2]
		const projectTimeStartDto: BigIntDto = projectTimeDto[0]
		const projectTimeStartBN: BigNumber = BigNumber.from(
			projectTimeStartDto._hex
		)
		// TODO: Convert to date

		const projectTimeStart = projectTimeStartBN.toNumber()
		const projectTimeEndDto: BigIntDto = projectTimeDto[1]
		const projectTimeEndBN: BigNumber = BigNumber.from(projectTimeEndDto._hex)
		const projectTimeEnd = projectTimeEndBN.toNumber()
		// TODO: Convert to date

		const infoDto: string = projectDto[3]

		const statusDto: number = projectDto[4]

		const crowdfundingAddressDto: string = projectDto[5]
		const evaluationAddressDto: string = projectDto[6]
		const creatorAddressDto: string = projectDto[7]

		const project: Propousal = {
			id: id,
			amount: amount,
			projectTimeStart: projectTimeStart,
			projectTimeEnd: projectTimeEnd,
			info: infoDto,
			status: statusDto,
			crowdfundingAddress: crowdfundingAddressDto,
			evaluationAddress: evaluationAddressDto,
			creatorAddress: creatorAddressDto
		}

		return project
	})
}

export function stakeDtoToStake(stakeDto: StakeDto): Stake {
	const openForStakeDto: boolean = stakeDto.openForStake
	const openForWithdrawDto: boolean = stakeDto.openForWithdraw

	const bountyBN: BigNumber = BigNumber.from(stakeDto.bounty._hex)
	let bounty: string | number = ethers.utils.formatEther(bountyBN)
	bounty = Number(bounty)

	const feeDto: BigNumber = BigNumber.from(stakeDto.fee._hex)
	let fee: string | number = ethers.utils.formatEther(feeDto)
	fee = Number(fee)

	const deadlineBn: BigNumber = BigNumber.from(stakeDto.deadline._hex)
	const deadline = deadlineBn.toNumber()
	// TODO: Convert to date

	const tokenIdCounterBn: BigNumber = BigNumber.from(
		stakeDto.tokenIdCounter._hex
	)
	const tokenIdCounter: number = tokenIdCounterBn.toNumber()

	const thresholdBn: BigNumber = BigNumber.from(stakeDto.threshold._hex)
	const threshold: number = thresholdBn.toNumber()
	// TODO: Convert to date

	const creatorDto: string = stakeDto.creator
	const treasuryAddressDto: string = stakeDto.treasuryAddress
	const hypercertsAddressDto: string = stakeDto.hypercertsAddress
	const pushCommAddressDto: string = stakeDto.pushCommAddress
	const stakersDto: string[] = stakeDto.stakers
	const infoDto: string = stakeDto.info

	const stake: Stake = {
		openForStake: openForStakeDto,
		openForWithdraw: openForWithdrawDto,
		bounty: bounty,
		fee: fee,
		deadline: deadline,
		tokenIdCounter: tokenIdCounter,
		threshold: threshold,
		creator: creatorDto,
		treasuryAddress: treasuryAddressDto,
		hypercertsAddress: hypercertsAddressDto,
		pushCommAddress: pushCommAddressDto,
		stakers: stakersDto,
		info: infoDto
	}
	return stake
}
