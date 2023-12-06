import { ChangeEvent, ReactNode } from 'react'

type FormTextareaProps = {
	label: string
	placeholder: string
	inputName: string
	handleChange: (
		e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
	) => void
}

export default function FormTextarea({
	label,
	placeholder,
	inputName,
	handleChange
}: FormTextareaProps): ReactNode {
	return (
		<>
			<label className='label gap-1'>
				<span className='label-text  whitespace-nowrap'>
					<span className='text-red-500'>* </span>
					{label}
				</span>
			</label>
			<textarea
				className='textarea textarea-bordered w-full bg-gray-700  resize-none no-scrollbar'
				placeholder={placeholder}
				name={inputName}
				onChange={handleChange}
				required
			/>
		</>
	)
}
