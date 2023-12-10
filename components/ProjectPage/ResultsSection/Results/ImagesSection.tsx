import { ReactElement } from 'react'
import ImagesCarousel from './ImagesCarousel'
import { Evidence } from '@/models/evidence.model'

type Props = {
	imagesUrl: string[]
}

export default function ImagesSection(props: Props): JSX.Element {
	const { imagesUrl } = props

	return (
		<div className='w-[95vw] md:w-full'>
			<h1 className='text-3xl font-bold text-center py-2'>Images</h1>
			<ImagesCarousel imagesUrl={imagesUrl} />
		</div>
	)
}
