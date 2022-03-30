<?php

  function is_auth() {
    $timeout = 86400;

    if (!isset($_POST['session_id'])) {
      return ['status' => 0, 'err' => ['code' => 101, 'description' => 'Session id is not defined']];
    }
    $current_time = time();
    $session = R::findOne('sessions', 'session_id = ?', [$_POST['session_id']]);
    if (!isset($session->session_id)) {
      return ['status' => 0, 'err' => ['code' => 102, 'description' => 'Session timeout']];
    }
    $delta_time = $current_time - $session->date_touched;
    if ($delta_time > $timeout) {
      R::trash($session);
      return ['status' => 0, 'err' => ['code' => 102, 'description' => 'Session timeout']];
    }
    $session->date_touched = $current_time;
    R::store($session);

    return ['status' => 1];
  }