'use client'

import ProjectCard from './ProjectCard'
import { Project } from '@/models/contract-functions-args.model'
import Loader from '../Loader'

type Props = {
	projects: Project[]
	isSpinning: boolean
}

export default function ExploreProjects(props: Props): JSX.Element {
	const { projects, isSpinning } = props

	return (
		<>
			{isSpinning ? (
				<div className='w-full h-full flex justify-center items-center'>
					<Loader />
				</div>
			) : (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-6 lg:px-6 w-full'>
					{projects.map(
						(project: Project, index: number) =>
							project !== null && <ProjectCard key={index} project={project} />
					)}
				</div>
			)}
		</>
	)
}
