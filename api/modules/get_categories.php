<?php
$categories = R::findLike( 'categories', ['removed' => [0]], ' ORDER BY "order" ');
$categories = array_values($categories);

echo json_encode($categories);