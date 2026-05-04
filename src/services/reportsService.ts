import axios from "axios";
import type ReportsModel from "../models/ReportsModel";

class ReportsService {
    async getReports(symbols: string): Promise<ReportsModel> {
        const { data } = await axios.get<ReportsModel>(`https://min-api.cryptocompare.com/data/pricemulti?tsyms=usd&fsyms=${symbols}`)
        return data
    }
}
const reportsService = new ReportsService()
export default reportsService