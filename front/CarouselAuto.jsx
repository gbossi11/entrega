import React from "react";
import { Carousel } from "antd";

const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "black",
};

const CarouselAuto = () => {
  return (
    <div>
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}>
            6 CUOTAS SIN INTERES CON TODAS LAS TARJETAS
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            20% DE DESCUENTO EN PRODUCTOS SELECCIONADOS
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            VIERNES Y SABADOS 10% DE DE DESCUENTO ABONANDO EN EFECTIVO
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>NEW DROP 10 DE AGOSTO</h3>
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselAuto;
