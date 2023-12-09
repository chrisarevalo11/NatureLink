import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import { Providers } from './providers'
import { Provider } from 'react-redux'

export const metadata: Metadata = {
	title: 'Naturelink ',
	description: 'Share, Contribute or Evaluate Green Projects'
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
	
		<html lang='en'>
			<body className='lg:pt-5 bg-slate-800 min-h-screen'>
				<Providers>
					<Navbar />
					<main className='flex flex-col items-center justify-center w-full p-2 max-w-[1100px] mx-auto overflow-x-hidden'>
						{children}
					</main>
				</Providers>
			</body>
		</html>
	)
}
