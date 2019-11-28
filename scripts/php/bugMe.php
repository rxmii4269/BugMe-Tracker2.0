<?php
//session_start();

include_once('database.php');


$email = filter_var(htmlspecialchars($_POST['email']),FILTER_VALIDATE_EMAIL,FILTER_SANITIZE_EMAIL);
$password = $_POST['password'];

$stmt = $pdo->prepare("SELECT * FROM Users WHERE email = ? ");

$stmt->execute([$email]);

$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

$db_password = $results[0]['password'];
$hashed_password = hash("sha256",$password);

    if($db_password === $hashed_password):
        echo var_dump("passwords match");
        session_start();
        var_dump(session_id());


    else:
        var_dump($results[0]['password']);
        var_dump(hash('sha256',$password));
    endif;
