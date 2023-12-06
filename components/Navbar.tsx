'use client'

import { ConnectWallet } from '@thirdweb-dev/react'
import Logo from './NavbarLogo'
import NavLinks, { NavLinksResponsive } from './NavLinks'
import Image from 'next/image'
import { useState } from 'react'

export default function Component() {
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen)
	}

	return (
		<nav className='navbar bg-gray-900 lg:min-w-fit lg:w-[60%] lg:max-w-[850px] pe-4 ps-4 lg:rounded-full mx-auto flex justify-around '>
			<div className='navbar-start'>
				<div className='lg:hidden'>
					<button className='btn btn-ghost' onClick={toggleSidebar}>
						<Image
							className=''
							src={'/images/burger.svg'}
							alt='bars'
							width={20}
							height={20}
						/>
					</button>
					<NavLinksResponsive
						isSidebarOpen={isSidebarOpen}
						setIsSidebarOpen={setIsSidebarOpen}
					/>
				</div>
				<Logo />
			</div>
			<div className='navbar-center hidden lg:flex'>
				<NavLinks />
			</div>
			<div className='navbar-end'>
				<ConnectWallet
					theme={'dark'}
					modalSize={'compact'}
					btnTitle={'Connect Wallet'}
					modalTitleIconUrl={''}
					style={{
						borderRadius: '100px',
						backgroundColor: '#1EB854'
					}}
				/>
			</div>
		</nav>
	)
}
