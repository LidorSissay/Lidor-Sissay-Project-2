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
                    responsive: true,
                    maintainAspectRatio: true,
                    interaction: { mode: "index", intersect: false },
                    plugins: {
                        legend: {
                            position: "top",
                            labels: {
                                color: "#94a3b8",
                                usePointStyle: true,
                                pointStyle: "circle",
                                padding: 18,
                                font: { family: "'DM Sans', system-ui, sans-serif", size: 12 }
                            }
                        },
                        tooltip: {
                            backgroundColor: "rgba(15, 23, 42, 0.95)",
                            titleColor: "#f1f5f9",
                            bodyColor: "#e2e8f0",
                            borderColor: "rgba(56, 189, 248, 0.35)",
                            borderWidth: 1,
                            padding: 12,
                            cornerRadius: 10,
                            displayColors: true
                        }
                    },
                    scales: {
                        x: {
                            grid: { color: "rgba(148, 163, 184, 0.1)" },
                            ticks: { color: "#94a3b8", maxRotation: 45, minRotation: 0 },
                            title: {
                                display: true,
                                text: "Time",
                                color: "#64748b",
                                font: { size: 12, weight: 500 }
                            }
                        },
                        y: {
                            grid: { color: "rgba(148, 163, 184, 0.1)" },
                            ticks: { color: "#94a3b8" },
                            title: {
                                display: true,
                                text: "Price (USD)",
                                color: "#64748b",
                                font: { size: 12, weight: 500 }
                            }
                        }
                    }
                }}
            />
        </div>
    )
}
export default ReportsCharts