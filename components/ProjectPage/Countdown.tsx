import { useEffect, useState } from 'react'

type Props = {
	deadline: number // Asumo que deadline es un timestamp en segundos
}

export default function Countdown({ deadline }: Props): JSX.Element {
	const [timeLeft, setTimeLeft] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0
	})

	useEffect(() => {
		const updateCountdown = () => {
			const now = Date.now() / 1000 // Tiempo actual en segundos
			const diff = deadline - now

			if (diff <= 0) {
				setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
				return
			}

			const days = Math.floor(diff / (3600 * 24))
			const hours = Math.floor((diff % (3600 * 24)) / 3600)
			const minutes = Math.floor((diff % 3600) / 60)
			const seconds = Math.floor(diff % 60)

			setTimeLeft({ days, hours, minutes, seconds })
		}

		const timer = setInterval(updateCountdown, 1000)

		return () => clearInterval(timer)
	}, [deadline])

	const { days, hours, minutes, seconds } = timeLeft

	return (
		<div className='flex gap-4 mx-2'>
			<div>
				<span className='countdown font-mono text-4xl'>{days}</span> days
			</div>
			<div>
				<span className='countdown font-mono text-4xl'>{hours}</span> hours
			</div>
			<div>
				<span className='countdown font-mono text-4xl'>{minutes}</span> min
			</div>
			<div>
				<span className='countdown font-mono text-4xl'>{seconds}</span> sec
			</div>
		</div>
	)
}
