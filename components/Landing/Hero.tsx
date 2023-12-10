import Image from 'next/image'

export default function Hero(): JSX.Element {
	return (
		<section className='w-full grid grid-cols-2 min-h-[90vh]'>
			<h1 className='text-5xl font-bold'>
				NatureLink is the <span className='text-primary'>social media</span>{' '}
				that helps <span className='text-primary'>reducing Greenwashing</span>
			</h1>
			<div>
				<Image
					src={'/images/hero.png'}
					alt='hero'
					width={500}
					height={500}
					className='w-[90%]'
				/>
			</div>
		</section>
	)
}
