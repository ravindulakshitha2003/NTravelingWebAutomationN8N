import { Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import PlannerPage from '../pages/PlannerPage'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/planner" element={<PlannerPage />} />
    </Routes>
  )
}

export default AppRoutes
