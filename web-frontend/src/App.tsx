import './App.css'
import Dashboard from "./pages/dashboard/page"
import Navbar from "./components/navbar/page"
import Footer from './pages/footer/page'
import { ChartUpdateProvider } from './context/ChartUpdateContext'
import { Navigate, Route, Routes } from 'react-router'
import DetailsPage from './pages/details/DetailsPage'
import { Toaster } from 'sonner'
import CustomizationPage from './pages/customization/CustomizationPage'

function App() {

  return (
    <>
      <ChartUpdateProvider>
        <Navbar />
        <main className="w-full flex flex-col min-h-screen px-4 pt-4 pb-28 md:pb-6 md:pl-72 md:pr-8 lg:pr-12">

          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/details" element={<DetailsPage />} />
            <Route path="/customization" element={<CustomizationPage />} />

            {/* Catch all unknown routes and redirect to NotFoundPage */}
            <Route path="*" element={<Navigate to="/not-found" replace />} />
          </Routes>

          <Footer />
        </main>
      </ChartUpdateProvider>
      <Toaster />
    </>
  )
}

export default App
