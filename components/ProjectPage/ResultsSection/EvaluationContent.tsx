import { Fragment, ReactElement } from 'react'

export default function EvaluationContent(): ReactElement {
	const evaluationResults = true

	return (
		<Fragment>
			{!evaluationResults ? (
				<p className='text-gray-400 my-3'>
					There are no evaluation results yet
				</p>
			) : (
				<h1>Evaluation</h1>
			)}
		</Fragment>
	)
}
