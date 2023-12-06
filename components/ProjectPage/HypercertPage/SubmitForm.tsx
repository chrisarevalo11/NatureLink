import { ReactElement, useState } from 'react'
import FormImageField from './FormImageField'
import { useFormik } from 'formik'
import FormField from '@/components/CreateProjectPage/FormField'

export type submitResultsType = {
	images: File[]
	latitude: number
	longitude: number
}
export default function SubmitForm(): ReactElement {
	const [formValues, setFormValues] = useState<submitResultsType>({
		images: [],
		latitude: 4.652939629022646,
		longitude: -74.11940985988831
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement> | File[]) => {
		if (Array.isArray(e)) {
			setFormValues(prev => ({ ...prev, images: e }))
			return
		}
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
		<form action=''>
			<h1 className='text-xl mt-5 font-bold text-primary'>Images</h1>
			<p>
				Select up to 3 images that depict that the project took place and was
				successfully implemented:
			</p>
			<FormImageField
				label=''
				inputName='images'
				formValues={formValues}
				handleChange={handleChange}
			/>
			<h1 className='text-xl mt-5 font-bold text-primary'>Coordinates</h1>
			<p>
				{' '}
				Specify the coordinates (latitude and longitude) where the project took
				place. You can copy them from Google Maps
			</p>
			<div className='grid md:grid-cols-2'>
				<div className='flex flex-col justify-center'>
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
			</div>
		</form>
	)
}
