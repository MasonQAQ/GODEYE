<?php
    $ch = curl_init();
    $city=$_GET['city'];
    $url = 'http://apis.baidu.com/heweather/weather/free?city='.$city;
    $header = array(
        'apikey: 4b2ea7be2738839eeef3810b08b3f8c5',
    );
    // 添加apikey到header
    curl_setopt($ch, CURLOPT_HTTPHEADER  , $header);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    // 执行HTTP请求
    curl_setopt($ch , CURLOPT_URL , $url);
    $res = curl_exec($ch);
    $res=json_decode($res);
    exit(json_encode($res,JSON_UNESCAPED_UNICODE));
?>