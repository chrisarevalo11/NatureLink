'use client'

import { ReactElement, useEffect, useState } from 'react'
import ExploreProjects from './ExploreProjects'
import ExploreHypercerts from './ExploreHypercerts'
import { useAppSelector } from '@/store'
import { Propousal } from '@/models/contract-functions-args.model'
import { getContract } from '@thirdweb-dev/sdk'
import { useContract, useContractRead } from '@thirdweb-dev/react'

const tabs: string[] = ['Projects', 'Hypercerts']
const tabContent: Record<string, ReactElement> = {
	Projects: <ExploreProjects />,
	Hypercerts: <ExploreHypercerts />
}

export default function ExploreTabs(): JSX.Element {
	const [activeTabIndex, setActiveTabIndex] = useState<number>(0)

	const propousals: Propousal[] = useAppSelector(
		state => state.propousal.propousals
	)

	const currentTab: string = tabs[activeTabIndex]

	const handleTabClick = (index: number) => {
		setActiveTabIndex(index)
	}

	useEffect(() => {}, [])

	return (
		<>
			<div role='tablist' className='tabs tabs-boxed w-full bg-gray-900'>
				{tabs.map((tab, index) => (
					<a
						key={index}
						role='tab'
						className={`tab  ${
							activeTabIndex === index && 'tab-active pointer-events-none'
						}`}
						onClick={() => handleTabClick(index)}
					>
						{tab}
					</a>
				))}
			</div>
			<div
				style={{ marginTop: '10px' }}
				className='flex justify-center w-full items-center p-2'
			>
				{tabContent[currentTab]}
			</div>
		</>
	)
}
