import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { FloatButton, ConfigProvider } from "antd";
import { WhatsAppOutlined } from "@ant-design/icons";

// IMPORT COMPONENTES
import HeaderTop from "./components/HeaderTop";
import HeaderMid from "./components/HeaderMid";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// IMPORT PAGES
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Admin from "./pages/Admin/Admin";
import Account from "./pages/Account/Account";
import Products from "./pages/Products/Products";
import About from "./pages/About/About";

function App() {
  return (
    <Router>
      <div>
        <HeaderTop />
        <HeaderMid />
        <Nav />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/About" element={<About />} />
          <Route
            path="/Administrador"
            element={
              <ProtectedRoute requiredRole="admin">
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route
            path="/MiCuenta"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
        </Routes>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#00b96b",
            },
          }}
        >
          <FloatButton
            icon={<WhatsAppOutlined />}
            type="primary"
            href="https://wa.me/"
            style={{ right: 94 }}
          />
        </ConfigProvider>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
