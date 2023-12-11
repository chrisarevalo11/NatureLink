import Image from 'next/image'
import Link from 'next/link'

export default function Hero(): JSX.Element {
	return (
		<section className='w-full grid grid-cols-1 md:grid-cols-2 min-h-[80vh] items-center justify-items-center'>
			<div className='flex flex-col items-center gap-5'>
				<h1 className='text-4xl md:text-6xl text-center'>
					NatureLink is the{' '}
					<span className='text-primary font-bold'>social media</span> that
					helps reducing{' '}
					<span className='text-primary font-bold'>Greenwashing</span>
				</h1>
				<Link className='btn btn-primary my-4' href={'#create'}>
					See more
				</Link>
			</div>
			<div className='flex justify-center'>
				<Image
					src={'/images/hero.png'}
					alt='hero'
					width={500}
					height={500}
					className='w-[70%]'
				/>
			</div>
		</section>
	)
}
