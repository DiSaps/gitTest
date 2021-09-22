<?php
//header('Access-Control-Allow-Origin: *');
//$a=array("value"=>(rand(1,100)));
//$q = $_REQUEST["value"];
$q=array();
$q[]=rand(1,100);

if ($q!==""){
    echo json_encode($q);
}else{
    echo("no number");
}

?>