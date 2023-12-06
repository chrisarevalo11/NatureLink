import React from 'react'
import Image from 'next/image'
import { kdam } from '@/styles/fonts'
import Link from 'next/link'

export default function NavbarLogo(): React.ReactElement {
	return (
		<div className='grow'>
			<Link href={'/'} className='flex items-center gap-2 w-fit'>
				<Image
					src={'/images/logo.svg'}
					alt='logo'
					width={40}
					height={40}
					className='motion-safe:animate-spin-slow'
				/>
				<h1
					className={`hidden text-green400 ${kdam.className} md:block text-2xl`}
				>
					NatureLink
				</h1>
			</Link>
		</div>
	)
}
