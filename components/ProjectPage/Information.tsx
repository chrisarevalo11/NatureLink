import ProjectBanner from './ProjectBanner'
import ProjectHeader from './ProjectHeader'
import ProjectBody from './ProjectBody'
import ProjectTags from './ProjectTags'
import { Project } from '@/models/contract-functions-args.model'
import { handleDate } from '../ExplorePage/ProjectCard'

type Props = {
	project: Project
}

export default function Information({ project }: Props): JSX.Element {
	const { info, projectTimeStart, projectTimeEnd } = project?.proposal
	const infoArray: string[] = info.split(',')
	const [
		projectName,
		bannerImage,
		logo,
		description,
		link,
		scopeTags,
		contributors
	] = infoArray

	return (
		<div className='flex flex-col gap-3 py-4 px-2 md:px-5 rounded-tl-xl rounded-tr-xl lg:rounded-tr-none lg:rounded-bl-xl bg-gray-900'>
			<h1 className='text-3xl font-bold p-2 text-center'>{projectName}</h1>
			<ProjectBanner bannerImage={bannerImage} />
			<ProjectHeader link={link} logo={logo} contributors={contributors} />

			<ProjectBody
				description={description}
				startDate={handleDate(projectTimeStart)}
				endDate={handleDate(projectTimeEnd)}
			/>
			<ProjectTags scopeTags={scopeTags} />
		</div>
	)
}
