import { useEffect, useState } from 'react'
import DonationForm from './DonationForm'
import ProgressBar from './ProgressBar'
import { Project } from '@/models/contract-functions-args.model'
import Countdown from './Countdown'

type Props = {
	project: Project
}

export default function Donate({ project }: Props): JSX.Element {
	const { threshold, getMissingAmount, deadline } = project.stake
	const contributedAmount: number = threshold - getMissingAmount

	return (
		<div className='w-full flex flex-col items-center gap-5'>
			<h1 className='text-3xl font-bold text-center'>Donate</h1>
			<DonationForm project={project} />
			<div className='flex items-center justify-center gap-3 rounded-xl bg-gray-800 overflow-hidden'>
				<h2 className='text-md font-bold text-center flex flex-col p-2 bg-gray-900'>
					<span>Remaining</span>
					<span>time</span>
				</h2>
				<Countdown deadline={deadline} />
			</div>
			<ProgressBar
				currentAmount={contributedAmount}
				RequiredAmount={threshold}
			/>
		</div>
	)
}
