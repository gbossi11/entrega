import React from "react";
import "../../pages/pages.css";
import Logo from "../../assets/images/return.png";

const About = () => {
  return (
    <div className="about-container">
      <img src={Logo} alt="Logo" className="logo-img" />
      <div className="about-header">
        <h1>Sobre Nosotros</h1>
      </div>

      <div className="about-content">
        <p>
          Bienvenidos a <strong>return.</strong>, una marca originaria de La
          Plata, que se especializa en la moda oversized.
        </p>
        <p>
          En <strong>return.</strong> nos apasiona ofrecer ropa que combine
          comodidad y estilo. Creemos que la moda debe ser inclusiva y
          accesible, permitiendo que cada persona exprese su personalidad única.
        </p>
        <p>
          Nuestra misión es proporcionar prendas de alta calidad que no solo se
          vean bien, sino que también te hagan sentir bien. Ya sea que estés
          buscando algo para un evento especial o algo casual para el día a día,
          en <strong>return.</strong> encontrarás lo que necesitas.
        </p>
        <p>
          Gracias por elegirnos y ser parte de nuestra comunidad. ¡Explora
          nuestra colección y descubre lo que <strong>return.</strong> tiene
          para ofrecerte!
        </p>
      </div>
    </div>
  );
};

export default About;
