import './App.css'
import Dashboard from "./pages/dashboard/page"
import Footer from './pages/footer/page'
import { ChartUpdateProvider } from './context/ChartUpdateContext'
import { Navigate, Route, Routes, useLocation } from 'react-router'
import DetailsPage from './pages/details/DetailsPage'
import { Toaster } from 'sonner'
import CustomizationPage from './pages/customization/CustomizationPage'
import { UserProvider } from './context/useAuth'
import LoginPage from './pages/login/LoginPage'
import PrivateRoute from './context/PrivateRoute'
import Navbar from './components/navbar/page'

const AppContent = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';


  return (
    <>
      <main className="w-full flex flex-col min-h-screen px-4 md:px-20 pt-4">

        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/details"
            element={
              <PrivateRoute>
                <DetailsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/customization"
            element={
              <PrivateRoute>
                <CustomizationPage />
              </PrivateRoute>
            }
          />

          {/* Catch all unknown routes and redirect to NotFoundPage */}
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>

        <Footer />
        {!isLoginPage && (
          <section className="sticky bottom-0 w-full">
            <Navbar />
          </section>
        )}
      </main>
    </>
  )

};

function App() {

  return (
    <>
      <UserProvider>
        <ChartUpdateProvider>
          <AppContent />
        </ChartUpdateProvider>
        <Toaster />
      </UserProvider>
    </>
  )
}

export default App