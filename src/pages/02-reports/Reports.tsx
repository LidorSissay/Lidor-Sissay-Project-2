import { useEffect, useState } from "react"
import { useAppSelector } from "../../components/07-redux/hooks"
import type ReportsModel from "../../models/ReportsModel"
import reportsService from "../../services/reportsService"
import Spinner from "../../components/04-spinner/Spinner"

const Reports = () => {
    const selectedCoins = useAppSelector(state => state.selectedCoinsSlice.coins)
    const coins = useAppSelector(state => state.coinsSlice.coins)
    const symbols = selectedCoins
        .map(id => coins.find(coin => coin.id === id)?.symbol)
        .filter(Boolean)
        .join(',')
    const [prices, setPrices] = useState<ReportsModel>({})
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    useEffect(() => {
        if (!symbols) return
        const interval = setInterval(async () => {
            try {
                setIsLoading(true)
                const reports = await reportsService.getReports(symbols)
                setPrices(reports)
                setIsLoaded(true)
            } catch (e) {
                setIsLoaded(false)
                alert(e)
            } finally {
                setIsLoading(false)
            }
        }, 1000)
        return () => clearInterval(interval)
    }, [symbols])
    if (symbols.length === 0) {
        return <h4>Please select coins first...</h4>
    }
    return (
        <div className="Reports">
            {isLoading && <Spinner />}
            {!isLoading && isLoaded && (
                <>
                    <h4>Reports</h4>
                    <pre>{JSON.stringify(prices, null, 2)}</pre>
                </>
            )}
            {!isLoading && !isLoaded &&
                <h4>ERROR</h4>
            }
        </div>
    )
}
export default Reports