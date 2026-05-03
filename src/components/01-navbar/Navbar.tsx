import { NavLink } from "react-router-dom"

const Navbar = () => {
    return (
        <div className="Navbar">
            <NavLink to="/home"> Home </NavLink> |
            <NavLink to="/reports"> Reports </NavLink> |
            <NavLink to="/ai"> AI </NavLink> |
            <NavLink to="/about"> About </NavLink>
        </div>
    )
}
export default Navbar