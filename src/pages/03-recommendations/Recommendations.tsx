import { useEffect, useState } from "react"
import { useAppSelector } from "../../components/07-redux/hooks"
import recommendationsService from "../../services/recommendationsService"
import type RecommendationCoinModel from "../../models/RecommendationCoinModel"

const Recommendations = () => {
    const [recommendations, setRecommendations] = useState<RecommendationCoinModel[]>([])
    const selectedCoins = useAppSelector(state => state.selectedCoinsSlice.coins)
    if (selectedCoins.length === 0) {
        return <h4>Please select coins first...</h4>
    }
    useEffect(() => {
        (async () => {
            try {
                const promises = selectedCoins.map(id => recommendationsService.getCoinInfo(id))
                const recoms = await Promise.all(promises)
                setRecommendations(recoms)
            } catch (e) {
                alert(e)
            }
        })()
    }, [])
    return (
        <div className="Recommendations">
            <h2>AI Recommendation</h2>
            {recommendations.map(coin => (
                <div key={coin.id}>
                    <h3>{coin.name}</h3>
                    <p>Current Price: ${coin.market_data.current_price.usd}</p>
                    <p>Market Cap: ${coin.market_data.market_cap.usd}</p>
                    <p>24h Volume: ${coin.market_data.total_volume.usd}</p>
                </div>
            ))}
        </div>
    )
}
export default Recommendations