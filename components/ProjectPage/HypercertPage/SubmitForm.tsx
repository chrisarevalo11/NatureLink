import { ReactElement, useState } from 'react'
import FormImageField from './FormImageField'
import { useFormik } from 'formik'
import FormField from '@/components/CreateProjectPage/FormField'
import FormFilesField from './FormFilesField'
import FormTextarea from '@/components/CreateProjectPage/FormTextarea'

export type submitResultsType = {
	images: File[]
	latitude: number
	longitude: number
	files: File[]
	links: string
}
export default function SubmitForm(): ReactElement {
	const [formValues, setFormValues] = useState<submitResultsType>({
		images: [],
		latitude: 4.652939629022646,
		longitude: -74.11940985988831,
		files: [],
		links: ''
	})

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setFormValues(prev => ({ ...prev, [name]: value }))
	}

	const formik = useFormik({
		initialValues: formValues,
		onSubmit: () => {
			console.log(formValues)
		}
	})

	return (
		<form onSubmit={formik.handleSubmit}>
			<h1 className='text-xl mt-5 font-bold text-primary'>Images</h1>
			<p className='my-2'>
				Select up to 3 images that depict that the project took place and was
				successfully implemented:
			</p>
			<FormImageField handleChange={setFormValues} />
			<div className='divider'></div>
			<h1 className='text-xl mt-5 font-bold text-primary'>Coordinates</h1>
			<p className='my-2'>
				{' '}
				Specify the coordinates (latitude and longitude) where the project took
				place. You can copy them from Google Maps:
			</p>
			<div className='grid gap-2 p-2'>
				<FormField
					label='Latitude'
					inputType='number'
					inputName='latitude'
					placeholder='-4.652939629022646'
					isRequired={true}
					handleChange={handleChange}
				/>
				<FormField
					label='Longitude'
					inputType='number'
					inputName='longitude'
					placeholder='-74.11940985988831'
					isRequired={true}
					handleChange={handleChange}
				/>
			</div>
			<div className='divider'></div>

			<h1 className='text-xl mt-5 font-bold text-primary'>Useful files</h1>
			<p className='my-2'>
				{' '}
				Add up to 3 files that might be useful or will add value to the project
				results:
			</p>
			<FormFilesField handleChange={setFormValues} />
			<div className='divider'></div>

			<h1 className='text-xl mt-5 font-bold text-primary'>Useful links</h1>
			<p className='my-2'>
				{' '}
				Finally, add somke links (separated by commas) you might find useful and
				will add value to the submission:
			</p>
			<FormTextarea
				label='Links'
				inputName='links'
				placeholder='https://www.mypage.com, https://www.google.com'
				handleChange={handleChange}
			/>
			<div className='flex w-full justify-center'>
				<button className='btn btn-primary mt-3' type='submit'>
					Submit results
				</button>
			</div>
		</form>
	)
}
