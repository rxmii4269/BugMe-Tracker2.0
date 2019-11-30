<?php
//for submiting new user 
if (isset($_POST['new_userbtn'])){  
    newuser();

}else{

}

if (isset($_POST['Submitbtn'])){
  new_issue();  
}else{

}


if (isset($_POST["login_submit"])) :
    login();
endif;








function new_issue(){
include_once('database.php');
$created="yes";
$status="Open";
$created_by=$_SESSION['login_user'];
$title=filter_var(htmlspecialchars($_POST['title']),FILTER_SANITIZE_STRING);
$description=filter_var(htmlspecialchars($_POST['description']),FILTER_SANITIZE_STRING);
$user=filter_var(htmlspecialchars($_POST['user']),FILTER_SANITIZE_STRING);
$error_type=filter_var(htmlspecialchars($_POST['error_type']),FILTER_SANITIZE_STRING);
$priority=filter_var(htmlspecialchars($_POST['priority']),FILTER_SANITIZE_STRING);
try{
$stmt = $pdo->prepare("INSERT INTO Issues (title,description,type,priority,status,assigned_to,
     created_by,created,updated) VALUES(?,?,?,?,?,?,?,?)");

     $stmt->execute([$title,$description,$error_type,$priority,$status,$user,$created_by,$created,$created_by]);
     echo "issue added successfully";
}catch(Exception $e){
    echo $e->getMessage();
}

}
//----------------------------------------------------------------------------






function newuser()
{
    include('database.php');
    if($_SERVER["REQUEST_METHOD"] === 'POST'):
        $firstname = filter_var(htmlspecialchars($_POST['firstname']),FILTER_SANITIZE_STRING);
        $lastname = filter_var(htmlspecialchars($_POST['lastname']),FILTER_SANITIZE_STRING);
        $password = $_POST['password'];
        $email = filter_var(htmlspecialchars($_POST['email']), FILTER_VALIDATE_EMAIL, FILTER_SANITIZE_EMAIL);



        $stmt = $pdo->prepare("INSERT INTO Users (firstname,lastname,password,email,date_joined) VALUES(?,?,SHA2(?,0),?,CURDATE())");
        $stmt->execute([$firstname,$lastname,$password,$email]);
        echo "User saved successfully";
    endif;
}

function login()
{
    include('database.php');
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
}

