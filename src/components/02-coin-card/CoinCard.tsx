import type CoinModel from "../../models/CoinModel"

interface CoinCardProps {
    coin: CoinModel
}
const CoinCard = (props: CoinCardProps) => {
    const { id, image, symbol, name } = props.coin
    const displayInfo = (): void => {
        console.log('info')
    }
    return (
        <div className="CoinCard">
            <div className="CoinIcon"><img src={image} alt={id} /></div>
            <div className="CoinName">{name}</div>
            <div className="CoinSymbol">{symbol.toUpperCase()}</div>
            <div className="btn"><button onClick={displayInfo}>MORE INFO</button></div>
        </div>
    )
}
export default CoinCard