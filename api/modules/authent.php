<?php

$json = file_get_contents('php://input');
$_POST = json_decode($json, true);

require './modules/is_auth.php';

echo json_encode(is_auth());