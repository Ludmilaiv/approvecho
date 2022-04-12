<?php

$json = file_get_contents('php://input');
$_POST = json_decode($json, true);

if (!isset($_POST['first_name'])) {
  echo json_encode(['err' => ['code'=>1, 'description'=>'Incorrect data: first_name is not defined']]);
  exit;
}

if (!isset($_POST['last_name'])) {
  echo json_encode(['err' => ['code'=>1, 'description'=>'Incorrect data: last_name is not defined']]);
  exit;
}

if (!isset($_POST['table_id'])) {
  echo json_encode(['err' => ['code'=>1, 'description'=>'Incorrect data: table_id is not defined']]);
  exit;
}

if (!isset($_POST['datetime'])) {
  echo json_encode(['err' => ['code'=>1, 'description'=>'Incorrect data: datetime is not defined']]);
  exit;
}

if (!isset($_POST['duration'])) {
  echo json_encode(['err' => ['code'=>1, 'description'=>'Incorrect data: duration is not defined']]);
  exit;
}

if (!isset($_POST['phone'])) {
  echo json_encode(['err' => ['code'=>1, 'description'=>'Incorrect data: phone is not defined']]);
  exit;
}

require("./modules/send_message.php");

$code = random_int(1000, 9999);
$text = "Аппровечо. Ваш код подтверждения заказа: ".$code;

$send_message_result = send_message($_POST['phone'], $text);

//$send_message_result = ["success"=>true]; //заглушка для теста

if (isset($send_message_result["error"])) {
  echo json_encode(['err' => ['code'=>10, 'description'=>'error sending the message: '.$send_message_result["error"]]]);
  exit;
}

$book = R::dispense('booking');
$book->first_name = $_POST['first_name'];
$book->last_name = $_POST['last_name'];
$book->table_id = $_POST['table_id'];
$book->phone = $_POST['phone'];
$book->datetime = $_POST['datetime'];
$book->duration = $_POST['duration'] * 60 * 60 * 1000;
$book->code = $code;
$book->confirmed = false;

R::store($book);

echo json_encode($book);