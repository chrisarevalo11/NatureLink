import Link from 'next/link'
import { ReactElement } from 'react'

type Props = {
	filesUrl: string[]
}

export default function UsefulFiles(props: Props): JSX.Element {
	const { filesUrl } = props

	return (
		<div className='w-full grid grid-cols-3 gap-3 rounded-xl bg-gray-900 p-3 mx-auto'>
			{filesUrl?.map((fileUrl: string, index: number) => (
				<div key={index} className='flex flex-col justify-center'>
					<div
						style={{
							backgroundImage: 'url(/images/folder.png)',
							backgroundSize: 'contain',
							backgroundPosition: 'center',
							backgroundRepeat: 'no-repeat'
						}}
						className='w-full h-[80px]'
					></div>
					<Link
						href={fileUrl}
						target='_blank'
						className='underline text-primary truncate'
					>
						{fileUrl}
					</Link>
				</div>
			))}
		</div>
	)
}
