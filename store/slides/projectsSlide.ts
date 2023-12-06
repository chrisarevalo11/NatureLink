import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
	projects: string[]
}

const initialState: InitialState = {
	projects: []
}

export const projectsSlice = createSlice({
	name: 'projects',
	initialState,
	reducers: {
		addProjects: (state, action: PayloadAction<string>) => {
			state.projects.push(action.payload)
		},
		destroyProjects: state => {
			state.projects = initialState.projects
		}
	}
})

export const { addProjects, destroyProjects } = projectsSlice.actions
export default projectsSlice.reducer
