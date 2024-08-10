import React from "react";
import "./components.css";
import Logo from "../assets/images/return.png";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-logo">
          <img src={Logo} alt="Logo" className="logo-img-footer" />
          <div className="footer-subscribe">
            <h2>¡Suscríbete para recibir ofertas y novedades!</h2>
            <form>
              <input type="email" placeholder="Ingresa tu Email" required />
              <button type="submit">Suscribirse</button>
            </form>
          </div>
        </div>
        <hr />
        <div className="footer-info">
          <p>
            &copy; {new Date().getFullYear()} return. Todos los derechos
            reservados
          </p>
          <p>Diseñado por Gastón Bossi.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
