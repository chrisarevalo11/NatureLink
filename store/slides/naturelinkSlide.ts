import { CallOverrides } from 'ethers'
import { TransactionReceipt } from '@ethersproject/abstract-provider'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UseMutateAsyncFunction } from '@tanstack/react-query'

// type contractFunction = UseMutateAsyncFunction<
// 	{
// 		receipt: TransactionReceipt
// 	},
// 	unknown,
// 	{
// 		args?: any[] | undefined
// 		overrides?: CallOverrides | undefined
// 	},
// 	unknown
// > | null

type InitialState = {
	createProject: string | null
}

const initialState: InitialState = {
	createProject: null
}

export const natureLinkSlice = createSlice({
	name: 'natureLink',
	initialState,
	reducers: {
		setCreateProject: (state, action: PayloadAction<string>) => {
			state.createProject = action.payload
			console.log('2. state.createProject', state.createProject)
		}
	}
})

export const { setCreateProject } = natureLinkSlice.actions
export default natureLinkSlice.reducer
