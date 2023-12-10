import { Navigation, Pagination, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ReactElement } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

type Props = {
	imagesUrl: string[]
}

export default function ImagesCarousel(props: Props): JSX.Element {
	const { imagesUrl } = props

	return (
		<Swiper
			modules={[Navigation, Pagination, A11y]}
			spaceBetween={50}
			slidesPerView={'auto'}
			navigation
			className='w-full h-fit'
		>
			{imagesUrl?.map((imageUrl: string, index: number) => (
				<SwiperSlide key={index}>
					<div
						style={{
							backgroundImage: `url(${imageUrl})`,
							backgroundSize: 'cover',
							backgroundPosition: 'center'
						}}
						className='h-[300px] w-full rounded-xl'
					></div>
				</SwiperSlide>
			))}
		</Swiper>
	)
}
