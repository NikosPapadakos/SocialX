<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../Classes/Responses.php';

    if(!(isset($_POST['username'])) && !(isset($_POST['email'])) || !(isset($_POST['password']))) fail('Parameters missing.');

    include_once '../Classes/User.php';
    include_once '../Classes/Token.php';

    $user = new User();
    $token = new Token();

    $user->username = isset($_POST['username']) ? $_POST['username'] : null;
    $user->email = isset($_POST['email']) ? $_POST['email'] : null;
    $user->password = md5($_POST['password']);
    
    $user->authenticateUser() ? null : fail('User does not exist.');

    $jwt = $token->create($user->id, $user->username, $user->email, $user->password);

    $jwt ? success('User authenticated successfully', $jwt) : fail('JWT failed to create.');
