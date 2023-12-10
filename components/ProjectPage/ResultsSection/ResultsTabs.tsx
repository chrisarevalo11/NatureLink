'use client'

import { ReactElement, useState } from 'react'
import ResultsContent from './Results/ResultsContent'
import EvaluationContent from './Evaluations/EvaluationContent'
import { Project } from '@/models/contract-functions-args.model'

type Props = {
	project: Project
}

export default function ResultsTabs(props: Props): JSX.Element {
	const { project } = props

	const tabs: string[] = ['Results', 'Evaluation']
	const [activeTabIndex, setActiveTabIndex] = useState<number>(0)

	const getTabContent = (currentTab: string): ReactElement => {
		const content: Record<string, JSX.Element> = {
			Results: <ResultsContent project={project} />,
			Evaluation: <EvaluationContent project={project} />
		}
		return content[currentTab]
	}

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
				{getTabContent(tabs[activeTabIndex])}
			</div>
		</>
	)
}
