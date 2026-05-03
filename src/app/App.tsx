import { BrowserRouter } from "react-router-dom"
import Layout from "../layout/Layout"

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </div>
  )
}
export default App
