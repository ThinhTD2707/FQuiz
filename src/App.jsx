import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/auth/sign-in" />;
  };

  return (
    <Routes>
      <Route path="/dashboard/*" element={<RequireAuth><Dashboard /></RequireAuth>} />
      {/* <Route path="/dashboard/*" element={<Dashboard />} /> */}
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
  );
}

export default App;
