import { ReactElement, useState } from 'react'
import { useFormik } from 'formik'
import ImagesCarousel from '../../ResultsSection/Results/ImagesCarousel'
import RadioInput from './RadioInput'
import Map from '../../ResultsSection/Results/Map'
import UsefulLinks from '../../ResultsSection/Results/UsefulLinks'
import UsefulFiles from '../../ResultsSection/Results/UsefulFiles'

export type submitResultsType = {
	images: number
	coordinates: number
	files: number
	links: number
	[key: string]: number
}
export default function SubmitForm(): ReactElement {
	const [formValues, setFormValues] = useState<submitResultsType>({
		images: 2,
		coordinates: 2,
		files: 2,
		links: 2
	})

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
				Are the following images related to the project development and add
				value to the results?
			</p>
			<ImagesCarousel />
			<RadioInput
				name={'images'}
				formValues={formValues}
				setFormValues={setFormValues}
			/>

			<div className='divider'></div>

			<h1 className='text-xl mt-5 font-bold text-primary'>Coordinates</h1>
			<p className='my-2'>
				Do the following coordinates match with the location that was previously
				established by the owners?
			</p>
			<Map latitude={4.652939629022646} longitude={-74.11940985988831} />
			<RadioInput
				name={'coordinates'}
				formValues={formValues}
				setFormValues={setFormValues}
			/>
			<div className='divider'></div>

			<h1 className='text-xl mt-5 font-bold text-primary'>Links</h1>
			<p className='my-2'>
				Are the following links related to the project development and add value
				to the results?
			</p>
			<UsefulLinks />
			<RadioInput
				name={'files'}
				formValues={formValues}
				setFormValues={setFormValues}
			/>
			<div className='divider'></div>

			<h1 className='text-xl mt-5 font-bold text-primary'>Files</h1>
			<p className='my-2'>
				Are the following files related to the project development and add value
				to the results?
			</p>
			<UsefulFiles />
			<RadioInput
				name={'links'}
				formValues={formValues}
				setFormValues={setFormValues}
			/>
			<div className='flex w-full justify-center'>
				<button className='btn btn-primary mt-3' type='submit'>
					Submit evaluation
				</button>
			</div>
		</form>
	)
}
