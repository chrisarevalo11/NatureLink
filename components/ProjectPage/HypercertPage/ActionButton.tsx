'use client'

import Link from 'next/link'
import { Fragment, ReactElement } from 'react'
import SubmitModal from './SubmitResults/SubmitModal'
import SubmitEvaluationModal from './SubmitEvaluation/SubmitEvaluationModal'

export default function ActionButton(): ReactElement {
	const user: string = 'evaluator'

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

	if (user === 'owner') {
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

	if (user === 'evaluator') {
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
