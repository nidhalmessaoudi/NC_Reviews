<?php
include("utils/CONFIG.php");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo BRAND?></title>
    <link rel="stylesheet" href="<?php echo BASE_PATH?>/static/css/styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Nunito&display=swap" rel="stylesheet">
    <script defer src="https://unpkg.com/typewriter-effect@latest/dist/core.js"></script>
    <script defer type="module" src="<?php echo BASE_PATH?>/static/js/index.js"></script>
</head>
<body>
    <div class="modal-container"></div>
    <section id="header" class="main-container">
        <nav class="navbar">
            <div class="navbar-brand">
                <h3>NC Reviews</h3>
            </div>
            <div class="navbar-actions">
                <ul id="nav-items" class="navbar-items">
                    <li class="navbar-item">Home</li>
                    <li class="navbar-item">Trends</li>
                    <li class="navbar-item">Reviews</li>
                    <li class="navbar-item btn special-item1" data-for="signin">Sign in</li>
                    <li class="navbar-item btn special-item2" data-for="signup">Sign up</li>
                </ul>
            </div>
        </nav>
        <div class="search-container">
            <h1 id="search-heading">Hey, Welcome to NC Reviews!</h1>
            <form class="search-form" method="post" action="<?php echo BASE_PATH?>/index.php">
                <input id="search-field" class="search-control" type="text" name="searchTerm" />
                <button class="btn search-btn" type="submit">Search</button>
            </form>
        </div>
    </section>
</body>
</html>

<?php
if ($_POST) {
    $search_term = rawurldecode($_POST["searchTerm"]);
    $movie_data = json_decode(file_get_contents("https://imdb-api.com/en/API/Search/" . IMDB_API_KEY . "/$search_term"));

    echo "<pre>";
    print_r($movie_data);
    echo "</pre>";
}
?>