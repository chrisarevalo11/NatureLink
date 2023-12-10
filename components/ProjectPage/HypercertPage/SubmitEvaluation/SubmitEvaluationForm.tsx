import { useEffect, useState } from 'react'
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
import { Results } from '@/models/result.model'

export type submitResultsType = {
	images: number
	coordinates: number
	files: number
	links: number
	[key: string]: number
}

type Props = {
	closeModal: () => void
	project: Project
}

export default function SubmitForm(props: Props): JSX.Element {
	const { closeModal, project } = props

	const initialValues: submitResultsType = {
		images: 2,
		coordinates: 2,
		files: 2,
		links: 2
	}

	const initialResults: Evidence = {
		imagesUrl: [],
		filesUrl: [],
		footprint: '',
		links: []
	}

	const [evidence, setEvicence] = useState<Evidence>(initialResults)
	const [formValues, setFormValues] = useState<submitResultsType>(initialValues)

	const [latitude, setLatitude] = useState<number>(0)
	const [longitude, setLongitude] = useState<number>(0)
	const evidenceString: string = project.evaluation.evidence

	const { evaluateEvidence } = evaluationContractWriteFunctions(
		project.proposal.evaluationAddress
	)

	useEffect(() => {
		if (evidenceString !== '') {
			const evidence: Evidence = JSON.parse(evidenceString)
			console.log(' 💥 evidence 💥', evidence)

			const footprint: string = evidence.footprint
			const latitude: number = parseFloat(footprint.split(',')[0])
			const longitude: number = parseFloat(footprint.split(',')[1])

			setLatitude(latitude)
			setLongitude(longitude)
			setEvicence(evidence)
		}
	}, [])

	const formik = useFormik({
		initialValues: formValues,
		onSubmit: async () => {
			console.log(formValues)
			const { images, coordinates, files, links } = formValues

			const results: Results = {
				images: images === 1 ? true : false,
				footprint: coordinates === 1 ? true : false,
				links: links === 1 ? true : false,
				files: files === 1 ? true : false
			}

			if (!evaluateEvidence) {
				return
			}

			const setEvidenceTx = evaluateEvidence({
				args: [results.images, results.footprint, results.files, results.links],
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
				Are the following images related to the project development and add
				value to the results?
			</p>
			<ImagesCarousel imagesUrl={evidence.imagesUrl} />
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
			<Map latitude={latitude} longitude={longitude} />
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
			<UsefulLinks links={evidence.links} />
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
			<UsefulFiles filesUrl={evidence.filesUrl} />
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
