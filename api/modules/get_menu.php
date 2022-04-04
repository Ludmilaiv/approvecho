<?php
$menu = R::findLike( 'menu', ['removed' => [0]], ' ORDER BY order_index ');
$menu = array_values($menu);

echo json_encode($menu);