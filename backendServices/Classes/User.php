<?php
    include_once __DIR__ . '/../Config/Database.php';


    class User {
        private $conn;
        private $table = 'users';

        public $id;
        public $username;
        public $email;
        public $password;
        public $created_date;

        public function __construct() {
            $database = new Database();
            $this->conn = $database->connect();
        }    
        

        public function createUser () {
            $query = "INSERT INTO
                        ". $this->table ."
                    SET
                        username = :username, 
                        email = :email, 
                        password = :password";
        
            $stmt = $this->conn->prepare($query);
        
            $this->username=htmlspecialchars(strip_tags($this->username));
            $this->email=htmlspecialchars(strip_tags($this->email));
            $this->password=htmlspecialchars(strip_tags($this->password));
        
            $stmt->bindParam(":username", $this->username);
            $stmt->bindParam(":email", $this->email);
            $stmt->bindParam(":password", $this->password);
        
            if($stmt->execute()){
               return true;
            }
            return false;
        }

        


        public function getUser(){
            $query = "SELECT
                        id, 
                        username, 
                        email, 
                        password,
                        created_date
                      FROM
                        ". $this->table ."
                    WHERE 
                       id = :id
                    LIMIT 0,1";

            $stmt = $this->conn->prepare($query);

            $stmt->bindParam(':id', $this->id);

            $stmt->execute();

            $dataRow = $stmt->fetch(PDO::FETCH_ASSOC);

            $this->username = $dataRow['username'];
            $this->email = $dataRow['email'];
            $this->password = $dataRow['password'];
            $this->created_date = $dataRow['created_date'];
            
            return $dataRow ;            
        }        


        public function authenticateUser() {
            $query = "SELECT id 
                      FROM ". $this->table ."
                      WHERE
                        username=:username 
                        OR 
                        email = :email
                        AND
                        password = :password";

            $stmt = $this->conn->prepare($query);

            $stmt->bindParam(':password', $this->password);
            $stmt->bindParam(':username', $this->username);
            $stmt->bindParam(':email', $this->email);

            $stmt->execute(); 

            if($stmt->rowCount()) return true;

            return false;
        }

    }