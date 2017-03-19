<?php
file_put_contents("/var/www/html/demos/received_json/".uniqid().".json", file_get_contents("php://input"));
?>