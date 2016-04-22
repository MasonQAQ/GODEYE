var urlLocation=window.location.href;
var paramControll=1;
//从html获取参数的函数
function getParam(sHref, sArgName){
	var args= sHref.split("?");
	// alert(args);
	 var retval = "";
      if(args[0] == sHref) /*参数为空*/
      {
           return retval; /*无需做任何处理*/
      }  
       var str = args[1];
      args = str.split("&");
      for(var i = 0; i < args.length; i ++)
      {
          str = args[i];
          var arg = str.split("=");
          if(arg.length <= 1) continue;
          if(arg[0] == sArgName) retval = arg[1]; 
      }
      return retval;
}
//根据controll来获取参数
	$('#input').keydown(function(e){
          if(event.keyCode ==13){
              $.ajax({
              	type:"post",
                  dataType:'json',
                  data:"keyword="+document.getElementById('input').value,
                  url:'./index.php',
                  success:function(msg){
                  	setPage(msg[0])
                  }
              });
             paramControll=0;
          }
      });
	if (paramControll) {
		param=getParam(urlLocation,"keyword");
		$.ajax({
              	type:"post",
                  dataType:'json',
                  data:"keyword="+param,
                  url:'./index.php',
                  success:function(msg){
                  	setPage(msg[0])
                }
       	});
		document.getElementById('input').value=decodeURI(param);
		// decodeURI(test1)
	}
function setPage(data){
	function createDemo(name){
		var container = $('#pagination-' + name);
		var sources = function(){
			var result = [];

			for(var i = 0; i <data.data.length; i++){
				result.push(data.data[i]);
			}

			return result;
		}();

		var options = {
			dataSource: sources,
			className: 'paginationjs-theme-blue',
			callback: function(response, pagination){
				// window.console && console.log(response, pagination);
				console.log(response);
				var dataHtml = "<b style='color:red;font-size:14px'>共查询到：<b>"+data.count+'条记录<ul>';

				$.each(response, function(index, item){ 
					dataHtml += '<li style="font-size:12px">'+'<b style="background-color:#3366cc;padding:2px;color:white">ip地址/域名：<a href="http://'+item.ip+'/" target=_blank >'+item.ip+'</a> 端口号：'+item.port+'</b><br/>'+item.compinfo +'</li>';
				});

				dataHtml += '</ul>';
				container.prev().html(dataHtml);
			}
		};

		container.addHook('beforeInit', function(){
			// window.console && console.log('beforeInit...');
		});
		container.pagination(options);

		container.addHook('beforePageOnClick', function(){
			document.getElementById('body').scrollTop = 0;
			// window.console && console.log('beforePageOnClick...');
			//return false
		});

		return container;
	}

	createDemo('whatweb');
}