'use client'

import Link from 'next/link'
import { Fragment, ReactElement } from 'react'
import SubmitModal from './SubmitModal'

export default function ActionButton(): ReactElement {
	const user: string = 'owner'

	const openSubmitModal = () => {
		const submitModal: HTMLDialogElement = document.getElementById(
			'submit'
		) as HTMLDialogElement
		if (submitModal) {
			submitModal.showModal()
		}
	}

	if (user === 'owner') {
		return (
			<Fragment>
				<button
					onClick={openSubmitModal}
					className='btn btn-primary btn-wide mx-auto my-3'
				>
					Submit results
				</button>
				<SubmitModal />
			</Fragment>
		)
	}

	if (user === 'contributor') {
		return (
			<button className='btn btn-primary btn-wide mx-auto my-3'>
				Evaluate
			</button>
		)
	}

	return (
		<Link href='#results' className='btn btn-primary btn-wide mx-auto my-3'>
			See results
		</Link>
	)
}
