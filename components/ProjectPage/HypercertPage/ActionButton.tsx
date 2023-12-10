'use client'

import Link from 'next/link'
import { Fragment } from 'react'
import SubmitModal from './SubmitResults/SubmitModal'
import SubmitEvaluationModal from './SubmitEvaluation/SubmitEvaluationModal'
import { Project } from '@/models/contract-functions-args.model'
import { useAddress } from '@thirdweb-dev/react'

type Props = {
	project: Project
}

export default function ActionButton(props: Props): JSX.Element {
	const { project } = props
	const address: string | undefined = useAddress()

	const evaluators: string[] | undefined = project.evaluation.evaluatorsSelected
	const evaluator: string | undefined = evaluators.find(
		(evaluator: string) => evaluator === address
	)

	const user: string | undefined =
		project?.proposal.creatorAddress === address
			? project?.proposal.creatorAddress
			: undefined

	const openSubmitResultsModal = () => {
		const modal: HTMLDialogElement = document.getElementById(
			'submit-results'
		) as HTMLDialogElement
		if (modal) {
			modal.showModal()
		}
	}

	const openSubmitEvaluationModal = () => {
		const modal: HTMLDialogElement = document.getElementById(
			'submit-evaluation'
		) as HTMLDialogElement
		if (modal) {
			modal.showModal()
		}
	}

	if (user !== undefined) {
		return (
			<Fragment>
				<button
					onClick={openSubmitResultsModal}
					className='btn btn-primary btn-wide mx-auto my-3'
				>
					Submit results
				</button>
				<SubmitModal />
			</Fragment>
		)
	}

	if (evaluator !== undefined) {
		return (
			<Fragment>
				<button
					onClick={openSubmitEvaluationModal}
					className='btn btn-primary btn-wide mx-auto my-3'
				>
					Evaluate
				</button>
				<SubmitEvaluationModal />
			</Fragment>
		)
	}

	return (
		<Link href='#results' className='btn btn-primary btn-wide mx-auto my-3'>
			See results
		</Link>
	)
}
