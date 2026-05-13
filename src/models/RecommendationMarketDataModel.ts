import type UsdModel from "./UsdModel"

export default interface RecommendationMarketDataModel {
    current_price: UsdModel
    market_cap: UsdModel
    total_volume: UsdModel
    price_change_percentage_30d_in_currency: UsdModel
    price_change_percentage_60d_in_currency: UsdModel
    price_change_percentage_200d_in_currency: UsdModel
}