import { Fragment, ReactElement } from 'react'
import ImagesEvaluation from './ImagesEvaluation'
import CoordinatesEvaluation from './CoordinatesEvaluation'
import LinksEvaluation from './LinksEvaluation'
import FilesEvaluation from './FilesEvaluation'

export default function EvaluationContent(): ReactElement {
	const evaluationResults = true

	return (
		<Fragment>
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
		</Fragment>
	)
}
