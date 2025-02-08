// Importamos los componentes necesarios
import React from "react";
import Header from "/src/components/common/Header";
import Footer from "/src/components/common/Footer";

const FinanzasPage = () => {
  return (
    <>
      <Header />
      <main style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Gestión de Finanzas</h1>
        <p>Administra los ingresos, egresos y balances de tu inventario fácilmente.</p>
      </main>
      <Footer /> 
    </>
  );
};

export default FinanzasPage;
