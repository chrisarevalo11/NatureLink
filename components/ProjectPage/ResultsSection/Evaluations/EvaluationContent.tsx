import ImagesEvaluation from './ImagesEvaluation'
import CoordinatesEvaluation from './CoordinatesEvaluation'
import LinksEvaluation from './LinksEvaluation'
import FilesEvaluation from './FilesEvaluation'
import { Project } from '@/models/contract-functions-args.model'

type Props = {
	project: Project
}

export default function EvaluationContent(props: Props): JSX.Element {
	const { project } = props

	const evaluationResults = true

	return (
		<>
			{!evaluationResults ? (
				<p className='text-gray-400 my-3'>
					There are no evaluation results yet
				</p>
			) : (
				<div className='w-[95vw] md:w-full grid md:grid-cols-2 gap-1 md:gap-5'>
					<ImagesEvaluation />
					<CoordinatesEvaluation />
					<LinksEvaluation />
					<FilesEvaluation />
				</div>
			)}
		</>
	)
}
