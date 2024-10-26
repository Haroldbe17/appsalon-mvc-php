<h1 class="nombre-pagina">Recuperar tu Contraseña</h1>
<p class="descripcion-pagina">Coloca tu nueva contraseña</p>

<?php
include_once __DIR__ . '/../templates/alertas.php'
?>
<?php if($error) return;?>
<form class="formulario" method="POST">
    <div class="campo">
        <label for="password">Contraseña</label>
        <input type="password" id="password" placeholder="Ingresa Tu Contraseña" name="password" > 
    </div>
    <input type="submit" class="boton" value="Guardar Contraseña">
</form>
<div class="acciones"> 
    <a href="/">¿Ya Tienes Cuenta? Inicia Sesión</a>
    <a href="/crear-cuenta">¿Aún no tienes cuenta? Regístrate</a>
</div>