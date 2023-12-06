import { ReactElement } from 'react'
import SubmitForm from './SubmitForm'

export default function SubmitModal(): ReactElement {
	return (
		<dialog id='submit' className='modal modal-bottom sm:modal-middle'>
			<div className='modal-box bg-gray-900 maw-h-[90vh] overflow-scroll no-scrollbar'>
				<h3 className='font-bold text-xl my-2 text-center'>
					Demonstrate your impact!
				</h3>
				<p>
					These are the aspects of the project development we ask you to
					demonstrate:{' '}
				</p>
				<SubmitForm />
			</div>
		</dialog>
	)
}
