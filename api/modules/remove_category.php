<?php
$json = file_get_contents('php://input');
$_POST = json_decode($json, true);
require './modules/is_auth.php';

if (!is_auth()) {
  exit;
};

if (!isset($_POST['id'])) {
  echo json_encode(['err' => ['code'=>9, 'description'=>'Incorrect data: id is not defined']]);
  exit;
}

$category = R::load( 'categories', $_POST['id']);

if (!isset($category->title)) {
  echo json_encode(['err' => ['code'=>10, 'description'=>'Category with id '.$_POST['id'].' is not defined']]);
  exit;
}

$menu_with_category = R::findAll('menu', 'category_id = ? AND removed = 0', [$_POST['id']]);
$menu_with_category = array_values($menu_with_category);

if (isset($menu_with_category[0])) {
  echo json_encode(['err' => ['code' => 11, 'description' => 'Category is not empty']]);
  exit;
}

$category->removed = true;
R::store($category);
echo json_encode($category);