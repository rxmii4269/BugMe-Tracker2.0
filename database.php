<?php
//echo htmlentities($_POST['description']);

function text(){

	echo"test";
}

if (array_key_exists( 'i', $_POST )){
	//echo htmlentities($_POST['description']);
	text();

}else{
	echo var_dump($_POST);
	//echo htmlentities($_POST['description']);
}

$host = '54.84.172.164';
$username = 'bugMe';
$password = 'iNFO@2180';
$dbname = 'bugMe_Tracker';


$pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4",$username,$password);

?>