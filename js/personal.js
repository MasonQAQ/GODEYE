    var myChart;
    var myChart1;
    //pie备用
    //0 ----pie
    var legend0=[];
    var dataPie0=[];
    var dataPieItem0={};
    //1 ----pie
    var legend1=[];
    var dataPie1=[];
    var dataPieItem1={};
    //2 ----pie
    var legend2=[];
    var dataPie2=[];
    var dataPieItem2={};
    //3 ----pie
    var legend3=[];
    var dataPie3=[];
    var dataPieItem3={};
    //4 ----pie
    var legend4=[];
    var dataPie4=[];
    var dataPieItem4={}; 


    var optionPie = {
                title : {
                    text: '在这儿设置标题',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{b} : {c} ({d}%)"
                },
                legend: {
                    padding:10,
                    orient : 'vertical',
                    x : 'right',
                    data:[]
                },
                calculable : true,
                series : [
                    {
                        // name:'访问来源',
                        type:'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:[{}]
                    }
                ]
            };
    // var pieTitle=optionPie.title.text;//String
    // var pieLegend=optionPie.legend.data;//String
    //bar备用
    var optionServer = {
        title : {
            text: 'server使用统计'
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['蒸发量','降水量']
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'蒸发量',
                type:'bar',
                data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name: '平均值'}
                    ]
                }
            },
            {
                name:'降水量',
                type:'bar',
                data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                markPoint : {
                    data : [
                        {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183, symbolSize:18},
                        {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name : '平均值'}
                    ]
                }
            }
        ]
    };
    //在ajax请求时候提供更好的用户体验
    function itemCssStart(id){
            $("#server0").css("opacity","0.5");
            $("#server1").css("opacity","0.5");
            $("#server2").css("opacity","0.5");
            $("#server3").css("opacity","0.5");
            $("#server4").css("opacity","0.5");
            $(id).css("opacity","0.75");
        }       
    //setOptionPie
    function itemCss(id,option){
        myChart1.clear();
        myChart1.setOption(option);
        myChart1.hideLoading();
        $("#server0").css("opacity","0.5");
        $("#server1").css("opacity","0.5");
        $("#server2").css("opacity","0.5");
        $("#server3").css("opacity","0.5");
        $("#server4").css("opacity","0.5");
        $(id).css("opacity","1");
    }
    function draw(id,legend,title,url,dataPieItem,dataPie){
        itemCssStart(id)
        myChart1.showLoading({
            text : '疯狂地从数据库查询信息...',
            });
        if (legend.length!=0) {
            //在第一次请求以后，不用再次执行Ajax请求
            optionPie.title.text=title;
            optionPie.legend.data=legend;
            optionPie.series[0].data=dataPie;
            itemCss(id,optionPie);
        }else{
            //客户在第一次加载时候显示
            $.ajax({
            type:"get",
            dataType:'json',
            url:'./server/'+url,
            success:function(msg){
                // console.log(msg);
                optionPie.title.text=title;
                for(var name in msg[0]){
                    legend.push(name);
                    dataPieItem.name=name;
                    dataPieItem.value=msg[0][name];
                    dataPie.push(dataPieItem); 
                    dataPieItem={};//清理对象很重要
                }
                optionPie.legend.data=legend;
                optionPie.series[0].data=dataPie;
                itemCss(id,optionPie);
            }
        });} 
    }

    // 配置后续加载的各种 chart 配置 config
    require.config({
        paths: {
            'echarts': 'dep/echarts/build',
            'echarts-x': 'dep/echarts-x/build'
        }
    });

    // 然后就可以动态加载图表进行绘制啦
    require([
        'echarts',
        'echarts-x',
        // ECharts-X 中 map3d 的地图绘制基于 ECharts 中的 map。
        'echarts/chart/map',
        'echarts/chart/pie',
        'echarts/chart/bar',
        'echarts-x/chart/map3d'
    ], function (ec) {
        //定义两个函数，分别在扫描可视化部分和数据分析界面绘图
        //用于绘制世界地图
        setChartScanner(ec);
        //用于绘制中国地图
        setChartChina(ec);
        // 跟 ECharts 一样的方式初始化
        //section2 
        $("#server0").click(function(){
            // draw(id,legend,title,url,dataPieItem,dataPie)
            draw ("#server0",legend0,"web server使用情况对比","server.php",dataPieItem0,dataPie0);
        });
        $("#server1").click(function(){
            draw ("#server1",legend1,"web server使用情况对比","serverScript.php",dataPieItem1,dataPie1);
        });
        $("#server2").click(function(){
            draw ("#server2",legend2,"操作系统使用情况对比","os.php",dataPieItem2,dataPie2);
        });
        $("#server3").click(function(){
            myChart1.clear();
            //在这儿设置option
            itemCss("#server3",optionPie);
        });
        $("#server4").click(function(){
            draw ("#server4",legend4,"备案情况分析","police.php",dataPieItem4,dataPie4);
        });
    });
    function setChartScanner(ec){
        myChart = ec.init(document.getElementById('main'));
        $.ajax({
            url: './data/flights.json',
            success: function (data) {
                var markPointStyle = {
                    normal: {
                        color: 'red'
                    }
                }
                // Airport: [name, city, country, longitude, latitude]
                var airports = data.airports.map(function (item) {
                    return {
                        itemStyle: markPointStyle,
                        geoCoord: [item[3], item[4]]
                    }
                });

                // Route: [airlineIndex, sourceAirportIndex, destinationAirportIndex]
                var routesGroupByAirline = {};
                data.routes.forEach(function (route) {
                    var airline = data.airlines[route[0]];
                    var airlineName = airline[0];
                    if (!routesGroupByAirline[airlineName]) {
                        routesGroupByAirline[airlineName] = [];
                    }
                    routesGroupByAirline[airlineName].push(route);
                })

                var opts = {
                    legend: {
                        show: true,
                        data: ["城市列表","Beijing","Tokyo","Shengzheng"],
                        selected: {},
                        x: 'left',
                        orient: 'vertical',
                        textStyle: {
                            color: 'white'
                        }
                    },
                    
                    tooltip: {
                        formatter: '{b}'
                    },
                    series: [{
                        type: 'map3d',
                        mapType: 'world',
                        baseLayer: {
                            backgroundColor: '',
                            backgroundImage: './img/earth.jpg'
                        },
                        surfaceLayers: [{
                            type: 'texture',
                            image: './img/clouds.png'
                        }],
                        background:"./img/starfield.jpg",
                        mapLocation: {
                              width: '100%',
                              height: '100%'
                          },
                        roam:{
                            minZoom:1,
                            maxZoom:1,
                          },
                        itemStyle: {
                            normal: {
                                borderWidth: 1,
                                borderColor: 'yellow',
                                areaStyle: {
                                    color: 'rgba(0, 0, 0, 0)'
                                }
                            }
                        },
                        // markPoint: {
                        //     effect: {
                        //         shadowBlur: 0.2
                        //     },
                        //     large: true,
                        //     symbolSize: 3,
                        //     data: airports
                        // }
                    }]
                };

                opts.legend.data.forEach(function (name) {
                    if (name.indexOf('Beijing') >= 0) {
                        opts.legend.selected[name] = false;
                    } else {
                        opts.legend.selected[name] = false;
                    }
                });

                data.airlines.forEach(function (item) {
                  // console.log(item);
                    var airlineName = item[0];
                    // console.log(airlineName);
                    var routes = routesGroupByAirline[airlineName];
                    if (routes) {
                        opts.series.push({
                            type: 'map3d',
                            name: airlineName,
                            markLine: {
                                itemStyle: {
                                    normal: {
                                        // 线的颜色默认是取 legend 的颜色
                                        // color: "#3366cc",
                                        // 线宽，这里线宽是屏幕的像素大小
                                        width: 1,
                                        // 线的透明度
                                        opacity: 0.2
                                    }
                                },
                                effect: {
                                    show: true
                                },
                                data: routes.map(function (item) {
                                    return [{
                                        // Source airport
                                        geoCoord: airports[item[1]].geoCoord
                                    }, {
                                        // Destination Airport
                                        geoCoord: airports[item[2]].geoCoord
                                    }]
                                })
                            }
                        });
                    }
                });
                $("#scanner").click(function(){
                    myChart.setOption(opts);
                    myChart.hideLoading();
                });
            }
        });
    }
    function setChartChina(ec){
        myChart1 = ec.init(document.getElementById('whatweb'));
        // var myChart1 = ec.init(document.getElementById('whatweb'));
        optionChina = {
            backgroundColor: 'white',
            color: [
                'rgba(255, 255, 255, 0.8)',
                'rgba(14, 241, 242, 0.8)',
                'rgba(37, 140, 249, 0.8)'
            ],
            series : [
                {
                    name: 'whatweb',
                    type: 'map',
                    mapType: 'china',
                    itemStyle:{
                        normal:{
                            borderColor:'#ffbb00',
                            borderWidth:1.5,
                            areaStyle:{
                                color: '#3285ff'
                            }
                        }
                    },
                    data : [],
                    markPoint : {
                        symbol:'emptyCircle',
                        symbolSize: 10,
                        effect : {
                                show: true,
                                type: 'scale',
                                loop: true,
                                period: 15,
                                scaleSize : 2,
                                bounceDistance: 10,
                                color : "red",
                                shadowColor : null,
                                shadowBlur : 0
                        },
                        data : [
                          {name:'北京', geoCoord:[116.40, 39.90]},
                          {name:'杭州', geoCoord:[120.20, 30.3]},
                          {name:'青岛', geoCoord:[120.18, 36.30]},
                          {name:'香港', geoCoord:[114.10, 22.20]},

                        ]
                    }
                }
            ]
        };
        myChart1.setOption(optionChina);
    }
    //section3
    $('#input').keydown(function(e){
        if(event.keyCode ==13){
            $.ajax({
                type:"get",
                dataType:'json',
                data:"keyword="+document.getElementById('input').value,
                // jsonp:"callback", 
                url:'./server/getIp.php',
                success:function(msg){
                    if (msg[0].count==1&&msg[0].data[0].ip==document.getElementById('input').value) {
                        $("#console").append("<li>你输入的数据是"+document.getElementById('input').value+"<br />查询结果：ip:"+msg[0].data[0].ip+"端口号："+msg[0].data[0].port+"<br />详细信息："+msg[0].data[0].compinfo+"</li><hr />");
                    }else{
                        $("#console").append("<li style='color:red'>暂无记录</li><hr />");
                    }
                    document.getElementById('console').scrollTop = document.getElementById('console').scrollHeight;
                }
            });
        }
    });
    // 搜索引擎
    $('#goSearch').keydown(function(e){
        if(event.keyCode ==13){
            href="./godsearch/index.html?keyword="+$('#goSearch').val();
            // window.location.href="./godsearch/index.html?keyword="+$('#goSearch').val();
            window.open(href);
        }
    });