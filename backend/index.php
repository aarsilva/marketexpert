<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header("Access-Control-Max-Age: 86400");
/* 
 * Config Files
 */
require_once "./config/database.php";

/* 
 * Class Files
 */
require_once "./classes/Connection.php";
// require_once "./classes/Router.php";
include_once "./classes/Request.php";
include_once "./classes/Router.php";


$router = new Router(new Request);

include_once "./components/Invoices/Routes.php";
include_once "./components/Products/Routes.php";
include_once "./components/Categories/Routes.php";
include_once "./components/Taxes/Routes.php";

// echo $Router->run($Router->method(), $Router->uri());
// echo "Teste Working";