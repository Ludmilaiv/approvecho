<?php
$json = file_get_contents('php://input');
$_POST = json_decode($json, true);
require './modules/is_auth.php';

if (!is_auth()) {
  exit;
};

if (!isset($_POST['id'])) {
  echo json_encode(['err' => ['code'=>13, 'description'=>'Incorrect data: id is not defined']]);
  exit;
}

$menu_item = R::load( 'menu', $_POST['id']);

if (!isset($menu_item->title)) {
  echo json_encode(['err' => ['code' => 14, 'description' => 'Menu item with id '.$_POST['id'].' is not defined']]);
  exit;
}

if (isset($_POST['cat_id'])) {
  $menu_item->category_id = $_POST['cat_id'];
}
if (isset($_POST['title'])) {
  $menu_item->title = $_POST['title'];
}
if (isset($_POST['desc'])) {
  $menu_item->desc = $_POST['desc'];
}
if (isset($_POST['massa'])) {
  $menu_item->massa = $_POST['massa'];
}
if (isset($_POST['unit'])) {
  $menu_item->unit = $_POST['unit'];
}
if (isset($_POST['price'])) {
  $menu_item->price = $_POST['price'];
}
if (isset($_POST['img'])) {
  if (!file_exists('./img/menu/'.$_POST['img'])) {
    echo json_encode(['err' => ['code'=>5, 'description'=>'Incorrect data: img '.$_POST['img'].' does not exist']]);
    exit;
  }
  $menu_item->img = $_POST['img'];
}

R::store($menu_item);

echo json_encode($menu_item);