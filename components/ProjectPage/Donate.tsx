import { ReactNode, useEffect, useState } from 'react'
import DonationForm from './DonationForm'
import ProgressBar from './ProgressBar'
import { Project } from '@/models/contract-functions-args.model'

type Props = {
	RequiredAmount: number
	project: Project | null
	timeLeft: number
}

export default function Donate(props: Props): JSX.Element {
	const { RequiredAmount, project, timeLeft } = props
	const currentAmount: number = 11000

	const timeLeftDate: Date = new Date(timeLeft * 1000)
	const [days, setDays] = useState(timeLeftDate.getDate())
	const [hours, setHours] = useState(timeLeftDate.getHours())
	const [minutes, setMinutes] = useState(timeLeftDate.getMinutes())
	const [seconds, setSeconds] = useState(timeLeftDate.getSeconds())

	useEffect(() => {
		const timer = setInterval(() => {
			if (seconds > 0) {
				setSeconds(seconds - 1)
			} else {
				if (minutes > 0) {
					setMinutes(minutes - 1)
					setSeconds(59)
				} else {
					if (hours > 0) {
						setHours(hours - 1)
						setMinutes(59)
						setSeconds(59)
					} else {
						if (days > 0) {
							setDays(days - 1)
							setHours(23)
							setMinutes(59)
							setSeconds(59)
						} else {
							// Tiempo finalizado
							clearInterval(timer)
						}
					}
				}
			}
		}, 1000)

		return () => clearInterval(timer)
	}, [days, hours, minutes, seconds])

	return (
		<div className='w-full flex flex-col gap-5'>
			<h1 className='text-3xl font-bold text-center'>Donate</h1>
			<DonationForm project={project} />
			<div className='flex gap-5'>
				<div>
					<span className='countdown font-mono text-4xl'>
						<span style={{ '--value': days }}></span>
					</span>
					days
				</div>
				<div>
					<span className='countdown font-mono text-4xl'>
						<span style={{ '--value': hours }}></span>
					</span>
					hours
				</div>
				<div>
					<span className='countdown font-mono text-4xl'>
						<span style={{ '--value': minutes }}></span>
					</span>
					min
				</div>
				<div>
					<span className='countdown font-mono text-4xl'>
						<span style={{ '--value': seconds }}></span>
					</span>
					sec
				</div>
			</div>
			<ProgressBar
				currentAmount={currentAmount}
				RequiredAmount={RequiredAmount}
			/>
		</div>
	)
}
