import axios from "axios";
import type InfoModel from "../models/InfoModel";

class MoreInfoService {
    async getInfo(id: string): Promise<InfoModel> {
        const { data } = await axios.get<InfoModel>(`https://api.coingecko.com/api/v3/coins/${id}`)
        return data
    }
}

const moreInfoService = new MoreInfoService()
export default moreInfoService