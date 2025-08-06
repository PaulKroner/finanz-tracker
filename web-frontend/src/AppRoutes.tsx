import { Navigate, Route, Routes, useLocation } from 'react-router'
import LoginPage from './pages/login/LoginPage'
import Dashboard from './pages/dashboard/page'
import DetailsPage from './pages/details/DetailsPage'
import CustomizationPage from './pages/customization/CustomizationPage'
import PrivateRoute from './context/PrivateRoute'
import Layout from './Layout'

const AppRoutes = () => {

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      
      <Route element={<Layout />}>
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
      </Route>

      {/* Unknown routes */}
      <Route path="*" element={<Navigate to="/not-found" replace />} />
    </Routes>
  );
};

export default AppRoutes;
