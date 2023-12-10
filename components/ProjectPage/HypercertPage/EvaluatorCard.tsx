import { formatAddress } from '@/functions/utils'
import Link from 'next/link'
import { ReactElement } from 'react'

type Props = {
	evaluator: string
}

export default function EvaluatorCard(props: Props): ReactElement {
	const { evaluator } = props

	return (
		<Link
			href={'/profile'}
			className='bg-gray-800 hover:bg-gray-700 transition-all p-2 rounded-lg flex flex-col items-center gap-1'
		>
			<figure
				style={{
					backgroundImage: `url(/images/placeholder.jpg)`,
					backgroundPosition: 'center',
					backgroundSize: 'cover'
				}}
				className='w-12 h-12 rounded-full'
			></figure>
			<h2 className='font-bold text-sm lg:text-md'>
				{formatAddress(evaluator)}
			</h2>
		</Link>
	)
}
