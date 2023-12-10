import { formatAddress } from '@/functions/utils'
import Link from 'next/link'

type Props = {
	contributor: string
}

export default function ContributorCard(props: Props): JSX.Element {
	const { contributor } = props

	return (
		<Link
			href='/profile'
			className='bg-gray-800 hover:bg-gray-700 transition-all p-2 rounded-lg flex items-center gap-3'
		>
			<figure
				style={{
					backgroundImage: `url(/images/placeholder.jpg)`,
					backgroundPosition: 'center',
					backgroundSize: 'cover'
				}}
				className='w-12 h-12 rounded-full'
			></figure>
			<div className='flex flex-col items-start gap-1'>
				<h2 className='font-bold text-sm lg:text-md my-2'>
					{formatAddress(contributor)}
				</h2>
			</div>
		</Link>
	)
}
