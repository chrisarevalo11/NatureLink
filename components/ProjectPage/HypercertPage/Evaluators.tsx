import { Fragment } from 'react'
import EvaluatorCard from './EvaluatorCard'

type Props = {
	evaluators?: string[]
}

export default function Evaluators(props: Props): JSX.Element {
	const { evaluators } = props

	return (
		<Fragment>
			<h1 className='text-3xl font-bold text-center m-2'>Evaluators</h1>
			<div className='w-full md:w-[90%] mx-auto grid grid-cols-3 gap-2 '>
				{evaluators &&
					evaluators.map((evaluator: string, index: number) => (
						<EvaluatorCard key={index} evaluator={evaluator} />
					))}
			</div>
		</Fragment>
	)
}
