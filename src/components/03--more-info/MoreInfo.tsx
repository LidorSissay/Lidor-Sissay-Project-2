import type CurrentPriceModel from "../../models/CurrentPriceModel"

interface MoreInfoProps {
    info: CurrentPriceModel
    onClose(): void
}
const MoreInfo = (props: MoreInfoProps) => {
    const { info: { usd, eur, ils }, onClose } = props
    return (
        <div className="MoreInfo">
            <div>$ {usd}</div>
            <div>€ {eur}</div>
            <div>₪ {ils}</div>
            <button onClick={onClose}>CLOSE INFO</button>
        </div>
    )
}
export default MoreInfo