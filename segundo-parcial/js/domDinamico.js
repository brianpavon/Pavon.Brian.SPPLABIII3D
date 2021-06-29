import { frm,mostrarBotones } from "./formularios.js";
//cargar el spiner
export function agregarSpinner() {
  eliminarSpiner();
  let spinner = document.createElement("img");
  spinner.setAttribute("src", "./assets/spinner.gif");
  spinner.setAttribute("alt", "image spinner");
  document.getElementById("divTabla").appendChild(spinner);
}

export function eliminarSpiner() {
  document.getElementById("divTabla").innerHTML = "";
}
export function cargarFormulario(id,lista) {
  const { titulo, transaccion, descripcion, precio, puertas, kms, potencia } =
  lista.filter((el) => el.id === parseInt(id))[0];
  
  frm.titulo.value = titulo;
  frm.transaccion.value = transaccion;
  frm.descripcion.value = descripcion;
  frm.precio.value = precio;
  frm.puertas.value = puertas;
  frm.potencia.value = potencia;
  frm.kms.value = kms;
  frm.id.value = id;
  document.getElementById("btnPrincipal").value = "Modificar"; 
  mostrarBotones();
}

//FUNCIONES CREAR TABLA

function crearTabla(items) {
  const tabla = document.createElement("table");

  tabla.appendChild(crearThead(items[0]));
  tabla.appendChild(crearTbody(items));
  return tabla;
}

function crearThead(item) {
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  //tr.style.backgroundColor = "red";
  for (const key in item) {
    if (key !== "id") {
      const th = document.createElement("th");
      th.textContent = key;
      tr.appendChild(th);
    }
  }
  thead.appendChild(tr);
  return thead;
}

function crearTbody(items) {
  const tbody = document.createElement("tbody");
  
  items.forEach((item) => {
    const tr = document.createElement("tr");

    for (const key in item) {
      if (key === "id") {
        tr.setAttribute("data-id", item[key]);
      } else {
        const td = document.createElement("td");
        td.textContent = item[key];
        tr.appendChild(td);
      }
    }
    tbody.appendChild(tr);
  });
  return tbody;
}


export function manejadorTabla(lista) {
  
  renderizarUnDiv( crearTabla(lista), document.getElementById("divTabla"));
}

function renderizarUnDiv(lista, contenedor) {
  while (contenedor.hasChildNodes()) {
    contenedor.removeChild(contenedor.firstChild);
  }
  if (lista) {
    contenedor.appendChild(lista);    
  }        
}


