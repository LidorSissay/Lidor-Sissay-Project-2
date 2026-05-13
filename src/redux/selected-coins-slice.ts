import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import storageService from "../utils/localStorageUtils"

interface SelectedCoinsState {
    coins: string[]
}

const savedCoins = storageService.getData<string[]>('selectedCoins')
const initialState: SelectedCoinsState = {
    coins: savedCoins ? savedCoins : []
}

const save = (coins: string[]) => {
    storageService.setData('selectedCoins', coins)
}
const selectedCoinsSlice = createSlice({
    name: 'selectedCoins',
    initialState,
    reducers: {
        populate: (state, action: PayloadAction<string[]>) => {
            state.coins = action.payload
            save(state.coins)
        },
        addCoin: (state, action: PayloadAction<string>) => {
            state.coins.push(action.payload)
            save(state.coins)
        },
        removeCoin: (state, action: PayloadAction<string>) => {
            state.coins = state.coins.filter(id => id !== action.payload)
            save(state.coins)
        },
    }
})
export const { populate, addCoin, removeCoin } = selectedCoinsSlice.actions
export default selectedCoinsSlice.reducer