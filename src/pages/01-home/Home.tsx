import React, { useEffect, useState } from "react"
import coinsService from "../../services/coinsService"
import CoinCard from "../../components/02-coin-card/CoinCard"
import Spinner from "../../components/04-spinner/Spinner"
import LimitModal from "../../components/06-limit-modal/LimitModal"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { populate } from "../../redux/coins-slice"
import Title from "../../components/09-title/Title"


const Home = () => {
    const coins = useAppSelector(state => state.coinsSlice.coins)
    const dispatch = useAppDispatch()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const [isLimitModalOpen, setIsLimitModalOpen] = useState<boolean>(false)
    const [pendingCoin, setPendingCoin] = useState<string | null>(null)
    const [search, setSearch] = useState<string>('')
    const displaySearchedCoins = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSearch(event.currentTarget.value)
    }
    useEffect(() => {
        (async () => {
            try {
                if (coins.length > 0) {
                    setIsLoaded(true)
                    return
                }
                setIsLoading(true)
                const coinsList = await coinsService.getCoins()
                dispatch(populate(coinsList))
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
        <div className="Home">
            {isLoading && <Spinner />}
            {!isLoading && isLoaded && <>
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={displaySearchedCoins} />
                <Title title="Home" />
                {coins.filter(coin =>
                    coin.name.toLowerCase().includes(search.toLowerCase()) ||
                    coin.symbol.toLowerCase().includes(search.toLowerCase())
                )
                    .map(coin => (
                        <CoinCard
                            key={coin.id}
                            coin={coin}
                            setIsLimitModalOpen={setIsLimitModalOpen}
                            setPendingCoin={setPendingCoin} />))
                }
            </>
            }
            {!isLoading && !isLoaded &&
                <div>
                    <h4>ERROR</h4>
                </div>
            }
            {isLimitModalOpen && (
                <LimitModal
                    onClose={() => setIsLimitModalOpen(false)}
                    pendingCoin={pendingCoin} />
            )}
        </div>
    )
}
export default Home