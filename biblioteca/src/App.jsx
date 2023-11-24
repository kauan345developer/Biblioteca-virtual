import { RouterProvider } from "react-router-dom"
import router from "./router.jsx"
import { StockContextBookProvider } from "./contexts/StockBookContext.jsx"

function App() {

  return (
      <StockContextBookProvider>
        <RouterProvider router={router} />
      </StockContextBookProvider>
  )
}

export default App
