import { BigNumber } from 'ethers'
import { useFormik } from 'formik'
import { ChangeEvent, Dispatch } from 'react'
import { natureLinkContractWriteFunctions } from '@/constants/contract-functions'
import { toDecimal } from '@/functions/utils'
import FormField from './FormField'
import FormTextarea from './FormTextarea'
import { FormValuesTypes } from '@/app/create/page'
import { useRouter } from 'next/navigation'

type Props = {
	formValues: FormValuesTypes
	setFormValues: Dispatch<React.SetStateAction<FormValuesTypes>>
}

export default function ProjectForm(props: Props): JSX.Element {
	const { formValues, setFormValues } = props

	const { createProject } = natureLinkContractWriteFunctions()

	const router = useRouter()

	const handleChange = (
		event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
	) => {
		const { name, value }: { name: string; value: string } = event.target

		setFormValues({
			...formValues,
			[name]: value
		})
	}

	const formik = useFormik({
		initialValues: formValues,
		onSubmit: async () => {
			const args: any[] = createProjectArgsDtoToCreateProjectArgs(formValues)

			if (!createProject) return <div>ERROR!</div>

			const createProjectTx = createProject({
				args,
				overrides: { gasLimit: 6000000 }
			})

			const { receipt } = await createProjectTx

			alert('Project created!')
			router.push('/explore')
		}
	})

	return (
		<div className='card w-[95%] md:w-[90%] lg:w-1/2 bg-gray-900 shadow-xl m-2'>
			<form onSubmit={formik.handleSubmit} className='space-y-4'>
				<div className='card-body'>
					<FormField
						label='Project Name'
						inputName='projectName'
						inputType='text'
						placeholder='My project'
						isRequired={true}
						handleChange={handleChange}
					/>
					<FormField
						label='Background Image'
						inputName='bannerImage'
						inputType='url'
						placeholder='https://myproject.org/banner.png'
						isRequired={false}
						handleChange={handleChange}
					/>
					<FormField
						label='logo Image'
						inputName='logo'
						inputType='url'
						placeholder='https://myproject.org/logo.png'
						isRequired={false}
						handleChange={handleChange}
					/>
					<FormTextarea
						label='Description'
						inputName='description'
						placeholder='Use this field to describe your project as detailed as you need'
						handleChange={handleChange}
					/>
					<FormField
						label='Link'
						inputName='link'
						inputType='url'
						placeholder='https://myproject.org/'
						isRequired={false}
						handleChange={handleChange}
					/>

					<FormField
						className='join'
						label='Amount needed'
						inputName='amount'
						inputType='number'
						placeholder='Amount of money needed'
						isRequired={true}
						handleChange={handleChange}
					/>
					<div className='flex flex-col md:flex-row md:justify-center w-full md:my-6 gap-2'>
						<FormField
							label='Start date'
							inputName='startDate'
							inputType='date'
							placeholder=''
							isRequired={true}
							handleChange={handleChange}
						/>
						<FormField
							label='End date'
							inputName='endDate'
							inputType='date'
							placeholder=''
							isRequired={true}
							handleChange={handleChange}
						/>
					</div>
					<FormTextarea
						label='Scope Tags'
						inputName='scopeTags'
						placeholder='Scope tags separated by commas, e.g.: ReFi,Web3'
						handleChange={handleChange}
					/>
					<FormTextarea
						label='Contributors'
						inputName='contributors'
						placeholder='Addresses, names or pseudonyms of the contributors separated by commas, e.g.: 0xAddress1,John Doe,Rookiecol'
						handleChange={handleChange}
					/>
				</div>

				<div className='card-actions justify-center'>
					<button
						type='submit'
						className='btn btn-primary btn-wide border-none mb-5'
					>
						Create
					</button>
				</div>
			</form>
		</div>
	)
}

function createProjectArgsDtoToCreateProjectArgs(
	formValues: FormValuesTypes
): any[] {
	const {
		projectName,
		bannerImage,
		logo,
		description,
		link,
		amount,
		startDate,
		endDate,
		scopeTags,
		contributors
	} = formValues

	let amountBN: BigNumber = toDecimal(amount)
	let projectStartTime: number = new Date(startDate).getTime() / 1000
	let projectEndTime: number = new Date(endDate).getTime() / 1000
	let projectTime: number[] = [projectStartTime, projectEndTime]
	// TODO: Change this to the real evaluation time
	let evaluationTime: number = new Date('2024-01-01').getTime() / 1000
	let info: string = `${projectName},${bannerImage},${logo},${description},${link},${scopeTags},${contributors}`

	let args: any[] = [
		amountBN, // _amount
		projectStartTime, // _planning
		projectTime, // _projectTime
		evaluationTime, // _evaluationTime
		info // _info
	]

	return args
}
