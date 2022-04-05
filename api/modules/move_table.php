<?php
$json = file_get_contents('php://input');
$_POST = json_decode($json, true);
require './modules/is_auth.php';

if (!is_auth()) {
  exit;
};

if (!isset($_POST['id_1'])) {
  echo json_encode(['err' => ['code' => 13, 'description' => 'Incorrect data: id_1 is not defined']]);
  exit;
}
if (!isset($_POST['id_2'])) {
  echo json_encode(['err' => ['code' => 13, 'description' => 'Incorrect data: id_2 is not defined']]);
  exit;
}

$table_1 = R::load( 'categories', $_POST['id_1']);
$table_2 = R::load( 'categories', $_POST['id_2']);

if (!isset($table_1->title)) {
  echo json_encode(['err' => ['code' => 14, 'description' => 'Table with id '.$_POST['id_1'].' is not defined']]);
  exit;
}
if (!isset($table_2->title)) {
  echo json_encode(['err' => ['code' => 14, 'description' => 'Table with id '.$_POST['id_2'].' is not defined']]);
  exit;
}

$order_1 = $table_1->order_index;
$order_2 = $table_2->order_index;

$table_1->order_index = $order_2;
$table_2->order_index = $order_1;

R::store($table_1);
R::store($table_2);
echo json_encode([$table_1, $table_2]);