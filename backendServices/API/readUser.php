<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../Classes/Responses.php';

    if(!(isset($_POST['id']))) fail('Id missing.'); 

    include_once '../Classes/User.php';

    $user = new User();

    $user->id = $_POST['id'];

    $data = $user->getUser();

    !empty($data) ? success('User retrieved successfully.', $data) : fail('User not found.') ;
