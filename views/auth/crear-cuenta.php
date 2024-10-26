<h1 class="nombre-pagina">Crear Cuenta</h1>

<p class="descripcion-pagina">Crea una cuenta ingresando los siguientes datos</p>

<?php
include_once __DIR__ . '/../templates/alertas.php'
?>

<form class="formulario" method="POST" action="/crear-cuenta">
    <div class="campo">
        <label for="nombre">Nombre</label>
        <input type="text" id="nombre" placeholder="Ingresa Tu Nombre" name="nombre" value="<?php echo s($usuario->nombre); ?>">
    </div>

    <div class="campo">
        <label for="apellido">Apellido</label>
        <input type="text" id="apellido" placeholder="Ingresa Tu Apellido" name="apellido" value="<?php echo s($usuario->apellido); ?>">
    </div>

    <div class="campo">
        <label for="telefono">Teléfono</label>
        <input type="tel" id="telefono" placeholder="Ingresa Tu Teléfono" name="telefono" value="<?php echo s($usuario->telefono); ?>">
    </div>
    
    <div class="campo">
        <label for="email">Email</label>
        <input type="email" id="email" placeholder="Ingresa Tu Email" name="email" value="<?php echo s($usuario->email); ?>">
    </div>

    <div class="campo">
        <label for="password">Contraseña</label>
        <input type="password" id="password" placeholder="Ingresa Tu Contraseña" name="password" > 
    </div>

    <input type="submit" class="boton" value="Crear Cuenta">
    
</form>

<div class="acciones"> 
    <a href="/">¿Ya Tienes Cuenta? Inicia Sesión</a>
    <a href="/olvide">¿Olvidaste tu contraseña?</a>
</div>