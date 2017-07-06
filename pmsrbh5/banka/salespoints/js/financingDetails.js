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
	                    			"<li>"+listInfs.TRAV_VOL+"<div>持有数量</div></li>" +
	                    			"<li>"+listInfs.CURRY_CD+"<div>币种</div></li>" +
	                    			"<li>"+listInfs.CURR_BAL+"<div>余额/市值(原币)</div></li>" +
	                    			"<li>"+listInfs.RMB_CURR_BAL+"<div>余额/市值(折人民币)</div></li>" +
	                    		  "</ul>"+
				                    "<ul class=clearfix>" +
				                        "<li>"+listInfs.CPML_NAME03+"<div>产品分类</div></li>" +
				                        "<li>"+listInfs.LM_SAR_BAL_JX+"<div>上月销售中收</div></li>" +
				                        "<li>"+listInfs.SALES_SY_RATE_JX+"<div>上月产品模拟收益率</div></li>" +
				                        "<li>"+listInfs.TRAN_NO+"<div>交易流水号</div></li>" +
				                    "</ul>" +
				                    "<ul class=clearfix>" +
				                        "<li>"+listInfs.OPEN_ORG_NAME+"<div>开户支行</div></li>" +
				                        "<li>"+listInfs.TX_ORG_NAME+"<div>交易支行</div></li>" +
				                        "<li>"+listInfs.PMS_ORG_NAME+"<div>归属支行</div></li>" +
				                    "</ul>"
				    $("#div_one").append(div_one);
                    var div_two =  "<ul class=clearfix>" +
						                "<li>"+listInfs.MHR_NAME+"<div>管户人</div></li>" +
						                "<li>"+listInfs.SALER_NAME+"<div>销售人</div></li>" +
						                "<li>"+listInfs.GHR_NAME+"<div>挂户人</div></li>" +
						            "</ul>" +
						            "<ul class=clearfix>" +
						                "<li>"+listInfs.MHR_SCALE+"<div>管户分成比例</div></li>" +
						                "<li>"+listInfs.SALER_SCALE+"<div>销售分成比例</div></li>" +
						                "<li>"+listInfs.GHR_SCALE+"<div>挂户分成比例</div></li>" +
						            "</ul>" +
						            "<ul class=clearfix>" +
						                "<li>"+listInfs.MHR_ORG_NAME+"<div>管户所属机构</div></li>" +
						                "<li>"+listInfs.SALER_ORG_NAME+"<div>销售所属机构</div></li>" +
						                "<li>"+listInfs.GHR_ORG_NAME+"<div>挂户所属机构</div></li>" +
						            "</ul>"
					 $("#div_two").append(div_two);
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