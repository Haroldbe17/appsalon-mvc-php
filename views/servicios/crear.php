<h1 class="nombre-pagina">Crear Nuevo Servicio</h1>
<p class="descripcion-pagina">Crea un nuevo Servicio</p>

<?php
include_once __DIR__ . '/../templates/barra.php';
include_once __DIR__ . '/../templates/alertas.php';
?>



<form action="/servicios/crear" method="POST" class="Formulario">
    
    <?php include_once __DIR__ . '/formulario.php' ?>

    <input type="submit" class="boton" value="Guardar Servicio">
</form>