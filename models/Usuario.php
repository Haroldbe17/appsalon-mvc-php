<?php

namespace Model;

use PDO;

use function PHPSTORM_META\elementType;

class Usuario extends ActiveRecord {
    //Base de datos
    protected static $tabla = 'usuarios';
    protected static $columnasDB = ['id', 'nombre', 'apellido', 'telefono', 'email', 'password', 'admin', 'confirmado', 'token'];

    public $id;
    public $nombre;
    public $apellido;
    public $telefono;
    public $email;
    public $password;
    public $admin;
    public $confirmado;
    public $token;

    public function __construct($args = []){
        $this->id = $args['id'] ?? null;
        $this->nombre = $args['nombre'] ?? '';
        $this->apellido = $args['apellido'] ?? '';
        $this->telefono = $args['telefono'] ?? '';
        $this->email = $args['email'] ?? '';
        $this->password = $args['password'] ?? '';
        $this->admin = $args['admin'] ?? 0;
        $this->confirmado = $args['confirmado'] ?? 0;
        $this->token = $args['token'] ?? '';
    }

    //Mensajes de Validacion
    public function validarNuevaCuenta(){

        if (!$this->nombre) {
            self::$alertas['error'][] = 'Debes ingresar un nombre';
        }

        if (!$this->apellido) {
            self::$alertas['error'][] = 'Debes ingresar un apellido';
        }
        if (!$this->telefono) {
            self::$alertas['error'][] = 'Debes ingresar un telefono';
        }
        if (!$this->email) {
            self::$alertas['error'][] = 'Debes ingresar un email';
        } 

        if (!$this->password) {
            self::$alertas['error'][] = 'Debes ingresar una contraseña';
        } else if (strlen($this->password) < 6) {
            self::$alertas['error'][] = 'La contraseña debe tener al menos 6 caracteres';
        }

        return self::$alertas;
    }

    public function validarLogin(){
        if (!$this->email) {
            self::$alertas['error'][] = 'Debes ingresar un email';
        }
        if (!$this->password) {
            self::$alertas['error'][] = 'Debes ingresar una contraseña';
        }

        return self::$alertas;
    }

    public function validarEmail(){
        if (!$this->email) {
            self::$alertas['error'][] = 'Debes ingresar un email';
        }

        return self::$alertas;
    }

    public function validarPassword(){
        if(!$this->password){
            self::$alertas['error'][] = 'Debes ingresar una contraseña';
        } else if(strlen($this->password) < 6){
            self::$alertas['error'][] = 'La contraseña debe tener al menos de 6 caracteres';
        }

        

        return self::$alertas;
    }

    //Revisa si el usuario existe
    public function existeUsuario(){
        $query = "SELECT * FROM " . self::$tabla . " WHERE email = '" . $this->email . "' LIMIT 1";
        
        $resultado = self::$db->query($query);

        if ($resultado->num_rows){
            self::$alertas['error'][] = 'El Usuario ya existe';
        }

        return $resultado;
    }

    public function hashpassword(){
        $this->password = password_hash($this->password, PASSWORD_BCRYPT);
    }

    public function crearToken(){
       $this->token = uniqid(); 
    }

    public function comprobarPasswordAndVerificado($password){

        $resultado = password_verify($password, $this->password);

        if (!$resultado) {
            self::$alertas['error'][] = 'Contraseña incorrecta';
            
        } else if (!$this->confirmado){
            self::$alertas['error'][] = 'Tu cuenta no ha sido confirmada';
        } else {
            return true;
        }
    }      
    


    
}