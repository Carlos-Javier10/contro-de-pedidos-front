// Importamos los componentes necesarios
import React from "react";
import Header from "/src/components/common/Header";
import Footer from "/src/components/common/Footer";
import PedidosjCard from "/src/components/pedidosj/PedidosjCard";

const PedidosPage = () => {
  return (
    <>
      <Header />
      <main style={{ padding: "2rem" }}>
        <h1>Pedidos</h1>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <PedidosjCard></PedidosjCard>
       
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PedidosPage;
