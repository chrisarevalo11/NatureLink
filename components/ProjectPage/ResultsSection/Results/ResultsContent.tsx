import MapSection from './MapSection'
import ImagesSection from './ImagesSection'
import UsefulLinksSection from './UsefulLinksSection'
import UsefulFilesSection from './UsefulFilesSection'
import { Project } from '@/models/contract-functions-args.model'
import { useEffect, useState } from 'react'
import { Evidence } from '@/models/evidence.model'

type Props = {
	project: Project
}

export default function ResultsContent(props: Props): JSX.Element {
	const { project } = props

	const initialResults: Evidence = {
		imagesUrl: [],
		filesUrl: [],
		footprint: '',
		links: []
	}

	const [evidence, setEvicence] = useState<Evidence>(initialResults)
	const [areResults, setAreResults] = useState<boolean>(false)

	const evidenceString: string = project.evaluation.evidence

	useEffect(() => {
		if (evidenceString !== '') {
			const evidence: Evidence = JSON.parse(evidenceString)

			setEvicence(evidence)
			setAreResults(true)
		}
	}, [])

	return (
		<>
			{!areResults ? (
				<p className='text-gray-400 my-3'>There are no results yet</p>
			) : (
				<section className='grid md:grid-cols-2 gap-1 md:gap-5 justify-items-center'>
					<ImagesSection imagesUrl={evidence.imagesUrl} />
					<MapSection footprint={evidence.footprint} />
					<UsefulLinksSection links={evidence.links} />
					<UsefulFilesSection filesUrl={evidence.filesUrl} />
				</section>
			)}
		</>
	)
}
