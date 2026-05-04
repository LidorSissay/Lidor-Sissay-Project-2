import React, { useEffect, useState } from "react"
import type CoinModel from "../../models/CoinModel"
import coinsService from "../../services/coinsService"
import CoinCard from "../../components/02-coin-card/CoinCard"
import Spinner from "../../components/04-spinner/Spinner"
import LimitModal from "../../components/06-limit-modal/LimitModal"

const Home = () => {
    const [coinsList, setCoinsList] = useState<CoinModel[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [selectedCoins, setSelectedCoins] = useState<string[]>([])
    const [isLimitModalOpen, setIsLimitModalOpen] = useState<boolean>(false)
    const [pendingCoin, setPendingCoin] = useState<string | null>(null)
    const [search, setSearch] = useState<string>('')
    const displaySearchedCoins = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSearch(event.currentTarget.value)
    }
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
            {!isLoading && <>
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={displaySearchedCoins} />
                {coinsList.filter(coin =>
                    coin.name.toLowerCase().includes(search.toLowerCase()) ||
                    coin.symbol.toLowerCase().includes(search.toLowerCase())
                )
                    .map(coin => (
                        <CoinCard
                            key={coin.id}
                            coin={coin}
                            selectedCoins={selectedCoins}
                            setSelectedCoins={setSelectedCoins}
                            setIsLimitModalOpen={setIsLimitModalOpen}
                            setPendingCoin={setPendingCoin} />))
                }
            </>
            }
            {isLimitModalOpen && (
                <LimitModal
                    selectedCoins={selectedCoins}
                    setSelectedCoins={setSelectedCoins}
                    onClose={() => setIsLimitModalOpen(false)}
                    pendingCoin={pendingCoin} />
            )}
        </div>
    )
}
export default Home