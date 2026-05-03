import mySpinner from '../../assets/mySpinner.gif'

const Spinner = () => {
    return (
        <div className="Spinner">
            {<img src={mySpinner} alt="Loading..." />}
        </div>
    )
}
export default Spinner