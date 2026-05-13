import { useState } from "react"
import type RecommendationCoinModel from "../../models/RecommendationCoinModel"
import Spinner from "../04-spinner/Spinner"
import aiService from "../../services/aiService"
import storageService from "../../utils/localStorageUtils"

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
            let apiKey = storageService.getData<string>("apiKey")
            if (!apiKey) {
                const userKey = prompt("Please enter your AI API key")
                if (!userKey) return
                storageService.setData("apiKey", userKey)
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
            <div className="RecommendationCard__header">
                <h3>{coin.name}</h3>
            </div>
            <div className="RecommendationCard__stats">
                <div className="RecommendationCard__stat">
                    Current Price <strong>${coin.market_data.current_price.usd}</strong>
                </div>
                <div className="RecommendationCard__stat">
                    Market Cap <strong>${coin.market_data.market_cap.usd}</strong>
                </div>
                <div className="RecommendationCard__stat">
                    24h Volume <strong>${coin.market_data.total_volume.usd}</strong>
                </div>
            </div>
            <div className="RecommendationCard__actions">
                <button type="button" className="RecommendationCard__ai-btn" onClick={getRecommendation}>
                    Get AI Recommendation
                </button>
                {isLoading && <Spinner />}
            </div>
            {!isLoading && isLoaded &&
                <div className="RecommendationCard__ai">
                    <div className="RecommendationCard__ai-label">AI insight</div>
                    <p>{recommendation}</p>
                </div>
            }
        </div>
    )
}
export default RecommendationCard