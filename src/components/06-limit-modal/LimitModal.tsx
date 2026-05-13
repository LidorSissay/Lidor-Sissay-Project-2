import Modal from "../05-modal/Modal"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { addCoin, removeCoin } from "../../redux/selected-coins-slice"
import './LimitModal.css'

interface LimitModalProps {
    onClose(): void
    pendingCoin: string | null
}
const LimitModal = (props: LimitModalProps) => {
    const selectedCoins = useAppSelector(state => state.selectedCoinsSlice.coins)
    const dispatch = useAppDispatch()
    const { onClose, pendingCoin } = props
    return (
        <div className="LimitModal">
            <Modal onClose={onClose}>
                <h3>Maximum Coins Reached</h3>
                <p>You can select up to 5 coins for comparison. To add {pendingCoin!.toUpperCase()}, please choose one to remove:</p>
                {selectedCoins.map(coin => (
                    <div key={coin}>
                        <span>{coin}</span>
                        <button
                            className="remove-btn"
                            onClick={() => {
                                dispatch(removeCoin(coin))
                                if (pendingCoin) {
                                    dispatch(addCoin(pendingCoin))
                                }
                                onClose()
                            }}
                        >
                            ✖
                        </button>
                    </div>
                ))
                }
                <button onClick={onClose}>CLOSE</button>
            </Modal >
        </div >
    )
}
export default LimitModal