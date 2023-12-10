import React from 'react'
import SubmitEvaluationForm from './SubmitEvaluationForm'
import { Project } from '@/models/contract-functions-args.model'

type Props = {
	project: Project
}

export default function SubmitModal(props: Props): JSX.Element {
	const { project } = props

	const closeModal = () => {
		const modal: HTMLDialogElement = document.getElementById(
			'submit-evaluation'
		) as HTMLDialogElement
		if (modal) {
			modal.close()
		}
	}

	return (
		<dialog
			id='submit-evaluation'
			className='modal modal-bottom sm:modal-middle'
		>
			<div className='modal-box bg-gray-900 maw-h-[90vh] overflow-scroll no-scrollbar relative'>
				<button
					onClick={closeModal}
					className='font-bold absolute right-4 top-4 text-gray-500'
				>
					X
				</button>
				<h3 className='font-bold text-xl my-2 text-center'>Evaluation</h3>
				<p>
					Answer the questions below regarding the impact of the project and the
					quality of the results
				</p>
				<SubmitEvaluationForm project={project} />
			</div>
		</dialog>
	)
}
