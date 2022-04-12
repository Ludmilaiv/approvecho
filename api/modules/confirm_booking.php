<?php

$json = file_get_contents('php://input');
$_POST = json_decode($json, true);

if (!isset($_POST['code'])) {
  echo json_encode(['err' => ['code'=>1, 'description'=>'Incorrect data: code is not defined']]);
  exit;
}

if (!isset($_POST['id'])) {
  echo json_encode(['err' => ['code'=>1, 'description'=>'Incorrect data: id is not defined']]);
  exit;
}

$book = R::load('booking', $_POST['id']);

if (!isset($book->code)) {
  echo json_encode(['err' => ['code' => 14, 'description' => 'book with id '.$_POST['id'].' is not defined']]);
  exit;
}

if ($book->code != $_POST['code']) {
  echo json_encode(['err' => ['code' => 11, 'description' => 'incorrect code']]);
  exit;
}

$book->confirmed = true;

R::store($book);

echo json_encode($book);