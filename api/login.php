<?php
header("Content-Type: text/html; charset=UTF-8");

$userName = $_POST['username'];
$password = $_POST['password'];

$con = mysqli_connect('localhost','root','root');
mysqli_set_charset($con,'utf8');
mysqli_select_db($con,'myuser');
$sql = 'SELECT * FROM `myuser`';
$res = mysqli_query($con,$sql);
while ($result = mysqli_fetch_assoc($res)) {
  array_push($data,$result);
}
echo $res;
exit;
if ($res) {
  $data = array('code'=>200, 'msg'=>'添加成功');
  echo json_encode($data,JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
  mysqli_close($con);
} else {
  $data = array('code'=>201, 'msg'=>'添加失败');
  echo json_encode($sql,JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
  mysqli_close($con);
}
?>