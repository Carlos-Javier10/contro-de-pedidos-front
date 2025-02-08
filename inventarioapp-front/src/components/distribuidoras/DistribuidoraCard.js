import React, { useState, useEffect } from "react";
import {
  getDistribuidoras,
  addDistribuidora,
  updateDistribuidora,
  deleteDistribuidora,
} from "/src/utils/api";
import styles from "/src/styles/DistrubidoraCard.module.css";

const DistribuidoraCard = ({ distribuidoras, setDistribuidoras }) => {
  const [nuevaDistribuidora, setNuevaDistribuidora] = useState({
    nombre_distribuidora: "",
  });

  const [editDistribuidora, setEditDistribuidora] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDistribuidoras = async () => {
      try {
        const data = await getDistribuidoras();
        console.log("Distribuidoras obtenidas:", data);

        // Mapear los datos para usar 'id' en lugar de 'id_distribuidora'
        const mappedDistribuidoras = data.map((distribuidora) => ({
          ...distribuidora,
          id: distribuidora.id_distribuidora, // Renombramos id_distribuidora a id
        }));

        setDistribuidoras(mappedDistribuidoras);
      } catch (error) {
        console.error("Error al cargar distribuidoras:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDistribuidoras();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaDistribuidora({
      ...nuevaDistribuidora,
      [name]: value,
    });
  };

  const handleAddDistribuidora = async (e) => {
    e.preventDefault();
    if (nuevaDistribuidora.nombre_distribuidora) {
      try {
        await addDistribuidora(nuevaDistribuidora);
        
        // Refrescar las distribuidoras después de agregar una
        const data = await getDistribuidoras();
        const mappedDistribuidoras = data.map((distribuidora) => ({
          ...distribuidora,
          id: distribuidora.id_distribuidora, // Renombramos id_distribuidora a id
        }));
  
        setDistribuidoras(mappedDistribuidoras);
        setNuevaDistribuidora({ nombre_distribuidora: "" });
      } catch (error) {
        console.error("Error al agregar la distribuidora:", error);
      }
    } else {
      alert("Por favor complete todos los campos.");
    }
  };
  

  const handleEditDistribuidora = (distribuidora) => {
    setEditDistribuidora(distribuidora);
    setNuevaDistribuidora({
      nombre_distribuidora: distribuidora.nombre_distribuidora,
    });
  };

  const handleUpdateDistribuidora = async (e) => {
    e.preventDefault();
    if (nuevaDistribuidora.nombre_distribuidora) {
      try {
        await updateDistribuidora(editDistribuidora.id, nuevaDistribuidora);
        const updatedDistribuidoras = distribuidoras.map((distribuidora) =>
          distribuidora.id === editDistribuidora.id
            ? { ...distribuidora, ...nuevaDistribuidora }
            : distribuidora
        );
        setDistribuidoras(updatedDistribuidoras);
        setNuevaDistribuidora({ nombre_distribuidora: "" });
        setEditDistribuidora(null);
      } catch (error) {
        console.error("Error al actualizar la distribuidora:", error);
      }
    } else {
      alert("Por favor complete todos los campos.");
    }
  };

  const handleCancelEdit = () => {
    setEditDistribuidora(null);
    setNuevaDistribuidora({ nombre_distribuidora: "" });
  };

  // Eliminación de distribuidora
  const handleDeleteDistribuidora = async (id) => {
    if (!id) {
      console.error("ID de distribuidora no válido:", id);
      alert(
        "No se ha podido eliminar la distribuidora debido a un ID inválido."
      );
      return;
    }

    try {
      const result = await deleteDistribuidora(id); // Llama a la API con el ID
      console.log("Resultado de eliminación:", result);

      // Verificar si el backend devuelve éxito
      if (result.success || result.message.includes("eliminada")) {
        alert(result.message);

        // Actualiza el estado eliminando la distribuidora con el ID correspondiente
        setDistribuidoras((prevDistribuidoras) =>
          prevDistribuidoras.filter((distribuidora) => distribuidora.id !== id)
        );
      } else {
        alert("No se pudo eliminar la distribuidora.");
      }
    } catch (error) {
      console.error("Error al eliminar la distribuidora:", error);
      alert("Hubo un problema al eliminar la distribuidora.");
    }
  };

  return (
    <div className={styles.container}>
      <h2>
        {editDistribuidora ? "Editar Distribuidora" : "Agregar Distribuidora"}
      </h2>
      <form
        onSubmit={
          editDistribuidora ? handleUpdateDistribuidora : handleAddDistribuidora
        }
        className={styles.form}
      >
        <div className={styles.formGroup}>
          <label htmlFor="nombre_distribuidora">
            Nombre de la distribuidora:
          </label>
          <input
            type="text"
            id="nombre_distribuidora"
            name="nombre_distribuidora"
            value={nuevaDistribuidora.nombre_distribuidora}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className={styles.boton}>
          {editDistribuidora
            ? "Actualizar Distribuidora"
            : "Agregar Distribuidora"}
        </button>
        {editDistribuidora && (
          <button
            type="button"
            className={styles.cancelButton}
            onClick={handleCancelEdit}
          >
            Cancelar
          </button>
        )}
      </form>

      <h2>Lista de Distribuidoras</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="2">Cargando...</td>
            </tr>
          ) : distribuidoras.length > 0 ? (
            distribuidoras.map((distribuidora) => {
              if (!distribuidora.id) {
                console.error("Distribuidora sin ID detectada:", distribuidora);
                return null; // Ignora las distribuidoras sin ID
              }

              return (
                <tr key={distribuidora.id}>
                  <td>{distribuidora.nombre_distribuidora}</td>
                  <td className={styles.actionButtons}>
                    <button
                      className={styles.botonEditar}
                      onClick={() => handleEditDistribuidora(distribuidora)}
                    >
                      Editar
                    </button>
                    <button
                      className={styles.botonEliminar}
                      onClick={() => {
                        console.log(
                          "ID de distribuidora a eliminar:",
                          distribuidora.id
                        );
                        handleDeleteDistribuidora(distribuidora.id);
                      }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="2">No hay distribuidoras registradas.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DistribuidoraCard;
