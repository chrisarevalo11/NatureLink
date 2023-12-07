import { ReactElement } from 'react'
import { FiExternalLink } from 'react-icons/fi'
import Link from 'next/link'

export default function UsefulLinks(): ReactElement {
	const links: string[] = [
		'https://www.google.com/',
		'https://github.com/chrisarevalo11/NatureLink',
		'https://www.freepik.com/search?color=green&format=search&last_filter=style&last_value=cartoon&query=bicycle&selection=1&style=cartoon&type=vector'
	]

	return (
		<div className='w-[95vw] md:w-full'>
			<h1 className='text-2xl font-bold text-center text-primary py-2'>
				Useful links
			</h1>
			<div className='w-full flex flex-col gap-3 rounded-xl bg-gray-900 p-3 mx-auto'>
				{links.map((link, index) => (
					<Link
						href={link}
						key={index}
						target='_blank'
						className='underline text-primary truncate'
					>
						<FiExternalLink className='inline mr-2' />
						{link}
					</Link>
				))}
			</div>
		</div>
	)
}
