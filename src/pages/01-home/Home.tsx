import { useEffect, useState } from "react"
import type CoinModel from "../../models/CoinModel"
import coinsService from "../../services/coinsService"
import CoinCard from "../../components/02-coin-card/CoinCard"
import Spinner from "../../components/04-spinner/Spinner"

const Home = () => {
    const [coinsList, setCoinsList] = useState<CoinModel[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true)
                const coins = await coinsService.getCoins()
                setCoinsList(coins)
            } catch (e) {
                alert(e)
            } finally {
                setIsLoading(false)
            }
        })()
    }, [])
    return (
        <div className="Home">
            {isLoading && <Spinner />}
            {!isLoading && coinsList.map(coin => <CoinCard key={coin.id} coin={coin} />)}
        </div>
    )
}
export default Home