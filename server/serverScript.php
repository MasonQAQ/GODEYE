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
    $resultPHP = $sph->Query('PHP','whatweb');//执行搜索操作,参数(关键词，[索引名])
    $countPHP = $resultPHP['total_found'];
    $resultJSP = $sph->Query('JSP','whatweb');//执行搜索操作,参数(关键词，[索引名])
    $countJSP = $resultJSP['total_found'];
    $resultASP = $sph->Query('ASP','whatweb');//执行搜索操作,参数(关键词，[索引名])
    $countASP = $resultASP['total_found'];
    $resultJAVA = $sph->Query('JAVA','whatweb');//执行搜索操作,参数(关键词，[索引名])
    $countJAVA = $resultJAVA['total_found'];
    $resultRuby = $sph->Query('Ruby-on-Rails','whatweb');//执行搜索操作,参数(关键词，[索引名])
    $countRuby = $resultRuby['total_found'];
    // echo $countJSP."/".$countPHP;
    $output[]= array(
        'JSP' =>$countJSP+$countJAVA , 
        'PHP' =>$countPHP ,
        'ASP.NET' =>$countASP,
        'Ruby on Rails'=>$countRuby
        );
    exit(json_encode($output,JSON_UNESCAPED_UNICODE));
?>