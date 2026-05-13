import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import reportsService from "../../services/reportsService"
import Spinner from "../../components/04-spinner/Spinner"
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip
} from "chart.js"
import type ChartDataModel from "../../models/ChartDataModel"
import ReportsCharts from "../../components/07-reports-chart/ReportsCharts"
import coinsService from "../../services/coinsService"
import { populate } from "../../redux/coins-slice"
import Title from "../../components/09-title/Title"

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip
)
const Reports = () => {
    const selectedCoins = useAppSelector(state => state.selectedCoinsSlice.coins)
    const coins = useAppSelector(state => state.coinsSlice.coins)
    const symbols = selectedCoins
        .map(id => coins.find(coin => coin.id === id)?.symbol)
        .filter(Boolean)
        .join(',')
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const [chartData, setChartData] = useState<ChartDataModel>({
        labels: [],
        datasets: []
    })
    const colors = ["red", "blue", "green", "orange", "purple"]
    const MAX_POINTS = 20
    const dispatch = useAppDispatch()
    useEffect(() => {
        const loadCoinsIfNeeded = async () => {
            if (coins.length === 0) {
                try {
                    const coinsList = await coinsService.getCoins()
                    dispatch(populate(coinsList))
                } catch (e) {
                    alert(e)
                }
            }
        }
        loadCoinsIfNeeded()
        if (selectedCoins.length === 0) return
        const load = async () => {
            try {
                const reports = await reportsService.getReports(symbols)
                setChartData(prev => {
                    const time = new Date().toLocaleTimeString()
                    const newLabels = [...prev.labels, time].slice(-MAX_POINTS)
                    const newDatasets = Object.keys(reports).map((symbol, index) => {
                        const coinData = prev.datasets.find(d => d.label === symbol)
                        const newData = coinData
                            ? [...coinData.data, reports[symbol].USD].slice(-MAX_POINTS)
                            : [reports[symbol].USD]
                        return {
                            label: symbol,
                            data: newData,
                            borderWidth: 2,
                            borderColor: colors[index % colors.length],
                            tension: 0.3
                        }
                    })
                    return {
                        labels: newLabels,
                        datasets: newDatasets
                    }
                })
                setIsLoaded(true)
            } catch (e) {
                setIsLoaded(false)
                alert(e)
            } finally {
                if (!isLoaded) setIsLoading(false)
            }
        }
        load()
        const interval = setInterval(load, 1000)
        return () => clearInterval(interval)
    }, [symbols])
    if (selectedCoins.length === 0) {
        return (
            <div className="PageMessage">
                <h4>Please select coins first...</h4>
            </div>
        )
    }
    return (
        <div className="Reports">
            {isLoading && <Spinner />}
            {!isLoading && isLoaded && (
                <>
                    <Title title="Reports" />
                    <div className="Reports__panel">
                        <ReportsCharts chartData={chartData} />
                    </div>
                </>
            )}
            {!isLoading && !isLoaded &&
                <div className="PageError">
                    <h4>ERROR</h4>
                </div>
            }
        </div>
    )
}
export default Reports