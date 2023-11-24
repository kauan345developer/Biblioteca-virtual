import { createBrowserRouter } from "react-router-dom"
import { Home } from "./pages/Home"
import { BookPage } from "./pages/BookPage";
import { RootLayout } from "./pages/layout";
import { Admin } from "./pages/AdminPage";
import { CreateBook } from "./pages/crud/CreateBook";
import { DeleteBook } from "./pages/crud/DeleteBook";
import { ViewBook } from "./pages/crud/ViewBook";
import { UpdateBook } from "./pages/crud/UpdateBook";
import { BookShelf } from "./pages/crud/BookShelf";
import { Reading } from "./pages/readingPage";
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
        element:<BookPage />
      },{
        path:"book/reading",
        element:<Reading />
      }
  ]
  },{
    path:"admin",
    element:<Admin />,
    children:[
      {
        index:true,element:<CreateBook/>
      },
      {
        path:"del",element:<DeleteBook/>
      },
      {
        path:"view",element:<ViewBook/>
      },
      {
        path:"update",element:<UpdateBook/>
      },
      {
        path:"bookshelf",element:<BookShelf/>
      }
    ]
  }
])

export default router;