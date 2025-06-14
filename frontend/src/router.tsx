import { createBrowserRouter } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Payment from "./pages/Payment"
import Expense from "./pages/Expense"
import ResidentManagement from "./pages/ResidentManagement"
import HouseManagement from "./pages/HouseManagement"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    // children: [{ path: "/house-management", element: <HouseManagement /> }],
  },
  {
    path: "/payment",
    element: <Payment />,
  },
  {
    path: "/expense",
    element: <Expense />,
  },
  {
    path: "/resident-management",
    element: <ResidentManagement />,
  },
  {
    path: "/house-management",
    element: <HouseManagement />,
  },
])

export default router
