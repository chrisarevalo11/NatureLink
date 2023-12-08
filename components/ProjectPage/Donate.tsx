import { ReactNode } from 'react'
import DonationForm from './DonationForm'
import ProgressBar from './ProgressBar'
import { Project } from '@/models/contract-functions-args.model'

type Props = {
	RequiredAmount: number
	project: Project | null
}

export default function Donate(props: Props): JSX.Element {
	const { RequiredAmount, project } = props
	const currentAmount: number = 11000

	return (
		<div className='w-full flex flex-col gap-5'>
			<h1 className='text-3xl font-bold text-center'>Donate</h1>
			<DonationForm project={project} />
			<ProgressBar
				currentAmount={currentAmount}
				RequiredAmount={RequiredAmount}
			/>
		</div>
	)
}
