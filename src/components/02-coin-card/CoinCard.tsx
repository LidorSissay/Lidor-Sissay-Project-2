import type CoinModel from "../../models/CoinModel"
import moreInfoService from "../../services/moreInfoService"

interface CoinCardProps {
    coin: CoinModel
}
const CoinCard = (props: CoinCardProps) => {
    const { id, image, symbol, name } = props.coin
    const displayInfo = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        try {
            const coinInfo = await moreInfoService.getInfo(event.currentTarget.value)
            console.log(coinInfo)
        } catch (e) {
            alert(e)
        }

    }
    return (
        <div className="CoinCard">
            <div className="CoinIcon"><img src={image} alt={id} /></div>
            <div className="CoinName">{name}</div>
            <div className="CoinSymbol">{symbol.toUpperCase()}</div>
            <div className="btn"><button onClick={displayInfo} value={id}>MORE INFO</button></div>
        </div>
    )
}
export default CoinCard