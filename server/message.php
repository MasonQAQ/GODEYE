<?php
    $ch = curl_init();
    $url = 'http://apis.baidu.com/baidu_mobile_security/phone_number_service/phone_information_query?tel=18600561397&location=true';
    $header = array(
        'apikey: 4b2ea7be2738839eeef3810b08b3f8c5',
    );
    // 添加apikey到header
    curl_setopt($ch, CURLOPT_HTTPHEADER  , $header);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    // 执行HTTP请求
    curl_setopt($ch , CURLOPT_URL , $url);
    $res = curl_exec($ch);

    var_dump(json_decode($res));
?>