// Importamos React
import React from "react";
import styles from "/src/styles/Footer.module.css"; // Importamos los estilos específicos

// Definimos el componente Footer
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} InventarioApp. Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;
