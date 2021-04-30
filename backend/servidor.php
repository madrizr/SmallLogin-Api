<?php
header('Content-Type: application/json');//Convertir las respuestas en .JSON

include_once 'conexion.php';
$usuario = $_POST['usuario'];
$password = $_POST['password'];

//sentencia SQL Buscar
$sql_buscar = 'SELECT * FROM usuarios WHERE username = ?';
$sql = $pdo-> prepare($sql_buscar);
$sql->execute(array($usuario));
$resultado = $sql->fetch();

//Comparar username y contraseña
if (!$resultado) {
	echo json_encode('0'); //usuario no encontrado
	die();
}
if (!($password === $resultado['password'])) {
	echo json_encode('1'); //contraseña invalida
	die();
}
// Preparo en un arreglo un paquete con la respuesta
$otra = array(
	'respuesta' => 'true',
	'name' => $resultado['nombre'],
	'usuario' => $resultado['username']);

//Envio por un json
echo json_encode($otra);


?>