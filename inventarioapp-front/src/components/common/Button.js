// Importamos React
import React from "react";
import PropTypes from "prop-types";
import styles from "/src/styles/Button.module.css"; // Importamos los estilos específicos

// Componente Button
const Button = ({ label, onClick, type = "button", variant = "primary", disabled = false }) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]}`} // Variantes como primary, secondary
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

// Definimos los tipos de props para validación
Button.propTypes = {
  label: PropTypes.string.isRequired, // Texto que aparecerá en el botón
  onClick: PropTypes.func,            // Función que se ejecutará al hacer clic
  type: PropTypes.oneOf(["button", "submit", "reset"]), // Tipo de botón
  variant: PropTypes.oneOf(["primary", "secondary"]),  // Variantes de estilo
  disabled: PropTypes.bool,          // Estado del botón
};

export default Button;
