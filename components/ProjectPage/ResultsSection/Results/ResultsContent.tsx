import { Fragment, ReactElement } from 'react'
import MapSection from './MapSection'
import ImagesSection from './ImagesSection'
import UsefulLinksSection from './UsefulLinksSection'
import UsefulFilesSection from './UsefulFilesSection'

export default function ResultsContent(): ReactElement {
	const results = true
	return (
		<Fragment>
			{!results ? (
				<p className='text-gray-400 my-3'>There are no results yet</p>
			) : (
				<section className='grid md:grid-cols-2 gap-1 md:gap-5 justify-items-center'>
					<ImagesSection />
					<MapSection />
					<UsefulLinksSection />
					<UsefulFilesSection />
				</section>
			)}
		</Fragment>
	)
}
