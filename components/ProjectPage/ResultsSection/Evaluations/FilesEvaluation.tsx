import React, { ReactElement } from 'react'
import PieGraph from './PieGraph'

type Props = {
	filesEvaluations: boolean[]
}

export default function ImagesEvaluation(props: Props): JSX.Element {
	const { filesEvaluations } = props

	const yes: number = filesEvaluations.filter(
		imagesEvaluation => imagesEvaluation === true
	).length

	const no: number = filesEvaluations.filter(
		imagesEvaluation => imagesEvaluation === false
	).length

	return (
		<div>
			<h1 className='text-3xl py-3 font-bold text-center'>Images</h1>
			<p className='my-2 text-center px-4'>
				Were the files related to the project development and added value to the
				results?
			</p>
			<PieGraph yes={yes} no={no} />
		</div>
	)
}
