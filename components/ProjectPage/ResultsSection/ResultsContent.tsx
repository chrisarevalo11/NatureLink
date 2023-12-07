import { Fragment, ReactElement } from 'react'
import ImagesCarousel from './ImagesCarousel'
import MapSection from './MapSection'

export default function ResultsContent(): ReactElement {
	const results = true
	return (
		<Fragment>
			{!results ? (
				<p className='text-gray-400 my-3'>There are no results yet</p>
			) : (
				<section className='w-full flex flex-col justify-center items-center gap-3 p-2'>
					<div className='grid md:grid-cols-2 gap-5 justify-items-center w-full'>
						<ImagesCarousel />
						<MapSection />
					</div>
					<div></div>
				</section>
			)}
		</Fragment>
	)
}
