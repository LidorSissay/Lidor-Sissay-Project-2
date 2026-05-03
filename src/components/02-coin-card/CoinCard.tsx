import { useState } from "react"
import type CoinModel from "../../models/CoinModel"
import moreInfoService from "../../services/moreInfoService"
import type CurrentPriceModel from "../../models/CurrentPriceModel"
import MoreInfo from "../03--more-info/MoreInfo"
import Spinner from "../04-spinner/Spinner"
import Modal from "../05-modal/Modal"

interface CoinCardProps {
    coin: CoinModel
    selectedCoins: string[]
    setSelectedCoins: React.Dispatch<React.SetStateAction<string[]>>
    setIsLimitModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    setPendingCoin: React.Dispatch<React.SetStateAction<string | null>>
}
const CoinCard = (props: CoinCardProps) => {
    const [moreInfo, setMoreInfo] = useState<CurrentPriceModel | null>(null)
    const [isInfo, setIsInfo] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { id, image, symbol, name } = props.coin
    const { selectedCoins, setSelectedCoins, setIsLimitModalOpen, setPendingCoin } = props
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
    const closeInfo = (): void => {
        setIsInfo(false)
    }
    return (
        <div className="CoinCard">
            {isLoading && <Spinner />}
            {!isLoading &&
                <>
                    <div><input
                        type="checkbox"
                        checked={selectedCoins.includes(id)}
                        onChange={() => setSelectedCoins(prev => {
                            if (prev.includes(id)) {
                                return prev.filter(coinId => coinId !== id)
                            } if (prev.length === 5) {
                                setIsLimitModalOpen(true)
                                setPendingCoin(id)
                                return prev
                            }
                            return [...prev, id]
                        }
                        )} />
                    </div>
                    <div className="CoinIcon"><img src={image} alt={id} /></div>
                    <div className="CoinName">{name}</div>
                    <div className="CoinSymbol">{symbol.toUpperCase()}</div>
                    <div className="btn"><button onClick={displayInfo} >MORE INFO</button></div>
                </>
            }
            {!isLoading && isInfo && moreInfo &&
                <Modal onClose={closeInfo}>
                    <MoreInfo info={moreInfo} onClose={closeInfo} />
                </Modal>
            }
        </div>
    )
}
export default CoinCard