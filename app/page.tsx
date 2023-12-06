'use client'

import { useAppSelector } from '@/store'
import { useOwnedHandles, useProfile } from '@lens-protocol/react-web'
import { Web3Button, useContract, useContractRead } from '@thirdweb-dev/react'
import { addProjects, destroyProjects } from '@/store/slides/projectsSlide'

export default function Home() {
	/*  const { data, error, loading } = useProfile({
    forHandle: 'test/rookie',
  }); */

	const projects = useAppSelector(state => state.projects.projects)

	const handle = useOwnedHandles({
		for: '0xD496C2D3422F86dCca5b2d7C8728dEDEF6cEE9d0'
	})

	const { data: contract } = useContract(
		'0xB6558651A3A4646D83f1030921909fA87EE61A35'
	)
	const {
		data: data2,
		isLoading,
		error
	} = useContractRead(contract, 'getAllProjects')

	return (
		<div>
			{/* 
      {loading && <p>Cargando perfil...</p>}
      {error && <p>Error al cargar el perfil.</p>}
      {handle && <h1>{JSON.stringify(handle)}</h1>} */}
			<button onClick={() => console.log(projects)}>Click me</button>
		</div>
	)
}
