'use client'

import { ConnectWallet } from '@thirdweb-dev/react'
import Logo from './NavbarLogo'
import NavLinks, { NavLinksResponsive } from './NavLinks'
import Image from 'next/image'
import { useState } from 'react'
import { useLogin } from '@lens-protocol/react-web'
import { useAddress } from '@thirdweb-dev/react'
import { useRouter } from 'next/navigation'

export default function Component() {
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
	const { execute: executeLogin } = useLogin()
	const address = useAddress()
	const router = useRouter()
	const login = async () => {
		if (address) {
			try {
				const result: any = await executeLogin({ address: address })
			} catch (err) {
				console.error('Error during login:', err)
			}
		} else {
			console.error('Wallet address not found. Please connect your wallet.')
		}
	}

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

			<div className='navbar-end flex items-center gap-2'>
				<ConnectWallet
					theme={'dark'}
					modalSize={'compact'}
					btnTitle={'Connect Wallet'}
					modalTitleIconUrl={''}
					style={{
						borderRadius: '100px',
						backgroundColor: '#1EB854',
						color: 'white',
						fontWeight: 'bold',
						padding: '8px 16px' // py-2 px-4 equivalente
					}}
				/>
				{address && (
					<button
						className='btn-primary btn hover:bg-blue-700 text-white my-4 font-bold py-2 px-5 rounded-xl focus:outline-none focus:shadow-outline'
						onClick={() => login().then(() => router.push('/home'))}
					>
						Login
					</button>
				)}
			</div>
		</nav>
	)
}
