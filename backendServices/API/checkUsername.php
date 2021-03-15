<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../Classes/Responses.php';

    if(!(isset($_POST['username']))) fail('Parameters missing.');

    include_once '../Classes/User.php';

    $user = new User();

 
    $user->username =  $_POST['username'] ;
    
    $user->checkIfUsernameExists() == true ? fail('Username does exist.') : success('Username doesn\'t exist.') ;
