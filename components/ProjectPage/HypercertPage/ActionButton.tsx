import Link from 'next/link'
import { ReactElement } from 'react'

export default function ActionButton(): ReactElement {
	const user: string = 'contributor'

	if (user === 'owner') {
		return (
			<button className='btn btn-primary btn-wide mx-auto my-3'>
				Submit results
			</button>
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
