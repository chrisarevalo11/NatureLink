import { Project } from '@/models/contract-functions-args.model'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
	projects: Project[]
}

const initialState: InitialState = {
	projects: []
}

export const projectSlice = createSlice({
	name: 'projects',
	initialState,
	reducers: {
		setProjects: (state, action: PayloadAction<Project[]>) => {
			state.projects = action.payload
		}
	}
})

export const { setProjects } = projectSlice.actions
export default projectSlice.reducer
