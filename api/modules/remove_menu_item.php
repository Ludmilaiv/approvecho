<?php
$json = file_get_contents('php://input');
$_POST = json_decode($json, true);
require './modules/is_auth.php';

if (!is_auth()) {
  exit;
};

if (!isset($_POST['id'])) {
  echo json_encode(['err' => ['code' => 13, 'description' => 'Incorrect data: id is not defined']]);
  exit;
}

$menu_item = R::load( 'menu', $_POST['id']);

if (!isset($menu_item)) {
  echo json_encode(['err' => ['code' => 14, 'description' => 'Position with id '.$_POST['id'].' is not defined']]);
  exit;
}

$menu_item->removed = true;
R::store($menu_item);
echo json_encode($menu_item);