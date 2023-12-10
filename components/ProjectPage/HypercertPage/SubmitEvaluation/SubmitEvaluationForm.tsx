import { useState } from 'react'
import { useFormik } from 'formik'
import ImagesCarousel from '../../ResultsSection/Results/ImagesCarousel'
import RadioInput from './RadioInput'
import Map from '../../ResultsSection/Results/Map'
import UsefulLinks from '../../ResultsSection/Results/UsefulLinks'
import UsefulFiles from '../../ResultsSection/Results/UsefulFiles'
import { evaluationContractWriteFunctions } from '@/constants/contract-functions'
import { Project } from '@/models/contract-functions-args.model'
import { storageFile } from '@/functions/storeData'
import { Evidence } from '@/models/evidence.model'

export type submitResultsType = {
	images: File[]
	latitude: string
	longitude: string
	files: File[]
	links: string[]
}

type Props = {
	project: Project
}

export default function SubmitForm(props: Props): JSX.Element {
	const { project } = props

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
