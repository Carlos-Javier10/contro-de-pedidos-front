import React from "react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import PedidosjCard from "../../components/pedidosj/PedidosjCard";
import SolicitadoPage from "./Solicitado";

const PedidosPage = () => {
  return (
    <>
      <Header />
      <main style={{ padding: "2rem" }}>
        <h1>Pedidos</h1>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <PedidosjCard />
          <SolicitadoPage />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PedidosPage;