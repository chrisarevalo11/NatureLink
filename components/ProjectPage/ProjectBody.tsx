import { Fragment, ReactNode } from 'react'

type ProjectBodyProps = {
	description: string
	startDate: string
	endDate: string
}
export default function ProjectBody({
	description,
	startDate,
	endDate
}: ProjectBodyProps): ReactNode {
	return (
		<Fragment>
			<h3 className='text-sm text-gray-500 -mt-2'>
				{startDate} - {endDate}
			</h3>
			<h2 className='font-bold text-xl'>Description:</h2>
			<p className='text-sm'>{description}</p>
		</Fragment>
	)
}
