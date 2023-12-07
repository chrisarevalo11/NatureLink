'use client'

import { ReactNode } from 'react'
import ResultsTabs from './ResultsTabs'

export default function Results(): ReactNode {
	return (
		<section id='results' className='my-5 w-full'>
			<ResultsTabs />
		</section>
	)
}
