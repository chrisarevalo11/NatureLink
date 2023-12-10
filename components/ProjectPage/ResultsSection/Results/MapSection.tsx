import { ReactElement } from 'react'
import Map from './Map'

type Props = {
	footprint: string
}

export default function MapSection(props: Props): JSX.Element {
	const { footprint } = props

	const latitudString: string = footprint.split(',')[0]
	const latitude: number = parseFloat(latitudString)

	const longitudString: string = footprint.split(',')[1]
	const longitude: number = parseFloat(longitudString)

	return (
		<div className='w-full'>
			<h1 className='text-3xl font-bold text-center py-2'>Coordinates</h1>
			<Map latitude={latitude} longitude={longitude} />
		</div>
	)
}
