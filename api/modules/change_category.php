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

$category = R::load( 'categories', $_POST['id']);

if (!isset($category->title)) {
  echo json_encode(['err' =>['code' => 14, 'description' => 'Category with id '.$_POST['id'].' is not defined']]);
  exit;
}

if (isset($_POST['title'])) {
  $category->title = $_POST['title'];
}

R::store($category);

echo json_encode($category);