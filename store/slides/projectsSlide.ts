import { Project } from '@/models/contract-functions-args.model'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
	projects: Project[]
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
		setProjects: (state, action: PayloadAction<Project[]>) => {
			state.projects = action.payload
		}
	}
})

export const { destroyProjects, setProjects } = projectsSlice.actions
export default projectsSlice.reducer
