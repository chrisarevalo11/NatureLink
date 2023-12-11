import React, { ReactElement } from 'react'
import PieGraph from './PieGraph'

type Props = {
	footprintEvaluations: boolean[]
}

export default function CoordinatesEvaluation(props: Props): JSX.Element {
	const { footprintEvaluations } = props

	const yes: number = footprintEvaluations.filter(
		imagesEvaluation => imagesEvaluation === true
	).length

	const no: number = footprintEvaluations.filter(
		imagesEvaluation => imagesEvaluation === false
	).length

	return (
		<div>
			<h1 className='text-3xl py-3 font-bold text-center'>Coordinates</h1>
			<p className='my-2 text-center px-4'>
				Did the coordinates match with the location that was previously
				established by the owners?
			</p>
			<PieGraph yes={yes} no={no} />
		</div>
	)
}
