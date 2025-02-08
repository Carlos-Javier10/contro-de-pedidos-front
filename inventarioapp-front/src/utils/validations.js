// Validación para campos de texto (mínimo y máximo de caracteres)
export const validateTextField = (text, minLength = 1, maxLength = 255) => {
    if (typeof text !== "string" || text.trim().length < minLength) {
      return `El texto debe tener al menos ${minLength} caracteres.`;
    }
    if (text.length > maxLength) {
      return `El texto no debe superar los ${maxLength} caracteres.`;
    }
    return null; // Validación exitosa
  };
  
  // Validación para precios (debe ser un número positivo)
  export const validatePrice = (price) => {
    if (typeof price !== "number" || price <= 0) {
      return "El precio debe ser un número positivo.";
    }
    return null; // Validación exitosa
  };
  
  // Validación para cantidades (debe ser un número entero positivo)
  export const validateQuantity = (quantity) => {
    if (!Number.isInteger(quantity) || quantity <= 0) {
      return "La cantidad debe ser un número entero positivo.";
    }
    return null; // Validación exitosa
  };

  