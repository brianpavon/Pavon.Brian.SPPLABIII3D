const btnCancelar =  document
.getElementById("btnCancelar");
const btnEliminar =  document
.getElementById("btnEliminar");

export const frm = document.forms[0];

//Limpiar formulario
export function limpiarFormulario() {
    console.log("Limpiando formulario y consola");
    frm.reset();
      ocultarBotones();
    document.getElementById("btnPrincipal").value = "Dar Alta";
    frm.id.value = "";
    setTimeout(()=>{
        console.clear();
    },2500)
}

export function mostrarBotones(){
    btnCancelar.classList.replace("invisible", "visible");
    btnEliminar.classList.replace("invisible", "visible");
}

export function ocultarBotones(){
    btnCancelar.classList.replace("visible", "invisible");
    btnEliminar.classList.replace("visible", "invisible");
}