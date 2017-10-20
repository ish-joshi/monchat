<?php
/**
 * Created by PhpStorm.
 * User: Ishan
 * Date: 6/10/2017
 * Time: 12:34 PM
 */


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


//$subject_code = $_POST['subject_code'];
$subject_code = "ACC1100_CL_S2_DAY";
$activity_group_code = "Tutorial";

$db = mysqli_connect("127.0.0.1", "root", "", "swapme");

$query = "select * from `activities` where SUBJECT_CODE = '$subject_code'";

$result = mysqli_query($db, $query);

$rows = array();
while ($r = mysqli_fetch_array($result)){
    $rows[] = $r;
}

echo(json_encode($rows));

?>
