import { Navigate, useLocation } from "react-router";
import { useAuth } from "../context/useAuth";

type Props = {
  children: React.ReactNode;
};

const PrivateRoute = ({ children }: Props) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  return isLoggedIn() ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
