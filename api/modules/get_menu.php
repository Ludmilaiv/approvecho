<?php
$menu = R::findLike( 'menu', ['removed' => [0]], ' ORDER BY "order" ');
$menu = array_values($menu);

echo json_encode($menu);