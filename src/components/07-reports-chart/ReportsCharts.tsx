import { Line } from "react-chartjs-2"
import type ChartDataModel from "../../models/ChartDataModel"

interface ReportsChartsProps {
    chartData: ChartDataModel
}
const ReportsCharts = (props: ReportsChartsProps) => {
    const { chartData } = props
    return (
        <div className="ReportsCharts">
            <Line
                data={chartData}
                options={{
                    animation: false,
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: "Time"
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: "Price (USD)"
                            }
                        }
                    }
                }}
            />
        </div>
    )
}
export default ReportsCharts