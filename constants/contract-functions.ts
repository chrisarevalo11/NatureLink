import crowndfundingJson from '@/deployments/mumbai/Crowdfunding.json'
import natureLinkJson from '@/deployments/mumbai/NatureLink.json'
import evaluationJson from '@/deployments/mumbai/Evaluation.json'
import { useContract, useContractWrite } from '@thirdweb-dev/react'
import {
	CrowdfundingFunctions,
	EvaluationFunctions,
	NatureLinkFunctions
} from '@/models/contract-functions.model'

export function natureLinkContractWriteFunctions(): NatureLinkFunctions {
	const { data: contract } = useContract(
		natureLinkJson.address,
		natureLinkJson.abi
	)

	const { mutateAsync: createProject } = useContractWrite(
		contract,
		'createProject'
	)

	const functions: NatureLinkFunctions = {
		createProject
	}

	return functions
}

export function crowdfundingContractWriteFunctions(
	address: string
): CrowdfundingFunctions {
	const { data: contract } = useContract(address, crowndfundingJson.abi)

	const { mutateAsync: stake } = useContractWrite(contract, 'stake')
	const { mutateAsync: execute } = useContractWrite(contract, 'execute')

	const functions: CrowdfundingFunctions = {
		stake,
		execute
	}

	return functions
}

export function evaluationContractWriteFunctions(
	address: string
): EvaluationFunctions {
	const { data: contract } = useContract(address, evaluationJson.abi)

	const { mutateAsync: evaluateEvidence } = useContractWrite(
		contract,
		'evaluateEvidence'
	)

	const { mutateAsync: proposeEvaluator } = useContractWrite(
		contract,
		'proposeEvaluator'
	)

	const { mutateAsync: setEvidence } = useContractWrite(contract, 'setEvidence')

	const functions: EvaluationFunctions = {
		evaluateEvidence,
		proposeEvaluator,
		setEvidence
	}

	return functions
}
