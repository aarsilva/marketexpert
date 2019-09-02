<?php

function taxesIndex()
{
    $Sql = "SELECT * FROM taxes";
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
        "message" => "Não foi possivel listar os Impostos."
    ]);
}

function taxesStore($request)
{

    $Post = $_POST;

    if (isset($Post['name']) && isset($Post['perc'])) {
        $Sql = "INSERT INTO taxes(name, perc) VALUES (:name, :perc)";
        $Stmt = DB::prepare($Sql);

        $FormatPerc = str_replace(",", ".", $Post['perc']);
        $Perc = ($FormatPerc / 100);

        $Stmt->bindParam(":name", $Post['name']);
        $Stmt->bindParam(":perc", $Perc);

        $Stmt->execute();

        if ($Stmt->rowCount() > 0) {
            return json_encode([
                "status" => true,
                "message" => "Imposto cadastrado com sucesso."
            ]);
        }

        return json_encode([
            "status" => false,
            "message" => "Não foi possivel salvar o Imposto."
        ]);
    } else {
        return json_encode(
            [
                "status" => false,
                "message" => "Não foi possível ler os campos POST.",
                "request" => $request
            ]
        );
    }
}

function taxesShow($Id = NULL)
{
    if ($Id !== NULL) {
        $Sql = "SELECT * 
            FROM taxes t 
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
            "message" => "Não foi possivel encontrar o Imposto."
        ]);
    }
}