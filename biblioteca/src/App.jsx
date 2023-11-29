import { RouterProvider } from "react-router-dom"
import { StockContextBookProvider } from './contexts/StockBookContext.jsx';
import router from "./router.jsx"
function App() {

  return (
      <StockContextBookProvider>
        <RouterProvider router={router} />
      </StockContextBookProvider>
  )
}

export default App
