import { useState } from "react"
import type CoinModel from "../../models/CoinModel"
import moreInfoService from "../../services/moreInfoService"
import type CurrentPriceModel from "../../models/CurrentPriceModel"
import MoreInfo from "../03--more-info/MoreInfo"
import Spinner from "../04-spinner/Spinner"

interface CoinCardProps {
    coin: CoinModel
}
const CoinCard = (props: CoinCardProps) => {
    const [moreInfo, setMoreInfo] = useState<CurrentPriceModel | null>(null)
    const [isInfo, setIsInfo] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { id, image, symbol, name } = props.coin
    const displayInfo = async (): Promise<void> => {
        try {
            if (moreInfo) {
                setIsInfo(true)
                return
            }
            setIsLoading(true)
            const coinInfo = await moreInfoService.getInfo(id)
            setMoreInfo(coinInfo.market_data.current_price)
            setIsInfo(true)

        } catch (e) {
            alert(e)
        } finally {
            setIsLoading(false)
        }

    }
    return (
        <div className="CoinCard">
            {isLoading && <Spinner />}
            {!isLoading &&
                <>
                    <div className="CoinIcon"><img src={image} alt={id} /></div>
                    <div className="CoinName">{name}</div>
                    <div className="CoinSymbol">{symbol.toUpperCase()}</div>
                    <div className="btn"><button onClick={displayInfo} >MORE INFO</button></div>
                </>
            }
            {isInfo && moreInfo &&
                <MoreInfo info={moreInfo} onClose={() => setIsInfo(false)} />
            }
        </div>
    )
}
export default CoinCard