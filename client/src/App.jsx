import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import ContactFormPage from "./pages/ContactFormPage";
import ContactPage from "./pages/ContactPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from './pages/ProtectedRoute';
const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />

          {/* Rutas protegidas */}
          <Route element={<ProtectedRoute></ProtectedRoute>}>
            <Route path="/contact" element={<ContactPage></ContactPage>} />
            <Route path="/add-contact" element={<ContactFormPage></ContactFormPage>} />
            <Route path="/contact/:id" element={<ContactFormPage></ContactFormPage>} />
            <Route path="/profile" element={<ProfilePage></ProfilePage>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    
  );
}

export default App;
