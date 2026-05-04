import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface SelectedCoinsState {
    coins: string[]
}

const initialState: SelectedCoinsState = {
    coins: []
}

const selectedCoinsSlice = createSlice({
    name: 'selectedCoins',
    initialState,
    reducers: {
        populate: (state, action: PayloadAction<string[]>) => {
            state.coins = action.payload
        },
        addCoin: (state, action: PayloadAction<string>) => {
            state.coins.push(action.payload)
        },
        removeCoin: (state, action: PayloadAction<string>) => {
            state.coins = state.coins.filter(id => id !== action.payload)
        },
    }
})
export const { populate, addCoin, removeCoin } = selectedCoinsSlice.actions
export default selectedCoinsSlice.reducer