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
$tsql = "select astr as num, buserid as userid, alinenum as linenum, 'in' as direction from [dbo].[A_Stat_Connections_1x1]
where timestop is null
and (connectiontype = 5 or connectiontype = 3)
union
select bstr as num, auserid as userid, blinenum as linenum, 'out' as direction from [dbo].[A_Stat_Connections_1x1]
where timestop is null
and (connectiontype = 1 or connectiontype = 3)";
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