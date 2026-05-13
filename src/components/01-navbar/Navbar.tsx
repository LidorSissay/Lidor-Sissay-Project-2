import { NavLink } from "react-router-dom"

const Navbar = () => {
    return (
        <div className="Navbar">
            <nav className="Navbar__inner" aria-label="Main">
                <span className="Navbar__brand">Crypto</span>
                <NavLink to="/home" className={({ isActive }) => (isActive ? "NavLink NavLink--active" : "NavLink")}>Home</NavLink>
                <span className="Navbar__sep" aria-hidden>|</span>
                <NavLink to="/reports" className={({ isActive }) => (isActive ? "NavLink NavLink--active" : "NavLink")}>Reports</NavLink>
                <span className="Navbar__sep" aria-hidden>|</span>
                <NavLink to="/recommendations" className={({ isActive }) => (isActive ? "NavLink NavLink--active" : "NavLink")}>Recommendations</NavLink>
                <span className="Navbar__sep" aria-hidden>|</span>
                <NavLink to="/about" className={({ isActive }) => (isActive ? "NavLink NavLink--active" : "NavLink")}>About</NavLink>
            </nav>
        </div>
    )
}
export default Navbar