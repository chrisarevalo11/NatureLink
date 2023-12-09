import { Propousal } from '@/models/contract-functions-args.model'
import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

type InitialState = {
	propousals: Propousal[]
}

const initialState: InitialState = {
	propousals: []
}

export const propousalSlice: Slice<InitialState> = createSlice({
	name: 'propousals',
	initialState,
	reducers: {
		destroyPropousals: state => {
			state.propousals = initialState.propousals
		},
		setPropousals: (state, action: PayloadAction<Propousal[]>) => {
			state.propousals = action.payload
		}
	}
})

export const { destroyPropousals, setPropousals } = propousalSlice.actions
export default propousalSlice.reducer
