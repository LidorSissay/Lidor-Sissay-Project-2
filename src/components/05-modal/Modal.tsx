import './Modal.css'

interface ModalProps {
    children: React.ReactNode
    onClose(): void
}
const Modal = (props: ModalProps) => {
    const { children, onClose } = props
    return (
        <div className="Overlay" onClick={onClose}>
            <div className="Modal" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}
export default Modal