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
		$this->key = base64_encode('SocialXNikosPapadakos');
		$this->iss = 'http://localhost:3000/';
		$this->aud = 'localhost:3000/';
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

}