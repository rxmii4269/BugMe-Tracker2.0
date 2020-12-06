<?php

$host = '172.17.0.4';
$username = 'bugMe';
$password = 'iNFO@2180';
$dbname = 'bugMe_Tracker';


$pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4",$username,$password);

?>