import React, { ReactElement } from 'react'
import PieGraph from './PieGraph'
import { normalize } from 'path'

type Props = {
	imagesEvaluations: boolean[]
}

export default function ImagesEvaluation(props: Props): JSX.Element {
	const { imagesEvaluations } = props

	const yes: number = imagesEvaluations.filter(
		imagesEvaluation => imagesEvaluation === true
	).length
	const no: number = imagesEvaluations.filter(
		imagesEvaluation => imagesEvaluation === false
	).length

	return (
		<div>
			<h1 className='text-3xl py-3 font-bold text-center'>Images</h1>
			<p className='my-2 text-center px-4'>
				Were the images related to the project development and added value to
				the results?
			</p>
			<PieGraph yes={yes} no={no} />
		</div>
	)
}
