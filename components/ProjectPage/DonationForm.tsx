'use client'

import { ReactNode, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { useFormik } from 'formik'
import { useAppSelector } from '@/store'
import { Project } from '@/models/contract-functions-args.model'
import { crowdfundingContractWriteFunctions } from '@/constants/contract-functions'

type DonateProps = {
	amount: number
}

type Props = {
	project: Project | null
}

export default function DonationForm(props: Props): JSX.Element {
	const { project } = props
	const [values, setValues] = useState<DonateProps>({
		amount: 0
	})

	const { stake } = crowdfundingContractWriteFunctions(
		project?.proposal.crowdfundingAddress || ''
	)

	const handleChange = useDebouncedCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const { name, value }: { name: string; value: string } = event.target
			setValues({
				...values,
				[name]: parseInt(value)
			})
		},
		400
	)

	const formik = useFormik({
		initialValues: values,
		onSubmit: async () => {
			console.log(values)
			console.log('project', project)

			const missingAmount: number | undefined = project?.stake.getMissingAmount

			if (!missingAmount) {
				alert('Threshold not found')
				return
			}

			if (values.amount > missingAmount) {
				alert('Amount must be less or equal than threshold')
				return
			}

			if (!project?.proposal.crowdfundingAddress) {
				alert('Crowdfunding address not found')
				return
			}

			if (!stake) {
				alert('Stake function not found')
				return
			}

			const stakeTx = stake({
				overrides: { gasLimit: 6000000, value: values.amount }
			})

			const { receipt } = await stakeTx
			console.log('hash transaction', receipt.transactionHash)

			alert('Project created!')
		}
	})

	return (
		<form
			onSubmit={formik.handleSubmit}
			className='w-full flex flex-col items-center gap-5'
		>
			<div className='flex w-full md:w-[90%]'>
				<input
					name='amount'
					type='number'
					onChange={handleChange}
					className='input w-full rounded-r-none bg-gray-700'
					placeholder='Amount'
				/>
				<span className='px-5 bg-gray-800 flex items-center rounded-r-full'>
					MATIC (wei)
				</span>
			</div>
			<button
				className='btn btn-primary btn-wide'
				disabled={values.amount === 0 || isNaN(values.amount)}
				type='submit'
			>
				{' '}
				Donate
			</button>
		</form>
	)
}
