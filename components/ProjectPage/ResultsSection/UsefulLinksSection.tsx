import { ReactElement } from 'react'
import UsefulLinks from './UsefulLinks'

export default function UsefulLinksSection(): ReactElement {
	return (
		<div className='w-[95vw] md:w-full'>
			<h1 className='text-3xl font-bold text-center py-2'>Useful links</h1>
			<UsefulLinks />
		</div>
	)
}
