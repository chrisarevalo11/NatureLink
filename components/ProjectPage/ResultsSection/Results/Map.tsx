'use client'

import { useMemo } from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'

type Props = {
	latitude: number
	longitude: number
}

export default function Map(props: Props): JSX.Element {
	const { latitude, longitude } = props

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string
	})

	const center = useMemo(() => ({ lat: latitude, lng: longitude }), [])

	return (
		<div className='h-[300px] w-[95vw] md:w-full mx-auto rounded-xl overflow-hidden'>
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
							lat: latitude,
							lng: longitude
						}}
					/>
				</GoogleMap>
			)}
		</div>
	)
}
