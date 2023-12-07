import { BigNumber, ethers } from 'ethers'
import {
	BigIntDto,
	Project,
	ProjectDto
} from '@/models/contract-functions-args.model'

export function getAllProjectsReturnDtoToGetAllProjectsReturn(
	projects: ProjectDto[]
): Project[] {
	return projects.map((projectDto: any) => {
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

		const project: Project = {
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
