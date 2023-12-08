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
				<div className='w-[95vw] md:w-full grid md:grid-cols-2'></div>
			)}
		</Fragment>
	)
}
