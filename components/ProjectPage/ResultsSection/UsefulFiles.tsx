import Link from 'next/link'
import { ReactElement } from 'react'

export default function UsefulFiles(): ReactElement {
	const files: string[] = [
		'https://pbs.twimg.com/profile_images/1494316842503925764/eJ-0xwBV_400x400.jpg',
		'https://github.com/chrisarevalo11/NatureLink',
		'https://www.freepik.com/search?color=green&format=search&last_filter=style&last_value=cartoon&query=bicycle&selection=1&style=cartoon&type=vector'
	]

	return (
		<div className='w-[95vw] md:w-full'>
			<h1 className='text-2xl font-bold text-center text-primary py-2'>
				Useful files
			</h1>
			<div className='w-full grid grid-cols-3 gap-3 rounded-xl bg-gray-900 p-3 mx-auto'>
				{files.map((fileURL, index) => (
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
							href={fileURL}
							target='_blank'
							className='underline text-primary truncate'
						>
							{fileURL}
						</Link>
					</div>
				))}
			</div>
		</div>
	)
}
