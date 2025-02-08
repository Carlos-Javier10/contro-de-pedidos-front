//----------Metodos de las distribuidoras-------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------
//Consultar distribuidoras
export const getDistribuidoras = async () => {
  const url = "http://localhost:5000/api/distribuidora/consultar-distribuidoras";
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Error en la respuesta: ${response.statusText} (${response.status})`);
    }

    const data = await response.json();
    console.log("Respuesta de la API:", data);
    return data; // Asegúrate de devolver los datos correctamente
  } catch (error) {
    console.error("Error en fetchDistribuidoras:", error.message);
    throw error;
  }
};

//Agregar distribuidoras
export const addDistribuidora = async (newDistribuidora) => {
  const url = "http://localhost:5000/api/distribuidora/crear-distribuidora"; // Corrige la URL aquí
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newDistribuidora), // Enviar los datos de la distribuidora
    });

    if (!response.ok) {
      throw new Error(`Error al agregar distribuidora: ${response.statusText} (${response.status})`);
    }

    const data = await response.json();
    console.log("Distribuidora agregada:", data);
    return data; // Retorna la distribuidora creada
  } catch (error) {
    console.error("Error en addDistribuidora:", error.message);
    throw error;
  }
};

//Actualizar Distribuidora por id
export const updateDistribuidora = async (id, updatedDistribuidora) => {
  const url = `http://localhost:5000/api/distribuidora/actualizar-distribuidora/${id}`; // URL con el id de la distribuidora
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedDistribuidora), // Enviar los datos actualizados
    });

    if (!response.ok) {
      throw new Error(`Error al actualizar distribuidora: ${response.statusText} (${response.status})`);
    }

    const data = await response.json();
    console.log("Distribuidora actualizada:", data);
    return data; // Retorna la distribuidora actualizada
  } catch (error) {
    console.error("Error en updateDistribuidora:", error.message);
    throw error;
  }
};

//eliminar 
export const deleteDistribuidora = async (id) => {
  const url = `http://localhost:5000/api/distribuidora/eliminar-distribuidora/${id}`; // URL con el id de la distribuidora
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar distribuidora: ${response.statusText} (${response.status})`);
    }

    console.log(`Distribuidora con ID ${id} eliminada`);
    return { message: `Distribuidora con ID ${id} eliminada` }; // Mensaje de éxito
  } catch (error) {
    console.error("Error en deleteDistribuidora:", error.message);
    throw error;
  }
};

//----------Metodos de los Productos------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------
//Consultar Todos los Productos
export const getProductos = async () => {
  const url = "http://localhost:5000/api/producto/consultar-productos"; // Asegúrate de que esta URL esté correcta
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Error en la respuesta: ${response.statusText} (${response.status})`);
    }

    const data = await response.json();
    console.log("Respuesta de la API:", data);
    return data; // Asegúrate de devolver los productos correctamente
  } catch (error) {
    console.error("Error en getProductos:", error.message);
    throw error;
  }
};

//Consultar Producto por ID
export const getProductoById = async (id) => {
  const url = `http://localhost:5000/api/producto/consultar-producto/${id}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Error en la respuesta: ${response.statusText} (${response.status})`);
    }

    const data = await response.json();
    console.log("Respuesta de la API:", data);
    return data; // Asegúrate de devolver el producto correctamente
  } catch (error) {
    console.error("Error en getProductoById:", error.message);
    throw error;
  }
};

//Agregar Producto
export const addProducto = async (newProducto) => {
  const url = "http://localhost:5000/api/producto/crear-producto";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProducto), // Enviar los datos del nuevo producto
    });

    if (!response.ok) {
      throw new Error(`Error al agregar producto: ${response.statusText} (${response.status})`);
    }

    const data = await response.json();
    console.log("Producto agregado:", data);
    return data; // Retorna el producto creado
  } catch (error) {
    console.error("Error en addProducto:", error.message);
    throw error;
  }
};

//Actualizar Producto por ID
export const updateProducto = async (id, updatedProducto) => {
  const url = `http://localhost:5000/api/producto/actualizar-producto/${id}`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProducto), // Enviar los datos actualizados
    });

    if (!response.ok) {
      throw new Error(`Error al actualizar producto: ${response.statusText} (${response.status})`);
    }

    const data = await response.json();
    console.log("Producto actualizado:", data);
    return data; // Retorna el producto actualizado
  } catch (error) {
    console.error("Error en updateProducto:", error.message);
    throw error;
  }
};

//Eliminar Producto
export const deleteProducto = async (id) => {
  const url = `http://localhost:5000/api/producto/eliminar-producto/${id}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar producto: ${response.statusText} (${response.status})`);
    }

    console.log(`Producto con ID ${id} eliminado`);
    return { message: `Producto con ID ${id} eliminado` }; // Mensaje de éxito
  } catch (error) {
    console.error("Error en deleteProducto:", error.message);
    throw error;
  }
};


//----------Métodos de los Pedidosj--------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------
// Consultar Todos los Pedidosj
export const getPedidosj = async () => {
  const url = "http://localhost:5000/api/pedidoj/consultar-pedidoj"; // Asegúrate de que esta URL esté correcta
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Error en la respuesta: ${response.statusText} (${response.status})`);
    }

    const data = await response.json();
    console.log("Respuesta de la API:", data);
    return data; // Asegúrate de devolver los pedidos correctamente
  } catch (error) {
    console.error("Error en getPedidosj:", error.message);
    throw error;
  }
};
// Consultar Pedidoj por ID
export const getPedidojById = async (id) => {
  const url = `http://localhost:5000/api/pedidoj/consultar-pedidoj/${id}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Error en la respuesta: ${response.statusText} (${response.status})`);
    }

    const data = await response.json();
    console.log("Respuesta de la API:", data);
    return data; // Asegúrate de devolver el pedido correctamente
  } catch (error) {
    console.error("Error en getPedidojById:", error.message);
    throw error;
  }
};
// Agregar Pedidoj
export const addPedidoj = async (newPedidoj) => {
  const url = "http://localhost:5000/api/pedidoj/crear-pedidoj";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPedidoj), // Enviar los datos del nuevo pedido
    });

    if (!response.ok) {
      throw new Error(`Error al agregar pedido: ${response.statusText} (${response.status})`);
    }

    const data = await response.json();
    console.log("Pedido agregado:", data);
    return data; // Retorna el pedido creado
  } catch (error) {
    console.error("Error en addPedidoj:", error.message);
    throw error;
  }
};
// Actualizar Pedidoj por ID
export const updatePedidoj = async (id, updatedPedidoj) => {
  const url = `http://localhost:5000/api/pedidoj/actualizar-pedidoj/${id}`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPedidoj), // Enviar los datos actualizados
    });

    if (!response.ok) {
      throw new Error(`Error al actualizar pedido: ${response.statusText} (${response.status})`);
    }

    const data = await response.json();
    console.log("Pedido actualizado:", data);
    return data; // Retorna el pedido actualizado
  } catch (error) {
    console.error("Error en updatePedidoj:", error.message);
    throw error;
  }
}
// Eliminar Pedidoj
export const deletePedidoj = async (id) => {
  const url = `http://localhost:5000/api/pedidoj/eliminar-pedidoj/${id}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar pedido: ${response.statusText} (${response.status})`);
    }

    console.log(`Pedido con ID ${id} eliminado`);
    return { message: `Pedido con ID ${id} eliminado` }; // Mensaje de éxito
  } catch (error) {
    console.error("Error en deletePedidoj:", error.message);
    throw error;
  }
};

