import { formValuesTypes } from '@/app/create/page'
import { ReactNode } from 'react'
import ProjectBanner from './ProjectBanner'
import ProjectHeader from './ProjectHeader'
import ProjectBody from './ProjectBody'
import ProjectTags from './ProjectTags'

type InformationProps = {
	project: formValuesTypes
}

export default function Information({ project }: InformationProps): ReactNode {
	const {
		projectName,
		bannerImage,
		logo,
		link,
		description,
		startDate,
		endDate,
		scopeTags,
		contributors
	} = project

	return (
		<div className='flex flex-col gap-3 py-4 px-2 md:px-5 rounded-tl-xl rounded-tr-xl lg:rounded-tr-none lg:rounded-bl-xl bg-gray-900'>
			<h1 className='text-3xl font-bold p-2 text-center'>{projectName}</h1>
			<ProjectBanner bannerImage={bannerImage} />
			<ProjectHeader link={link} logo={logo} contributors={contributors} />

			<ProjectBody
				description={description}
				startDate={startDate}
				endDate={endDate}
			/>
			<ProjectTags scopeTags={scopeTags} />
		</div>
	)
}
