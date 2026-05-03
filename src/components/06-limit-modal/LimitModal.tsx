import Modal from "../05-modal/Modal"
import './LimitModal.css'

interface LimitModalProps {
    selectedCoins: string[]
    setSelectedCoins: React.Dispatch<React.SetStateAction<string[]>>
    onClose(): void
    pendingCoin: string | null
}
const LimitModal = (props: LimitModalProps) => {
    const { selectedCoins, setSelectedCoins, onClose, pendingCoin } = props
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
                                setSelectedCoins(prev => {
                                    const updated = prev.filter(id => id !== coin)
                                    if (pendingCoin) {
                                        return [...updated, pendingCoin]
                                    }
                                    return updated
                                })
                                onClose()
                            }}
                        >
                            ✖
                        </button>
                    </div>
                ))}
                <button onClick={onClose}>CLOSE</button>
            </Modal>
        </div>
    )
}
export default LimitModal