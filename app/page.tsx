'use client'
import { ProfileId, useClaimHandle, useLogin } from '@lens-protocol/react-web'
import { useAddress } from '@thirdweb-dev/react'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useOwnedHandles } from '@lens-protocol/react-web'
import { AppDispatch, useAppSelector } from '@/store'
import { useContract, useContractRead } from '@thirdweb-dev/react'
import natureLinkJson from '@/deployments/mumbai/NatureLink.json'
import {
	evaluationDtoToEvaluation,
	propousalDtoToPropousal,
	stakeDtoToStake
} from '@/functions/dtos/dtos'
import { setPropousals } from '@/store/slides/propousalSlide'
import {
	Evaluation,
	EvaluationDto,
	Project,
	Propousal,
	Stake,
	StakeDto
} from '@/models/contract-functions-args.model'
import { Contract, ethers } from 'ethers'
import {
	getCrowdfundingContract,
	getEvaluationContract
} from '@/services/projects.services'
import { setProjects } from '@/store/slides/projectSlide'

export default function Home() {
	const address = useAddress()
	const { execute: executeLogin, loading, data, error } = useLogin()
	const { execute: executeClaimHandle } = useClaimHandle()
	const [isSpinning, setIsSpinning] = useState<boolean>(true)
	const dispatch = useDispatch<AppDispatch>()
	const proposals = useAppSelector(state => state.propousal.propousals)

	const { data: natureLinkContract } = useContract(natureLinkJson.address)

	const { data: proposalsDto, isLoading } = useContractRead(
		natureLinkContract,
		'getAllProjects'
	)

	const handleClaim = async () => {
		if (address) {
			try {
				const result = await executeClaimHandle({ localName: 'test777' })
				console.log(result)
			} catch (err) {
				console.error(err)
			}
		} else {
			console.error('Wallet address not found. Please connect your wallet.')
		}
	}

	const login = async () => {
		if (address) {
			try {
				const result = await executeLogin({ address: address })
				console.log(result)
			} catch (err) {
				console.error('Error during login:', err)
			}
		} else {
			console.error('Wallet address not found. Please connect your wallet.')
		}
	}
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

		const stake: Stake = stakeDtoToStake(stakeDto)
		const evaluation: Evaluation = evaluationDtoToEvaluation(evaluatorDto)

		const evaluatorCounter: number = evaluation.evaluatorCounter

		for (let index = 0; index < evaluatorCounter; index++) {
			const evaluator: string = await evaluationContract.evaluators(index)
			evaluation.evaluators.push(evaluator)
		}

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
			evaluatorCounter: await contract.evaluatorCounter(),
			judges: await contract.getAllJudges(),
			evaluatorsSelected: await contract.getAllEvaluatorsSelected()
		}

		return evaluatorDto
	}
	useEffect(() => {
		if (!isLoading) {
			const proposals: Propousal[] = propousalDtoToPropousal(proposalsDto)

			Promise.all(proposals.map(fetchProject)).then(
				(fetchedProjects: Project[]) => {
					dispatch(setProjects(fetchedProjects))
					setIsSpinning(false)
				}
			)

			dispatch(setPropousals(proposals))
			setIsSpinning(false)
		}
	}, [isLoading])

	return (
		<div>
			{loading && <p>Cargando perfil...</p>}
			{data && <h1>{JSON.stringify(data)}</h1>}
			<button className={'btn btn-primary'} onClick={login}>
				Login
			</button>
			<button className={'btn btn-primary'} onClick={handleClaim}>
				Claim Handle
			</button>

			{/* 
      {loading && <p>Cargando perfil...</p>}
      {error && <p>Error al cargar el perfil.</p>}
      {handle && <h1>{JSON.stringify(handle)}</h1>} */}
			{isSpinning ? (
				<p>Cargando proyectos...</p>
			) : (
				<button onClick={() => console.log(proposals)}>Click me</button>
			)}
		</div>
	)
}
