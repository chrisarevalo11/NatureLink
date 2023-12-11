import Image from 'next/image'
import Link from 'next/link'

export default function Create(): JSX.Element {
	return (
		<section
			id='create'
			className='w-full flex flex-col min-h-[80vh] items-center justify-center'
		>
			<div className='flex flex-col justify-center items-center gap-5'>
				<h1 className='text-3xl md:text-5xl text-center'>
					No matter the role you decide to take along your journey,{' '}
					<span className='text-primary font-bold'>support</span> the planet and{' '}
					<span className='text-primary font-bold'>build trust</span> by
					showcasing your effective support in your profile.
				</h1>
				<Link className='btn btn-primary' href={'/home'}>
					Start journey
				</Link>
			</div>
			<div className='flex justify-center order-2 md:order-1'>
				<Image
					src={'/images/help.png'}
					alt='hero'
					width={500}
					height={500}
					className='w-[70%]'
				/>
			</div>
		</section>
	)
}
