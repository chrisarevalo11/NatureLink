import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Fragment, ReactElement } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

export default function ImagesCarousel(): ReactElement {
	return (
		<div className='w-full'>
			<h1 className='text-2xl font-bold text-center text-primary my-2'>
				Images
			</h1>
			<Swiper
				modules={[Navigation, Pagination, A11y]}
				spaceBetween={50}
				slidesPerView={'auto'}
				navigation
				className='w-full h-fit'
			>
				<SwiperSlide>
					<div
						style={{
							backgroundImage: 'url(/images/plant.jpg)',
							backgroundSize: 'cover',
							backgroundPosition: 'center'
						}}
						className='h-[300px] w-full rounded-xl'
					></div>
				</SwiperSlide>
				<SwiperSlide>
					<div
						style={{
							backgroundImage: 'url(/images/plant.jpg)',
							backgroundSize: 'cover',
							backgroundPosition: 'center'
						}}
						className='h-[300px] w-full rounded-xl'
					></div>
				</SwiperSlide>
				<SwiperSlide>
					<div
						style={{
							backgroundImage: 'url(/images/plant.jpg)',
							backgroundSize: 'cover',
							backgroundPosition: 'center'
						}}
						className='h-[300px] w-full rounded-xl'
					></div>
				</SwiperSlide>
				<SwiperSlide>
					<div
						style={{
							backgroundImage: 'url(/images/plant.jpg)',
							backgroundSize: 'cover',
							backgroundPosition: 'center'
						}}
						className='h-[300px] w-full rounded-xl'
					></div>
				</SwiperSlide>
			</Swiper>
		</div>
	)
}
