import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { boardsSlice } from './board/board.slice'

const combinedReducers = combineReducers({
  boards: boardsSlice.reducer,
})

let mainReducer = combinedReducers

export const store = configureStore({
  reducer: mainReducer,
})
