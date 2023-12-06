import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useContract, useContractRead } from '@thirdweb-dev/react'
import natureLinkJson from '@/deployments/mumbai/NatureLink.json'

type InitialState = {
	projects: any[]
}

const initialState: InitialState = {
	projects: []
}

export const projectsSlice = createSlice({
	name: 'projects',
	initialState,
	reducers: {
		destroyProjects: state => {
			state.projects = initialState.projects
		},
		getProjects: state => {
			const { data: contract } = useContract(natureLinkJson.address)

			const {
				data: projects,
				isLoading,
				error
			} = useContractRead(contract, 'getAllProjects')

			state.projects = projects
		}
	}
})

export const { getProjects, destroyProjects } = projectsSlice.actions
export default projectsSlice.reducer
