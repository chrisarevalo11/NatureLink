import React, { ReactElement } from 'react'
import PieGraph from './PieGraph'

export default function CoordinatesEvaluation(): ReactElement {
	return (
		<div>
			<h1 className='text-3xl py-3 font-bold text-center'>Coordinates</h1>
			<p className='my-2 text-center px-4'>
				Did the coordinates match with the location that was previously
				established by the owners?
			</p>
			<PieGraph yes={3} no={0} />
		</div>
	)
}
