import crearTabla from "./tabla.js";

import Anuncio_Auto from "./anuncio.js";


let frmAnuncioAutos;

//let divTabla;
let divTabla = document.getElementById("divTabla");
window.addEventListener('load',inicializarManejadores);

function inicializarManejadores()
{
    
    cargarAnuncios();
    frmAnuncioAutos = document.forms[0];
    
    frmAnuncioAutos.addEventListener('submit',e=>{
        e.preventDefault();
        
        altaNuevoAnuncio();
    });
    botonesModificacion();
}

function cargarAnuncios()
{
    const xhr = new XMLHttpRequest();
    
    divTabla.innerHTML = "";
    spinner.appendChild(crearSpineer());

    xhr.addEventListener('readystatechange',()=>{
        
        if(xhr.readyState == 4)
        {
            if(xhr.status >= 200 && xhr.status < 300)
            {
                
                let datos = JSON.parse(xhr.responseText);
                

                divTabla.appendChild(crearTabla(datos));
            }
            else
            {
                
                console.log("Error: "+xhr.status + "-" + xhr.statusText);
            }
            
            spinner.innerHTML = ""; 
        }
    });
    xhr.open('GET','http://localhost:3000/anuncios_autos');
    xhr.send();
}

function altaNuevoAnuncio()
{
    const nuevoAnuncio = obtenerAnuncio();
    const xhr = new XMLHttpRequest();
    
    spinner.appendChild(crearSpineer());
    xhr.addEventListener('readystatechange',()=>{
        if(xhr.readyState == 4)
        {
            if(xhr.status >= 200 && xhr.status < 300)
            {
                let datos = JSON.parse(xhr.responseText);
                console.log(datos);
            }
            else
            {
                console.log("Error: "+xhr.status + "-" + xhr.statusText);
            }
            spinner.innerHTML = vaciarCampos(); 
        }
    });
    xhr.open('POST',"http://localhost:3000/anuncios_autos");
    xhr.setRequestHeader("Content-type","application/json;charset=utf-8");
    xhr.send(JSON.stringify(nuevoAnuncio));
    cargarAnuncios();
}

function modificarAnuncio()
{
    const nuevoAnuncio = obtenerAnuncio();
    const xhr = new XMLHttpRequest();
    let idSeleccionado = frmAnuncioAutos.id.value;
    spinner.appendChild(crearSpineer());
    xhr.addEventListener('readystatechange',()=>{
        if(xhr.readyState == 4)
        {
            if(xhr.status >= 200 && xhr.status < 300)
            {
                let datos = JSON.parse(xhr.responseText);
                console.log(datos);
            }
            else
            {
                console.log("Error: "+xhr.status + "-" + xhr.statusText);
            }
            spinner.innerHTML = limpiarCampos(); 
        }
    });
    xhr.open('PUT',"http://localhost:3000/anuncios_autos/"+idSeleccionado);
    xhr.setRequestHeader("Content-type","application/json;charset=utf-8");
    xhr.send(JSON.stringify(nuevoAnuncio));
    
}

function borrarAnuncio()
{
    
    spinner.appendChild(crearSpineer());
    let idSeleccionado = frmAnuncioAutos.id.value;
    const config = {
        method : "DELETE",
        headers : {
            "Content-type" : "application/json;charset=utf-8"
        },
        
    }
    fetch('http://localhost:3000/anuncios_autos/'+ idSeleccionado,config)
    .then(res=>{
        if(!res.ok) return Promise.reject(res);
        return res.json();
    })
    .then(anuncio_auto=>{
        console.log("Baja exitosa",anuncio_auto);        
        cargarAnuncios();
    })
    .catch(err=>{
        console.error(err.status);
    })
    .finally(()=>{
        spinner.innerHTML = "";
    });
}

function obtenerAnuncio()
{
    
    const nuevoAnuncio = new Anuncio_Auto("",
        
        frmAnuncioAutos.titulo.value,        
        frmAnuncioAutos.transaccion.value,       
        frmAnuncioAutos.descripcion.value,
        frmAnuncioAutos.precio.value,
        frmAnuncioAutos.puertas.value,
        frmAnuncioAutos.kms.value,
        frmAnuncioAutos.potencia.value
        );
    
    return nuevoAnuncio;
}

function botonesModificacion()
{
    
    let btnModificar = document.getElementById("btnModificar");
    let btnCancelar = document.getElementById("btnCancelar");
    let btnEliminar = document.getElementById("btnEliminar");
     
    btnModificar.addEventListener('click',e=>{
        modificarAnuncio();
        limpiarCampos()
        cargarAnuncios();
    });
    
    btnCancelar.addEventListener('click',e=>{
        limpiarCampos();
        
    });
    btnEliminar.addEventListener('click',e=>{
        borrarAnuncio();
        limpiarCampos();
        
    });
}





function limpiarCampos()
{

    let txtTitulo = document.getElementById('txtTitulo');
    let txtDescripcion = document.getElementById('txtDescripcion');
    let txtPrecio = document.getElementById('txtPrecio');
    let txtPuertas = document.getElementById('txtPuertas');
    let txtKms = document.getElementById('txtKms');
    let txtPotencia = document.getElementById('txtPotencia');
    let btnModificar = document.getElementById("btnModificar");
    let btnCancelar = document.getElementById("btnCancelar");
    let btnEliminar = document.getElementById("btnEliminar");
    btnModificar.style.display = "none";
    btnCancelar.style.display = "none";
    btnEliminar.style.display = "none";
    txtTitulo.value = '';
    txtDescripcion.value = '';
    txtPrecio.value = '';
    txtPuertas.value = '';
    txtKms.value = '';
    txtPotencia.value = '';
}

function vaciarCampos(elemento)
{
    while(elemento.firstChild)
    {
        elemento.removeChild(elemento.firstChild);
    }
}

function crearSpineer()
{
    const img = document.createElement('img');
    img.setAttribute("src", "./images/spinner.gif");
    img.setAttribute("alt","Imagen Spineer");

    return img;
}