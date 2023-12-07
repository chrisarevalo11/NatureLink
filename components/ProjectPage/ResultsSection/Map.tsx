'use client'

import { ReactElement, useMemo } from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'

type Props = {
	latitude: number
	longitude: number
}

export default function Map({ latitude, longitude }: Props): ReactElement {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string
	})

	const center = useMemo(
		() => ({ lat: 4.652939629022646, lng: -74.11940985988831 }),
		[]
	)

	return (
		<div className='h-[300px] w-full rounded-xl overflow-hidden'>
			{!isLoaded ? (
				<h1>Loading...</h1>
			) : (
				<GoogleMap
					mapContainerClassName='h-full w-full'
					center={center}
					zoom={14}
				>
					<Marker
						position={{
							lat: parseFloat(latitude.toString()),
							lng: parseFloat(longitude.toString())
						}}
					/>
				</GoogleMap>
			)}
		</div>
	)
}
