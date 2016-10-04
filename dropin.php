<?php
/* Set Connection Credentials */
include __DIR__ . '/config.php';

$serverName=$config['serverName'] ;
$uid = $config['login'];
$pwd = $config['password'];

$connectionInfo = array( "UID"=>$uid,
                         "PWD"=>$pwd,
                         "Database"=>"oktell",
                         "CharacterSet"=>"UTF-8");
 
/* Connect using SQL Server Authentication. */
$conn = sqlsrv_connect( $serverName, $connectionInfo);
 
if( $conn === false ) {
     echo "Unable to connect.</br>";
     die( print_r( sqlsrv_errors(), true));
}
 
/* TSQL Query */
if ($_GET['type']=='user'){
    $tsql = "insert into [oktell_settings].[dbo].[A_TaskManager_Operators] (taskid, operatorid, isgroup)
    select
    ?, ID, 0
     from [oktell_settings].[dbo].[A_users] where name = ?
     and not exists (
     select * from [oktell_settings].[dbo].[A_TaskManager_Operators]
      where taskid = ?
      and operatorid in (select id from [oktell_settings].[dbo].[A_users] where name = ?))";
    $p =  array( $_GET['idtask'],  $_GET['operator'], $_GET['idtask'], $_GET['operator']);
}
else{
    $tsql = "insert into [oktell_settings].[dbo].[A_TaskManager_TaskExtLines] (taskid, ExtLineId)
    select
    ?, ID
     from [oktell].[dbo].[A_ServerExtLines] where SystemNumStr = ?
     and not exists (
     select * from [oktell_settings].[dbo].[A_TaskManager_TaskExtLines]
      where taskid = ?
      and ExtLineId in (select id from [oktell].[dbo].[A_ServerExtLines] where SystemNumStr = ?))";
    $p =  array( $_GET['idtask'],  $_GET['operator'], $_GET['idtask'], $_GET['operator']);
}
$stmt = sqlsrv_query( $conn, $tsql,$p);

$httpfile  = file_get_contents($config['oktellstring'].'execsvcscript?name=refresh_task_list&async=0&timeout=10');
 
if( $stmt === false ) {
     echo "Error in executing query.</br>";
     die( print_r( sqlsrv_errors(), true));
}
 
/* Process results */
$json = array();
 
do {
     while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
     $json[] = $row;
     }
} while ( sqlsrv_next_result($stmt) );
 
/* Run the tabular results through json_encode() */
/* And ensure numbers don't get cast to trings */
echo json_encode($json);
/* Free statement and connection resources. */
sqlsrv_free_stmt( $stmt);
sqlsrv_close( $conn);
 
?>