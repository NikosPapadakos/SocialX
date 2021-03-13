<?php
   function success ($msg = '', $payload = null) {
        echo json_encode(['status'=>1,'payload'=>$payload ,'message'=>$msg]);
    }

    function fail ($msg, $payload = null) {
        die(json_encode(['status'=>0,'payload'=>$payload ,'message'=>$msg]));
    }
