<?php
include __DIR__ . '/../vendor/autoload.php';

use \Firebase\JWT\JWT;

class Token
{

	private $key;
	private $iss;
	private $aud;
	private $iat;
	private $nbf;

	public function __construct()
	{
		$this->key = base64_encode('mcr_giagos_p');
		$this->iss = 'http://localhost';
		$this->aud = 'localhost';
		$this->iat = time();
		$this->nbf = time();
		$this->exp = strtotime('+7 days', time());
	}

    function create($id, $username = null, $email = null, $password)
	{

		$token = array(
			'iss' => $this->iss,
			'aud' => $this->aud,
			'iat' => $this->iat,
			'nbf' => $this->nbf,
			'exp' => $this->exp,
			'data' => array(
				'id'   => $id,
				'username'  => $username,
				'email'  => $email,
				'password' => $password,
			)
		);

		try {
			$jwt = JWT::encode($token, $this->key);
            $token = array('token' => $jwt, 'exp' => $this->exp);
            return $token;
		} catch (Exception $e) {
            return 0;
		}
	}


	function validate($jwt)
	{

		try {
			// decode jwt
			$decoded = JWT::decode($jwt, $this->key, array('HS256'));
			//Check if token is expired
			if ($decoded->exp < time())
				return array("error_code" => 1, "error_message" => "Token expired");

			//Valid
			return array("error_code" => 1, "data" => $decoded->data); // show user details
		} catch (Exception $e) {
			return array("error_code" => 1, "error_message" => "Access denied", "error_catch" => $e->getMessage());
		}
	}

}