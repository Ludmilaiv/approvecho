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

$order = 0;

$categories = R::findAll('categories', 'ORDER BY order_index');
if (isset($categories)) {
  $categories = array_values($categories);
  $order = end($categories)->order_index + 1;
}

$category = R::dispense('categories');
$category->title = $_POST['title'];
$category->order_index = $order;
R::store($category);

echo json_encode($category);