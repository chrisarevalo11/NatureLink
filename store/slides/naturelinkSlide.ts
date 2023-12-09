import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

type InitialState = {
	createProject: string | null
}

const initialState: InitialState = {
	createProject: null
}

export const natureLinkSlice: Slice<InitialState> = createSlice({
	name: 'natureLink',
	initialState,
	reducers: {
		setCreateProject: (state, action: PayloadAction<string>) => {
			state.createProject = action.payload
		}
	}
})

export const { setCreateProject } = natureLinkSlice.actions
export default natureLinkSlice.reducer
