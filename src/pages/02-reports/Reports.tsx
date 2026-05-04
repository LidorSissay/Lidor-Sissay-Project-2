import { useEffect, useState } from "react"
import { useAppSelector } from "../../components/07-redux/hooks"
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
    useEffect(() => {
        if (!symbols) return
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
    if (symbols.length === 0) {
        return <h4>Please select coins first...</h4>
    }
    return (
        <div className="Reports">
            {isLoading && <Spinner />}
            {!isLoading && isLoaded && (
                <>
                    <h4>Reports</h4>
                    <ReportsCharts chartData={chartData} />
                </>
            )}
            {!isLoading && !isLoaded &&
                <h4>ERROR</h4>
            }
        </div>
    )
}
export default Reports