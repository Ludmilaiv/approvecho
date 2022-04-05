<?php
$json = file_get_contents('php://input');
$_POST = json_decode($json, true);
require './modules/is_auth.php';

if (!is_auth()) {
  exit;
};

if (!isset($_POST['id'])) {
  echo json_encode(['err' => ['code'=>9, 'description'=>'Incorrect data: id is not defined']]);
  exit;
}

$table = R::load( 'tables', $_POST['id']);

if (!isset($table->title)) {
  echo json_encode(['err' => ['code'=>10, 'description'=>'Table with id '.$_POST['id'].' is not defined']]);
  exit;
}

$table->removed = true;
R::store($table);
echo json_encode($table);