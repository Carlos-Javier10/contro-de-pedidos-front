// Importamos los componentes necesarios
import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const HomePage = () => {
  return (
    <>
      {/* Aquí se incluye el Header de la página */}
      <Header />
      
      {/* Main con contenido de la página */}
      <main style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Bienvenido a InventarioApp</h1>
        <p>Gestión eficiente de productos, ventas y finanzas en un solo lugar.</p>
      </main>
      
      {/* Aquí se incluye el Footer de la página */}
      <Footer />
    </>
  );
};

export default HomePage;
