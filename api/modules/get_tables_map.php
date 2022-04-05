<?php
$map = R::load('table_map', 1);

echo json_encode(['fileName' => $map->img]);
