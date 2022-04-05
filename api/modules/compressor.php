<?php
function compressor($filename, $filepath, $save_dir, $size)
{
    //определяем тип изображения
    $explode = explode(".", $filename);
    $filetype = end($explode);
    //получаем размеры старого изображеня
    list($width, $height) = getimagesize($filepath);
    
    //бОльшая сторона должна быть ужата до $size
    $new_width = 0;
    $new_height = 0;

    if ($width > $height) {
      $new_width = $size;
    } else {
      $new_height = $size;
    }

    //вычисляем размеры нового изображения
    if ($new_width == 0) {
        $new_width = round($width * $new_height / $height);
    } elseif ($new_height == 0) {
        $new_height = round($height * $new_width / $width);
    }

    // Создание изображения
    $im_new = imagecreatetruecolor($new_width, $new_height);

    //получаем изображение из файла
    //и сжимаем изображение до новых размеров
    $path = explode('/', $filename);
    $name = array_pop($path);

    $save = $save_dir.$name;

    if ($filetype == 'png') {
        $im_old = imagecreatefrompng($filepath);
        imagealphablending($im_old, true);
        imagesavealpha($im_old, true);
        imagealphablending($im_new, true);
        imagesavealpha($im_new, true);
        $pngTransparency = imagecolorallocatealpha($im_new , 0, 0, 0, 127);
        imagefill($im_new , 0, 0, $pngTransparency);
        imagecopyresampled($im_new, $im_old, 0, 0, 0, 0, $new_width, $new_height, $width, $height);
        //header('Content-Type: image/png');
        imagepng($im_new, $save);
    } elseif ($filetype == 'jpg' || $filetype == 'jpeg') {
        $im_old = imagecreatefromjpeg($filepath);
        imagecopyresampled($im_new, $im_old, 0, 0, 0, 0, $new_width, $new_height, $width, $height);
        //header('Content-Type: image/jpeg');
        imagejpeg($im_new, $save);
    }

    imagedestroy($im_new);
}
