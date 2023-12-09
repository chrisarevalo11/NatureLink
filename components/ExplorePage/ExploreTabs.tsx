'use client'

import { ReactElement, useState } from 'react'
import ExploreProjects from './ExploreProjects'
import ExploreHypercerts from './ExploreHypercerts'
import { Project } from '@/models/contract-functions-args.model'

type Props = {
	projects: Project[]
	isSpinning: boolean
}

export default function ExploreTabs(props: Props): JSX.Element {
	const { projects, isSpinning } = props
	const tabs: string[] = ['Projects', 'Hypercerts']
	const [activeTabIndex, setActiveTabIndex] = useState<number>(0)

	const getTabContent = (currentTab: string): ReactElement => {
		const content: Record<string, JSX.Element> = {
			Projects: (
				<ExploreProjects isSpinning={props.isSpinning} projects={projects} />
			),
			Hypercerts: <ExploreHypercerts projects={projects} />
		}
		return content[currentTab]
	}

	const handleTabClick = (index: number) => {
		setActiveTabIndex(index)
	}

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
				{getTabContent(tabs[activeTabIndex])}
			</div>
		</>
	)
}
