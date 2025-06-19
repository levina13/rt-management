import { createBrowserRouter } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Payment from "./pages/Payment"
import Expense from "./pages/Expense"
import ResidentManagement from "./pages/management/ResidentManagement"
import HouseManagement from "./pages/management/HouseManagement"
import ResidentHistory from "./pages/house-detail/ResidentHistory"
import PaymentHistory from "./pages/house-detail/PaymentHistory"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
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
    children: [],
  },
  {
    path: "/house-management/:houseId/resident-history",
    element: <ResidentHistory />,
  },
  {
    path: "/house-management/:houseId/payment-history",
    element: <PaymentHistory />,
  },
])

export default router
