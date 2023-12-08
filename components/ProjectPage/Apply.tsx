import { evaluationContractWriteFunctions } from '@/constants/contract-functions'
import { Project } from '@/models/contract-functions-args.model'
import { ReactNode } from 'react'

type Props = {
	project: Project | null
}

export default function Apply(props: Props): JSX.Element {
	const { project } = props

	const { proposeEvaluator } = evaluationContractWriteFunctions(
		project?.proposal.evaluationAddress || ''
	)

	const onProposeEvaluator = async () => {
		if (!proposeEvaluator) {
			alert('Stake function not found')
			return
		}

		const proposeEvaluatorTx = proposeEvaluator({
			overrides: { gasLimit: 6000000 }
		})

		const { receipt } = await proposeEvaluatorTx
		console.log('hash transaction', receipt.transactionHash)

		alert('Pproposed evaluator')
	}

	return (
		<div className='flex flex-col gap-3 justify-center'>
			<h1 className='text-3xl font-bold text-center'>Apply as evaluator</h1>
			<p className='text-sm py-2'>
				You can apply as an evaluator for this project. In case you are selected
				(notification via email) you will be able to audit the project. Once the
				evaluation is committed, you will receive a compensation and an NFT that
				certifies your evaluation.
			</p>
			<button
				className='btn btn-primary btn-wide self-center'
				onClick={onProposeEvaluator}
			>
				{' '}
				Apply
			</button>
		</div>
	)
}
