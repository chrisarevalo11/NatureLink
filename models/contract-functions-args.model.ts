export interface BigIntDto {
	_hex: string
	_isBigNumber: boolean
}

export interface Project {
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
