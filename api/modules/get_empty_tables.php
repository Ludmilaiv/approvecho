<?php
$json = file_get_contents('php://input');
$_POST = json_decode($json, true);

if (!isset($_POST['datetime'])) {
  echo json_encode(['err' => ['code'=>1, 'description'=>'Incorrect data: datetime is not defined']]);
  exit;
}

if (!isset($_POST['duration'])) {
  echo json_encode(['err' => ['code'=>1, 'description'=>'Incorrect data: duration is not defined']]);
  exit;
}

$tables = R::findLike( 'tables', ['removed' => [0]], ' ORDER BY order_index');
$tables = array_values($tables);

$begin_time = $_POST['datetime'] - 1800000;
$end_time = $_POST['datetime'] + $_POST['duration'] + 1800000;

$empty_tables = array();

foreach($tables as $table) {
  $tables_booking = R::find('booking','table_id = ?  AND 
  ((datetime < ? AND datetime + duration >= ?) OR 
  (datetime <= ? AND datetime + duration > ?) OR 
  (datetime >= ? AND datetime + duration <= ?) OR 
  (datetime <= ? AND datetime + duration >= ?)) AND
  confirmed = 1 AND removed = 0', 
  [$table->id, 
  $end_time, $end_time, 
  $begin_time, $begin_time, 
  $begin_time, $end_time,
  $begin_time, $end_time]);
  $tables_booking = array_values($tables_booking);
  if (!isset($tables_booking[0])) {
    array_push($empty_tables, $table);
  }
}

echo json_encode($empty_tables);