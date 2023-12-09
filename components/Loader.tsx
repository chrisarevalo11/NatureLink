import Image from 'next/image'
import { ReactElement } from 'react'

export default function Loader(): ReactElement {
	return (
		<Image
			src={'/images/logo.svg'}
			alt='loader'
			width={60}
			height={60}
			className='animate-spin'
		/>
	)
}
