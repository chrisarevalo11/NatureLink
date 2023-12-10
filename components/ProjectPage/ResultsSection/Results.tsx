'use client'

import { Project } from '@/models/contract-functions-args.model'
import ResultsTabs from './ResultsTabs'

type Props = {
	project: Project
}

export default function Results(props: Props): JSX.Element {
	const { project } = props
	return (
		<section id='results' className='my-5 w-full'>
			<ResultsTabs project={project} />
		</section>
	)
}
