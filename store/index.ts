import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { projectsSlice } from './slides/projectsSlide'
import { natureLinkSlice } from './slides/naturelinkSlide'

const rootReducer = combineReducers({
	projects: projectsSlice.reducer,
	natureLink: natureLinkSlice.reducer
})

export const store = configureStore({
	reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
