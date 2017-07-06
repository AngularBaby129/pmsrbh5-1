(function(){
        //var tranNo = '100005',
         //   ticket="12312";
        var listInfs = new Array();
        var thisURL = document.URL;
    	var urlValue = thisURL.split("?")[1];
    	var params1 = urlValue.split("&")[0];
        var tranNo  = params1.split("=")[1];
        var params2 = urlValue.split("&")[1];
        var financingType = params2.split("=")[1];
    	//alert(tranNo);
    function bounsscore(){
        financingInfs = function (tranNo,ticket,umAccount){
        	aladdinRequestData({
                type: "POST",
                url:"financing/financingDetails.do",
                data: {
                    'ticket':ticket,
                    'umAccount':umAccount,
                    'rowKey':tranNo,
                    'financingType':financingType,
                    'inputType': 'PB|RM|WSM'


                },
                beforeSend: {
                    'brcpEaSessionTicket':ticket
                },
                success: function(err,res) {
                    aladdin.loading.stop();
                    if(err){
                        aladdin.toast.show({ message:'加载错误 '});
                        return;
                    }
                    var result = res.body;
                    result = eval("("+result+")");
                    if(result.responseCode!="0"){
                        aladdin.toast.show({ message:'系统错误'});
                        return;
                    }else if(result.responseCode == "900120"){
                        aladdin.toast.show({ message:'当前月份的用户角色发生变更，请切换到业绩主页查询'});
                    }
                    listInfs = result.infMore;

                    var update_=result.Stat_data;
                    $('#dateUpdate').text('最近更新日期'+update_);

                    $("#div_one").empty();
                    $("#div_two").empty();
                    $("#topName").empty();
                    var topName = "<div class=name>"+listInfs.CUST_NAME+"</div>" +
                    			  "<div class=productName>"+listInfs.CPML_NAME06+"</div>"
                    $("#topName").append(topName);	
                    var div_one = "<ul class=clearfix>" +
	                    			"<li>"+listInfs.MHR_NAME+"<div>管户人</div></li>" +
	                    			"<li>"+listInfs.SALER_NAME+"<div>销售人</div></li>" +
	                    			"<li>"+listInfs.GHR_NAME+"<div>挂户人</div></li>" +
	                    			"<li>"+listInfs.IM_SAR_BAL_JX+"<div>上月累计创利</div></li>" +
	                    		  "</ul>"+
				                    "<ul class=clearfix>" +
				                        "<li>"+listInfs.MHR_CHANNEL+"<div>管户人渠道</div></li>" +
				                        "<li>"+listInfs.SALER_CHANNEL+"<div>销售人渠道</div></li>" +
				                        "<li>"+listInfs.GHR_CHANNEL+"<div>挂户人渠道</div></li>" +
				                        "<li>"+listInfs.CPML_03_PROD_CD+"<div>产品分类</div></li>" +
				                    "</ul>" +
				                    "<ul class=clearfix>" +
				                        "<li>"+listInfs.ACCT_TYPE+"<div>账户类型</div></li>" +
				                        "<li>"+listInfs.ACCT_COMP_NUM+"<div>子账户</div></li>" +
				                        "<li>"+listInfs.ACCT_STATUS+"<div>账户状态</div></li>" +
				                        "<li>"+listInfs.CLOSE_DATE+"<div>销户日期</div></li>" +
				                    "</ul>"+
				                    "<ul class=clearfix>" +
				                        "<li>"+listInfs.OPEN_DATE+"<div>开户日期</div></li>" +
				                        "<li>"+listInfs.OPEN_ORG+"<div>开户机构</div></li>" +
				                        "<li>"+listInfs.PROD_NAMES+"<div>存期名称</div></li>" +
				                        "<li>"+listInfs.PROD_TYPE+"<div>重点产品提示</div></li>" +
				                    "</ul>"
				                    
				    $("#div_one").append(div_one);
                 }
            });
        }
    }
    bounsscore.prototype = {
        init:function(){
            $(function(){
                aladdin.page.bounce(false);
            	aladdin.loading.start({canCancel:false},function(err) {
                    if (err) {
                        aladdin.toast.show({message: '加载进度框显示错误 ' + err.code});
                    }
                    });
                  aladdin.aike_tool.getTicket(function (err, ticket) {
                      if (err && !ticket) {
                          aladdin.toast.show({ message:"ͨ哎呦网络不给力哦" });
                      } else {

                          financingInfs(tranNo,ticket,'');
                      }
                  })
            })

        }
    }
    var bouns = new bounsscore();
	bouns.init();
})();