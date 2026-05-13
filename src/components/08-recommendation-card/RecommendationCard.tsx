import type RecommendationCoinModel from "../../models/RecommendationCoinModel"

interface RecommendationCardProps {
    coin: RecommendationCoinModel
}
const RecommendationCard = (props: RecommendationCardProps) => {
    const { coin } = props
    return (
        <div className="RecommendationCard">
            <div key={coin.id}>
                <h3>{coin.name}</h3>
                <p>Current Price: ${coin.market_data.current_price.usd}</p>
                <p>Market Cap: ${coin.market_data.market_cap.usd}</p>
                <p>24h Volume: ${coin.market_data.total_volume.usd}</p>
            </div>
        </div>
    )
}
export default RecommendationCard