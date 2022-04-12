<?php
$json = file_get_contents('php://input');
$_POST = json_decode($json, true);
require './modules/is_auth.php';

if (!is_auth()) {
  exit;
};

$start_date = 0;
$end_date = 0;

if (isset($_POST['start_date'])) {
  $start_date = $_POST['start_date'];
}

if (isset($_POST['end_date'])) {
  $end_date = $_POST['end_date'] + 86400000;
}

$booking = array();

if ($start_date == 0 || $end_date == 0) {
  $booking = R::findAll('booking');
} else {
  $booking = R::find('booking', 'datetime >= ? AND datetime < ?', [$start_date, $end_date]);
}

$booking = array_values($booking);

echo json_encode($booking);
