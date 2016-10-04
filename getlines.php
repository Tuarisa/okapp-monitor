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
$tsql = "select * 
,isnull((select sum(datediff(second, timestart, timestop))
from [dbo].[A_Stat_Connections_1x1]
where timestop between dateadd(minute,-10, getdate()) and getdate()
and (alinenum =SystemNumStr or blinenum =  SystemNumStr))/6,0) as m10
,isnull((select sum(datediff(second, timestart, timestop))
from [dbo].[A_Stat_Connections_1x1]
where timestop between dateadd(minute,-20, getdate()) and getdate()
and (alinenum =SystemNumStr or blinenum =  SystemNumStr))/12,0) as m20
,isnull((select sum(datediff(second, timestart, timestop))
from [dbo].[A_Stat_Connections_1x1]
where timestop between dateadd(minute,-30, getdate()) and getdate()
and (alinenum =SystemNumStr or blinenum =  SystemNumStr))/18,0) as m30
from (
select SystemNumStr,LineCode, isnull(len([dbo].[A_Stat_Connections_1x1].ID),0) as linestate, astr + ', ' +bstr as btwn

  FROM A_ServerExtLines 
left outer join [dbo].[A_Stat_Connections_1x1]
on  ([dbo].[A_Stat_Connections_1x1].AlineID = oktell.dbo.A_ServerExtLines.id  or [dbo].[A_Stat_Connections_1x1].BLineId = oktell.dbo.A_ServerExtLines.id) and TimeStop is null
group by SystemNumStr,LineCode,astr + ', ' +bstr, isnull(len([dbo].[A_Stat_Connections_1x1].ID),0)) t

";
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