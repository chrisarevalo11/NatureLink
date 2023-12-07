'use client'

import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useOwnedHandles, useProfile } from '@lens-protocol/react-web'
import { useAppSelector } from '@/store'
import { useContract, useContractRead } from '@thirdweb-dev/react'
import natureLinkJson from '@/deployments/mumbai/NatureLink.json'
import { propousalDtoToPropousal } from '@/functions/dtos/dtos'
import { setPropousals } from '@/store/slides/propousalSlide'
import { Propousal } from '@/models/contract-functions-args.model'

export default function Home() {
	const [isSpinning, setIsSpinning] = useState<boolean>(true)
	const dispatch = useDispatch()
	const proposals = useAppSelector(state => state.propousal.propousals)

	const { data: natureLinkContract } = useContract(natureLinkJson.address)

	const {
		data: proposalsDto,
		isLoading,
		error
	} = useContractRead(natureLinkContract, 'getAllProjects')

	/*  const { data, error, loading } = useProfile({
    forHandle: 'test/rookie',
  }); 
	const handle = useOwnedHandles({
		for: '0xD496C2D3422F86dCca5b2d7C8728dEDEF6cEE9d0'
	})*/

	useEffect(() => {
		if (!isLoading) {
			const proposals: Propousal[] = propousalDtoToPropousal(proposalsDto)

			dispatch(setPropousals(proposals))
			setIsSpinning(false)
		}
	}, [isLoading])

	return (
		<div>
			{/* 
      {loading && <p>Cargando perfil...</p>}
      {error && <p>Error al cargar el perfil.</p>}
      {handle && <h1>{JSON.stringify(handle)}</h1>} */}
			{isSpinning ? (
				<p>Cargando proyectos...</p>
			) : (
				<button onClick={() => console.log(proposals)}>Click me</button>
			)}
		</div>
	)
}
