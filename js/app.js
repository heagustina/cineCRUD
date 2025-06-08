import Peliculas from "./classCine.js";

//FUNCIONES
const abrirModal = () => {
  modalPelicula.show();
  creandoPelicula = true;
  modificarTituloyBtnModal(funcionEditar);
};

//CREATE
const crearPelicula = () => {
  if (validaciones()) {
    const peliculaNueva = new Peliculas(
      inputNombre.value,
      inputGenero.value,
      inputDuracion.value,
      inputImagen.value,
      inputDescripcion.value
    );

    //para cambiar nombre a btn
    funcionEditar = false;

    pelicula.push(peliculaNueva);
    console.log(pelicula);
    guardarLocalStorage();

    dibujarFila(peliculaNueva, pelicula.length);

    limpiarFormulario();
    Swal.fire({
      title: "Pelicula creada",
      text: `La pelicula ${peliculaNueva.nombre} fue creada correctamente`,
      icon: "success",
    });
  }
};

const limpiarFormulario = () => {
  formularioPelicula.reset();
  const inputs = formularioPelicula.querySelectorAll(".form-control");
  inputs.forEach((input) => {
    input.classList.remove("is-valid", "is-invalid");
  });
};

const guardarLocalStorage = () => {
  localStorage.setItem("peliculaKey", JSON.stringify(pelicula));
};
//FIN 

//READ,
const cargarDatosTabla = () => {
    if (pelicula.length != 0) {
    }
  
    pelicula.map((pelicula, indice) => {
      dibujarFila(pelicula, indice + 1);
    });
  };
  
  const dibujarFila = (pelicula, indice) => {
    tablaPeliculas.innerHTML += `
     <tr>
          <th scope="row">${indice}</th>
          <td>${pelicula.nombre}</td>
          <td>${pelicula.genero}</td>
          <td>${pelicula.duracion}</td>
          <td>
            <button class="btn btn-warning mb-1" onclick="prepararPelicula('${pelicula.id}')">Editar</button>
              <button class="btn btn-danger mb-1" onclick="eliminarPelicula('${pelicula.id}')">Borrar</button>
            <button class="btn btn-info mb-1"  onclick="verPelicula('${pelicula.id}')">Ver</button>
            </td>
        </tr>
    `;
  };
  //FIN

  //DELETE
window.eliminarPelicula = (id) => {
    Swal.fire({
      title: "Estas por eliminar un contacto",
      text: "si decides eliminar, no puedes revertir este paso",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#57cc99",
      cancelButtonColor: "#d00000",
      confirmButtonText: "Borrar",
      cancelButtonText: "Salir",
    }).then((result) => {
      if (result.isConfirmed) {
        const posicionPeliculaBuscada = pelicula.findIndex(
          (pelicula) => pelicula.id === id
        );
        pelicula.splice(posicionPeliculaBuscada, 1);
  
        guardarLocalStorage();
        //actualizar tabla
        tablaPeliculas.children[posicionPeliculaBuscada].remove();
        const filasRestantes = tablaPeliculas.children;
        for (let i = 0; i < filasRestantes.length; i++) {
          const celdaIndice = filasRestantes[i].querySelector("th");
          if (celdaIndice) {
            celdaIndice.textContent = i + 1; // Actualiza el texto con el nuevo índice
          }
        }
      }
    });
  };
  //FIN

  // UPDATE
window.prepararPelicula = (id) => {
    const peliculaBuscada = pelicula.find((pelicula) => pelicula.id === id); //devuelve un objeto si cumple con la condicion, si hay vario devuelve el primero
  
    inputNombre.value = peliculaBuscada.nombre;
    inputGenero.value = peliculaBuscada.genero;
    inputDuracion.value = peliculaBuscada.duracion;
    inputImagen.value = peliculaBuscada.imagen;
    inputDescripcion.value = peliculaBuscada.descripcion;
  
    //para cambiar nombre a btn
    funcionEditar = true;
    modificarTituloyBtnModal(funcionEditar);
    abrirModal();
  
    idPelilulaEditar = id;
    creandoPelicula = false;
  };
  
  const editarPelicula = () => {
    if (validaciones()) {
      const posicionPelicula = pelicula.findIndex(
        (pelicula) => pelicula.id === idPelilulaEditar
      );
      pelicula[posicionPelicula].nombre = inputNombre.value;
      pelicula[posicionPelicula].genero = inputGenero.value;
      pelicula[posicionPelicula].duracion = inputDuracion.value;
      pelicula[posicionPelicula].imagen = inputImagen.value;
      pelicula[posicionPelicula].descripcion = inputDescripcion.value;
  
      guardarLocalStorage();
      limpiarFormulario();
  
      modalPelicula.hide();
      // actualizar tabla
      const filaEditada = tablaPeliculas.children[posicionPelicula];
      if (filaEditada) {
        filaEditada.children[1].textContent = pelicula[posicionPelicula].nombre;
        filaEditada.children[2].textContent = pelicula[posicionPelicula].genero;
        filaEditada.children[3].textContent = pelicula[posicionPelicula].duracion;
      }
  
      Swal.fire({
        title: "Pelicula modificada",
        text: `La pelicula ${pelicula[posicionPelicula].nombre} fue modificada correctamente`,
        icon: "success",
      });
    }
  };
  //FIN
