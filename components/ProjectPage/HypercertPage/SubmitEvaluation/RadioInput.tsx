import { Dispatch, ReactElement, SetStateAction } from 'react'
import { submitResultsType } from './SubmitEvaluationForm'

type Props = {
	name: string
	formValues: submitResultsType
	setFormValues: Dispatch<SetStateAction<submitResultsType>>
}

export default function RadioInput(props: Props): ReactElement {
	const { name, formValues, setFormValues } = props

	const yesChecked: boolean = formValues[name] === 1
	const noChecked: boolean = formValues[name] === 0

	return (
		<div className='mt-3'>
			<label className='label cursor-pointer'>
				<span className='label-text'>Yes</span>
				<input
					type='radio'
					name={name}
					onChange={() => {
						setFormValues((prev: submitResultsType) => ({
							...prev,
							[name]: 1
						}))
					}}
					className='radio radio-primary'
					checked={yesChecked}
				/>
			</label>

			<label className='label cursor-pointer'>
				<span className='label-text'>No</span>
				<input
					type='radio'
					name={name}
					onChange={() => {
						setFormValues((prev: submitResultsType) => ({
							...prev,
							[name]: 0
						}))
					}}
					className='radio radio-primary'
					checked={noChecked}
				/>
			</label>
		</div>
	)
}
