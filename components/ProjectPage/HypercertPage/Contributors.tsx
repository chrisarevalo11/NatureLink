import { Fragment } from 'react'
import ContributorCard from './ContributorCard'

type Props = {
	contributors?: string[]
}

export default function Contributors(props: Props): JSX.Element {
	const { contributors } = props

	return (
		<Fragment>
			<h1 className='text-3xl font-bold text-center m-2'>Contributors</h1>
			<div className='w-full md:w-[90%] mx-auto grid grid-cols-2 max-h-44 overflow-scroll no-scrollbar gap-2 bg-gray-900 p-1 rounded-xl'>
				{contributors &&
					contributors.map((contributor: string, index: number) => (
						<ContributorCard key={index} contributor={contributor} />
					))}
			</div>
		</Fragment>
	)
}
