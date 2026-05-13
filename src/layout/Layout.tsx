import { Navigate, Route, Routes } from "react-router-dom"
import Home from "../pages/01-home/Home"
import Reports from "../pages/02-reports/Reports"
import Recommendations from "../pages/03-recommendations/Recommendations"
import About from "../pages/04-about/About"
import NotFound from "../pages/05-not-found/NotFound"
import Navbar from "../components/01-navbar/Navbar"

const Layout = () => {
    return (
        <div className="Layout">
            <Navbar />
            <main className="PageBody">
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/recommendations" element={<Recommendations />} />
                    <Route path="/about" element={<About />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
        </div>
    )
}
export default Layout