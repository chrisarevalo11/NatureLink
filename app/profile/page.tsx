import Banner from '@/components/ProfilePage/Banner'
import ProfileInfo from '@/components/ProfilePage/ProfileInfo'
import TabsSection from '@/components/ProfilePage/TabsSection'
import { ReactNode } from 'react'

export default function Component(): ReactNode {
	return (
		<div className='w-full min-h-screen flex flex-col mt-5'>
			<Banner />
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-4 py-6 lg:px-6'>
				<ProfileInfo />
				<TabsSection />
			</div>
		</div>
	)
}
