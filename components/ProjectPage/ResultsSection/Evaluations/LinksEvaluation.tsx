import React, { ReactElement } from 'react'
import PieGraph from './PieGraph'

type Props = {
	linksEvaluations: boolean[]
}

export default function LinksEvaluation(props: Props): JSX.Element {
	const { linksEvaluations } = props

	const yes: number = linksEvaluations.filter(
		imagesEvaluation => imagesEvaluation === true
	).length

	const no: number = linksEvaluations.filter(
		imagesEvaluation => imagesEvaluation === false
	).length

	return (
		<div>
			<h1 className='text-3xl py-3 font-bold text-center'>Links</h1>
			<p className='my-2 text-center px-4'>
				Were the links related to the project development and added value to the
				results?
			</p>
			<PieGraph yes={yes} no={no} />
		</div>
	)
}
