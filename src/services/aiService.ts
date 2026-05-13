import axios from "axios"
import type RecommendationCoinModel from "../models/RecommendationCoinModel"

class AiService {

    async getRecommendation(
        coin: RecommendationCoinModel,
        apiKey: string
    ): Promise<string> {

        const prompt = `
        Give investment recommendation for this cryptocurrency.

        Name: ${coin.name}

        Current Price USD:
        ${coin.market_data.current_price.usd}

        Market Cap USD:
        ${coin.market_data.market_cap.usd}

        24h Volume USD:
        ${coin.market_data.total_volume.usd}

        30d Change:
        ${coin.market_data.price_change_percentage_30d_in_currency.usd}

        60d Change:
        ${coin.market_data.price_change_percentage_60d_in_currency.usd}

        200d Change:
        ${coin.market_data.price_change_percentage_200d_in_currency.usd}

        Answer shortly:
        1. Should buy or not
        2. Short explanation
        `

        const response = await axios.post(
            '/api/v1/chat/completions',
            {
                model: "meta/llama-3.1-8b-instruct",
                stream: false,
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                },
                timeout: 30000
            }
        )
        console.log(response.data)
        return response.data.choices[0].message.content
    }
}

const aiService = new AiService()

export default aiService
