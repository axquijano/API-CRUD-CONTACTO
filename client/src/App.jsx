import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from './pages/ProtectedRoute';
import ContactPage from "./pages/ContactPage";
import { ContactProvider } from "./context/ContactContext";
import ContactFormPage from "./pages/ContactFormPage";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <AuthProvider>
      <ContactProvider>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path="/" element={<HomePage></HomePage>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage/>} />

            {/* Rutas protegidas */}
            <Route element={<ProtectedRoute></ProtectedRoute>}>
              <Route path="/contact/phones" element={<ContactPage></ContactPage>} />
              <Route path="/add-contact" element={<ContactFormPage></ContactFormPage>} />
              <Route path="/contact/:id" element={<ContactFormPage></ContactFormPage>} />
              <Route path="/profile" element={<ProfilePage></ProfilePage>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ContactProvider>
      
    </AuthProvider>
    
  );
}

export default App;
