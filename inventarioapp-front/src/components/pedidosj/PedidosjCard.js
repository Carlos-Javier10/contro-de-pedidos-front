import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getPedidosj, addPedidoj } from "../../utils/api";
import styles from "../../styles/PedidoCard.module.css";

const PedidosjCard = () => {
  const [activeMenu, setActiveMenu] = useState("default");
  const [pedidos, setPedidos] = useState([]);
  const [cliente, setCliente] = useState("");
  const [productosPedido, setProductosPedido] = useState([]);
  const [nombreProducto, setNombreProducto] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [precioUnitario, setPrecioUnitario] = useState("");
  const [estado, setEstado] = useState("Solicitado");
  const [detalle, setDetalle] = useState("");
  const [loading, setLoading] = useState(true);

  const totalPedido = productosPedido.reduce(
    (sum, prod) => sum + Number(prod.totalProducto),
    0
  );

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        setLoading(true);
        const pedidosData = await getPedidosj();
        setPedidos(pedidosData);
      } catch (error) {
        console.error("Error al cargar pedidos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPedidos();
  }, []);

  const handleAgregarProducto = (e) => {
    e.preventDefault();
    if (!nombreProducto.trim() || !cantidad.trim() || !precioUnitario.trim()) {
      alert("Por favor, complete todos los campos para agregar el producto.");
      return;
    }
    const cant = parseFloat(cantidad);
    const precio = parseFloat(precioUnitario);
    const totalProducto = cant * precio;
    const nuevoProducto = {
      nombre: nombreProducto,
      cantidad: cant,
      precioUnitario: precio,
      totalProducto,
    };
    setProductosPedido([...productosPedido, nuevoProducto]);
    setNombreProducto("");
    setCantidad("");
    setPrecioUnitario("");
  };

  const handleAgregarPedido = async (e) => {
    e.preventDefault();
    if (!cliente || productosPedido.length === 0) {
      alert("Debe ingresar el cliente y agregar al menos un producto");
      return;
    }
    const newPedido = {
      cliente,
      productos: productosPedido,
      estado,
      total_pedido: totalPedido,
      detalle,
    };

    try {
      const response = await addPedidoj(newPedido);
      setPedidos([...pedidos, response]);
      setCliente("");
      setProductosPedido([]);
      setEstado("Solicitado");
      setDetalle("");
    } catch (error) {
      console.error("Error al agregar pedido:", error);
    }
  };

  const renderPedidoCard = (pedido) => (
    <div key={pedido.id_pedidoj} className={styles.card}>
      <div className={styles.info}>
        <h3 className={styles.cliente}>Cliente: {pedido.cliente}</h3>
        <div className={styles.productos}>
          <h4>Productos:</h4>
          {pedido.productos && pedido.productos.length > 0 ? (
            pedido.productos.map((prod, index) => (
              <div key={index} className={styles.productoItem}>
                <p>
                  <strong>Nombre:</strong> {prod.nombre}
                </p>
                <p>
                  <strong>Cantidad:</strong> {prod.cantidad}
                </p>
                <p>
                  <strong>Precio Unitario:</strong> $
                  {Number(prod.precioUnitario).toFixed(2)}
                </p>
                <p>
                  <strong>Total:</strong> $
                  {Number(prod.totalProducto).toFixed(2)}
                </p>
              </div>
            ))
          ) : (
            <p>No hay productos</p>
          )}
        </div>
        <p className={styles.estado}>
          <strong>Estado:</strong> {pedido.estado}
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
      </div>
    </div>
  );

  return (
    <>
      <div className={styles.header}>
        <div className={styles.procesosContainer}>
          <div className={styles.links}>
            <Link href="/pedidos/solicitado" legacyBehavior>
              <a>Solicitado</a>
            </Link>
            <a onClick={() => setActiveMenu("procesando")}>Procesando</a>
            <a onClick={() => setActiveMenu("completado")}>Completado</a>
            <a onClick={() => setActiveMenu("cancelado")}>Cancelado</a>
            <a onClick={() => setActiveMenu("default")}>Ver Todos</a>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <>
          <form onSubmit={handleAgregarPedido} className={styles.form}>
            <h3>Agregar Pedido</h3>
            <div>
              <label>Cliente:</label>
              <input
                type="text"
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
                required
              />
            </div>

            <div>
              <h4>Agregar Producto al Pedido</h4>
              <div>
                <label>Nombre del Producto:</label>
                <input
                  type="text"
                  value={nombreProducto}
                  onChange={(e) => setNombreProducto(e.target.value)}
                  placeholder="Nombre del producto"
                />
              </div>
              <div>
                <label>Cantidad:</label>
                <input
                  type="number"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                  placeholder="Cantidad"
                />
              </div>
              <div>
                <label>Precio Unitario:</label>
                <input
                  type="number"
                  value={precioUnitario}
                  onChange={(e) => setPrecioUnitario(e.target.value)}
                  placeholder="Precio unitario"
                />
              </div>
              <button onClick={handleAgregarProducto}>Agregar Producto</button>
            </div>

            <div>
              <h4>Productos en el Pedido:</h4>
              {productosPedido.length > 0 ? (
                <ul>
                  {productosPedido.map((prod, index) => (
                    <li key={index}>
                      {prod.nombre || "(Sin nombre)"} - Cantidad: {prod.cantidad} - Precio: $
                      {Number(prod.precioUnitario).toFixed(2)} - Total: $
                      {Number(prod.totalProducto).toFixed(2)}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No se han agregado productos</p>
              )}
            </div>

            <div>
              <label>Estado:</label>
              <select
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                required
              >
                <option value="Solicitado">Solicitado</option>
                <option value="Procesando">Procesando</option>
                <option value="Completado">Completado</option>
                <option value="Cancelado">Cancelado</option>
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
            <div>
              <p>
                <strong>Total Pedido:</strong> ${Number(totalPedido).toFixed(2)}
              </p>
            </div>
            <button type="submit">Agregar Pedido</button>
          </form>
        </>
      </div>
    </>
  );
};

export default PedidosjCard;