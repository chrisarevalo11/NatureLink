import { ReactElement } from 'react'
import Image from 'next/image'

export default function ProfileInfo(): ReactElement {
	return (
		<div className='lg:col-span-1 space-y-4 bg-gray-900  p-6 rounded-lg shadow-lg lg:relative -top-24 h-fit'>
			<div className='w-full h-32 flex items-center justify-center'>
				<Image
					alt='Profile Picture'
					className='rounded-full object-cover'
					height='128'
					src='/images/placeholder.jpg'
					width='128'
				/>
			</div>
			<div className='text-center'>
				<h2 className='text-xl font-bold'>User Name</h2>
				<p className='text-sm text-gray-500 dark:text-gray-400'>User Bio</p>
			</div>
			<div>
				<h3 className='font-bold'>Contact Information</h3>
				<div className='space-y-2'>
					<p className='text-sm text-gray-500 dark:text-gray-400'>
						Email: user@example.com
					</p>
					<p className='text-sm text-gray-500 dark:text-gray-400'>
						Phone: +1 234 567 890
					</p>
				</div>
			</div>
		</div>
	)
}
