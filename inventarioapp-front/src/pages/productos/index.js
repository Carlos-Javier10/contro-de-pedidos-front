// Importamos los componentes necesarios
import{ useState } from "react";
import Header from "/src/components/common/Header";
import Footer from "/src/components/common/Footer";
import ProductoCard from "/src/components/productos/ProductoCard";



const ProductosPage = () => {
  const [productos, setProductos] = useState([]);

  return (
    <>
    <Header/>
    <div>
      <h1>Gestión de Productos</h1>
      <ProductoCard productos={productos} setProductos={setProductos} />
    </div>
    <Footer />
    </>
  );
};

export default ProductosPage;
