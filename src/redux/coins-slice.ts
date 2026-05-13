import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type CoinModel from "../models/CoinModel";

interface CoinsState {
    coins: CoinModel[]
}

const initialState: CoinsState = {
    coins: []
}

const coinsSlice = createSlice({
    name: 'coins',
    initialState,
    reducers: {
        populate: (state, action: PayloadAction<CoinModel[]>) => {
            state.coins = action.payload
        }
    }
})
export const { populate } = coinsSlice.actions
export default coinsSlice.reducer