//Verificar si hay usa sesion activa.
if(!(localStorage.getItem("datos_de_usuario"))) window.location.href="../main.html";

const usuario_datos = getlocalStorage("datos_de_usuario");
const saludo = document.getElementById('welcome');
const mostrar_resultado = document.getElementById('resultado');
const obtener_consulta = document.getElementById('consulta');
const alerta = document.getElementById('alert');

obtener_consulta.addEventListener('submit', e => {
	e.preventDefault();
	const datos_consulta = new FormData(obtener_consulta);

	if (datos_consulta.get('moneda') != '') {
	let pais = datos_consulta.get('moneda');
	pais = pais.normalize('NFD').replace(/[\u0300-\u036f]/g,""); //Quitar tildes
	pais = pais.toLowerCase(); //pasar a minusculas

	fetch('../currencies.json')
	.then(res => res.json())
	.then(respuesta => {
	pais = respuesta[pais];
	//console.log(pais)
	mostrarDatos(pais);
	})

	}else{
		quitarAlerta();
		alerta.innerHTML = 
		`<div class="alert alert-danger text-center">Introduce el pais que quieres consultar</div>`
	}
})

saludo.innerHTML = `Hola ${usuario_datos.nombre}`
const mostrarDatos = moneda => {
		loading();
	fetch('https://www.frankfurter.app/latest?from=USD')
	.then(respuesta => respuesta.json())
	.then(datos => {

		//console.log(datos.rates[moneda]);

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

		if(datos.rates[moneda] === undefined && moneda != 'USD'){
		alerta.innerHTML = 
			`<div class="alert alert-danger text-center">Nombre de pais invalido</div>`
		mostrar_resultado.innerHTML = ``;
		quitarAlerta();
		}
	})
}


//obtener los datos del local storage
function getlocalStorage(storage_name){
	
	let mostrar = localStorage.getItem(storage_name);
	let listos = JSON.parse(mostrar);
	return listos
}
//cerrar sesion
const cerrarSesion = () => {
	localStorage.removeItem("datos_de_usuario");
	window.location.href="../main.html"
}

const loading = () => {
	mostrar_resultado.innerHTML = `<div class="spinner text-center">
						<div class="dot1"></div>
  						<div class="dot2"></div></div>`;
}

const quitarAlerta = () => { 
setTimeout(() =>{
			alerta.innerHTML = ``;
		}, 2000);}
