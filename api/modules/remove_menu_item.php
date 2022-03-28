<?php
$json = file_get_contents('php://input');
$_POST = json_decode($json, true);

if (!isset($_POST['id'])) {
  echo json_encode(['err' => ['code' => 8, 'description' => 'Incorrect data: id is not defined']]);
  exit;
}

$menu_item = R::load( 'menu', $_POST['id']);

if (!isset($menu_item)) {
  echo json_encode(['err' => ['code' => 10, 'description' => 'Position with id '.$_POST['id'].' is not defined']]);
  exit;
}

$menu_item->removed = true;
R::store($menu_item);
echo json_encode($menu_item);