<?php
$json = file_get_contents('php://input');
$_POST = json_decode($json, true);

if (!isset($_POST['cat_id'])) {
  echo json_encode(['err' => 'Incorrect data: cat_id is not defined']);
  exit;
}
if (!isset($_POST['title'])) {
  echo json_encode(['err' => 'Incorrect data: title is not defined']);
  exit;
}
if (!isset($_POST['massa'])) {
  echo json_encode(['err' => 'Incorrect data: massa is not defined']);
  exit;
}
if (!isset($_POST['unit'])) {
  echo json_encode(['err' => ['code'=>2, 'description'=>'Incorrect data: unit is not defined']]);
  exit;
}
if (!isset($_POST['price'])) {
  echo json_encode(['err' => ['code'=>3, 'description'=>'Incorrect data: price is not defined']]);
  exit;
}
if (!isset($_POST['img'])) {
  echo json_encode(['err' => ['code'=>4, 'description'=>'Incorrect data: img is not defined']]);
  exit;
}
if (!file_exists('./temporary/'.$_POST['img'])) {
  echo json_encode(['err' => ['code'=>5, 'description'=>'Incorrect data: img'.$_POST['img'].'does not exist']]);
  exit;
}

$order = 0;

$menu = R::findAll('menu', 'ORDER BY "order"');
if (isset($menu)) {
  $menu = array_values($menu);
  $order = end($menu)->order + 1;
}

$menu_item = R::dispense('menu');
$menu_item->title = $_POST['title'];
$menu_item->unit = $_POST['unit'];
$menu_item->price = $_POST['price'];
$menu_item->order = $order;
$menu_item->img = $_POST['img'];
$menu_item->removed = false;
R::store($menu_item);

echo json_encode($menu_item);