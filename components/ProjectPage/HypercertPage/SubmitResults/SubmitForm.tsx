import { useState } from 'react'
import FormImageField from './FormImageField'
import { useFormik } from 'formik'
import FormField from '@/components/CreateProjectPage/FormField'
import FormFilesField from './FormFilesField'
import FormTextarea from '@/components/CreateProjectPage/FormTextarea'
import { Evidence } from '@/models/evidence.model'
import { storageFile } from '@/functions/storeData'
import { evaluationContractWriteFunctions } from '@/constants/contract-functions'
import { Project } from '@/models/contract-functions-args.model'

export type submitResultsType = {
	images: File[]
	latitude: string
	longitude: string
	files: File[]
	links: string[]
}

type Props = {
	closeModal: () => void
	project: Project
}

export default function SubmitForm(props: Props): JSX.Element {
	const { closeModal, project } = props

	const initialValues: submitResultsType = {
		images: [],
		latitude: '',
		longitude: '',
		files: [],
		links: []
	}

	const [formValues, setFormValues] = useState<submitResultsType>(initialValues)

	const { setEvidence } = evaluationContractWriteFunctions(
		project.proposal.evaluationAddress
	)

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.target
		setFormValues(prev => ({ ...prev, [name]: value }))
	}

	const formik = useFormik({
		initialValues: formValues,
		onSubmit: async () => {
			const imagesUrl: string[] = await Promise.all(
				formValues.images.map(async (image: File) => {
					return await storageFile(image)
				})
			)

			const filesUrl: string[] = await Promise.all(
				formValues.files.map(async (file: File) => {
					return await storageFile(file)
				})
			)

			const footprint: string = `${formValues.latitude},${formValues.longitude}`
			const links: string[] = formValues.links

			const evidence: Evidence = {
				imagesUrl,
				footprint,
				filesUrl,
				links
			}

			const evidenceStrinfied: string = JSON.stringify(evidence)

			if (!setEvidence) {
				return
			}

			const setEvidenceTx = setEvidence({
				args: [evidenceStrinfied],
				overrides: { gasLimit: 6000000 }
			})

			const { receipt } = await setEvidenceTx
			console.log('hash transaction', receipt.transactionHash)

			alert('Evidence sent successfully')
			closeModal()
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
