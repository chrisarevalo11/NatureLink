import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { projectsSlice } from './slides/projectsSlide'

const rootReducer = combineReducers({
	projects: projectsSlice.reducer
})

export const store = configureStore({
	reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
