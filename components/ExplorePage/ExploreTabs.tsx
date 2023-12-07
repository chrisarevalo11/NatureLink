'use client'

import { ReactElement, ReactNode, useEffect, useState } from 'react'
import ExploreProjects from './ExploreProjects'
import ExploreHypercerts from './ExploreHypercerts'
import { useAppSelector } from '@/store'
import { useDispatch } from 'react-redux'
import { getAllProjectsReturnDtoToGetAllProjectsReturn } from '@/functions/dtos/dtos'
import { useContract, useContractRead } from '@thirdweb-dev/react'
import { setProjects } from '@/store/slides/projectsSlide'
import natureLinkJson from '@/deployments/mumbai/NatureLink.json'
import { Project } from '@/models/contract-functions-args.model'

const tabs: string[] = ['Projects', 'Hypercerts']
const tabContent: Record<string, ReactElement> = {
	Projects: <ExploreProjects />,
	Hypercerts: <ExploreHypercerts />
}

export default function ExploreTabs(): JSX.Element {
	const [activeTabIndex, setActiveTabIndex] = useState<number>(0)
	const [isSpinning, setIsSpinning] = useState<boolean>(false)
	const dispatch = useDispatch()
	const projects = useAppSelector(state => state.projects.projects)

	const { data: contract } = useContract(natureLinkJson.address)

	const {
		data: getAllProjects,
		isLoading,
		error
	} = useContractRead(contract, 'getAllProjects')

	const currentTab: string = tabs[activeTabIndex]

	const handleTabClick = (index: number) => {
		setActiveTabIndex(index)
	}

	useEffect(() => {
		if (projects.length === 0) {
			setIsSpinning(true)
			if (!isLoading) {
				const currentProjects: Project[] =
					getAllProjectsReturnDtoToGetAllProjectsReturn(getAllProjects)

				dispatch(setProjects(currentProjects))
				setIsSpinning(false)
			}
		}
	}, [isLoading])

	return (
		<>
			{isSpinning ? (
				<p>Cargando proyectos...</p>
			) : (
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
			)}
		</>
	)
}
