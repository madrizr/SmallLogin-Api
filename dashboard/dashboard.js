//Verificar si hay usa sesion activa.
if(!(localStorage.getItem("datos_de_usuario"))){
	window.location.href="../main.html";
}

var usuario_datos = getlocalStorage("datos_de_usuario");
var saludo = document.getElementById('welcome');
var mostrar_resultado = document.getElementById('resultado');
var obtener_consulta = document.getElementById('consulta');
var alerta = document.getElementById('alert');

obtener_consulta.addEventListener('submit', function(e){
	e.preventDefault();
	var datos_consulta = new FormData(obtener_consulta);

	if (datos_consulta.get('moneda') != '') {
	let pais = datos_consulta.get('moneda');
	pais = pais.toUpperCase();
	console.log(pais)
	mostrarDatos(pais);

	}else{
		alerta.innerHTML = 
		`<div class="alert alert-danger text-center">Introduzca el codigo de divisa</div>`
	}
})

saludo.innerHTML = `Hola ${usuario_datos.nombre}`
function mostrarDatos(moneda){

	fetch('https://www.frankfurter.app/latest?from=USD')
	.then(respuesta => respuesta.json())
	.then(datos => {

		console.log(datos.rates[moneda]);
		if (datos.rates[moneda]) {
			let cotizacion = datos.rates[moneda];
			mostrar_resultado.innerHTML = `
			<h4 class="text-center">El ${moneda}/USD se cotiza a: ${cotizacion}</h4>
			`
		}
		if (moneda === 'USD') {
			mostrar_resultado.innerHTML = `
			<h4 class="text-center">El USD/USD se cotiza a: 1</h4>
			`
		}

		if(datos.rates[moneda] === undefined){
			alerta.innerHTML = 
			`<div class="alert alert-danger text-center">Codigo de divisa Invalido</div>`
		}
		
	})
}



//obtener los datos del local storage
function getlocalStorage(storage_name){
	
	var mostrar = localStorage.getItem(storage_name);
	var listos = JSON.parse(mostrar);
	return listos
}
//cerrar sesion
function cerrarSesion(){
	console.log('hola');
	localStorage.removeItem("datos_de_usuario");
	window.location.href="../main.html"
}
	