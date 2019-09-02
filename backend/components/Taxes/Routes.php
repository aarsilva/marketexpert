<?php

include_once "Services.php";

$router->get('/api/taxes', function () {
    return taxesIndex();
});
$router->post('/api/taxes', function ($request) {
    return taxesStore($request);
});


// $Router->on("GET", "/api/taxes", taxesIndex());
// $Router->on("POST", "/api/taxes", taxesStore());
// $Router->on("GET", "/api/taxes/(\w+)", taxesShow());