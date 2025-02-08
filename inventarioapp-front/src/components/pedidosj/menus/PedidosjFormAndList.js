// components/PedidosjFormAndList.js
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getPedidosj, addPedidoj } from "../../utils/api";
import styles from "../../styles/PedidoCard.module.css";
import PedidosjCard from "../../components/PedidosjCard";

const PedidosjFormAndList = () => {
  // Estados para pedidos y datos del formulario
  const [pedidos, setPedidos] = useState([]);
  const [cliente, setCliente] = useState("");
  // Los productos se guardarán en un array con objetos: { nombre, cantidad, precioUnitario, totalProducto }
  const [productosPedido, setProductosPedido] = useState([]);

  // Estados para la entrada manual de un producto
  const [nombreProducto, setNombreProducto] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [precioUnitario, setPrecioUnitario] = useState("");

  // Otros estados del pedido
  const [estado, setEstado] = useState("Solicitado"); // Valor por defecto: "Solicitado"
  const [detalle, setDetalle] = useState("");
  const [loading, setLoading] = useState(true);

  // Calcular el total del pedido
  const totalPedido = productosPedido.reduce(
    (sum, prod) => sum + Number(prod.totalProducto),
    0
  );

  // Cargar pedidos al montar el componente
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

  // Función para agregar un producto al pedido (ingresado manualmente)
  const handleAgregarProducto = (e) => {
    e.preventDefault();
    // Convertir los valores a números; si están vacíos, se consideran 0
    const cant = parseFloat(cantidad) || 0;
    const precio = parseFloat(precioUnitario) || 0;
    const totalProducto = cant * precio;
    const nuevoProducto = {
      nombre: nombreProducto, // Puede quedar vacío si no se ingresa valor
      cantidad: cant,
      precioUnitario: precio,
      totalProducto: totalProducto,
    };
    setProductosPedido([...productosPedido, nuevoProducto]);
    // Limpiar campos del producto
    setNombreProducto("");
    setCantidad("");
    setPrecioUnitario("");
  };

  // Función para enviar el pedido al backend
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
      // Limpiar formulario
      setCliente("");
      setProductosPedido([]);
      setEstado("Solicitado");
      setDetalle("");
    } catch (error) {
      console.error("Error al agregar pedido:", error);
    }
  };

  return (
    <>
      {/* Menú global de procesos */}
      <div className={styles.header}>
        <div className={styles.procesosContainer}>
          <div className={styles.links}>
            <Link href="/pedidosj/solicitado">
              <a>Solicitado</a>
            </Link>
            <Link href="/pedidosj/procesando">
              <a>Procesando</a>
            </Link>
            <Link href="/pedidosj/completado">
              <a>Completado</a>
            </Link>
            <Link href="/pedidosj/cancelado">
              <a>Cancelado</a>
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        {/* Formulario para agregar un nuevo pedido */}
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

          {/* Sección para ingresar manualmente productos al pedido */}
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

          {/* Mostrar la lista de productos agregados */}
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
      </div>
    </>
  );
};

export default PedidosjFormAndList;
