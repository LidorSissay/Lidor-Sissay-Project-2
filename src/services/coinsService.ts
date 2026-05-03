import axios from "axios";
import type CoinModel from "../models/CoinModel";

class CoinsService {
    async getCoins(): Promise<CoinModel[]> {
        const { data } = await axios.get<CoinModel[]>('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd')
        return data
    }
}
const coinsService = new CoinsService()
export default coinsService