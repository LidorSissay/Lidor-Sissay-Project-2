import axios from "axios";
import type MoreInfoModel from "../models/MoreInfoModel";

class MoreInfoService {
    async getInfo(id: string): Promise<MoreInfoModel> {
        const { data } = await axios.get<MoreInfoModel>(`https://api.coingecko.com/api/v3/coins/${id}`)
        return data
    }
}

const moreInfoService = new MoreInfoService()
export default moreInfoService