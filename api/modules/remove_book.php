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

$book = R::load( 'booking', $_POST['id']);

if (!isset($book->phone)) {
  echo json_encode(['err' => ['code'=>10, 'description'=>'Book with id '.$_POST['id'].' is not defined']]);
  exit;
}

$book->removed = true;
R::store($book);
echo json_encode($book);
