<?php
header('Content-Type:text/html;charset=utf-8');
// echo "<pre />";
#引入接口文件，其实你懂的，就是一个类
require_once('sphinxapi.php');
    $keyword = trim($_POST['keyword']);    //接收关键词
    $sph = new SphinxClient();            //实例化 sphinx 对象
    $sph->SetServer('localhost',9312);    //连接9312端口
    $sph->SetMatchMode(SPH_MATCH_ANY);    //设置匹配方式
    $sph->SetSortMode(SPH_SORT_RELEVANCE);    //查询结果根据相似度排序
    // SPH_SORT_EXTENDED
    // $sph->SetSortMode(SPH_SORT_EXTENDED);
    $sph->SetArrayResult(false);            //设置结果返回格式,true以数组,false以PHP hash格式返回，默认为false
    $sph->setLimits (0,500,1000,100000);//最后一个是最大
    
    $result = $sph->Query($keyword,'whatweb');//执行搜索操作,参数(关键词，[索引名])
    if(!array_key_exists('matches', $result)){    //如果没有匹配结果，直接返回
        $finalOutNull[]=array('data' =>0 , );
        exit(json_encode($finalOutNull,JSON_UNESCAPED_UNICODE));
        // return;
    }
    $arr_key = array_keys($result['matches']);    
    //获取到匹配文章的ID
    $ids = implode(',',$arr_key);    //数组转成字符串
    $mysqli = new Mysqli('localhost','root','','test');
    $mysqli->query('set names utf8');
    $query = "select id,ip,port,compinfo from yy_whatweb where id in({$ids}) order by find_in_set(id,'{$ids}')";
    $res = $mysqli->query($query);
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
                'count'=>$result['total_found'],
                'data'=>$output
            );
        exit(json_encode($finalOut,JSON_UNESCAPED_UNICODE));
?>