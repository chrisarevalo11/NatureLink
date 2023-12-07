import { Fragment, ReactElement } from 'react'
import ImagesCarousel from './ImagesCarousel'
import MapSection from './MapSection'
import UsefulLinks from './UsefulLinks'
import UsefulFiles from './UsefulFiles'

export default function ResultsContent(): ReactElement {
	const results = true
	return (
		<Fragment>
			{!results ? (
				<p className='text-gray-400 my-3'>There are no results yet</p>
			) : (
				<section className='grid md:grid-cols-2 gap-1 md:gap-5 justify-items-center'>
					<ImagesCarousel />
					<MapSection />
					<UsefulLinks />
					<UsefulFiles />
				</section>
			)}
		</Fragment>
	)
}
