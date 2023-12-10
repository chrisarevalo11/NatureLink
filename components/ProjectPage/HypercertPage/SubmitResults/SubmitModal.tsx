import { ReactElement } from 'react'
import SubmitForm from './SubmitForm'
import { Project } from '@/models/contract-functions-args.model'

type Props = {
	project: Project
}

export default function SubmitModal(props: Props): JSX.Element {
	const { project } = props

	const closeModal = () => {
		const modal: HTMLDialogElement = document.getElementById(
			'submit-results'
		) as HTMLDialogElement
		if (modal) {
			modal.close()
		}
	}

	return (
		<dialog id='submit-results' className='modal modal-bottom sm:modal-middle'>
			<div className='modal-box bg-gray-900 maw-h-[90vh] overflow-scroll no-scrollbar relative'>
				<button
					onClick={closeModal}
					className='font-bold absolute right-4 top-4 text-gray-500'
				>
					X
				</button>
				<h3 className='font-bold text-xl my-2 text-center'>
					Demonstrate your impact!
				</h3>
				<p>
					These are the aspects of the project development we ask you to
					demonstrate:{' '}
				</p>
				<SubmitForm closeModal={closeModal} project={project} />
			</div>
		</dialog>
	)
}
