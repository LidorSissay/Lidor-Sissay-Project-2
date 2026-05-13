import { useEffect, useState } from "react"
import { useAppSelector } from "../../redux/hooks"
import recommendationsService from "../../services/recommendationsService"
import type RecommendationCoinModel from "../../models/RecommendationCoinModel"
import RecommendationCard from "../../components/08-recommendation-card/RecommendationCard"
import Spinner from "../../components/04-spinner/Spinner"
import Title from "../../components/09-title/Title"

const Recommendations = () => {
    const [recommendations, setRecommendations] = useState<RecommendationCoinModel[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const selectedCoins = useAppSelector(state => state.selectedCoinsSlice.coins)
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
    }, [selectedCoins])
    if (selectedCoins.length === 0) {
        return (
            <div className="PageMessage">
                <h4>Please select coins first...</h4>
            </div>
        )
    }
    return (
        <div className="Recommendations">
            {isLoading && <Spinner />}
            {!isLoading && isLoaded && (
                <>
                    <Title title="AI Recommendations" />
                    <div className="Recommendations__list">
                        {recommendations.map(coin => <RecommendationCard
                            key={coin.id}
                            coin={coin}
                        />
                        )}
                    </div>
                </>
            )}
            {!isLoading && !isLoaded &&
                <div className="PageError">
                    <h4>ERROR</h4>
                </div>}
        </div>
    )
}
export default Recommendations