import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'

const PickupPage = lazy(() =>
  import('./pages/PickupPage').then((module) => ({ default: module.PickupPage })),
)

function PageLoader() {
  return (
    <div className="glass-panel-strong flex min-h-40 items-center justify-center p-8">
      <p className="text-sm text-saferoad-charcoal-soft">Laddar…</p>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/plats/:platsId"
          element={
            <Suspense fallback={<PageLoader />}>
              <PickupPage />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
