<?php
include("utils/CONFIG.php");
include("includes/head.php");
?>
    <title><?php echo BRAND?></title>
    <script defer type="module" src="<?php echo BASE_PATH?>/static/js/index.js"></script>
</head>
<body>
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