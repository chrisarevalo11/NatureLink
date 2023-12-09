'use client'

import Apply from '@/components/ProjectPage/Apply'
import Donate from '@/components/ProjectPage/Donate'
import Information from '@/components/ProjectPage/Information'
import { Project } from '@/models/contract-functions-args.model'
import { AppDispatch, useAppSelector } from '@/store'
import { getprojectById } from '@/store/slides/projectSlide'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { test } from '@/constants/constants'
import { Contract, ethers } from 'ethers'
import { getCrowdfundingContract } from '@/services/projects.services'

export default function Page(): JSX.Element {
	const [timeLeft, setTimeLeft] = useState<number>(0)

	const project: Project | null = useAppSelector(
		state => state.project.projectSelected
	)

	const dispatch = useDispatch<AppDispatch>()
	const router = useRouter()
	const pathname: string = usePathname()

	useEffect(() => {
		const pathnameSplited: string[] = pathname.split('/')
		const slug: string = pathnameSplited[pathnameSplited.length - 1]
		const slugNumber: number = parseInt(slug)
		dispatch(getprojectById(slugNumber))

		if (project === null) {
			router.push('/explore')
			return
		}

		getTimeLeft()
	}, [dispatch])

	const getTimeLeft = async () => {
		const ethereum = (window as any).ethereum
		const provider: ethers.providers.Web3Provider =
			new ethers.providers.Web3Provider(ethereum)

		await provider.send('eth_requestAccounts', [])

		const signer: ethers.providers.JsonRpcSigner = provider.getSigner()

		const crowdfundingContract: Contract = getCrowdfundingContract(
			project?.proposal.crowdfundingAddress || '',
			signer
		)

		setTimeLeft(await crowdfundingContract.timeLeft())
	}

	return (
		<section className='w-full grid lg:grid-cols-2 rounded-xl mt-2'>
			<Information project={test} />

			<div className='flex flex-col justify-center rounded-br-xl rounded-bl-xl lg:rounded-bl-none py-4 px-5 lg:rounded-tr-xl bg-slate-950'>
				<Donate
					RequiredAmount={test.amount}
					project={project}
					timeLeft={timeLeft}
				/>
				<div className='divider'>OR</div>
				<Apply project={project} />
			</div>
		</section>
	)
}
