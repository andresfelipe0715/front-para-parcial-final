const urlApi3 = "http://localhost:9000";//colocar la url con el puerto
function listarArticulos(){
    validaToken();
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch(urlApi3+"/articulos",settings)
    .then(response => response.json())
    .then(function(data){
        
            var articulos = `
            <div class="p-3 mb-2 bg-light text-dark">
                    <h1 class="display-5"><i class="fa-solid fa-list"></i> Listado de articulos</h1>
                </div>
                  
                <a href="#" onclick="registerForm3('true')" class="btn btn-outline-success"><i class="fa-solid fa-user-plus"></i></a>
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">codigo</th>
                        <th scope="col">nombre</th>
                        <th scope="col">fechaRegistro</th>
                        <th scope="col">usuario</th>
                        <th scope="col">categoria</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody id="listar">`;
            for(const articulo of data){
                console.log(articulo.usuario.nombre)
                articulos += `
                
                        <tr>
                            <th scope="row">${articulo.id}</th>
                            <td>${articulo.codigo}</td>
                            <td>${articulo.nombre}</td>
                            <td>${articulo.fechaRegistro}</td>
                            <td>${articulo.usuario.nombre}</td>
                            <td>${articulo.categoria.nombre}</td>
                             <td>
                            <button type="button" class="btn btn-outline-danger" 
                            onclick="eliminaArticulo('${articulo.codigo}')">
                                <i class="fa-solid fa-user-minus"></i>
                            </button>
                            <a href="#" onclick="verModificarArticulo('${articulo.codigo}')" class="btn btn-outline-warning">
                                <i class="fa-solid fa-user-pen"></i>
                            </a>
                            <a href="#" onclick="verArticulo('${articulo.codigo}')" class="btn btn-outline-info">
                                <i class="fa-solid fa-eye"></i>
                            </a>
                            </td>
                        </tr>
                    `;
                
            }
            articulos += `
            </tbody>
                </table>
            `;
            document.getElementById("datos").innerHTML = articulos;
    })
}
function eliminaArticulo(codigo){
    validaToken();
    var settings={
        method: 'DELETE',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch(urlApi3+"/articulo/codigo/"+codigo,settings)
    .then((data) => {
        console.log(data); // JSON data parsed by `data.json()` call
        listarArticulos();
        alertas("Se ha eliminado el articulo exitosamente!",2)
      })
}

function verArticulo(codigo){
    validaToken();
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch(urlApi3+"/articulo/codigo/"+codigo,settings)
    .then(response => response.json())
    .then(function(articulo){
            var cadena='';
            if(articulo){                
                cadena = `
                <div class="p-3 mb-2 bg-light text-dark">
                    <h1 class="display-5"><i class="fa-solid fa-user-pen"></i> Visualizar Usuario</h1>
                </div>
                <ul class="list-group">
                    <li class="list-group-item">codigo: ${articulo.codigo}</li>
                    <li class="list-group-item">nombre: ${articulo.nombre}</li>
                    <li class="list-group-item">fechaRegistro: ${articulo.fechaRegistro}</li>
                    <li class="list-group-item">usuario: ${articulo.usuario.nombre}</li>
                    <li class="list-group-item">categoria: ${articulo.categoria.nombre}</li>
                </ul>`;
              
            }
            document.getElementById("contentModal").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalUsuario'))
            myModal.toggle();
    })
}


function registerForm3(auth=false){
    validaToken();
    var settings = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch(urlApi3+"/categorias",settings)
    .then(response => response.json())
    .then(function(data){

    cadena = `
            <div class="p-3 mb-2 bg-light text-dark">
                <h1 class="display-5"><i class="fa-solid fa-user-pen"></i> Registrar Articulo</h1>
            </div>
              
            <form action="" method="post" id="myFormReg2">
                <input type="hidden" name="id" id="id">
                <label for="codigo" class="form-label">codigo</label>
                <input type="text" class="form-control" name="codigo" id="codigo" required> <br>
                <label for="nombre"  class="form-label">nombre</label>
                <input type="text" class="form-control" name="nombre" id="nombre" required> <br>
                <label for="descripcion"  class="form-label">descripcion</label>
                <input type="text" class="form-control" name="descripcion" id="descripcion" required> <br>
                <label for="fechaRegistro" class="form-label">fechaRegistro</label>
                <input type="date" class="form-control" name="fechaRegistro" id="fechaRegistro" required> <br>
                <label for="">Categoria:</label>
                <select class="form-select" name="categoria" id="categoria" required>

                `;for(const Categoria of data){
                    cadena+=`
                    <option value="${Categoria.id_cat}">${Categoria.descripcion}</option>
                    
                    `;

                }
                cadena+=`
                </select>



                <label for="stock" class="form-label">stock</label>
                <input type="text" class="form-control" id="stock" name="stock" required> <br>
                <label for="precioVenta" class="form-label">precioVenta</label>
                <input type="text" class="form-control" id="precioVenta" name="precioVenta" required> <br>
                <label for="precioCompra" class="form-label">precioCompra</label>
                <input type="precioCompra" class="form-control" id="precioCompra" name="precioCompra" required> <br>
                <button type="button" class="btn btn-outline-info" onclick="registrarArticulo('${auth}')">Registrar</button>
            </form>`;
            document.getElementById("contentModal").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalUsuario'))
            myModal.toggle();
    })
}

async function registrarArticulo(auth=false){
    validaToken();
  
    let codigo = document.querySelector('#myFormReg2 #codigo').value;
    let nombre = document.querySelector('#myFormReg2 #nombre').value;
    let descripcion = document.querySelector('#myFormReg2 #descripcion').value;
    let fechaRegistro = document.querySelector('#myFormReg2 #fechaRegistro').value;
    let categoria = document.querySelector('#myFormReg2 #categoria').value;
    let stock = document.querySelector('#myFormReg2 #stock').value;
    let precioVenta = document.querySelector('#myFormReg2 #precioVenta').value;
    let precioCompra = document.querySelector('#myFormReg2 #precioCompra').value;
    let usuario = localStorage.id;
    

     var jsonData={
       
        
            "codigo": codigo,
            "nombre": nombre,
            "descripcion": descripcion,
            "fechaRegistro": fechaRegistro,
            "categoria":{
               "id_cat": categoria
            }
            ,"stock":stock,
            "precioVenta":precioVenta,
            "precioCompra":precioCompra,
            "usuario":{
                "id":usuario
            }
        
        

     }
    console.log("data user ",jsonData);
    const request = await fetch(urlApi3+"/articulo", {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => response.json())
    .then(function(respuesta){
        console.log("respuesta peticion", respuesta)
    });
    if(auth){
        listarArticulos();
    }
    alertas("Se ha registrado el articulo exitosamente!",1)
    document.getElementById("contentModal").innerHTML = '';
    var myModalEl = document.getElementById('modalUsuario')
    var modal = bootstrap.Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
    modal.hide();
}

// function verModificarUsuario(codigo){
//     validaToken();
//     var settings={
//         method: 'GET',
//         headers:{
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'Authorization': localStorage.token
//         },
//     }
//     fetch(urlApi3+"/articulo/"+id,settings)
//     .then(response => response.json())
//     .then(function(articulo){
//             var cadena='';
//             if(articulo){                
//                 cadena = `
//                 <div class="p-3 mb-2 bg-light text-dark">
//                     <h1 class="display-5"><i class="fa-solid fa-user-pen"></i> Modificar Usuario</h1>
//                 </div>
              
//                 <form action="" method="post" id="myForm">
//                     <input type="hidden" name="id" id="id" value="${usuario.id}">
//                     <label for="nombre" class="form-label">First Name</label>
//                     <input type="text" class="form-control" name="nombre" id="nombre" required value="${usuario.nombre}"> <br>
//                     <label for="apellidos"  class="form-label">Last Name</label>
//                     <input type="text" class="form-control" name="apellidos" id="apellidos" required value="${usuario.apellidos}"> <br>
//                     <label for="documento"  class="form-label">document</label>
//                     <input type="text" class="form-control" name="documento" id="documento" required value="${usuario.documento}"> <br>
//                     <label for="correo" class="form-label">correo</label>
//                     <input type="correo" class="form-control" name="correo" id="correo" required value="${usuario.correo}"> <br>
//                     <label for="password" class="form-label">Password</label>
//                     <input type="password" class="form-control" id="password" name="password" required> <br>
//                     <button type="button" class="btn btn-outline-warning" 
//                         onclick="modificarUsuario('${usuario.id}')">Modificar
//                     </button>
//                 </form>`;
//             }
//             document.getElementById("contentModal").innerHTML = cadena;
//             var myModal = new bootstrap.Modal(document.getElementById('modalUsuario'))
//             myModal.toggle();
//     })
// }


// async function modificarUsuario(id){
//     validaToken();
//     var myForm = document.getElementById("myForm");
//     var formData = new FormData(myForm);
//     var jsonData = {};
//     for(var [k, v] of formData){//convertimos los datos a json
//         jsonData[k] = v;
//     }
//     const request = await fetch(urlApi3+"/usuario/"+id, {
//         method: 'PUT',
//         headers:{
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'Authorization': localStorage.token
//         },
//         body: JSON.stringify(jsonData)
//     });
//     listarUsuarios();
//     alertas("Se ha modificado el usuario exitosamente!",1)
//     document.getElementById("contentModal").innerHTML = '';
//     var myModalEl = document.getElementById('modalUsuario')
//     var modal = bootstrap.Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
//     modal.hide();
// }













function modalConfirmacion(texto,funcion){
    document.getElementById("contenidoConfirmacion").innerHTML = texto;
    var myModal = new bootstrap.Modal(document.getElementById('modalConfirmacion'))
    myModal.toggle();
    var confirmar = document.getElementById("confirmar");
    confirmar.onclick = funcion;
}

function salir(){
    localStorage.clear();
    location.href = "index.html";
}

function validaToken(){
    if(localStorage.token == undefined){
        salir();
    }
}


function alertas(mensaje,tipo){
    var color ="warning";
    if(tipo == 1){//success verde
        color="success"
    }
    else{//danger rojo
        color = "danger"
    }
    var alerta =`<div class="alert alert-${color} alert-dismissible fade show" role="alert">
                    <strong><i class="fa-solid fa-triangle-exclamation"></i></strong>
                        ${mensaje}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                 </div>`;
    document.getElementById("alerta").innerHTML = alerta;
}




