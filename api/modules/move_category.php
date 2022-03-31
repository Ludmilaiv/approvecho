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

$category_1 = R::load( 'categories', $_POST['id_1']);
$category_2 = R::load( 'categories', $_POST['id_2']);

if (!isset($category_1->title)) {
  echo json_encode(['err' => ['code' => 14, 'description' => 'Category with id '.$_POST['id_1'].' is not defined']]);
  exit;
}
if (!isset($category_2->title)) {
  echo json_encode(['err' => ['code' => 14, 'description' => 'Category with id '.$_POST['id_2'].' is not defined']]);
  exit;
}

$order_1 = $category_1->order;
$order_2 = $category_2->order;

$category_1->order = $order_2;
$category_2->order = $order_1;

R::store($category_1);
R::store($category_2);
echo json_encode([$category_1, $category_2]);