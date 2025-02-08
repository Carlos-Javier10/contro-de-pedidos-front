import React, { useState, useEffect } from "react";
import { getPedidos, addPedido, getProductos } from "/src/utils/api"; // Incluye la función getProductos
import styles from "/src/styles/PedidoCard.module.css"; // Estilos CSS

// Componente PedidoCard
const PedidoCard = ({ producto, cantidad, estado, fecha, detalle }) => {
  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <h3 className={styles.producto}>Producto: {producto || "Sin nombre"}</h3>
        <p className={styles.cantidad}>Cantidad: {cantidad}</p>
        <p className={styles.estado}>Estado: {estado}</p>
        <p className={styles.fecha}>Fecha: {new Date(fecha).toLocaleDateString()}</p>
        {detalle && <p className={styles.detalle}>Detalle: {detalle}</p>}
      </div>
    </div>
  );
};

// Componente principal PedidoFormAndList
const PedidoFormAndList = () => {
  const [pedidos, setPedidos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [productoId, setProductoId] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [estado, setEstado] = useState("solicitado"); // Estado predeterminado
  const [detalle, setDetalle] = useState("");
  const [loading, setLoading] = useState(true);

  // Cargar pedidos y productos al montar el componente
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);

        // Cargar pedidos
        const pedidosData = await getPedidos();
        setPedidos(pedidosData.data); // Asegúrate de usar `.data` si la respuesta lo incluye

        // Cargar productos
        const productosData = await getProductos();
        setProductos(productosData.data); // Asegúrate de usar `.data` si la respuesta lo incluye
      } catch (error) {
        console.error("Error al cargar datos iniciales:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Función para agregar un nuevo pedido
  const handleAddPedido = async (event) => {
    event.preventDefault();

    const newPedido = {
      id_producto: productoId,
      cantidad_productos_pedidos: cantidad,
      estado_pedido: estado,
      detalle: detalle,
      fecha_pedido: new Date().toISOString(),
    };

    try {
      const data = await addPedido(newPedido);
      setPedidos([...pedidos, data]); // Agregar el nuevo pedido a la lista
      // Limpiar el formulario
      setProductoId("");
      setCantidad("");
      setEstado("solicitado"); // Restablecer al estado predeterminado
      setDetalle("");
    } catch (error) {
      console.error("Error al agregar pedido:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Pedidos</h2>

      {/* Formulario para agregar pedidos */}
      <form onSubmit={handleAddPedido} className={styles.form}>
        <h3>Agregar Pedido</h3>
        <div>
          <label>Producto:</label>
          <select
            value={productoId}
            onChange={(e) => setProductoId(e.target.value)}
            required
          >
            <option value="">Seleccionar producto</option>
            {productos.map((producto) => (
              <option key={producto.id_producto} value={producto.id_producto}>
                {producto.nombre_producto}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Cantidad:</label>
          <input
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Estado:</label>
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            required
          >
            <option value="solicitado">Solicitado</option>
            <option value="procesando">Procesando</option>
            <option value="completado">Completado</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>
        <div>
          <label>Detalle (opcional):</label>
          <input
            type="text"
            value={detalle}
            onChange={(e) => setDetalle(e.target.value)}
          />
        </div>
        <button type="submit">Agregar Pedido</button>
      </form>

      {/* Lista de tarjetas de pedidos */}
      <div className={styles.pedidosContainer}>
        {loading ? (
          <p>Cargando pedidos...</p>
        ) : pedidos.length > 0 ? (
          pedidos.map((pedido) => (
            <PedidoCard
              key={pedido.id_pedido}
              producto={productos.find((p) => p.id_producto === pedido.id_producto)?.nombre_producto}
              cantidad={pedido.cantidad_productos_pedidos}
              estado={pedido.estado_pedido}
              fecha={pedido.fecha_pedido}
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

export default PedidoFormAndList;
