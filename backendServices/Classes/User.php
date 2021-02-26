<?php
    include_once __DIR__ . '/../Config/Database.php';


    class User {
        private $conn;
        private $table = 'users';

        public $id;
        public $email;
        public $password;
        public $created_date;

        public function __construct() {
            $database = new Database();
            $this->conn = $database->connect();
        }    
        
        public function getUser($id){
            $query = "SELECT
                        id,  
                        email, 
                        password,
                        created_date
                      FROM
                        ". $this->table ."
                    WHERE 
                       id = :id
                    LIMIT 0,1";

            $stmt = $this->conn->prepare($query);

            $stmt->bindParam(':id', $id);

            $stmt->execute();

            return $dataRow = $stmt->fetch(PDO::FETCH_ASSOC);            
        }        



    }