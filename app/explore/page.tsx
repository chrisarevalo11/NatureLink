'use client'

import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import ExploreTabs from '@/components/ExplorePage/ExploreTabs'
import natureLinkJson from '@/deployments/mumbai/NatureLink.json'
import { propousalDtoToPropousal, stakeDtoToStake } from '@/functions/dtos/dtos'
import { Propousal, StakeDto } from '@/models/contract-functions-args.model'
import { useAppSelector } from '@/store'
import { setPropousals } from '@/store/slides/propousalSlide'
import { useContract, useContractRead } from '@thirdweb-dev/react'
import { Contract, ethers } from 'ethers'
import { getCrowdfundingContract } from '@/services/projects.services'

export default function Create(): JSX.Element {
	const [isSpinning, setIsSpinning] = useState<boolean>(false)
	const dispatch = useDispatch()
	const propousals = useAppSelector(state => state.propousal.propousals)

	const { data: natureLinkContract } = useContract(natureLinkJson.address)

	const {
		data: propousalsDto,
		isLoading,
		error
	} = useContractRead(natureLinkContract, 'getAllProjects')

	useEffect(() => {
		if (propousals.length === 0) {
			setIsSpinning(true)
			if (!isLoading) {
				const proposals: Propousal[] = propousalDtoToPropousal(propousalsDto)

				proposals.map(async (proposal: Propousal, index: number) => {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					const ethereum = (window as any).ethereum

					const provider: ethers.providers.Web3Provider =
						new ethers.providers.Web3Provider(ethereum)

					await provider.send('eth_requestAccounts', [])

					const signer: ethers.providers.JsonRpcSigner = provider.getSigner()

					const crowdfundingContract: Contract = getCrowdfundingContract(
						proposal.crowdfundingAddress,
						signer
					)

					const stakeDto: StakeDto = {
						openForStake: await crowdfundingContract.openForStake(),
						openForWithdraw: await crowdfundingContract.openForWithdraw(),
						bounty: await crowdfundingContract.bounty(),
						fee: await crowdfundingContract.fee(),
						deadline: await crowdfundingContract.deadline(),
						tokenIdCounter: await crowdfundingContract.tokenIdCounter(),
						threshold: await crowdfundingContract.threshold(),
						creator: await crowdfundingContract.creator(),
						treasuryAddress: await crowdfundingContract.treasuryAddress(),
						hypercertsAddress: await crowdfundingContract.hypercerts(),
						pushCommAddress: await crowdfundingContract.pushComm(),
						stakers: await crowdfundingContract.getStakers(),
						info: await crowdfundingContract.info()
					}

					const stake = stakeDtoToStake(stakeDto)
					console.log('stakes: ', stake)

					return proposal
				})

				dispatch(setPropousals(propousals))

				setIsSpinning(false)
			}
		}
	}, [isLoading])

	return (
		<>
			{isSpinning ? (
				<p>Cargando proyectos...</p>
			) : (
				<section className='flex flex-col items-center my-3 w-full'>
					<ExploreTabs />
				</section>
			)}
		</>
	)
}
