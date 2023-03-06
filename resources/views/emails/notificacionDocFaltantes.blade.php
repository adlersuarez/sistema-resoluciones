<!DOCTYPE html>
<html>
<head>
    <title>Notificacion Documentos faltantes</title>
</head>
<body>
    <p>Estimado {{ $nombre_completo }}:</p>
    <p>Su solicitud de Constancia de No Adeudo para el trámite de {{ $finalidad }} esta en proceso, pero adeuda los siguientes documentos:</p>

    <ul>
    @foreach ($lista_documentos as $documento)
        <li> {{ $documento }}</li>
    @endforeach
    </ul>

    <br>
    <p>Oficina de Registros y Matrículas</p> 
    <p>Archivo Estudiantil</p> 
    <p>Universidad Peruana Los Andes</p> 
</body>
</html>