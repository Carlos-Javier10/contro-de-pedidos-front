// src/components/pedidosj/menus/Solicitado.js
import React, { useState, useEffect } from "react";
import { getPedidosj } from "../../../utils/api"; // Ajusta la ruta según tu estructura
import PedidosjCard from "../PedidosjCard"; // Desde la carpeta 'menus', subimos un nivel para acceder a PedidosjCard
import styles from "../../../styles/PedidoCard.module.css";

const Solicitado = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        setLoading(true);
        const pedidosData = await getPedidosj();
        // Filtra únicamente los pedidos cuyo estado sea "Solicitado"
        const solicitados = pedidosData.filter(
          (pedido) => pedido.estado === "Solicitado"
        );
        setPedidos(solicitados);
      } catch (error) {
        console.error("Error al cargar pedidos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPedidos();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Pedidos Solicitados</h1>
      <div className={styles.pedidosContainer}>
        {loading ? (
          <p>Cargando pedidos...</p>
        ) : pedidos.length > 0 ? (
          pedidos.map((pedido) => (
            <PedidosjCard
              key={pedido.id_pedidoj}
              cliente={pedido.cliente}
              productos={pedido.productos}
              estado={pedido.estado}
              total_pedido={Number(pedido.total_pedido)}
              fecha_creacion={pedido.fecha_creacion}
              detalle={pedido.detalle}
            />
          ))
        ) : (
          <p>No hay pedidos disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default Solicitado;
