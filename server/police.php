<?php
    header('Content-Type:text/html;charset=utf-8');
    // echo "<pre />";
    #引入接口文件，其实你懂的，就是一个类
    require_once('sphinxapi.php');
    // $keyword = trim($_GET['keyword']);    //接收关键词
    $sph = new SphinxClient();            //实例化 sphinx 对象
    $sph->SetServer('localhost',9312);    //连接9312端口
    $sph->SetMatchMode(SPH_MATCH_ANY);    //设置匹配方式
    $sph->SetSortMode(SPH_SORT_RELEVANCE);    //查询结果根据相似度排序
    // SPH_SORT_EXTENDED
    // $sph->SetSortMode(SPH_SORT_EXTENDED);
    $sph->SetArrayResult(false);            //设置结果返回格式,true以数组,false以PHP hash格式返回，默认为false
    $sph->setLimits (0,1,1000,100000);
    $resultNo = $sph->Query('网站访问报错','whatweb');//执行搜索操作,参数(关键词，[索引名])
    $countNo = $resultNo['total_found'];
    $countYes = 12060-$countNo;
    // echo $countLinux."/".$countWindows;
    $output[]= array(
        '已备案' =>$countYes , 
        '未备案' =>$countNo  
        );
    exit(json_encode($output,JSON_UNESCAPED_UNICODE));
?>