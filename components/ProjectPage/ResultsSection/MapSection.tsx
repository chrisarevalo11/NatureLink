import { ReactElement } from 'react'
import Map from './Map'

export default function MapSection(): ReactElement {
	return (
		<div className='w-full'>
			<h1 className='text-2xl font-bold text-center text-primary my-2'>
				Coordinates
			</h1>
			<Map latitude={4.652939629022646} longitude={-74.11940985988831} />
		</div>
	)
}
