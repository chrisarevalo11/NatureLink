import { ReactElement } from 'react'
import Map from './Map'

export default function MapSection(): ReactElement {
	return (
		<div className='w-full'>
			<h1 className='text-3xl font-bold text-center py-2'>Coordinates</h1>
			<Map latitude={6.311825595223219} longitude={-75.5741556147151} />
		</div>
	)
}
