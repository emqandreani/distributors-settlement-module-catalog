export const STATUS = {
  SUCCESSFUL: "SUCCESSFUL",
  FAILED: "FAILED",
  PENDING: "PENDING",
};

export const MESSAGE_STATUS = new Map<number, string>();

MESSAGE_STATUS.set(400, "No hemos podido procesar tu solicitud");
MESSAGE_STATUS.set(401, "Error de autenticación. Intente iniciar sesión nuevamente");
MESSAGE_STATUS.set(404, "No existe respuesta a tu solicitud");
MESSAGE_STATUS.set(500, "Ha ocurrido un error interno.");
