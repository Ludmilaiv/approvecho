<?php
require './DB_conn/db_conn.php';
$url = $_SERVER['REQUEST_URI'];

if (!isset($_GET['func'])) {
  echo json_encode(['err' => 'Incorrect data: func is not defined']);
  exit;
}

$function = $_GET['func'];
$module_path = './modules/'.$function.'.php';

if (!file_exists($module_path)) {
  echo json_encode(['err' => 'Incorrect data: function named '.$function.' does not exist']);
  exit;
}

require $module_path;

