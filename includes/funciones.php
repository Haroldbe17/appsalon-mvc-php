<?php

function debuguear($variable) : string {
    echo "<pre>";
    var_dump($variable);
    echo "</pre>";
    exit;
}

// Escapa / Sanitizar el HTML
function s($html) : string {
    $s = htmlspecialchars($html);
    return $s;
}

function esUltimo($actual, $proximo) : bool{
    if ($actual !== $proximo){
        return true;
    }
    return false;
}

//Funcion que revise que el usuario ese autenticado

function isAuth() : void{
    if(!isset($_SESSION['login'])){
        header('Location: /');
    }
}

// Funcion que revise que el usuario ese autenticado y sea admin
function isAdmin() : void{
    if(!isset($_SESSION['admin'])){
        header('Location: /');
    }
}