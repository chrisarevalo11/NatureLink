import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Fragment, ReactElement } from 'react'
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
		<div className='w-[95vw] md:w-full'>
			<h1 className='text-3xl font-bold text-center py-2'>Images</h1>
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
		</div>
	)
}
