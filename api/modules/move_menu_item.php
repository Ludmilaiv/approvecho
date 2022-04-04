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

$menu_item_1 = R::load( 'menu', $_POST['id_1']);
$menu_item_2 = R::load( 'menu', $_POST['id_2']);

if (!isset($menu_item_1->title)) {
  echo json_encode(['err' => ['code' => 14, 'description' => 'Menu item with id '.$_POST['id_1'].' is not defined']]);
  exit;
}
if (!isset($menu_item_2->title)) {
  echo json_encode(['err' => ['code' => 14, 'description' => 'Menu item with id '.$_POST['id_2'].' is not defined']]);
  exit;
}

$order_1 = $menu_item_1->order_index;
$order_2 = $menu_item_2->order_index;

$menu_item_1->order_index = $order_2;
$menu_item_2->order_index = $order_1;

R::store($menu_item_1);
R::store($menu_item_2);
echo json_encode([$menu_item_1, $menu_item_2]);