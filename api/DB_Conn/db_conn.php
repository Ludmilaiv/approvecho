<?php
require_once './db_conn/libs/rb-mysql.php';
require_once './db_conn/config.php';
R::setup( 'mysql:host=localhost;dbname='.$DB_data->name, $DB_data->login, $DB_data->pass );
R::addDatabase( 'local','mysql:host=localhost;dbname='.$DB_data->name,'root', '' );
if (!R::testConnection())
{
  R::close();
	R::selectDatabase( 'local' );
  if (!R::testConnection()) {
    echo json_encode(['err' => ['code' => 0, 'description' => 'error database connection']]);
    exit;
  }
}
?>