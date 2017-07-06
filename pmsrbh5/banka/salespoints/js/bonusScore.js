(function(){
	var umdata = '';
	function bounsscore(){
		var serve_ = "",//服务
	        channelType_ = "",//人员类型
		    sumTotal_ = "",//总分
		    dataList_ = "",//数据
		    salasAdujest_ = "";//调整值列表
		var Q020400Adujst = "";
		var Q021300Adujst = "";
		var Q021201Adujst = "";
		var Q021202Adujst = "";
		    //webroot = getRootPath();
		
		//数据查询
//		queryResponsePoints = function(dateTime){
//			salesPoints("121","YEXIAOXIAO174",dateTime);//WSM奖励积分 03you"YWF"
//		}
		
		//ZHANGSHANSHAN1097 RM     ZHOUSHAOYING705  PB    testUserID147 WSM
	
	
		//获取规模、产品销售
		salesPoints = function (ticket,temDate,teamFlg,umAccount){
			clearAdujest();
			aladdinRequestData({
		        type: "POST",
		        url:"salesPoints/salesInf.do",
		        data: {
		        	'ticket':ticket,
		        	'date':temDate,
		        	'flag':'bonusScore',
					'inputType': 'PB|RM|WSM',
					'teamFlag':teamFlg,
					'umAccount':umAccount,

				},
		        beforeSend: {
		        	'brcpEaSessionTicket':ticket 
		         },
		         success: function(err,res) {
		        	 	aladdin.loading.stop();   
		        	 	if(err){
		        	 		aladdin.toast.show({ message:'加载错误 '});
		        	 		aladdin.loading.stop();   
		        	 	}
		        	    var result = res.body;
		        	    result = eval("("+result+")");
			         	if(result.responseCode!="0"){
			         		if(result.responseCode == "900108"){
			        	 		aladdin.toast.show({ message:'用户本月无数据'});
			        	 	}else if(result.responseCode == "900120"){
								aladdin.toast.show({ message:'当前月份的用户角色发生变更，请切换到业绩主页查询'});
							}else{
			        	 		aladdin.toast.show({ message:'系统错误'});
			        	 	}
			         		$('.cell').hide();
			         		$('#score').hide();
			         		$('.section_b').unbind('click');
			         		return;
			         	}
			         		bindAlert();
			         	    $('.cell').show();
			         		$('#score').show()
			         		var actionTotals = result.salesInfs;
			         		serve_ = result.serveList;
			         		channelType_ = result.channelType;
			         		
			         		dataList_ = result.dataList;
			         		sumTotal_ = result.sumTotal;
			         		salasAdujest_ = result.salasAdjust;//调整值

					 		var update_=result.Stat_data;
					 		$('#dateUpdate').text('最近更新日期'+update_);

				         	if(actionTotals==undefined||actionTotals==""||actionTotals==null){
				         		$("#score").empty();
				         		$("#loan").text("--");//贷款
				         		$("#incomeSign").text("--");//"新增签约类业务数"
				         		if(channelType_=="WSM"){
				         			$("#oneSixId").hide();
				         			$("#oneCustSixId").hide();
				         		}else{
				         			$("#oneSixId").show();
				         			$("#oneCustSixId").show();
				         			$("#Q021201").text("--");//"一户六开新客户"
					         		$("#Q021202").text("--");//"一户六开新客户"
				         		}
				         		adjustDesc();////取调整值
				         		if(sumTotal_==undefined || sumTotal_==="" || sumTotal_==null){
				         			$("#score").text("--");
				                }else{
				                	$("#score").text(sumTotal_);
				                }
				         	}else{
				 				if(dataList_.loan==undefined || dataList_.loan==="" || dataList_.loan==null){
				 					$("#loan").text("--");//贷款
				 				}else{
				 					$("#loan").text(dataList_.loan);//贷款
				 				}
				 				if(dataList_.oneCustSix==undefined || dataList_.loan===""  || dataList_.oneCustSix==null){
				 					$("#Q021201").text("--");//"一户六开新客户"
				 				}else{
				 					$("#Q021201").text(dataList_.oneCustSix);//"一户六开新客户"
				 				}
				 				if(dataList_.oneOldCustSix==undefined || dataList_.loan===""  || dataList_.oneOldCustSix==null){
				 					$("#Q021202").text("--");//"一户六开老客户"
				 				}else{
				 					$("#Q021202").text(dataList_.oneOldCustSix);//"一户六开老客户"
				 				}
				 				if(dataList_.incomeSign==undefined || dataList_.loan==="" || dataList_.incomeSign==null){
				 					$("#incomeSign").text("--");//"新增签约类业务数"
				 				}else{
				 					$("#incomeSign").text(dataList_.incomeSign);//"新增签约类业务数"
				 				}
				        		if(channelType_=="WSM"){
				        			$("#oneSixId").hide();
				        			$("#oneCustSixId").hide();
				        			$("#incomeSignName").show();
				        		}else{
				        			$("#oneSixId").show();
				         			$("#oneCustSixId").show();
				        		}
				        		adjustDesc();////取调整值
				        		if(sumTotal_==undefined || sumTotal_==="" || sumTotal_==null){
				         			$("#score").text("--");
				                }else{
				                	$("#score").text(sumTotal_);
				                }
				         	}
				            if(actionTotals.length==0){
				            	
				            	
				            }
			         	addNumberColor();
			         },
			         error:function(result){
			        
					 } 
		         });
		}
		//调整值正数显示 ‘+’ 号
		function addAdjustValue(){
			$('.adjustArea').each(function(){
				var tempValue = $(this).text();
				if(tempValue > 0){
					$(this).text(" +"+$(this).text()+' ');
				}else{
					$(this).text(" "+$(this).text()+' ');
				}
			})
		}
		//判断数字颜色begin
		function addNumberColor(){
			var spanScores=$('.spanScore');
				$('.spanScore').each(function(){
					if($(this).text()<0){
						$(this).css('color','#ff5666');
				  	}else{
				  		if($(this).text()>=0){
				  			$(this).text("+"+$(this).text());
				  		}
				  		$(this).css('color','#34a1fc');
					}
				})
				if($("#score").text()<0){
					$("#score").css('color','#ff5666');
				}else{
					$("#score").css('color','#34a1fc');
				}
				$("#score").text($("#score").text()+"分");
				if(sumTotal_ ==="" || sumTotal_==undefined || sumTotal_==null){
					$("#score").text("--分");
				}
		}
		//判断颜色end
		//弹框
		bindAlert = function(){
			$('.section_b').on('click',function(){
				$('.teraction').css('display','block');
				getListDetails();
			});
		}
		//取调整值
		function adjustDesc(adsdaa){
    		for(var i in salasAdujest_){
    			if(salasAdujest_[i].QUOTA_ID=="Q020400"){//贷款
     				//$("#loan").text($("#loan").text()+'(+'+salasAdujest_[i].ADJUST_POINT+')');
     				$('#adjust1').text(salasAdujest_[i].ADJUST_POINT).css('display','block');
     				Q020400Adujst = salasAdujest_[i].ADJUST_DESC;
     				$("#adjust1").click(function(){
     					$('.adjust').css('display','block');
     					setAdujestDesc(Q020400Adujst);
     					//$("#adjustDesc").text(salasAdujest_[i].ADJUST_DESC);
     				});
     			}
     			if(salasAdujest_[i].QUOTA_ID=="Q021300"){//新增签约类业务数
     				//$("#incomeSign").text($("#incomeSign").text()+"(+"+salasAdujest_[i].ADJUST_POINT+")");
     				$('#adjust4').text(salasAdujest_[i].ADJUST_POINT).css('display','block');
     				Q021300Adujst = salasAdujest_[i].ADJUST_DESC;
     				$("#incomeSign").click(function(){
     					$('.adjust').css('display','block');
     					setAdujestDesc(Q021300Adujst);
     					//$("#adjustDesc").text('');
     					//$("#adjustDesc").text(salasAdujest_[i].ADJUST_DESC);
     				});
     			}
     			if(salasAdujest_[i].QUOTA_ID=="Q021201"){//一户六开新客户"Q021201"
     				//$("#Q021201").text($("#Q021201").text()+"(+"+salasAdujest_[i].ADJUST_POINT+")");
     				$('#adjust2').text(salasAdujest_[i].ADJUST_POINT).css('display','block');
     				Q021201Adujst = salasAdujest_[i].ADJUST_DESC;
     				$("#adjust2").click(function(){
     					$('.adjust').css('display','block');
     					setAdujestDesc(Q021201Adujst);
     				});
     			}
     			if(salasAdujest_[i].QUOTA_ID=="Q021202"){//一户六开老客户
     				//$("#Q021202").text($("#Q021202").text()+"(+"+salasAdujest_[i].ADJUST_POINT+")");
     				$('#adjust3').text(salasAdujest_[i].ADJUST_POINT).css('display','block');
     				QQ021202Adujst = salasAdujest_[i].ADJUST_DESC;
     				$("#adjust3").click(function(){
     					$('.adjust').css('display','block');
     					setAdujestDesc(QQ021202Adujst);
     				});
     				
     			}
     		}
    		addAdjustValue();
		}
		//弹框描述
		function setAdujestDesc(adujestDesc){
			$("#adjustDesc").text('');
			$("#adjustDesc").text(adujestDesc);
		}
		//清空色块及弹框值
		function clearAdujest(){
			//清空弹框值
			$('.adjustArea').text('');
			//清空色块值
			$('#adjustDesc').text('');
		}
//		function getRootPath() {
//		    var pathName = window.location.pathname.substring(1);
//		    var webName = pathName == '' ? '' : pathName.substring(0, pathName
//		            .indexOf('/'));
//		    //var webName1 = pathName.split("/");
//		    // webName = webName +"/" +webName1[1];
//		    if(webName!=""&&webName!=null&&webName!=undefined){
//		        var temp = window.location.protocol + '//' + window.location.host + "/bron/pmsrb/emp/banka/";
//		        temp = temp.replace("/bron/pmsrb/emp/banka/","/emp/banka/");
//		        return temp;
//		    }else{
//		        return window.location.protocol + '//' + window.location.host + '/';
//		    }
//		    
//		}
		getListDetails = function(){
		  		//var actionTotals = serve_;
				var actionTotals = serve_;
				var setPoints1 = "--";
	       		var setPoints2 = "--";
	       		var setPoints3 = "--";
	       		var setPoints4 = "--";
	       		var setPoints5 = "--";
	       		var setPoints6 = "--";
	       		var setPoints7 = "--";
	       		var setPoints8 = "--";
	       		var setPoints9 = "--";
	       		var setPoints10 = "--";
	       		var setPoints11 = "--";
	       		var setPoints12 = "--";
		       	if(actionTotals==undefined||actionTotals==""||actionTotals==null){
		       		
		       	}else{
		       		for(var i in actionTotals){
	       				if("Q021301"== actionTotals[i].RESERVE_CHAR1){
		       				setPoints1 = actionTotals[i].STANDARD_POINTS;
		       			}else if("Q021304"== actionTotals[i].RESERVE_CHAR1){
		       				setPoints2 = actionTotals[i].STANDARD_POINTS;
		       			}else if("Q021305"== actionTotals[i].RESERVE_CHAR1){
		       				setPoints3 = actionTotals[i].STANDARD_POINTS;
		       			}else if("Q021306"== actionTotals[i].RESERVE_CHAR1){
		       				setPoints4 = actionTotals[i].STANDARD_POINTS;
		       			}else if("Q021307"== actionTotals[i].RESERVE_CHAR1){
		       				setPoints5 = actionTotals[i].STANDARD_POINTS;
		       			}else if("Q021308"== actionTotals[i].RESERVE_CHAR1){
		       				setPoints6 = actionTotals[i].STANDARD_POINTS;
		       			}else if("Q021309"== actionTotals[i].RESERVE_CHAR1){
		       				setPoints7 = actionTotals[i].STANDARD_POINTS;
		       			}else if("Q021310"== actionTotals[i].RESERVE_CHAR1){
		       				setPoints8 = actionTotals[i].STANDARD_POINTS;
		       			}else if("Q021302"== actionTotals[i].RESERVE_CHAR1){
		       				setPoints9 = actionTotals[i].STANDARD_POINTS;
		       			}else if("Q021303"== actionTotals[i].RESERVE_CHAR1){
		       				setPoints10 = actionTotals[i].STANDARD_POINTS;
		       			}else if("Q021202"== actionTotals[i].RESERVE_CHAR1){
		       				setPoints11 = actionTotals[i].STANDARD_POINTS;
		       			}else if("Q021201"== actionTotals[i].RESERVE_CHAR1){
		       				setPoints12 = actionTotals[i].STANDARD_POINTS;
		       			}
		       		}
		       	}
		       	var str = "1.每个收银宝可得"+setPoints1+"分;<br/>2.每个基金定投3个月，5000元以上可得"+setPoints10+"分;<br/>3.每个基金定投3个月，1000元以上可得"+setPoints9+"分;<br/>"
			       +"4.每个三方存管可得"+setPoints2+"分;<br/>5.每个黄金账户且入金可得"+setPoints3+"分;<br/>6.每个收付通且入金可得"+setPoints4+"分；<br/>7.每个绑定三方支付可得"+setPoints5+"分；<br/>"
			       +"8.每个活跃手机银行可得"+setPoints6+"分；<br/>9.每个交易通可得"+setPoints7+"分；<br/>10.每个贵金属T+D业务可得"+setPoints8+"分；<br/></span>";
			  		$("#strData").empty();
			  		$("#strData").append(str);
		  		if(channelType_!="WSM"){
		  			var str1 = "当月完成一户六开的每个新客户数可得"+setPoints12+"分，老客户可得"+setPoints11+"分计给最后一开的办理人。";
		  			$("#strDataK").empty();
		  			$("#strDataK").append(str1);
		       	}else{
		       		$("#oneTosix").empty();
		       	}
			    //$("#strDataK").empty();
			    
		}
		
	}
	bounsscore.prototype = {
		init:function(){
			$(function(){
				
				bindAlert();
				//调整值弹框
//				$('.adjustArea').on('click',function(){
//					$('.adjust').css('display','block');
//				})
				queryResponsePoints = function(temDate,teamFlg,umAccount){
					aladdin.loading.start({canCancel:false},function(err) {
						if(err){
							aladdin.toast.show({ message:'加载进度框显示错误 ' + err.code});
						}
	                });
					
	                aladdin.aike_tool.getTicket(function (err, ticket) {
	                                    if (err && !ticket) {
	                                        aladdin.toast.show({ message:"ͨ哎呦网络不给力哦" });
	                                    } else {
	                                    		aladdin.aike_tool.getAccount(
	            	                    	        function (error,account) {
	            	                    	        	umdata = account;
	            	                    	            //alert("account:"+account);
	            	                    	        }
	            	                    	    );
	                                    		salesPoints(ticket,temDate,teamFlg,umAccount);//WSM奖励积分 03you"YWF"
	                                    }
	                })
					//salesPoints("12","ANLINA867",dateTime);//WSM奖励积分 03you"YWF"
					//salesPoints("12","CHENJIJIE",dateTime);//WSM奖励积分 03you"YWF"
					
				};
				hiddenCustomernteractionExplainModal1 = function(){
					$('.teraction').css('display','none');
				}
				hiddenCustomernteractionExplainModal4 = function(){
					$('.adjust').css('display','none');
				}
				
			})
				
		}
	}
	var bouns = new bounsscore();
	bouns.init();
})()



	