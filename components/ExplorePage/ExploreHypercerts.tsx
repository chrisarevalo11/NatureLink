'use client'

import { ReactNode, useState } from 'react'
import Hypercert from '../CreateProjectPage/Hypercert'
import Link from 'next/link'
import { Project } from '@/models/contract-functions-args.model'

type Props = {
	projects: Project[]
}

export default function ExploreHypercerts(props: Props): JSX.Element {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-4 py-6 lg:px-6 w-full '>
			{props.projects.map((project: Project, index: number) => (
				<Link key={index} href={`/explore/hypercerts/${project.id}`}>
					<Hypercert project={project} />
				</Link>
			))}
		</div>
	)
}
