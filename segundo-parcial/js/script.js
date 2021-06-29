import { frm, limpiarFormulario } from "./formularios.js";
import { agregarSpinner, cargarFormulario, manejadorTabla } from "./domDinamico.js";
import {nuevoAnuncioFetchAsync,modificarAnuncioFetch,deleteAnuncioFetchAsync,devolverListaServidor} from "./controllers/peticiones.js";

const url = "http://localhost:3000/vehiculos/";
let listaServer;
let checks;
const inputPromedio = document.getElementById('inputPromedio');
const filtro = document.getElementById('filtro');

window.addEventListener("DOMContentLoaded", async() => {
  
  frm.addEventListener("submit", manejadorSubmit);
  document.addEventListener("click", manejadorClick);  
  
  agregarSpinner();
  listaServer = await devolverListaServidor(url);
  
  manejadorTabla(listaServer);
  cargarChecks(listaServer);
});

async function manejadorSubmit(e) {
  e.preventDefault();
  const frm = e.target;
  if (frm.id.value) {
    if (confirm("Confirma la modificación?")) {        
      console.log("Guardando las modificaciones");
      agregarSpinner();
      await modificarAnuncioFetch(frm,url);
      listaServer = await devolverListaServidor(url);
      
      manejadorTabla(listaServer);
    }
    else{
      limpiarFiltros();   
      limpiarFormulario();
    }
  } 
  else {    
    console.log("Dando de alta");
    agregarSpinner();
    await nuevoAnuncioFetchAsync(frm,url);
    
    listaServer = await devolverListaServidor(url);
    
    manejadorTabla(listaServer);
  }
  cargarChecks(listaServer);
  checkedAll();
  limpiarFiltros();
  limpiarFormulario();  
}

async function manejadorClick(e) {

  if (e.target.matches("td")) {
    let id = e.target.parentNode.dataset.id;
    console.log(id);    
    cargarFormulario(id,listaServer);

  } else if (e.target.matches("#btnCancelar")) {
    limpiarFiltros();
    limpiarFormulario();

  } else if (e.target.matches("#btnEliminar")) {

    let indice = parseInt(document.forms[0].id.value);
    console.log(indice);

    if (confirm("Confirma la Baja?")) {
      agregarSpinner();
      console.log("Eliminando el anuncio.");
      await deleteAnuncioFetchAsync(indice,url);      
      listaServer = await devolverListaServidor(url);     
      
      cargarChecks(listaServer);
      checkedAll();
      limpiarFiltros();
      limpiarFormulario();
      manejadorTabla(listaServer);      

      
    }else{
      limpiarFormulario();
    }
  }
}


//MAP REDUCE FILTER

function limpiarFiltros()
{
  filtro.value="#";
  inputPromedio.value = "N/A";
}

function checkedAll()
{
  checks.forEach( element  =>  { 
    if(!element.checked){
      element.checked = true;
    }
  });
}

function cargarChecks(lista)
{
  checks = document.querySelectorAll( '.form-check-input' );
      checks.forEach( element  =>  { 
        filtrarColumnas( element, lista );
      });
}

function filtrarColumnas( check, listaAnuncios ) {   
  let listaMapeada = [];
  //
  check.addEventListener( 'click',async () => { 
      
      listaMapeada = listaAnuncios.map( row => { 
          
          let fila = {};          
          for (const key in row) {            
            
              //console.log(row[key]);
              if ( document.getElementById('chk'+key).checked ) {              
                fila[key] = row[key];                            
              }
            
          }
          return fila;
        })        
        //console.log(listaMapeada);
        manejadorTabla(listaMapeada);
      });
};

filtro.addEventListener('change',e=>{
    
  e.preventDefault();
  
 
  console.log(filtro.value);
  
  let promedio = filtrar(filtro.value,listaServer);
  
  
  console.log(promedio);
  
  inputPromedio.value=promedio;  
  
})

function filtrar(filtro,lista)
{
    let promedio = "N/A";
    if(filtro == "alquiler")
    {
        const precioAlquiler = lista.filter(anun=>anun.transaccion === 'alquiler');
        const precios = precioAlquiler.map(element => parseInt(element.precio));
        const cantPrecios = precios.length;        
        const total = precios.reduce((prev,actual)=>prev + actual,0);

       promedio = total / cantPrecios;
    }
    else if(filtro == "venta")
    {
        const precioAlquiler = lista.filter(anun=>anun.transaccion === 'venta');
        const precios = precioAlquiler.map(element => parseInt(element.precio));
        const cantPrecios = precios.length;
        const total = precios.reduce((prev,actual)=>prev + actual,0);
        promedio = total / cantPrecios;
    }   
   
    return promedio;
}
