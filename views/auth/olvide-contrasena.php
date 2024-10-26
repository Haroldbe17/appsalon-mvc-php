<h1 class="nombre-pagina">Olvidaste tu Contraseña</h1>

<p class="descripcion-pagina">Ingresa tu email para restablecer tu contraseña</p>

<?php
include_once __DIR__ . '/../templates/alertas.php'
?>

<form action="/olvide" class="formulario" method="POST">
    <div class="campo">
        <label for="email">Email</label>
        <input type="email" id="email" placeholder="Ingresa Tu Email" name="email">
    </div>
    <input type="submit" class="boton" value="Enviar Instrucciones">
</form>

<div class="acciones"> 
    <a href="/">¿Ya Tienes Cuenta? Inicia Sesión</a>
    <a href="/crear-cuenta">¿Aún no tienes cuenta? Regístrate</a>
</div>