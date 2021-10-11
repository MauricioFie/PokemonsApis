<?php
$usuario=$_POST['usuario'];
$contraseña=$POST['contraseña'];
sesion_start();
$_SESION["usuario"]=$usuario;

include('db.php');

$consulta="SELECT*FROM usuarios where usuarios='$usuario' and contraseña='$contraseña'";
$resultado=mysqli_query($conexion,$consulta);

$filas=mysqli_num_rows($resultado);

if($filas){
    header("location:home.php");
}else{
    ?>
    <?php
    include("index.php");
    ?>
    <h1 class="bad">ERROR EN LA AUTENTIFICACION</h1>
    <?php
}
mysqli_free_result($resultado):
mysqli_close($conexion);