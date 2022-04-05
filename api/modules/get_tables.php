<?php
$tables = R::findLike( 'tables', ['removed' => [0]], ' ORDER BY order_index');
$tables = array_values($tables);

echo json_encode($tables);