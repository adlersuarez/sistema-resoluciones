<?php

namespace App\Http\Controllers;

use setasign\Fpdi\Fpdi;
use Illuminate\Http\Request;

class DemoController extends Controller
{
    public function index()
    {
        $filePath = public_path("sample.pdf");
        $outputFilepath = public_path('sample_output.pdf');

        $this -> fillPDFFile($filePath,$outputFilepath);

        return response()->file($outputFilepath);
    }

    public function fillPDFFile($file,$outputFilePath)
    {
        $fpdi = new Fpdi();

        $count = $fpdi -> setSourceFile($file);
        
        for ($i=1 ; $i<=$count ; $i++) { 

            $template = $fpdi -> importPage($i);

            $size = $fpdi -> getTemplateSize($template);

            $fpdi -> AddPage($size['orientation'],array($size['width'],$size['height']));

            $fpdi ->useTemplate($template);

            $fpdi -> SetFont("Times","",12);

            $fpdi -> SetTextColor(0,0,0);
            
            
            $codigo = "2020495283D";
            $nombre_completo = "JULCARIMA GOMEZ JOSE";
            $programa = "FACULTAD DE CIENCIAS ADMINISTRATIVAS";
            $especialidad = "CONTABILIDAD Y FINANZAS";

            $finalidad = "BACHILLER";

            $fecha_expedito = "Huancayo, 08 de febrero de 2023.";
            $fecha_validez = "La presente constancia es válida solo hasta el 08 de agosto de 2023.";

            //      Text("Left","Top","texto") 
            $fpdi ->Text(72,97.5,$codigo);

            $fpdi ->Text(72,108,$nombre_completo);

            $fpdi ->Text(72,118.5,$programa);

            $fpdi ->Text(72,129.5,$especialidad);

            $fpdi -> SetFont("Times","B",14);
            $fpdi -> SetXY(64.5, 182.5);
            $fpdi -> Cell(81, 8, $finalidad, 0, 1, 'C');

            $fpdi -> SetFont("Times","",10);
            $fpdi -> SetXY(105, 195);
            $fpdi -> Cell(81, 8, $fecha_expedito, 0, 1, 'R');

            $fpdi -> SetFont("Times","B",10);
            $fpdi -> SetXY(26, 205);
            $fpdi -> Cell(81, 8, $fecha_validez, 0, 1, '');

            $fpdi -> SetXY(0, 0);
            
            $fpdi -> Image ("codigoQR.png",75.5,216);

            $fpdi -> Image ("firma.png",123.5,226.5);

            $fpdi -> Image ("123456789101.png",35,275,40,13);
            
        }

        return $fpdi -> Output($outputFilePath,'F');

    }
}
