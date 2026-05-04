import type ChartDataset from "./ChartDataSet"

export default interface ChartDataModel {
    labels: string[]
    datasets: ChartDataset[]
}