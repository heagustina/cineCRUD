export default class Peliculas {
  #id;
  #nombre;
  #genero;
  #duracion;
  #imagen;
  #descripcion;

  constructor(nombre, genero, formato, duracion, imagen, descripcion) {
    this.#id = crypto.randomUUID();
    this.#nombre = nombre;
    this.#genero = genero;
    this.#duracion = duracion;
    this.#imagen = imagen;
    this.#descripcion = descripcion;
  }

  get id() {
    return this.#id;
  }

  get nombre() {
    return this.#nombre;
  }

  get genero() {
    return this.#genero;
  }

  get duracion() {
    return this.#duracion;
  }

  get imagen() {
    return this.#imagen;
  }

  get descripcion() {
    return this.#descripcion;
  }

  set nombre(nuevoNombre) {
    this.#nombre = nuevoNombre;
  }

  set genero(nuevoGenero) {
    this.#genero = nuevoGenero;
  }

  set duracion(nuevaDuracion) {
    this.#duracion = nuevaDuracion;
  }

  set imagen(nuevaImagen) {
    this.#imagen = nuevaImagen;
  }

  set descripcion(nuevaDescripcion) {
    this.#descripcion = nuevaDescripcion;
  }

  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      genero: this.genero,
      duracion: this.duracion,
      imagen: this.imagen,
      descripcion: this.descripcion,
    };
  }
}
