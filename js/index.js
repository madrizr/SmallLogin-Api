//Verificar si hay una sesion activa
if(localStorage.getItem("datos_de_usuario")){
	location.href = "dashboard/dashboard.html"
}
//Capturar los id
var formulario = document.getElementById('formulario');
var alerta = document.getElementById('alarm');

//1. Ejecutar funcion al recibir un submit
formulario.addEventListener('submit', function(e){
	e.preventDefault(); // Evitar que pase por get

	var datos_usuario = new FormData(formulario); // 2. Capturar datos
	var usuario = datos_usuario.get('usuario');
	var password = datos_usuario.get('password');

	//3. Hacer llamada por fetch
	fetch('backend/servidor.php', {
		method: 'POST',
		body: datos_usuario
	})
	.then(res => res.json())
	.then(respuesta => {
		//Ejecutar las validaciones
		if (respuesta === '0') {
			alerta.innerHTML = `<div class="alert alert-danger text-center">Usuario no encontrado</div>`
		}
		if (respuesta === '1') {
			alerta.innerHTML = `<div class="alert alert-danger text-center">Password incorrecta</div>`
		}
		
		if (respuesta.respuesta === 'true') {
			//console.log(respuesta)
		 setLocalStorage(respuesta.name, respuesta.usuario);
			
			location.href="dashboard/dashboard.html";
		}

	})
});


function setLocalStorage(nombre, user){ //Guardar la respuesta
				let datos_usuario = {
					nombre: nombre,
					usuario: user
				}
				//Conviertir json a string
				localStorage.setItem("datos_de_usuario", JSON.stringify(datos_usuario));
			}



