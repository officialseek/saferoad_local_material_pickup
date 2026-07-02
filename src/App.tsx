import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { PickupPage } from './pages/PickupPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/plats/:platsId" element={<PickupPage />} />
      </Routes>
    </BrowserRouter>
  )
}
