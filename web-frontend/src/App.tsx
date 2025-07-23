import './App.css'
import Dashboard from "./pages/dashboard/page"
import Navbar from "./components/navbar/page"
import Footer from './pages/footer/page'
import { ChartUpdateProvider } from './context/ChartUpdateContext'
import { Navigate, Route, Routes } from 'react-router'
import DetailsPage from './pages/details/DetailsPage'

function App() {

  return (
    <>
      <ChartUpdateProvider>
        <main className="w-full flex flex-col min-h-screen px-4 md:px-20 pt-4">

          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/details" element={<DetailsPage />} />

            {/* Catch all unknown routes and redirect to NotFoundPage */}
            <Route path="*" element={<Navigate to="/not-found" replace />} />
          </Routes>

          <Footer />
        </main>
        <section className="sticky bottom-0 w-full">
          <Navbar />
        </section>
      </ChartUpdateProvider>
    </>
  )
}

export default App