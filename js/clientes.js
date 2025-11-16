document.addEventListener("DOMContentLoaded",()=>{
    const form=document.getElementById("formCliente");
    const tabla=document.getElementById("tablaClientes");
    let clientes=JSON.parse(localStorage.getItem("clientes"))||[];

    function render(){
        tabla.innerHTML="";
        clientes.forEach((c,i)=>{
            tabla.innerHTML+=`<tr>
            <td>${c.nombre}</td>
            <td>${c.telefono}</td>
            <td>${c.correo}</td>
            <td>${c.direccion}</td>
            <td><button onclick="eliminar(${i})">Eliminar</button></td>
            </tr>`;
        });
    }

    form.addEventListener("submit",e=>{
        e.preventDefault();
        clientes.push({
            nombre: nombre.value,
            telefono: telefono.value,
            correo: correo.value,
            direccion: direccion.value
        });
        localStorage.setItem("clientes",JSON.stringify(clientes));
        form.reset();
        render();
    });

    window.eliminar=i=>{
        clientes.splice(i,1);
        localStorage.setItem("clientes",JSON.stringify(clientes));
        render();
    }

    render();
});
