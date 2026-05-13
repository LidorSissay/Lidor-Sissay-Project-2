import { useState } from "react"
import type CoinModel from "../../models/CoinModel"
import moreInfoService from "../../services/moreInfoService"
import type CurrentPriceModel from "../../models/CurrentPriceModel"
import MoreInfo from "../03--more-info/MoreInfo"
import Spinner from "../04-spinner/Spinner"
import Modal from "../05-modal/Modal"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { addCoin, removeCoin } from "../../redux/selected-coins-slice"

interface CoinCardProps {
    coin: CoinModel
    setIsLimitModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    setPendingCoin: React.Dispatch<React.SetStateAction<string | null>>
}
const CoinCard = (props: CoinCardProps) => {
    const [moreInfo, setMoreInfo] = useState<CurrentPriceModel | null>(null)
    const [isInfo, setIsInfo] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isLoaded, setIsLoaded] = useState<boolean>(true)
    const selectedCoins = useAppSelector(state => state.selectedCoinsSlice.coins)
    const dispatch = useAppDispatch()
    const { id, image, symbol, name } = props.coin
    const { setIsLimitModalOpen, setPendingCoin } = props
    const displayInfo = async (): Promise<void> => {
        try {
            if (moreInfo) {
                setIsInfo(true)
                setIsLoaded(true)
                return
            }
            setIsLoading(true)
            const coinInfo = await moreInfoService.getInfo(id)
            setMoreInfo(coinInfo.market_data.current_price)
            setIsLoaded(true)
            setIsInfo(true)

        } catch (e) {
            setIsLoaded(false)
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
            {!isLoading && isLoaded &&
                <>
                    <div><input
                        type="checkbox"
                        checked={selectedCoins.includes(id)}
                        onChange={() => {
                            if (selectedCoins.includes(id)) {
                                dispatch(removeCoin(id))
                                return
                            } if (selectedCoins.length === 5) {
                                setIsLimitModalOpen(true)
                                setPendingCoin(id)
                                return
                            }
                            dispatch(addCoin(id))
                        }
                        } />
                    </div>
                    <div className="CoinIcon"><img src={image} alt={id} /></div>
                    <div className="CoinName">{name}</div>
                    <div className="CoinSymbol">{symbol.toUpperCase()}</div>
                    <div className="btn"><button onClick={displayInfo} >MORE INFO</button></div>
                </>
            }
            {!isLoading && !isLoaded &&
                <div>
                    <h4>ERROR</h4>
                </div>
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