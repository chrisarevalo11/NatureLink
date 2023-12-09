'use client'

import { ReactNode, use, useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { useFormik } from 'formik'
import { useAppSelector } from '@/store'
import { Project } from '@/models/contract-functions-args.model'
import { crowdfundingContractWriteFunctions } from '@/constants/contract-functions'
import { useAddress } from '@thirdweb-dev/react'

type DonateProps = {
	amount: number
}

type Props = {
	project: Project | null
}

export default function DonationForm(props: Props): JSX.Element {
	const { project } = props
	const [isOwner, setIsOwner] = useState<boolean>(false)
	const [isExecuting, setIsExecuting] = useState<boolean>(false)
	const [values, setValues] = useState<DonateProps>({
		amount: 0
	})

	const address = useAddress()

	const { stake, execute } = crowdfundingContractWriteFunctions(
		project?.proposal.crowdfundingAddress || ''
	)

	useEffect(() => {
		if (project?.proposal.creatorAddress === address) {
			setIsOwner(true)
		}

		const nowDate: Date = new Date()
		const deadline: number | undefined = project?.stake.deadline

		if (!deadline) {
			return
		}

		if (project?.stake.getMissingAmount === 0 && nowDate.getTime() > deadline) {
			setIsExecuting(true)
		}
	}, [address])

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

	const onExecute = async () => {
		if (!execute) {
			alert('Execute function not found')
			return
		}

		if (address !== project?.proposal.creatorAddress) {
			alert('You are not the creator of this project')
			return
		}

		const nowDate: Date = new Date()
		const deadline: number | undefined = project?.stake.deadline

		if (!deadline) {
			alert('Deadline not found')
			return
		}

		if (nowDate.getTime() > deadline) {
			alert('Deadline is not reached')
			return
		}

		if (project?.stake.getMissingAmount === 0) {
			alert('Fundraising not finished')
			return
		}

		const executeTx = execute({
			overrides: { gasLimit: 6000000 }
		})

		const { receipt } = await executeTx
		console.log('hash transaction', receipt.transactionHash)

		alert('Funds executed!')
	}

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
			{isExecuting && (
				<button
					className='btn btn-primary btn-wide'
					disabled={!isOwner}
					onClick={onExecute}
				>
					Execute funds
				</button>
			)}
		</form>
	)
}
