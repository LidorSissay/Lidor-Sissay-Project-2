import { useEffect, useState } from "react"
import { useAppSelector } from "../../components/07-redux/hooks"
import recommendationsService from "../../services/recommendationsService"
import type RecommendationCoinModel from "../../models/RecommendationCoinModel"
import RecommendationCard from "../../components/08-recommendation-card/RecommendationCard"
import Spinner from "../../components/04-spinner/Spinner"

const Recommendations = () => {
    const [recommendations, setRecommendations] = useState<RecommendationCoinModel[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const selectedCoins = useAppSelector(state => state.selectedCoinsSlice.coins)
    if (selectedCoins.length === 0) {
        return <h4>Please select coins first...</h4>
    }
    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true)
                const promises = selectedCoins.map(id => recommendationsService.getCoinInfo(id))
                const recoms = await Promise.all(promises)
                setRecommendations(recoms)
                setIsLoaded(true)
            } catch (e) {
                setIsLoaded(false)
                alert(e)
            } finally {
                setIsLoading(false)
            }
        })()
    }, [])
    return (
        <div className="Recommendations">
            {isLoading && <Spinner />}
            {!isLoading && isLoaded && (
                <>
                    <h2>AI Recommendation</h2>
                    {recommendations.map(coin => <RecommendationCard
                        key={coin.id}
                        coin={coin}
                    />
                    )}
                </>
            )}
            {!isLoading && !isLoaded &&
                <div>
                    <h4>ERROR</h4>
                </div>}
        </div>
    )
}
export default Recommendations