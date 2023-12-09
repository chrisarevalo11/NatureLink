import { Project } from '@/models/contract-functions-args.model'
import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

type InitialState = {
	projectSelected: Project | null
	projects: Project[]
}

const initialState: InitialState = {
	projectSelected: null,
	projects: []
}

export const projectSlice: Slice<InitialState> = createSlice({
	name: 'projects',
	initialState,
	reducers: {
		getprojectById: (state, action: PayloadAction<number>) => {
			state.projectSelected =
				state.projects.find(
					(project: Project) => project.id === action.payload
				) ?? null
		},
		setProjects: (state, action: PayloadAction<Project[]>) => {
			state.projects = action.payload
		}
	}
})

export const { getprojectById, setProjects } = projectSlice.actions
export default projectSlice.reducer
