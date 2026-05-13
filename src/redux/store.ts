import { configureStore } from "@reduxjs/toolkit";
import coinsSlice from "./coins-slice";
import selectedCoinsSlice from "./selected-coins-slice"

const store = configureStore({
    reducer: {
        coinsSlice,
        selectedCoinsSlice
    }
})
export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch