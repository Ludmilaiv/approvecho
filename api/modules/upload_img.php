<?php
require './modules/compressor.php';
require './modules/is_auth.php';

if (!is_auth()) {
  exit;
};

if (!isset($_FILES['img'])) {
  echo json_encode(['err' => ['code'=>3, 'description'=>'Incorrect data: img file is not defined']]);
  exit;
}
if (explode('/',$_FILES['img']['type'])[0] !== 'image') {
  echo json_encode(['err' => ['code'=>4, 'description'=>'Incorrect data: invalid image format '.$_FILES['img']['type']]]);
  exit;
}

$upload_dir = './temporary/';
$tmp = explode('.',basename($_FILES['img']['name']));
$file_extension = end($tmp);
$file_name = 'img-'.random_int(10000,99999).'.'.$file_extension;
while (file_exists('./temporary/'.$file_name)) {
  $file_name = 'img-'.random_int(10000,99999).'.'.$file_extension;
}
$file_path = $upload_dir.$file_name;

$file_move = move_uploaded_file($_FILES['img']['tmp_name'], $file_path);

if (!$file_move) {
  echo json_encode(['err' => 'File upload failed']);
  exit;
}

compressor($file_name, $file_path, 500);

unlink($file_path);

echo json_encode(['fileName' => $file_name]);