import type RecommendationMarketDataModel from "./RecommendationMarketDataModel"

export default interface RecommendationCoinModel {
    id: string
    name: string
    symbol: string
    market_data: RecommendationMarketDataModel
}