import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/main.scss";
import WelcomePage from "./pages/WelcomePage";
import Page1 from "./pages/Content/Page1";
import Page2 from "./pages/Content/Page2";
import Page3 from "./pages/Content/Page3";
import Page4 from "./pages/Content/Page4";
import Page5 from "./pages/Content/Page5";
import Page6 from "./pages/Content/Page6";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute"; // import component ที่เราเพิ่งสร้าง
import PrivateAdminRoute from "./components/PrivateAdminRoute"; // import component ที่เราเพิ่งสร้าง

import UserPage from "./pages/admin/UserPage";
import SurveyPage from "./pages/admin/SurveyPage";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer position="bottom-center" autoClose={2000} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/unauthorized" element={<ErrorPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/welcome" element={<PrivateRoute><WelcomePage /></PrivateRoute>} />
          <Route path="/page1" element={<PrivateRoute><Page1 /></PrivateRoute>} />
          <Route path="/page2" element={<PrivateRoute><Page2 /></PrivateRoute>} />
          <Route path="/page3" element={<PrivateRoute><Page3 /></PrivateRoute>} />
          <Route path="/page4" element={<PrivateRoute><Page4 /></PrivateRoute>} />
          <Route path="/page5" element={<PrivateRoute><Page5 /></PrivateRoute>} />
          <Route path="/page6" element={<PrivateRoute><Page6 /></PrivateRoute>} />

          <Route path="/admin/user" element={<PrivateAdminRoute requiredRole="admin"><UserPage /></PrivateAdminRoute>} />
          <Route path="/admin/survey" element={<PrivateAdminRoute requiredRole="admin"><SurveyPage /></PrivateAdminRoute>} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
