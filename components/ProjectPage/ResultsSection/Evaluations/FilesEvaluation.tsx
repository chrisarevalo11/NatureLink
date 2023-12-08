import React, { ReactElement } from 'react'
import PieGraph from './PieGraph'

export default function ImagesEvaluation(): ReactElement {
	return (
		<div>
			<h1 className='text-3xl py-3 font-bold text-center'>Images</h1>
			<p className='my-2 text-center px-4'>
				Were the files related to the project development and added value to the
				results?
			</p>
			<PieGraph yes={2} no={1} />
		</div>
	)
}
