<?php
//for submiting new user 
if (isset($_POST['new_userbtn'])) {
    newuser();
} else { }

if (isset($_POST['Submitbtn'])) {

    new_issue();
} else { }


if (isset($_POST["login_submit"])) :
    login();
endif;

if (isset($_POST["data"])) :

    assigned_to();
endif;

if (isset($_POST["logout"])) :
    logout();

endif;

if (isset($_POST["loadTable"])) :
    setTable();
endif;




function logout()
{
    if (isset($_COOKIE[session_name()])) :
        setcookie(session_name(), '', time() - 7000000, '/');
        session_destroy();
        echo "success";

    endif;
}


function assigned_to()
{
    include('database.php');
    try {
        $stmt = $pdo->prepare("SELECT firstname, lastname FROM Users");
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $assigned_user = [];
        foreach ($results as $row) :
            $results =  $row['firstname'] . " " . $row['lastname'];
            array_push($assigned_user, $results);
        endforeach;
        foreach ($assigned_user as $row) :
            echo "<option>" . $row . "</option>";
        endforeach;
    } catch (PDOException $e) {
        echo $e->getMessage();
    }
}




function new_issue()
{
    session_start();
    include_once('database.php');
    $status = "Open";
    $created_by = $_COOKIE["PHPSESSID"];
    $title = filter_var(htmlspecialchars($_POST['title']), FILTER_SANITIZE_STRING);
    $description = filter_var(htmlspecialchars($_POST['description']), FILTER_SANITIZE_STRING);
    $user = filter_var(htmlspecialchars($_POST['user']), FILTER_SANITIZE_STRING);
    $error_type = filter_var(htmlspecialchars($_POST['error_type']), FILTER_SANITIZE_STRING);
    $priority = filter_var(htmlspecialchars($_POST['priority']), FILTER_SANITIZE_STRING);
    try {
        $stmt = $pdo->prepare("INSERT INTO Issues (title,description,type,priority,status,assigned_to,
     created_by,created,updated) VALUES(?,?,?,?,?,?,?,CURDATE(),CURDATE())");

        $stmt->execute([$title, $description, $error_type, $priority, $status, $user, $created_by]);
        echo "issue added successfully";
    } catch (Exception $e) {
        echo $e->getMessage();
    }
}
//----------------------------------------------------------------------------


function newuser()
{
    include('database.php');
    if ($_SERVER["REQUEST_METHOD"] === 'POST') :
        $firstname = filter_var(htmlspecialchars($_POST['firstname']), FILTER_SANITIZE_STRING);
        $lastname = filter_var(htmlspecialchars($_POST['lastname']), FILTER_SANITIZE_STRING);
        $password = $_POST['password'];
        $email = filter_var(htmlspecialchars($_POST['email']), FILTER_VALIDATE_EMAIL, FILTER_SANITIZE_EMAIL);



        $stmt = $pdo->prepare("INSERT INTO Users (firstname,lastname,password,email,date_joined) VALUES(?,?,SHA2(?,0),?,CURDATE())");
        $stmt->execute([$firstname, $lastname, $password, $email]);
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
            $dbfirstname = $results[0]['firstname'];

            if ($db_password === $hashed_password) :
                session_id($dbfirstname);
                session_start();
                $_SESSION['id'] = $dbfirstname;
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
?>

<?php function setTable(){
?>

    <?php include "database.php";?>

    <?php $stmt = $pdo->query("SELECT * FROM Issues"); ?>

    <?php $results = $stmt->fetchAll(PDO::FETCH_ASSOC); ?>

    <table>
        <thead>
            <tr>
                <th class="left-align thborder">Title</th>
                <th class="left-align">Type</th>
                <th class="left-align">Status</th>
                <th class="left-align">Assigned To</th>
                <th class="left-align thborder-right">Created</th>
            </tr>
        </thead>
        <?php foreach ($results as $row) : ?>
            <tr>
                <td id="test" class="left-align bold"><?= '#'.$row["id"]." ".$row["title"]; ?>
                <td class="left-align"><?= $row["type"]; ?></td>
                <td id="statusType" class="open upper left-align padding-10"><?= $row["status"]; ?></td>
                <td class="left-align"><?= $row["assigned_to"]; ?></td>
                <td class="left-align padding-8"><?= $row["created"]; ?></td>
            </tr>
        <?php endforeach;?>

    </table>
<?php
}
?>