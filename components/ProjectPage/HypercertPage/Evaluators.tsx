import { Fragment, ReactNode } from 'react'
import EvaluatorCard from './EvaluatorCard'

export default function Evaluators(): ReactNode {
	return (
		<Fragment>
			<h1 className='text-3xl font-bold text-center m-2'>Evaluators</h1>
			<div className='w-full md:w-[90%] mx-auto grid grid-cols-3 gap-2 '>
				<EvaluatorCard />
				<EvaluatorCard />
				<EvaluatorCard />
			</div>
		</Fragment>
	)
}
