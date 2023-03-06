<!DOCTYPE html>
<html>
<head>
    <title>Solicitud Aceptada</title>
</head>
<body>
    <p>Estimado {{ $nombre_completo }}:</p>
    <p>Su solicitud de Constancia de No Adeudo para el trámite de {{ $finalidad }} fue rechazada debido a lo siguiente:</p>

    <p>- {{ $comentario }}</p>
    <p>Sírvase a generar una nueva solicitud, de acuerdo a lo requerido anteriormente</p>

    <br>
    <p>Oficina de Registros y Matrículas</p> 
    <p>{{ $facultad }}</p> 
    <p>Universidad Peruana Los Andes</p> 
</body>
</html>