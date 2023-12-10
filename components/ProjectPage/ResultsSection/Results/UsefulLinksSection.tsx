import { ReactElement } from 'react'
import UsefulLinks from './UsefulLinks'

type Props = {
	links: string[]
}

export default function UsefulLinksSection(props: Props): JSX.Element {
	const { links } = props

	return (
		<div className='w-[95vw] md:w-full'>
			<h1 className='text-3xl font-bold text-center py-2'>Useful links</h1>
			<UsefulLinks links={links} />
		</div>
	)
}
