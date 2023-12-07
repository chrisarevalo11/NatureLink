export interface BigIntDto {
	_hex: string
	_isBigNumber: boolean
}

export interface Propousal {
	id: number
	amount: number
	projectTimeStart: number
	projectTimeEnd: number
	info: string
	status: number
	crowdfundingAddress: string
	evaluationAddress: string
	creatorAddress: string
}

export interface PropousalDto {
	id: BigIntDto
	amount: BigIntDto
	PropousalTime: [BigIntDto, BigIntDto]
	info: string
	status: number
	crowdfundingAddress: string
	evaluationAddress: string
	creatorAddress: string
}

export interface Stake {
	openForStake: boolean
	openForWithdraw: boolean
	bounty: number
	fee: number
	deadline: number
	tokenIdCounter: number
	threshold: number
	creator: string
	treasuryAddress: string
	hypercertsAddress: string
	pushCommAddress: string
	stakers: string[]
	info: string
}

export interface StakeDto {
	openForStake: boolean
	openForWithdraw: boolean
	bounty: BigIntDto
	fee: BigIntDto
	deadline: BigIntDto
	tokenIdCounter: BigIntDto
	threshold: BigIntDto
	creator: string
	treasuryAddress: string
	hypercertsAddress: string
	pushCommAddress: string
	stakers: string[]
	info: string
}
