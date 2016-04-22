<?php
header('Content-Type:text/html;charset=utf-8');
// echo "<pre />";
#引入接口文件，其实你懂的，就是一个类
require_once('sphinxapi.php');
    $keyword = trim($_GET['keyword']);    //接收关键词
    // $start= $_GET['start'];
    // $total= $_GET['total'];
    $sph = new SphinxClient();            //实例化 sphinx 对象
    $sph->SetServer('localhost',9312);    //连接9312端口
    $sph->SetMatchMode(SPH_MATCH_ANY);    //设置匹配方式
    $sph->SetSortMode(SPH_SORT_RELEVANCE);    //查询结果根据相似度排序
    // SPH_SORT_EXTENDED
    // $sph->SetSortMode(SPH_SORT_EXTENDED);
    $sph->SetArrayResult(false);            //设置结果返回格式,true以数组,false以PHP hash格式返回，默认为false
    $sph->setLimits (0,1,1000);
    /**
        *关键词高亮显示，以及产生文本摘要
        *BuildExcerpts($docs, $index, $words, $opts=array())
        *参数(包含文档内容的数组,索引名,关键词,高亮参数)
    **/
    $opts = array(
        "before_match"    => "<font color='red'>",    //关键词高亮开始的html代码
        "after_match"    => "</font>",                //关键词高亮结束的html代码
        "limit"            => 100,                        //摘要最多包含的符号数，默认256
        "around"        => 3,                        //每个关键词左右选取的词的数目，默认为5
    );
    
    $result = $sph->Query($keyword,'whatweb');//执行搜索操作,参数(关键词，[索引名])
    if(!array_key_exists('matches', $result)){    //如果没有匹配结果，直接返回
        $finalOutNull[]=array('data' =>0 , );
        exit(json_encode($finalOutNull,JSON_UNESCAPED_UNICODE));
        // return;
    }
    $arr_key = array_keys($result['matches']);    
    //获取到匹配文章的ID
    $ids = implode(',',$arr_key);    //数组转成字符串
    // echo "<font color='blue'>按相关性排序id（结果数：",count($arr_key),")：</font>",$ids,"<hr />";
    
    //连接数据库
    $mysqli = new Mysqli('localhost','root','','test');
    $mysqli->query('set names utf8');
    $query = "select id,ip,port,compinfo from yy_whatweb where id in({$ids}) order by find_in_set(id,'{$ids}')";
    $res = $mysqli->query($query);
    // echo "<table border='1' bordercolor='green' cellspacing='0'><tr><th>文章栏目</th><th>文章id</th><th>标题</th></tr>";
    //搜索词没有高亮显示
     while ($resArray = $res->fetch_assoc()){
            $id=$resArray['id'];
            $ip=$resArray['ip'];
            $port=$resArray['port'];
            $compinfo=$resArray['compinfo'];
            $output[]=array(
                'id'=>$id,
                'ip'=>$ip,
                'port'=>$port,
                'compinfo'=>$compinfo
                );
        }
        $finalOut[]=array(
                'count'=>count($arr_key),
                'data'=>$output
            );
        exit(json_encode($finalOut,JSON_UNESCAPED_UNICODE));
    
    //使用高亮显示代码
    /*while($row = $res->fetch_assoc()){
        $result = $sph->BuildExcerpts($row, 'mysql', $keyword, $opts);
        if(!$res){
            die("Error:".$sph->GetLastError());
        }
        echo "<tr><td>",$result[0],"</td><td>",$result[1],"</td><td>",iconv('utf-8','gbk',$result[2]),"</td></tr>";
    }*/
?>