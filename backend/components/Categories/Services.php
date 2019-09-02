<?php

function categoriesIndex()
{
    $Sql = "SELECT c.id, c.name, t.name as tax_name, t.perc as tax_perc FROM categories c INNER JOIN taxes t ON t.id = c.tax ORDER BY c.name";
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
        "message" => "Não foi possivel listar as Categorias."
    ]);
}

function categoriesStore($request)
{
    $Post = $_POST;

    if (isset($Post['name']) && isset($Post['tax'])) {
        $Sql = "INSERT INTO categories(name, tax) VALUES (:name, :tax)";
        $Stmt = DB::prepare($Sql);

        $Stmt->bindParam(":name", $Post['name']);
        $Stmt->bindParam(":tax", $Post['tax']);

        $Stmt->execute();

        if ($Stmt->rowCount() > 0) {
            return json_encode([
                "status" => true,
                "message" => "Categoria cadastrada com sucesso."
            ]);
        }

        return json_encode([
            "status" => false,
            "message" => "Não foi possivel salvar a Categoria."
        ]);
    }
}

function categoriesShow($Id = NULL)
{
    if ($Id !== NULL) {
        $Sql = "SELECT * 
            FROM categories c 
                INNER JOIN taxes t ON t.id = c.tax
            WHERE id = :id";

        $Stmt = DB::prepare($Sql);
        $Stmt->bindParam(":id", $Id);
        $Stmt->execute();

        if ($Stmt->rowCount() > 0) {
            return json_encode([
                "status" => true,
                "data" => $Stmt->fetchAll(),
            ]);
        }

        return json_encode([
            "status" => false,
            "message" => "Não foi possivel encontrar a Categoria."
        ]);
    }
}