'use client'

import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useOwnedHandles, useProfile } from '@lens-protocol/react-web'
import { useAppSelector } from '@/store'
import { setProjects } from '@/store/slides/projectsSlide'
import { useContract, useContractRead } from '@thirdweb-dev/react'
import natureLinkJson from '@/deployments/mumbai/NatureLink.json'
import { Project } from '@/models/contract-functions-args.model'
import { getAllProjectsReturnDtoToGetAllProjectsReturn } from '@/functions/dtos/dtos'

export default function Home() {
	const [isSpinning, setIsSpinning] = useState<boolean>(true)
	const dispatch = useDispatch()
	const projects = useAppSelector(state => state.projects.projects)

	const { data: contract } = useContract(natureLinkJson.address)

	const {
		data: getAllProjects,
		isLoading,
		error
	} = useContractRead(contract, 'getAllProjects')

	/*  const { data, error, loading } = useProfile({
    forHandle: 'test/rookie',
  }); 
	const handle = useOwnedHandles({
		for: '0xD496C2D3422F86dCca5b2d7C8728dEDEF6cEE9d0'
	})*/

	useEffect(() => {
		if (!isLoading) {
			const currentProjects: Project[] =
				getAllProjectsReturnDtoToGetAllProjectsReturn(getAllProjects)

			dispatch(setProjects(currentProjects))
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
				<button onClick={() => console.log(projects)}>Click me</button>
			)}
		</div>
	)
}
