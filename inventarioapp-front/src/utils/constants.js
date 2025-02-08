// Base URL de la API
export const API_BASE_URL = "http://localhost:5000/api";

// Mensajes de error comunes
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Hubo un problema con la conexión a la red. Intenta nuevamente.",
  UNAUTHORIZED: "No tienes permisos para realizar esta acción.",
  NOT_FOUND: "El recurso solicitado no fue encontrado.",
};

// Límites y configuraciones de validación
export const VALIDATION_LIMITS = {
  TEXT_MIN_LENGTH: 1,
  TEXT_MAX_LENGTH: 255,
  PRICE_MIN: 0.01,
};
