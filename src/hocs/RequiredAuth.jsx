import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const RequiredAuth = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log({ isLoggedIn });
  if (!isLoggedIn) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};
export default RequiredAuth;
