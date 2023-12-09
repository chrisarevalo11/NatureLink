'use client'

import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import ExploreTabs from '@/components/ExplorePage/ExploreTabs'
import natureLinkJson from '@/deployments/mumbai/NatureLink.json'
import {
	evaluationDtoToEvaluation,
	propousalDtoToPropousal,
	stakeDtoToStake
} from '@/functions/dtos/dtos'
import {
	EvaluationDto,
	Project,
	Propousal,
	StakeDto
} from '@/models/contract-functions-args.model'
import { AppDispatch, useAppSelector } from '@/store'
import { setPropousals } from '@/store/slides/propousalSlide'
import { useContract, useContractRead } from '@thirdweb-dev/react'
import { Contract, ethers } from 'ethers'

import {
	getCrowdfundingContract,
	getEvaluationContract
} from '@/services/projects.services'
import { setProjects } from '@/store/slides/projectSlide'

export default function Create(): JSX.Element {
	const [isSpinning, setIsSpinning] = useState<boolean>(false)
	const dispatch = useDispatch<AppDispatch>()
	const projects = useAppSelector(state => state.project.projects)

	const { data: natureLinkContract } = useContract(natureLinkJson.address)

	const {
		data: propousalsDto,
		isLoading,
		error
	} = useContractRead(natureLinkContract, 'getAllProjects')

	useEffect(() => {
		if (projects.length === 0 && !isLoading) {
			setIsSpinning(true)
			const proposals: Propousal[] = propousalDtoToPropousal(propousalsDto)
			Promise.all(proposals.map(fetchProject)).then(
				(fetchedProjects: Project[]) => {
					dispatch(setProjects(fetchedProjects))
					setIsSpinning(false)
				}
			)
		}
	}, [isLoading])

	const fetchProject = async (proposal: Propousal): Promise<Project> => {
		const ethereum = (window as any).ethereum
		const provider: ethers.providers.Web3Provider =
			new ethers.providers.Web3Provider(ethereum)

		await provider.send('eth_requestAccounts', [])

		const signer: ethers.providers.JsonRpcSigner = provider.getSigner()

		const crowdfundingContract: Contract = getCrowdfundingContract(
			proposal.crowdfundingAddress,
			signer
		)
		const evaluationContract: Contract = getEvaluationContract(
			proposal.evaluationAddress,
			signer
		)

		const stakeDto: StakeDto = await fetchStakeDto(crowdfundingContract)
		const evaluatorDto: EvaluationDto =
			await fetchEvaluationDto(evaluationContract)

		const stake = stakeDtoToStake(stakeDto)
		const evaluation = evaluationDtoToEvaluation(evaluatorDto)

		return {
			id: proposal.id,
			proposal,
			stake,
			evaluation
		}
	}

	const fetchStakeDto = async (contract: Contract): Promise<StakeDto> => {
		const stakeDto: StakeDto = {
			openForStake: await contract.openForStake(),
			openForWithdraw: await contract.openForWithdraw(),
			bounty: await contract.bounty(),
			fee: await contract.fee(),
			deadline: await contract.deadline(),
			tokenIdCounter: await contract.tokenIdCounter(),
			getMissingAmount: await contract.getMissingAmount(),
			threshold: await contract.threshold(),
			creator: await contract.creator(),
			treasuryAddress: await contract.treasuryAddress(),
			hypercertsAddress: await contract.hypercerts(),
			pushCommAddress: await contract.pushComm(),
			stakers: await contract.getStakers(),
			info: await contract.info()
		}

		return stakeDto
	}

	const fetchEvaluationDto = async (
		contract: Contract
	): Promise<EvaluationDto> => {
		const evaluatorDto: EvaluationDto = {
			vrfConsumer: await contract.vrfConsumer(),
			pushComm: await contract.pushComm(),
			crowdfunding: await contract.crowdfunding(),
			evidence: await contract.evidence(),
			judges: await contract.getAllJudges(),
			evaluatorsSelected: await contract.getAllEvaluatorsSelected()
		}

		return evaluatorDto
	}

	return (
		<>
			<section className='flex flex-col items-center my-3 w-full'>
				<ExploreTabs isSpinning={isSpinning} projects={projects} />
			</section>
		</>
	)
}
