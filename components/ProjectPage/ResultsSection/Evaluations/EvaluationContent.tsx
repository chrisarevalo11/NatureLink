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

	const judges: boolean[][] = project.evaluation.judges
	let imagesEvaluations: boolean[] = []
	let footprintEvaluations: boolean[] = []
	let linksEvaluations: boolean[] = []
	let filesEvaluations: boolean[] = []

	judges.forEach(judge => {
		imagesEvaluations.push(judge[0])
		footprintEvaluations.push(judge[1])
		linksEvaluations.push(judge[2])
		filesEvaluations.push(judge[3])
	})

	return (
		<>
			{judges.length === 0 ? (
				<p className='text-gray-400 my-3'>
					There are no evaluation results yet
				</p>
			) : (
				<div className='w-[95vw] md:w-full grid md:grid-cols-2 gap-1 md:gap-5'>
					<ImagesEvaluation imagesEvaluations={imagesEvaluations} />
					<CoordinatesEvaluation footprintEvaluations={footprintEvaluations} />
					<LinksEvaluation linksEvaluations={linksEvaluations} />
					<FilesEvaluation filesEvaluations={filesEvaluations} />
				</div>
			)}
		</>
	)
}
