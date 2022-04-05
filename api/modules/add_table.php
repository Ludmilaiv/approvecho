<?php
$json = file_get_contents('php://input');
$_POST = json_decode($json, true);
require './modules/is_auth.php';

if (!is_auth()) {
  exit;
};

if (!isset($_POST['title'])) {
  echo json_encode(['err' => ['code'=>1, 'description'=>'Incorrect data: title is not defined']]);
  exit;
}

if (!isset($_POST['places'])) {
  echo json_encode(['err' => ['code'=>1, 'description'=>'Incorrect data: places is not defined']]);
  exit;
}

$order = 0;

$tables = R::findAll('tables', 'ORDER BY order_index');
$tables = array_values($tables);
if (isset($tables[0])) {
  $order = end($tables)->order_index + 1;
}

$table = R::dispense('tables');
$table->title = $_POST['title'];
$table->places = $_POST['places'];
$table->order_index = $order;
R::store($table);

echo json_encode($table);