import { Dispatch, ReactNode, SetStateAction } from 'react'

type FormFieldProps = {
	className?: string
	label: string
	inputType: string
	placeholder: string
	inputName: string
	isRequired: boolean
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function FormField({
	className,
	label,
	inputType,
	placeholder,
	inputName,
	isRequired,
	handleChange
}: FormFieldProps): ReactNode {
	return (
		<>
			<label className='label'>
				<span className='label-text  whitespace-nowrap'>
					{isRequired && <span className='text-red-500'>* </span>}
					{label}
				</span>
			</label>
			{className ? (
				<div className={className}>
					<input
						type={inputType}
						placeholder={placeholder}
						name={inputName}
						onChange={handleChange}
						required={isRequired}
						step={'any'}
						className={`input input-bordered w-full join-item bg-gray-700 `}
					/>
					<span className='join-item rounded-r-full px-5 bg-gray-800 flex items-center'>
						MATIC
					</span>
				</div>
			) : (
				<input
					type={inputType}
					placeholder={placeholder}
					name={inputName}
					onChange={handleChange}
					required={isRequired}
					step={'any'}
					className={`input input-bordered w-full bg-gray-700 `}
				/>
			)}
		</>
	)
}
