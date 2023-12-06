'use client'

import { ReactNode, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { useFormik } from 'formik'

type DonateProps = {
	amount: number
}

export default function DonationForm(): ReactNode {
	const [values, setValues] = useState<DonateProps>({
		amount: 0
	})

	const handleChange = useDebouncedCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const { name, value }: { name: string; value: string } = e.target
			setValues({
				...values,
				[name]: parseInt(value)
			})
		},
		400
	)

	const formik = useFormik({
		initialValues: values,
		onSubmit: () => {
			console.log(values)
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
					MATIC
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
