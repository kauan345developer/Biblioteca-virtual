import { RouterProvider } from "react-router-dom"
import React from 'react';
import { StockContextBookProvider } from './contexts/StockBookContext.jsx';

function App() {

  return (
      <StockContextBookProvider>
        <RouterProvider router={router} />
      </StockContextBookProvider>
  )
}

export default App
