<?php
$mysqli = mysqli_connect(
    DB_HOST,
    DB_USER,
    DB_PWD,
    DB_NAME
);

mysqli_set_charset($mysqli, "utf8mb4");