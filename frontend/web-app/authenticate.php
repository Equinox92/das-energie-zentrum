<?php

session_start();

require_once "./includes/config.php";

$username =
    $_POST["username"] ?? "";

$password =
    $_POST["password"] ?? "";

if (

    $username === PREVIEW_USERNAME

    &&

    password_verify(
        $password,
        PREVIEW_PASSWORD_HASH
    )

)
{

    $_SESSION["authenticated"] = true;

    header(
        "Location: index.php"
    );

    exit;

}

header(
    "Location: login.php?error=1"
);

exit;