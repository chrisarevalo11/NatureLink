import Image from 'next/image'
import Link from 'next/link'

export default function Create(): JSX.Element {
	return (
		<section
			id='create'
			className='w-full grid grid-cols-1 md:grid-cols-2 min-h-[80vh] items-center justify-items-center'
		>
			<div className='flex justify-center order-2 md:order-1'>
				<Image
					src={'/images/create.png'}
					alt='hero'
					width={500}
					height={500}
					className='w-[70%]'
				/>
			</div>
			<div className='flex flex-col items-center gap-5 order-1 md:order-2'>
				<h1 className='text-3xl md:text-5xl text-center'>
					<span className='text-primary font-bold scale-105'>Create</span>{' '}
					innovative projects that{' '}
					<span className='text-primary font-bold'>help the planet</span> and
					get rewarded for it
				</h1>
				<Link className='btn btn-primary my-4' href={'/create'}>
					Create
				</Link>
			</div>
		</section>
	)
}
