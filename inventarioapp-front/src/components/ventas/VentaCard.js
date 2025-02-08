// Importamos las librerías necesarias
import React from "react";
import PropTypes from "prop-types";
import styles from "/src/styles/VentaCard.module.css"; // Importamos los estilos específicos

// Definimos el componente VentaCard
const VentaCard = ({ cliente, fecha, total, productos }) => {
  return (
    <div className={styles.card}>
      {/* Información principal de la venta */}
      <div className={styles.info}>
        <h3 className={styles.cliente}>Cliente: {cliente}</h3>
        <p className={styles.fecha}>Fecha: {new Date(fecha).toLocaleDateString()}</p>
        <p className={styles.total}>Total: ${total.toFixed(2)}</p>
      </div>

      {/* Lista de productos */}
      <div className={styles.productos}>
        <h4>Productos:</h4>
        <ul>
          {productos.map((producto, index) => (
            <li key={index} className={styles.producto}>
              {producto.nombre} - {producto.cantidad}x (${producto.precio.toFixed(2)} c/u)
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// PropTypes para validar las propiedades del componente
VentaCard.propTypes = {
  cliente: PropTypes.string.isRequired,      // Nombre del cliente
  fecha: PropTypes.string.isRequired,        // Fecha de la venta
  total: PropTypes.number.isRequired,        // Total de la venta
  productos: PropTypes.arrayOf(              // Lista de productos vendidos
    PropTypes.shape({
      nombre: PropTypes.string.isRequired,   // Nombre del producto
      cantidad: PropTypes.number.isRequired, // Cantidad del producto
      precio: PropTypes.number.isRequired,   // Precio del producto
    })
  ).isRequired,
};

export default VentaCard;
