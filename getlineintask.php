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
$tsql = "SELECT [taskid]
      ,[ExtLineId]
    ,SystemNumStr
  FROM [oktell_settings].[dbo].[A_TaskManager_TaskExtLines]
  join oktell.dbo.A_ServerExtLines 
  on ID = [ExtLineId]
  where [TaskId] in (select ID from [oktell_settings].[dbo].[A_TaskManager_Tasks] where active =1 and type = 20)";
$stmt = sqlsrv_query( $conn, $tsql);
 
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