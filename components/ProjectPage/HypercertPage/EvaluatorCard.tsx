import Link from 'next/link'
import { ReactElement } from 'react'

export default function EvaluatorCard(): ReactElement {
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
			<h2 className='font-bold text-sm lg:text-md'>0x13db...24d7</h2>
		</Link>
	)
}
