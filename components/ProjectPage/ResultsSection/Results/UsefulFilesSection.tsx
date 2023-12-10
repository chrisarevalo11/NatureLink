import { ReactElement } from 'react'
import UsefulFiles from './UsefulFiles'

type Props = {
	filesUrl: string[]
}

export default function UsefulLinksSection(props: Props): JSX.Element {
	const { filesUrl } = props

	return (
		<div className='w-[95vw] md:w-full'>
			<h1 className='text-3xl font-bold text-center py-2'>Useful links</h1>
			<UsefulFiles filesUrl={filesUrl} />
		</div>
	)
}
