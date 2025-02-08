import React, { useState, useEffect } from "react";
import {
  getProductos,
  getDistribuidoras,
  addProducto,
  deleteProducto,
  updateProducto, // Nueva función para actualizar el producto
} from "/src/utils/api";
import styles from "/src/styles/ProductoCard.module.css";

const ProductoCard = () => {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre_producto: "",
    unidades: "",
    precio_compra_unit: "",
    pvp: "",
    precio_marcado: "",
    id_distribuidora: "",
  });

  const [distribuidoras, setDistribuidoras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productoEditado, setProductoEditado] = useState(null); // Producto que se está editando

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const distribuidorasData = await getDistribuidoras();
        const productosResponse = await getProductos();
        const productosData = productosResponse.data;
        setDistribuidoras(distribuidorasData);
        setProductos(productosData);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (productoEditado) {
      setProductoEditado({ ...productoEditado, [name]: value });
    } else {
      setNuevoProducto({ ...nuevoProducto, [name]: value });
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await addProducto(nuevoProducto);
      const productosResponse = await getProductos();
      setProductos(productosResponse.data);
      setNuevoProducto({
        nombre_producto: "",
        unidades: "",
        precio_compra_unit: "",
        pvp: "",
        precio_marcado: "",
        id_distribuidora: "",
      });
    } catch (error) {
      console.error("Error al agregar el producto:", error);
    }
  };

  const handleEditProduct = (producto) => {
    setProductoEditado(producto); // Carga los datos del producto en el formulario
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      await updateProducto(productoEditado.id_producto, productoEditado); // Actualiza el producto en la API
      const productosResponse = await getProductos(); // Actualiza los productos desde la API
      setProductos(productosResponse.data);
      setProductoEditado(null); // Limpia el formulario de edición
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProducto(id);
      setProductos(productos.filter((producto) => producto.id_producto !== id));
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>{productoEditado ? "Editar Producto" : "Agregar Producto"}</h2>
      <form
        onSubmit={productoEditado ? handleSaveEdit : handleAddProduct}
        className={styles.form}
      >
        <div className={styles.formGroup}>
          <label htmlFor="nombre_producto">Nombre del producto:</label>
          <input
            type="text"
            id="nombre_producto"
            name="nombre_producto"
            value={
              productoEditado
                ? productoEditado.nombre_producto
                : nuevoProducto.nombre_producto
            }
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="precio_compra_unit">Precio de compra:</label>
          <input
            type="number"
            id="precio_compra_unit"
            name="precio_compra_unit"
            value={
              productoEditado
                ? productoEditado.precio_compra_unit
                : nuevoProducto.precio_compra_unit
            }
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="unidades">Unidades disponibles:</label>
          <input
            type="number"
            id="unidades"
            name="unidades"
            value={
              productoEditado ? productoEditado.unidades : nuevoProducto.unidades
            }
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="pvp">Precio de venta al público:</label>
          <input
            type="number"
            id="pvp"
            name="pvp"
            value={
              productoEditado ? productoEditado.pvp : nuevoProducto.pvp
            }
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="precio_marcado">Precio marcado:</label>
          <input
            type="number"
            id="precio_marcado"
            name="precio_marcado"
            value={
              productoEditado
                ? productoEditado.precio_marcado
                : nuevoProducto.precio_marcado
            }
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="id_distribuidora">Distribuidora:</label>
          <select
            id="id_distribuidora"
            name="id_distribuidora"
            value={
              productoEditado
                ? productoEditado.id_distribuidora
                : nuevoProducto.id_distribuidora
            }
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccione una distribuidora</option>
            {loading ? (
              <option value="">Cargando...</option>
            ) : (
              distribuidoras.map((distribuidora) => (
                <option
                  key={distribuidora.id_distribuidora}
                  value={distribuidora.id_distribuidora}
                >
                  {distribuidora.nombre_distribuidora}
                </option>
              ))
            )}
          </select>
        </div>

        <button type="submit" className={styles.boton}>
          {productoEditado ? "Guardar Cambios" : "Agregar Producto"}
        </button>
      </form>

      <h2>Inventario de Productos</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Precio de Compra</th>
            <th>Precio Marcado</th>
            <th>PVP</th>
            <th>Distribuidora</th>
            <th>Ganancia Unitaria</th>
            <th>Ganancia Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="9">Cargando productos...</td>
            </tr>
          ) : productos.length > 0 ? (
            productos.map((producto, index) => (
              <tr key={producto.id_producto || index}>
                <td>{producto.nombre_producto}</td>
                <td>{producto.unidades}</td>
                <td>{producto.precio_compra_unit}</td>
                <td>{producto.precio_marcado}</td>
                <td>{producto.pvp}</td>
                <td>{producto.nombre_distribuidora}</td>
                <td>{producto.ganancia_unitaria}</td>
                <td>{producto.ganancia_total}</td>
                <td>
                  <button
                    onClick={() => handleEditProduct(producto)}
                    className={styles.editButton}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(producto.id_producto)}
                    className={styles.deleteButton}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No hay productos en el inventario.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductoCard;
