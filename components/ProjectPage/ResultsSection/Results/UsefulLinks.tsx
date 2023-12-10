import { ReactElement } from 'react'
import { FiExternalLink } from 'react-icons/fi'
import Link from 'next/link'

type Props = {
	links: string[] | string
}

export default function UsefulLinks(props: Props): JSX.Element {
	const { links } = props

	return (
		<div className='w-full flex flex-col gap-3 rounded-xl bg-gray-900 p-3 mx-auto'>
			{typeof links === 'string' ? (
				<Link
					href={links}
					target='_blank'
					className='underline text-primary truncate'
				>
					<FiExternalLink className='inline mr-2' />
					{links}
				</Link>
			) : (
				links?.map((link: string, index: number) => (
					<Link
						href={link}
						key={index}
						target='_blank'
						className='underline text-primary truncate'
					>
						<FiExternalLink className='inline mr-2' />
						{link}
					</Link>
				))
			)}
		</div>
	)
}
