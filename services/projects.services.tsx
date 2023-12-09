import { Contract, Wallet, ethers } from 'ethers'
import natureLinkJson from '../deployments/mumbai/NatureLink.json'
import crowdfundingJson from '../deployments/mumbai/Crowdfunding.json'
import evaluationJson from '../deployments/mumbai/Evaluation.json'

export function getCrowdfundingContract(
	address: string,
	signer: ethers.providers.JsonRpcSigner
) {
	const crowdfundingContract: Contract = new Contract(
		address,
		crowdfundingJson.abi,
		signer
	)

	return crowdfundingContract
}

export function getEvaluationContract(
	address: string,
	signer: ethers.providers.JsonRpcSigner
) {
	const evaluationContract: Contract = new Contract(
		address,
		evaluationJson.abi,
		signer
	)

	return evaluationContract
}
