<?php
header("Access-Control-Allow-Origin: *");
function productsIndex()
{
    $Sql = "SELECT p.ean, p.name, c.name AS category, price 
            FROM products p INNER JOIN categories c ON c.id = p.category
            ORDER BY p.name";
    $Stmt = DB::prepare($Sql);
    $Stmt->execute();

    if ($Stmt->rowCount() > 0) {
        return json_encode([
            "status" => true,
            "data" => $Stmt->fetchAll(),
        ]);
    }

    return json_encode([
        "status" => false,
        "message" => "Não foi possivel listar os Produtos.",
        "error" => $Stmt->fetchAll()
    ]);
}

function productsStore($request)
{
    $Post = $_POST;

    if (isset($Post['name']) && isset($Post['ean']) && isset($Post['category']) && isset($Post['price'])) {
        $Sql = "INSERT INTO products(ean, name, category, price) VALUES (:ean, :name, :category, :price)";
        $Stmt = DB::prepare($Sql);

        $FormatPrice = str_replace(",", ".", $Post['price']);

        $Stmt->bindParam(":ean", $Post['ean']);
        $Stmt->bindParam(":name", $Post['name']);
        $Stmt->bindParam(":category", $Post['category']);
        $Stmt->bindParam(":price", $Post['price']);

        $Stmt->execute();

        if ($Stmt->rowCount() > 0) {
            return json_encode([
                "status" => true,
                "message" => "Produto cadastrado com sucesso."
            ]);
        }

        return json_encode([
            "status" => false,
            "message" => "Não foi possivel salvar o Produto."
        ]);
    }
}

function productsShow()
{
    $Ean = $_GET['ean'];

    if ($Ean !== NULL) {
        $Sql = "SELECT ean, p.name, p.price, c.name as category, t.perc 
            FROM products p 
                INNER JOIN categories c ON c.id = p.category
                INNER JOIN taxes t ON t.id = c.tax
            WHERE ean = :ean";

        $Stmt = DB::prepare($Sql);
        $Stmt->bindParam(":ean", $Ean);
        $Stmt->execute();

        if ($Stmt->rowCount() > 0) {
            return json_encode([
                "status" => true,
                "data" => $Stmt->fetchAll(),
            ]);
        }

        return json_encode([
            "status" => false,
            "message" => "Não foi possivel encontrar o Produto."
        ]);
    }

    return json_encode([
        "status" => false,
        "message" => "Favor informar o Código de Barras."
    ]);
}