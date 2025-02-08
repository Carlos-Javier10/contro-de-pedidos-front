// Importamos los componentes necesarios
import React from "react";
import Header from "/src/components/common/Header";
import Footer from "/src/components/common/Footer";
import VentaCard from "/src/components/ventas/VentaCard";

// Datos simulados (puedes reemplazarlos con datos reales más adelante)
const ventas = [
  {
    id: 1,
    cliente: "Juan Pérez",
    fecha: "2024-11-16",
    total: 150.0,
    productos: [
      { nombre: "Producto A", cantidad: 2, precio: 25.0 },
      { nombre: "Producto B", cantidad: 1, precio: 100.0 },
    ],
  },
  {
    id: 2,
    cliente: "María García",
    fecha: "2024-11-15",
    total: 75.0,
    productos: [{ nombre: "Producto C", cantidad: 3, precio: 25.0 }],
  },
];

const VentasPage = () => {
  return (
    <>
      <Header />
      <main style={{ padding: "2rem" }}>
        <h1>Ventas</h1>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {ventas.map((venta) => (
            <VentaCard
              key={venta.id}
              cliente={venta.cliente}
              fecha={venta.fecha}
              total={venta.total}
              productos={venta.productos}
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default VentasPage;
