<?php
  require_once './db_conn/config.php';

  $json = file_get_contents('php://input');
  $_POST = json_decode($json, true);

  if (!isset($_POST['pass']) || $_POST['pass'] != $pass) {
    echo json_encode(['err' => ['code' => 100, 'description' => 'Incorrect password']]);
    exit;
  }

  session_start();

  $_SESSION['auth'] = true;

  $current_time = time();
  $sess_data = json_encode($_SESSION);

  $permitted_chars = '0123456789abcdefghijklmnopqrstuvwxyz';
  $session_id = substr(str_shuffle($permitted_chars), 0, 15);
  $session = R::find('sessions', 'session_id = ?', [$session_id]);
  while (isset($session->session_id)) {
    $session_id = substr(str_shuffle($permitted_chars), 0, 15);
    $session = R::find('sessions', 'session_id = ?', [$session_id]);
  }  
  $session = R::dispense('sessions');
  $session->session_id = $session_id;
  $session->sess_data = $sess_data;
  $session->date_touched = $current_time;
  R::store($session);

  echo json_encode($session);
