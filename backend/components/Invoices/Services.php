<?php

function RealizaVendas($request)
{
    $Post = $_POST;

    if (isset($Post['products'])) {
        if (sizeof($Post['products']) > 0) {
            $InvoiceData = json_decode($Post['invoice']);
            $ProductsData = json_decode($Post['products']);

            // return json_encode([
            //     "status" => false,
            //     "message" => "Não foi possivel realizar a venda.",
            //     "data" => $ProductsData
            // ]);

            $Cpf = $InvoiceData['cpf'] !== "" ? preg_replace("/\D+/", "", $InvoiceData['cpf']) : "00000000000";
            $SqlInvoice = "INSERT INTO invoices(cpf) VALUES (:cpf)";

            $StmtInvoice = DB::prepare($SqlInvoice);
            $StmtInvoice->bindParam(":cpf", $Cpf);

            $StmtInvoice->execute();

            $Invoice = DB::lastId();

            foreach ($ProductsData as $key => $value) {

                $SqlProduct = "INSERT INTO invoice_products(product, invoice, tax, quantity, price) VALUES (:product, :invoice, :tax, :quantity, :price)";

                $StmtProduct = DB::prepare($SqlProduct);
                $StmtProduct->bindParam(":product", $value->ean);
                $StmtProduct->bindParam(":invoice", $Invoice);
                $StmtProduct->bindParam(":tax", $value->tax);
                $StmtProduct->bindParam(":quantity", $value->quantity);
                $StmtProduct->bindParam(":price", $value->price);

                $StmtProduct->execute();
            }

            if ($StmtInvoice->rowCount() > 0) {
                return json_encode([
                    "status" => true,
                    "message" => "Venda realizada com sucesso."
                ]);
            }
        }
    }

    return json_encode([
        "status" => false,
        "message" => "Não foi possivel realizar a venda."
    ]);
};