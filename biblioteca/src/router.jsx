import { createBrowserRouter } from "react-router-dom"
import { Home } from "./pages/Home"
import { BookPage } from "./pages/bookPage";
import { RootLayout } from "./pages/layout";

const router  = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children:[
      {
        index:true,
        element:<Home />
      },
      {
        path:"book",
        element:<BookPage/>
      }
  ]
  },
])

export default router;