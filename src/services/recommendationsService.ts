import axios from "axios";
import type RecommendationCoinModel from "../models/RecommendationCoinModel";

class RecommendationsService {
    async getCoinInfo(id: string): Promise<RecommendationCoinModel> {
        const { data } = await axios.get<RecommendationCoinModel>(`https://api.coingecko.com/api/v3/coins/${id}?market_data=true`)
        return data
    }
}

const recommendationsService = new RecommendationsService()
export default recommendationsService