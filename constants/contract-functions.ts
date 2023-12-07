import natureLinkJson from '@/deployments/mumbai/NatureLink.json'
import { useContract, useContractWrite } from '@thirdweb-dev/react'
import { natureLinkFunctions } from '@/models/contract-functions.model'

export function natureLinkContractWriteFunctions(): natureLinkFunctions {
	const { data: contract } = useContract(natureLinkJson.address)

	const { mutateAsync: createProject } = useContractWrite(
		contract,
		'createProject'
	)

	const functions: natureLinkFunctions = {
		createProject
	}

	return functions
}
