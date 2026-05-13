import { useState } from "react"
import type RecommendationCoinModel from "../../models/RecommendationCoinModel"
import Spinner from "../04-spinner/Spinner"
import aiService from "../../services/aiService"

interface RecommendationCardProps {
    coin: RecommendationCoinModel
}
const RecommendationCard = (props: RecommendationCardProps) => {
    const [recommendation, setRecommendation] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const { coin } = props
    const getRecommendation = async () => {
        try {
            let apiKey = localStorage.getItem("apiKey")
            if (!apiKey) {
                const userKey = prompt("Please enter your AI API key")
                if (!userKey) return
                localStorage.setItem("apiKey", userKey)
                apiKey = userKey
            }
            setIsLoading(true)
            const aiResponse = await aiService.getRecommendation(
                coin,
                apiKey
            )
            setRecommendation(aiResponse)
            setIsLoaded(true)
        } catch (e) {
            setIsLoaded(false)
            alert(e)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className="RecommendationCard">
            <div>
                <h3>{coin.name}</h3>
                <p>Current Price: ${coin.market_data.current_price.usd}</p>
                <p>Market Cap: ${coin.market_data.market_cap.usd}</p>
                <p>24h Volume: ${coin.market_data.total_volume.usd}</p>
                <button onClick={getRecommendation}>
                    Get AI Recommendation
                </button>
                {isLoading && <Spinner />}
                {!isLoading && isLoaded &&
                    <p>{recommendation}</p>
                }
            </div>
        </div>
    )
}
export default RecommendationCard