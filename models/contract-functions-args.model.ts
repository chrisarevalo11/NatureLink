export interface BigIntDto {
	_hex: string
	_isBigNumber: boolean
}

export interface ProjectDto {
	id: BigIntDto
	amount: BigIntDto
	projectTime: [BigIntDto, BigIntDto]
	info: string
	status: number
	crowdfundingAddress: string
	evaluationAddress: string
	creatorAddress: string
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
