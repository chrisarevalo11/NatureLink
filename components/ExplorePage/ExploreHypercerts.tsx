'use client'

import Hypercert from '../CreateProjectPage/Hypercert'
import Link from 'next/link'
import { Project } from '@/models/contract-functions-args.model'
import { FormValuesTypes } from '@/app/create/page'
import { handleDate } from './ProjectCard'

type Props = {
	projects: Project[]
}

export default function ExploreHypercerts(props: Props): JSX.Element {
	const { projects } = props

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-4 py-6 lg:px-6 w-full '>
			{projects.map((project: Project, index: number) => {
				const info: string = project.proposal.info
				const infoSplited: string[] = info.split(',')
				const projectName: string = infoSplited[0]
				const bannerImage: string = infoSplited[1]
				const logo: string = infoSplited[2]
				const description: string = infoSplited[3]
				const link: string = infoSplited[4]
				const scopeTags: string = infoSplited[5]
				const contributors: string = infoSplited[6]

				const startDate: string = handleDate(project.proposal.projectTimeStart)
				const endDate: string = handleDate(project.proposal.projectTimeEnd)

				const amount: number = project.proposal.amount

				const formValues: FormValuesTypes = {
					projectName: projectName,
					bannerImage: bannerImage,
					logo: logo,
					startDate: startDate,
					endDate: endDate,
					scopeTags: scopeTags,
					description: description,
					link: link,
					contributors: contributors,
					amount: amount
				}
				return (
					<Link key={index} href={`/explore/hypercerts/${project.id}`}>
						<Hypercert formValues={formValues} />
					</Link>
				)
			})}
		</div>
	)
}
