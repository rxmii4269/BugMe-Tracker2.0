<?php

$host = 'mysql://bb94ec1873173c:e48319e2@us-cdbr-east-02.cleardb.com/heroku_87fbc08c29a250e?reconnect=true';
$username = 'bb94ec1873173c';
$password = 'e48319e2';
$dbname = 'heroku_87fbc08c29a250e';


$pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4",$username,$password);

?>