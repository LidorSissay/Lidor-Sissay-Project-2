import { BrowserRouter } from "react-router-dom"
import Layout from "../layout/Layout"
import { Provider as Redux } from "react-redux"
import store from "../components/07-redux/store"

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Redux store={store}>
          <Layout />
        </Redux>
      </BrowserRouter>
    </div>
  )
}
export default App
