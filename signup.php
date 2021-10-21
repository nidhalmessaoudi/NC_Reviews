<?php
include("utils/CONFIG.php");
include("utils/dbConnection.php");
include("includes/head.php");

$error = null;
if ($_POST) {
    $error = signup_user();
}

function signup_user() {
    global $mysqli;

    $username = htmlspecialchars($_POST["username"]);
    $email = htmlspecialchars($_POST["email"]);
    $password = $_POST["password"];
    $password_confirm = $_POST["passwordConfirm"];

    if (!$username || !$email || !$password || !$password_confirm) {
        return "Missing some credentials!";
    }

    if ($password !== $password_confirm) {
        return "Password and it's confirm are not the same!";
    }

    $password = password_hash($_POST["password"], PASSWORD_DEFAULT);
    
    $signup_stmt = 
        mysqli_prepare($mysqli, "INSERT INTO users(username, email, password) VALUES(?, ?, ?)");

    mysqli_stmt_bind_param($signup_stmt, "sss", $username, $email, $password);
    
    mysqli_stmt_execute($signup_stmt);

    return handle_errors($signup_stmt);
}

function handle_errors($stmt) {
    $error = null;
    if (mysqli_stmt_errno($stmt) === 1062) {
        $tmp = explode(".", mysqli_stmt_error($stmt));
        $already_used_field = rtrim(end($tmp),"'");
        $error = "The $already_used_field is already used!";
    }
    return $error;
}

echo "<title>NC Reviews | Sign Up</title></head>";
if (!$error) {
    header("refresh:3;url=index.php");

    echo <<<EOF
    <body class="join-pages">
        <h1>SUCCESS</h1>
    </body>
    </html>
    EOF;
} else {
    echo <<<EOF
    <body class="join-pages">
        <script type="module">
            import Modal from "./static/js/Modal.js";
            import { createError } from "./static/js/helpers.js";

            const error = "$error";
            const signupModal = new Modal("signup", false, false);
            signupModal.modalForm.insertAdjacentElement("afterbegin", createError(error));
        </script>
    </body>
    </html>
    EOF;
}