import { manejadorTabla,agregarSpinner,eliminarSpiner } from "../domDinamico.js";
import Hija from "../objeto.js";


export let listaAnuncios = [];
//DEVOLVER LA LISTA DEL SERVIDOR PARA USAR EN EL SCRIPT
export function devolverListaServidor(url)
{   
    
    return fetch(url)
    .then((res)=>{
        return res.ok ? res.json() : Promise.reject(res);
    })
    .then((data)=>{
    
        console.info("Datos traidos del servidor correctamente.");
        const listaServidor = [];
        data.forEach(element => {
                
        const anuncios_autos = new Hija(
            element.id,
            element.titulo,
            element.transaccion,
            element.descripcion,
            element.precio,
            element.puertas,
            element.kms,
            element.potencia                
        );        
        listaServidor.push(anuncios_autos);
        });
        eliminarSpiner();
        return listaServidor;
    })
    .catch(error=>{
        reject(console.error(`Error: ${error.status}: ${error.statusText}`));
    })    
    
}

//GET
export function cargarAnunciosFetch(url)
{    
    //agregarSpinner();
    
    fetch(url)
    .then((res)=>{
        return res.ok ? res.json() : Promise.reject(res);
    })
    .then((data)=>{     
        console.info("Lista cargada correctamente.");
        
        data.forEach(element => {
            
            const anuncios_autos = new Hija(
                element.id,
                element.titulo,
                element.transaccion,
                element.descripcion,
                element.precio,
                element.puertas,
                element.kms,
                element.potencia                
            );
            listaAnuncios.push(anuncios_autos);
        });
        //eliminarSpiner();        
        //manejadorTabla(listaAnuncios);
    })
    .catch(error=>{
        eliminarSpiner();
        console.error(`Error: ${error.status}: ${error.statusText}`);
    })
    .finally(()=>{
        setTimeout(()=>{
            //console.clear();
        },2000)
    });
}


//POST
export const nuevoAnuncioFetchAsync = async (frm,url)=>{
    
    const nuevoObjeto = new Hija(
        "",
        frm.titulo.value,
        frm.transaccion.value,
        frm.descripcion.value,
        frm.precio.value,
        frm.puertas.value,
        frm.kms.value,
        frm.potencia.value
      );
    const options = {
        method: "POST",
        headers:{
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(nuevoObjeto)
    };
    try {
        const res =  await fetch(url,options);
        if(!res.ok){           
            throw {error: res.status, statusText:res.statusText};
        }
        console.log("Se dio de alta correctamente");
        return await res.json();       

    } catch (error) {        
        console.error(error);
    }
};

//PUT
export const modificarAnuncioFetch = (frm,url)=>{    
    const objetoModificado = new Hija(
        parseInt(frm.id.value),
        frm.titulo.value,
        frm.transaccion.value,
        frm.descripcion.value,
        frm.precio.value,
        frm.puertas.value,
        frm.kms.value,
        frm.potencia.value
    );
    const options = {
        method: "PUT",
        headers:{
            "Content-Type": "application/json;charset=utf-8"
        },
        //aca va lo que en ajax iba en send
        body: JSON.stringify(objetoModificado)
    };
    return fetch(url+objetoModificado.id,options)
    .then((res)=>{
        return res.ok ? res.json() : Promise.reject(res);
    })
    .then((data)=>{
        console.log(data);
        console.log("Modificacion exitosa");
        return true;
    })
    .catch(error=>{
        console.error(`Error: ${error.status}: ${error.statusText}`);
    })
};

//DELETE
export const deleteAnuncioFetchAsync = async (id,url)=>{
    try {
        const res = await fetch(url+id,{method:"DELETE"});
        if(!res.ok){           
            throw {error: res.status, statusText:res.statusText};
        }
        console.log("Se elimino el registro.");        
        return await res.json();
        
    } catch (error) {        
        console.error(error);
    }
};
