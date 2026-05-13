import type CurrentPriceModel from "../../models/CurrentPriceModel"

interface MoreInfoProps {
    info: CurrentPriceModel
    onClose(): void
}
const MoreInfo = (props: MoreInfoProps) => {
    const { info: { usd, eur, ils }, onClose } = props
    return (
        <div className="MoreInfo">
            <div className="MoreInfo__row">
                <span className="MoreInfo__label">USD</span>
                <span className="MoreInfo__value">$ {usd}</span>
            </div>
            <div className="MoreInfo__row">
                <span className="MoreInfo__label">EUR</span>
                <span className="MoreInfo__value">€ {eur}</span>
            </div>
            <div className="MoreInfo__row">
                <span className="MoreInfo__label">ILS</span>
                <span className="MoreInfo__value">₪ {ils}</span>
            </div>
            <div className="MoreInfo__actions">
                <button type="button" className="MoreInfo__close" onClick={onClose}>CLOSE INFO</button>
            </div>
        </div>
    )
}
export default MoreInfo