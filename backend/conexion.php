<?php 
	$user_db = "root";
	$pass_db = "romano00";

	try {
    $pdo = new PDO('mysql:host=localhost;dbname=login', $user_db, $pass_db);
    
} catch (PDOException $e) {
    print "¡Error!: " . $e->getMessage() . "<br/>";
    die();
}

 ?>