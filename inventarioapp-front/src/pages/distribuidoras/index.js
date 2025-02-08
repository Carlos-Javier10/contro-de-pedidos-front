// Importamos los componentes necesarios
import{ useState } from "react";
import Header from "/src/components/common/Header";
import Footer from "/src/components/common/Footer";
import DistribuidoraCard from "/src/components/distribuidoras/DistribuidoraCard";

const DistribuidorasPage = () => {
  const [distribuidoras, setDistribuidoras] = useState([]);
  return (
    <>
      <Header />
      <div>
        <h1>Bienvenido a la Página de Distribuidoras</h1>
        <DistribuidoraCard distribuidoras={distribuidoras} setDistribuidoras={setDistribuidoras}/>
      </div>
      <Footer />
    </>
  );
};

export default DistribuidorasPage;
