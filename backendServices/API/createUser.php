<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../Classes/Responses.php';

    if(!(isset($_POST['username'])) || !(isset($_POST['email'])) || !(isset($_POST['password']))) fail('Parameters missing.');

    strlen ($_POST['username']) >= 3 ? null : fail('Username too small.');
    strlen ($_POST['password']) >= 8 ? null : fail('Password too small.');
    strlen ($_POST['email']) >= 5 ? null : fail('Email too small.');

    include_once '../Classes/User.php';
    include_once '../Classes/Token.php';


    $user = new User();
    $token = new Token();

    $user->username = $_POST['username'];
    $user->email = $_POST['email'];
    $user->password = md5($_POST['password']);



    $user->authenticateUser() ? fail('User already exists.') : '';
    $user->checkIfEmailExists() ? fail('Email does exist.') : success('Email doesn\'t exist.') ;
    $user->checkIfUsernameExists() ? fail('Username does exist.') : success('Username doesn\'t exist.') ;
    $id =  $user->createUser();
    $id ? $user->id = $id : fail('User creation failed.');

    $jwt = $token->create($user->id, $user->username, $user->email, $user->password);

    $jwt ? success('User created successfully', $jwt) : fail('JWT failed to create.');
