// Importamos las librerías necesarias
import React from "react";
import Link from "next/link";
import styles from "/src/styles/Header.module.css"; // Importamos los estilos específicos

// Definimos el componente Header
const Header = () => {
  return (
    <header className={styles.header}>
      {/* Logo y nombre del sitio */}
      <div className={styles.logo}>
        <Link href="/">SuperOnline</Link> {/* No es necesario usar <a> */}
      </div>

      {/* Menú de navegación */}
      <nav>
        <ul className={styles.navList}>
          <li>
            <Link href="/productos">Productos</Link> {/* No es necesario usar <a> */}
          </li>
          <li>
            <Link href="/pedidos">Pedidos</Link> {/* No es necesario usar <a> */}
          </li>
          <li>
            <Link href="/ventas">Ventas</Link> {/* No es necesario usar <a> */}
          </li>
          <li>
            <Link href="/finanzas">Finanzas</Link> {/* No es necesario usar <a> */}
          </li>
          <li>
            <Link href="/distribuidoras">Distribuidoras</Link> {/* No es necesario usar <a> */}
          </li>
          
        </ul>
      </nav>
    </header>
  );
};

export default Header;
