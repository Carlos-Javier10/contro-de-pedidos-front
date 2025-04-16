import React, { useState, useEffect } from "react";
import { getPedidosj, updatePedidojEstado } from "../../utils/api";
import styles from "../../styles/PedidoCard.module.css";

const SolicitadoPage = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        setLoading(true);
        const pedidosData = await getPedidosj();
        // Filtrar los pedidos con estado "Solicitado"
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

  const handleEstadoChange = async (id, nuevoEstado) => {
    try {
      await updatePedidojEstado(id, nuevoEstado);
      setPedidos((prevPedidos) =>
        prevPedidos.map((pedido) =>
          pedido.id_pedidoj === id ? { ...pedido, estado: nuevoEstado } : pedido
        )
      );
    } catch (error) {
      console.error("Error al actualizar el estado del pedido:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Pedidos Solicitados</h1>
      <div className={styles.pedidosContainer}>
        {loading ? (
          <p>Cargando pedidos...</p>
        ) : pedidos.length > 0 ? (
          pedidos.map((pedido) => (
            <div key={pedido.id_pedidoj} className={styles.card}>
              <div className={styles.info}>
                <h3 className={styles.cliente}>Cliente: {pedido.cliente}</h3>
                <div className={styles.productos}>
                  <h4>Productos:</h4>
                  {pedido.productos && pedido.productos.length > 0 ? (
                    <table className={styles.productosTabla}>
                      <thead>
                        <tr>
                          <th>Nombre</th>
                          <th>Cantidad</th>
                          <th>Precio Unitario</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pedido.productos.map((prod, index) => (
                          <tr key={index}>
                            <td>{prod.nombre}</td>
                            <td>{prod.cantidad}</td>
                            <td>${Number(prod.precioUnitario).toFixed(2)}</td>
                            <td>${Number(prod.totalProducto).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>No hay productos</p>
                  )}
                </div>
                <p className={styles.estado}>
                  <strong>Estado:</strong>
                  <select
                    value={pedido.estado}
                    onChange={(e) => handleEstadoChange(pedido.id_pedidoj, e.target.value)}
                  >
                    <option value="Solicitado">Solicitado</option>
                    <option value="Procesando">Procesando</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </p>
                <p className={styles.total}>
                  <strong>Total Pedido:</strong> ${Number(pedido.total_pedido).toFixed(2)}
                </p>
                <p className={styles.fecha}>
                  <strong>Fecha:</strong>{" "}
                  {new Date(pedido.fecha_creacion).toLocaleDateString("en-US")}
                </p>
                {pedido.detalle && (
                  <p className={styles.detalle}>
                    <strong>Detalle:</strong> {pedido.detalle}
                  </p>
                )}
                <div className={styles.cardActions}>
                  <button
                    className={styles.updateButton}
                    onClick={() => handleEstadoChange(pedido.id_pedidoj, pedido.estado)}
                  >
                    Actualizar
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No hay pedidos disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default SolicitadoPage;