'use client'

import { ReactElement, useState } from 'react'
import ResultsContent from './Results/ResultsContent'
import EvaluationContent from './Evaluations/EvaluationContent'

const tabs: string[] = ['Results', 'Evaluation']
const tabContent: Record<string, ReactElement> = {
	Results: <ResultsContent />,
	Evaluation: <EvaluationContent />
}
export default function ResultsTabs(): JSX.Element {
	const [activeTabIndex, setActiveTabIndex] = useState<number>(0)
	const currentTab: string = tabs[activeTabIndex]

	const handleTabClick = (index: number) => {
		setActiveTabIndex(index)
	}
	return (
		<>
			<div
				role='tablist'
				className='tabs tabs-boxed bg-gray-900 w-[300px] mx-auto'
			>
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
