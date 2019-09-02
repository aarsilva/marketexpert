<?php

include_once "Services.php";

$router->get('/api/categories', function () {
    return categoriesIndex();
});

$router->post('/api/categories', function ($request) {
    return categoriesStore($request);
});


// $Router->on("GET", "/api/categories", categoriesIndex());
// $Router->on("POST", "/api/categories", categoriesStore());
// $Router->on("GET", "/api/categories/(\w+)", categoriesShow());