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
               return $this->conn->lastInsertId();

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
            $query = $this->email == null ? 
             "SELECT id 
                      FROM ". $this->table ."
                      WHERE
                      password = :password 
                      AND 
                      username = :username" :
             "SELECT id 
                      FROM ". $this->table ."
                      WHERE
                      password = :password 
                      AND 
                      email = :email";

            $stmt = $this->conn->prepare($query);

            $stmt->bindParam(':password', $this->password);
            $this->email == null ? $stmt->bindParam(':username', $this->username) : $stmt->bindParam(':email', $this->email);
            

            $stmt->execute(); 

            if($stmt->rowCount()){
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                $this->id = $row['id'];
                return true;
            } 

            return false;
        }

    }