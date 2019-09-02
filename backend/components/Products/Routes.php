<?php

require_once "Services.php";


$router->get('/api/products', function () {
    return productsIndex();
});

$router->post('/api/products', function ($request) {
    return productsStore($request);
});

$router->get('/api/products/find', function () {
    return productsShow();
});

// $Router->on("GET", "/api/products", productsIndex());
// $Router->on("POST", "/api/products", products());
// $Router->on("GET", "/api/products/(\w+)", productsShow());