import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { ReactElement } from 'react'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

type GraphParams = {
	labels: string[]
	datasets: {
		data: number[]
		backgroundColor: string[]
		borderColor: string[]
		borderWidth: number
		label?: string
	}[]
}

type Props = {
	yes: number
	no: number
}

export default function PieGraph({ yes, no }: Props): ReactElement {
	const data: GraphParams = {
		labels: ['Yes', 'No'],
		datasets: [
			{
				label: 'Votes',
				data: [yes, no],
				backgroundColor: ['rgba(30, 184, 84, 0.5)', 'rgba(242, 47, 71, 0.5)'],
				borderColor: ['rgba(30, 184, 84, 1)', 'rgba(242, 47, 71, 1)'],
				borderWidth: 1
			}
		]
	}

	return (
		<div className='flex justify-center items-center mt-2 w-[50%] md:w-[40%] mx-auto'>
			<Pie data={data} />
		</div>
	)
}
