import { ReactElement } from 'react'
import ImagesCarousel from './ImagesCarousel'

export default function ImagesSection(): ReactElement {
	return (
		<div className='w-[95vw] md:w-full'>
			<h1 className='text-3xl font-bold text-center py-2'>Images</h1>
			<ImagesCarousel />
		</div>
	)
}
