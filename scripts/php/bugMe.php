<?php
//session_start();

include_once('database.php');


$email = filter_var(htmlspecialchars($_POST['email']), FILTER_VALIDATE_EMAIL, FILTER_SANITIZE_EMAIL);
$password = $_POST['password'];

$stmt = $pdo->prepare("SELECT * FROM Users WHERE email = ? ");


if ($_SERVER["REQUEST_METHOD"] === "POST") :
    if ($email != '' && $password != '') :
        $stmt->execute([$email]);
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $db_password = $results[0]['password'];
        $hashed_password = hash("sha256", $password);

        if ($db_password === $hashed_password) :
            //echo var_dump("passwords match");
            session_start();
            $_SESSION['login_user'] = $email;
            echo "success";
        else :
            var_dump($results[0]['password']);
            var_dump(hash('sha256', $password));
        endif;
    else :
        echo "Login form cannot be empty";
    endif;
else :
    echo "Method cannot be post";
endif;
