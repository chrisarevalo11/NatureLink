import { Navigation, Pagination, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ReactElement } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

export default function ImagesCarousel(): ReactElement {
	const images: string[] = [
		'/images/plant.jpg',
		'/images/plant.jpg',
		'/images/plant.jpg'
	]

	return (
		<Swiper
			modules={[Navigation, Pagination, A11y]}
			spaceBetween={50}
			slidesPerView={'auto'}
			navigation
			className='w-full h-fit'
		>
			{images.map((image: string, index: number) => (
				<SwiperSlide key={index}>
					<div
						style={{
							backgroundImage: `url(${image})`,
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
