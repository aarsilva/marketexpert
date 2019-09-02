<?php
include_once "Services.php";

$router->post('/api/invoices', function ($request) {
    return RealizaVendas($request);
});