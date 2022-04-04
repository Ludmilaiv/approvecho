<?php
$json = file_get_contents('php://input');
$_POST = json_decode($json, true);
require './modules/is_auth.php';

if (!is_auth()) {
  exit;
};

if (!isset($_POST['cat_id'])) {
  echo json_encode(['err' => ['code'=>1, 'description'=>'Incorrect data: cat_id is not defined']]);
  exit;
}
if (!isset($_POST['title'])) {
  echo json_encode(['err' => ['code'=>1, 'description'=>'Incorrect data: title is not defined']]);
  exit;
}
if (!isset($_POST['desc'])) {
  echo json_encode(['err' => ['code'=>1, 'description'=>'Incorrect data: title is not defined']]);
  exit;
}
if (!isset($_POST['massa'])) {
  echo json_encode(['err' => ['code'=>1, 'description'=>'Incorrect data: massa is not defined']]);
  exit;
}
if (!isset($_POST['unit'])) {
  echo json_encode(['err' => ['code'=>1, 'description'=>'Incorrect data: unit is not defined']]);
  exit;
}
if (!isset($_POST['price'])) {
  echo json_encode(['err' => ['code'=>1, 'description'=>'Incorrect data: price is not defined']]);
  exit;
}
if (!isset($_POST['img'])) {
  echo json_encode(['err' => ['code'=>1, 'description'=>'Incorrect data: img is not defined']]);
  exit;
}
if (!file_exists('./img/menu/'.$_POST['img'])) {
  echo json_encode(['err' => ['code'=>2, 'description'=>'Incorrect data: img '.$_POST['img'].' does not exist']]);
  exit;
}

$order = 0;

$menu = R::findAll('menu', 'ORDER BY order_index');
if (isset($menu)) {
  $menu = array_values($menu);
  $order = end($menu)->order_index + 1;
}

$menu_item = R::dispense('menu');
$menu_item->category_id = $_POST['cat_id'];
$menu_item->title = $_POST['title'];
$menu_item->desc = $_POST['desc'];
$menu_item->massa = $_POST['massa'];
$menu_item->unit = $_POST['unit'];
$menu_item->price = $_POST['price'];
$menu_item->order_index = $order;
$menu_item->img = $_POST['img'];
$menu_item->removed = false;
R::store($menu_item);

echo json_encode($menu_item);