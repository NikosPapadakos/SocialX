<?php
    //standardizing Responses
   function success ( $payload = null, $msg = '' ) {
        echo json_encode(['status'=>1,'payload'=>$payload ,'message'=>$msg]);
    }

    function fail ($msg) {
        die(json_encode(['status'=>0,'payload'=>'' ,'message'=>$msg]));
    }
