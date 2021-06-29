class Padre {
  constructor(id, titulo, transaccion, descripcion, precio) {
    this.id = id;
    this.titulo = titulo;
    this.transaccion = transaccion;
    this.descripcion = descripcion;
    this.precio = precio;
  }
}
export default class Hija extends Padre {
  constructor(
    id,
    titulo,
    transaccion,
    descripcion,
    precio,
    puertas,
    kms,
    potencia
  ) {
    super(id, titulo, transaccion, descripcion, precio);
    this.puertas = puertas;
    this.kms = kms;
    this.potencia = potencia;
  }
}
