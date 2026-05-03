import { useEffect, useState } from "react"
import type CoinModel from "../../models/CoinModel"
import coinsService from "../../services/coinsService"
import CoinCard from "../../components/02-coin-card/CoinCard"

const Home = () => {
    const [coinsList, setCoinsList] = useState<CoinModel[]>([])
    useEffect(() => {
        (async () => {
            try {
                const coins = await coinsService.getCoins()
                setCoinsList(coins)
            } catch (e) {
                alert(e)
            }
        })()
    }, [])
    return (
        <div className="Home">
            {coinsList.map(coin => <CoinCard key={coin.id} coin={coin} />)}
        </div>
    )
}
export default Home