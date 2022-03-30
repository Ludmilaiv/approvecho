<?php

$json = file_get_contents('php://input');
$_POST = json_decode($json, true);

if (!isset($_POST['session_id'])) {
  return ['err' => ['code' => 101, 'description' => 'Session id is not defined']];
}
//$current_time = time();
$session = R::findOne('sessions', 'session_id = ?', [$_POST['session_id']]);
if (isset($session->session_id)) {
  R::trash($session);
}

echo json_encode(['status' => 1]);