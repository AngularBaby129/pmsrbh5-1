(function(){
	var umdata = '';
	var dateTime_ = "";
	var channelType_ = "";
	function importantscore(){
		
		
		//ZHANGSHANSHAN1097 RM ZHOUSHAOYING705 PB  testUserID147 WSM
	//	queryResponsePoints(tempDate);
		
		//数据查询
//		queryResponsePoints = function(dateTime){
//			salesPoints("121","YEXIAOXIAO174",dateTime);//WSM奖励积分 03you"YWF"
//		}
		
	
		//规模
		salesPoints = function(ticket,temDate,teamFlg,umAccount){
			clearAdujest();
			$("#score").text('');
			var dataTemp;
			if(ticket!=""&&ticket!=null){
				dataTemp = "ticket="+ticket;
			} 
			if(umAccount!=""&&umAccount!=null){
				dataTemp = dataTemp+"&umAccount="+umAccount;
			}
			if(date!=""&&date!=null){
				dataTemp = dataTemp+"&temDate="+temDate;
			}
			aladdinRequestData({
		        type: "POST",
		        url: "salesPoints/salesInf.do",
		        data: {
		        	
		        	'ticket':ticket,
					'temDate':temDate,
					'teamFlg':'teamFlg',
					'umAccount':umAccount,
					'flag':'important',
					'inputType': 'PB|RM|WSM',
				},
		        beforeSend: {
		        	'brcpEaSessionTicket':ticket 
		        },
		         success: function(err,res) {
		        	 aladdin.loading.stop();
		        	 if(err){aladdin.toast.show({ message:'加载错误 '});
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
		         		
		         		$('.section_a').unbind('click');
		         		$('.section_b').unbind('click');
		         		$('.section_c').unbind('click');
		         		return;
		         	 }
		         	$('.cell').show();
	         		$('#score').show();
	         		bindingAlert();
		         	var actionTotals = result.salesInfs;
		         	//alert("channelType_================"+result.channelType)
		         	channelType_ = result.channelType;//人员类型
		         	dataList_ = result.dataList;//数据
		         	sumTotal_ = result.sumTotal;//总分
		    		departmentList_ = result.departmentList;//规模
		    		qualityList_ = result.qualityList;//品质
		    		qualityListScore_ = result.qualityListScore;
		    		salesList_ = result.salesList;//销售
		    		serveList_ = result.serveList;//服务
		    		salasAdujest_ = result.salasAdjust;//取调制值

					 var update_=result.Stat_data;
					 $('#dateUpdate').text('最近更新日期'+update_);


		         	if(actionTotals==undefined||actionTotals==""||actionTotals==null){
		         		
		         		$("#investFinance").text("--");//投资理财创利
		         		$("#depositScore").text("--");//存款创利
		         		$("#creditCard").text("--");//信用卡新户
		         		if(channelType_=="RM"){
		         			$('#RMsales').show();
		         			$('#PBsales').hide();
		         			$('#WSMsales').hide();
		         			$("#aumDayAvgRM").text("--");
		         			$("#pureIncomePbankRM").text("--");
		         			$("#pureIncomeWealth").text("--");
		         			$("#transferPbank").text("--");
			         		$("#pointsVale").text("--");
		         		}
		         		if(channelType_=="PB"){
		         			$('#PBsales').show();
		         			$('#RMsales').hide();
		         			$('#WSMsales').hide();
		         			$("#aumDayAvgPB").text("--");
		         			$("#pureIncomePbankPB").text("--");
	     					$("#pointsVale").text("--");
		         		}
		         		if(channelType_=="WSM"){
		         			$('#WSMsales').show();
		         			$('#PBsales').hide();
		         			$('#RMsales').hide();
		         			$('#pinzhi').hide();
			         		$('#fuwu').show();
	     					//品质改成服务
		         			$("#incomeTenThousand").text("--");
		         			$("#incomewealthscore").text("--");
		         			$("#incomepbankscore").text("--");
		         			//$("#pureIncomePbank").text("--");
//		         			$("#pinzhi").text("服务");
//	         				$("#fuwu").empty();
//	         				$("#fuwu").append("<ul><li><span class=spanTitle>一户六开新客户</span><span id=oneCustSix class=spanScore>--</span></li></ul>");
//	         				$("#fuwu").append("<ul><li><span class=spanTitle>一户六开老客户</span><span id=oneOldCustSixId class=spanScore>--</span></li></ul>");
		         		}else{
		         			$('#pinzhi').show();
			         		$('#fuwu').hide();
		         		}
		         		adjustDesc();////取调整值
	//	         		alert(sumTotal_);
		         		if(sumTotal_==undefined || sumTotal_==="" || sumTotal_==null){
		         			$("#score").text("--");
		                }else{
		                	$("#score").text(sumTotal_);
		                }
		         	}else{
		         		  //clearScoreValue()//清空数据
		         		  if(dataList_.investFinance==undefined || dataList_.investFinance==="" || dataList_.investFinance==null){
		         			  $("#investFinance").text("--");//投资理财创利
		                  }else{
		                	  $("#investFinance").text(dataList_.investFinance);//投资理财创利
		                  }
		                  if(dataList_.depositScore==undefined || dataList_.depositScore==="" || dataList_.depositScore==null){//存款创利
		                    $("#depositScore").text("--");
		                  }else{
		                	  $("#depositScore").text(dataList_.depositScore);//存款创利
		                  }
		                  if(dataList_.creditCard==undefined || dataList_.creditCard==="" || dataList_.creditCard==null){
		                    $("#creditCard").text("--");
		                  }else{
		                	  $("#creditCard").text(dataList_.creditCard);//信用卡新户
		                  }
		                  if(channelType_=="RM"){
		                	  $('#RMsales').show();
		                	  $('#PBsales').hide();
			         		  $('#WSMsales').hide();
			         		  if(dataList_.aumDayAvg==undefined || dataList_.aumDayAvg==="" || dataList_.aumDayAvg==null){//AUM日均净值
			         			  $("#aumDayAvgRM").text("--");
			         		  }else{
			         			  $("#aumDayAvgRM").text(dataList_.aumDayAvg); 
			         		  }
			         		   if(dataList_.pureIncomeWealth==undefined || dataList_.pureIncomeWealth==="" || dataList_.pureIncomeWealth==null){//净增财富客户数
			         			  $("#pureIncomeWealth").text("--");
			         		  }else{
			         			  $("#pureIncomeWealth").text(dataList_.pureIncomeWealth); 
			         		  }
			         		  if(dataList_.pureIncomePbank==undefined || dataList_.pureIncomePbank==="" || dataList_.pureIncomePbank==null){//净增私行客户数
			         			  $("#pureIncomePbankRM").text("--");
			         		  }else{
			         			  $("#pureIncomePbankRM").text(dataList_.pureIncomePbank); 
			         		  }
			         		  if(dataList_.transferPbank==undefined || dataList_.transferPbank==="" || dataList_.transferPbank==null){//移交私行客户数
			         			  $("#transferPbank").text("--");
			         		  }else{
			         			  $("#transferPbank").text(dataList_.transferPbank); 
			         		  }
			         		  if(dataList_.custLoseScore==undefined || dataList_.custLoseScore==="" || dataList_.custLoseScore==null){
			         			 $("#pointsVale").text("--");
			         		  }else{
			         			 $("#pointsVale").text(dataList_.custLoseScore);
			         		  }
		                  }
		                  if(channelType_=="PB"){
		                	  $('#PBsales').show();
		                	  $('#RMsales').hide();
			         		  $('#WSMsales').hide();
			         		  if(dataList_.aumDayAvg==undefined || dataList_.aumDayAvg==="" || dataList_.aumDayAvg==null){//AUM日均净值
			         			  $("#aumDayAvgPB").text("--");
			         		  }else{
			         			  $("#aumDayAvgPB").text(dataList_.aumDayAvg); 
			         		  }
			         		  if(dataList_.pureIncomePbank==undefined || dataList_.pureIncomePbank==="" || dataList_.pureIncomePbank==null){//净增私行客户数
			         			  $("#pureIncomePbankPB").text("--");
			         		  }else{
			         			  $("#pureIncomePbankPB").text(dataList_.pureIncomePbank); 
			         		  }
			         		  if(dataList_.custLoseScore==undefined || dataList_.custLoseScore==="" || dataList_.custLoseScore==null){
			         			 $("#pointsVale").text("--");
			         		  }else{
			         			 $("#pointsVale").text(dataList_.custLoseScore);
			         		  }
		                  }
						  if(channelType_=="WSM"){
							  $('#WSMsales').show();
							  $('#PBsales').hide();
			         		  $('#RMsales').hide();
			         		  $('#pinzhi').hide();
			         		  $('#fuwu').show();
			         		  if(dataList_.incomeTenThousand==undefined || dataList_.incomeTenThousand==="" || dataList_.incomeTenThousand==null){
			         			 $("#incomeTenThousand").text("--");
			         		  }else{
			         			 $("#incomeTenThousand").text(dataList_.incomeTenThousand);
			         		  }
			         		  if(dataList_.income_wealth_score==undefined || dataList_.income_wealth_score==="" || dataList_.income_wealth_score==null){
			         			 $("#incomewealthscore").text("--");
			         		  }else{
			         			 $("#incomewealthscore").text(dataList_.income_wealth_score);
			         		  }
			         		  if(dataList_.income_pbank_score==undefined || dataList_.income_pbank_score==="" || dataList_.income_pbank_score==null){
			         			 $("#incomepbankscore").text("--");
			         		  }else{
			         			 $("#incomepbankscore").text(dataList_.income_pbank_score);
			         		  }
			         		  //$("#pureIncomePbank").text("--");//新增柜面非寿险新客户
		     					//品质改成服务
		         			  //$("#pinzhi").text("服务");
		         			  //$("#fuwu").empty();
//		         			  $(".qualityMask").hide();
//		         			  $(".serveMask").show();
//			         		  if(dataList_.oneCustSix==undefined || dataList_.oneCustSix==="" || dataList_.oneCustSix==null){
//		         				  $("#fuwu").append("<ul><li><span class=spanTitle>一户六开新客户</span><span id=oneCustSix class=spanScore>--</span></li></ul>");
//		         			  }else{
//		         				  $("#fuwu").append("<ul><li><span class=spanTitle>一户六开新客户</span><span id=oneCustSix class=spanScore>"+dataList_.oneCustSix+"</span></li></ul>");
//		         			  }
//		         			  if(dataList_.oneOldCustSix==undefined || dataList_.oneOldCustSix==="" || dataList_.oneOldCustSix==null){
//		         				 $("#fuwu").append("<ul><li><span class=spanTitle>一户六开老客户</span><span id=oneOldCustSixId class=spanScore>--</span></li></ul>");
//		         			  }else{
//		         				  $("#fuwu").append("<ul><li><span class=spanTitle>一户六开老客户</span><span id=oneOldCustSixId class=spanScore>"+dataList_.oneOldCustSix+"</span></li></ul>");
//		         			  }
			         		 if(dataList_.oneCustSix==undefined || dataList_.oneCustSix==="" || dataList_.oneCustSix==null){
		         				  $("#oneCustSix").text("--");
		         			  }else{
		         				  $("#oneCustSix").text(dataList_.oneCustSix);
		         			  }
		         			  if(dataList_.oneOldCustSix==undefined || dataList_.oneOldCustSix==="" || dataList_.oneOldCustSix==null){
		         				 $("#oneOldCustSixId").text("--");
		         			  }else{
		         				  $("#oneOldCustSixId").text(dataList_.oneOldCustSix);
		         			  }
					      }else{
					    	  $('#pinzhi').show();
			         		  $('#fuwu').hide();
					      }
						  adjustDesc();//取调整值
						  if(sumTotal_==undefined || sumTotal_==="" || sumTotal_==null){
		         			  $("#score").text("--");
		                  }else{
		                	  $("#score").text(sumTotal_);
		                  }
		         		
		            }
		         	 addNumberColor();
			         },
			         error:function(result){
	                     aladdin.loading.stop(function(err) {
	                        aladdin.toast.show({ message:'加载进度框隐藏错误 '});
	                     });
			         	aladdin.toast.show({ message:"ͨ哎呦网络不给力哦" });
			        
					   } 
		         });
		}
		 bindingAlert = function(){
			$('.section_a').on('click',function(){
				$('.teraction').css('display','block');
				getListDetails("sales")

			})
			$('.section_b').on('click',function(){
				$('.character').css('display','block');
				getListDetails("department")
			})
			$('.section_c').on('click',function(){
					$('.qualityMask').css('display','block');
					getListDetails("quality")
			})
			$('.section_d').on('click',function(){
					$('.serveMask').css('display','block');
					getListDetails("serve")
			})
		}
		//取调整值
		function adjustDesc(){
			for(var i in salasAdujest_){
	 			if(salasAdujest_[i].QUOTA_ID=="Q020100"){//投资理财创利
	// 				alert($("#investFinance").text(salasAdujest_[i].ADJUST_POINT));
	 				//$("#investFinance").text($("#investFinance").text()+'(+'+salasAdujest_[i].ADJUST_POINT+')');
	 				$('#adjust1').text(salasAdujest_[i].ADJUST_POINT).css('display','block');
	 				Q020100Adujst = salasAdujest_[i].ADJUST_DESC;
	 				//$("#adjustDesc").text(salasAdujest_[i].ADJUST_DESC);
	 				$("#adjust1").click(function(){
	 					$('.adjust').css('display','block');
	 					setAdujestDesc(Q020100Adujst);
	 					return false;
	 				});
	 			}
	 			if(salasAdujest_[i].QUOTA_ID=="Q020200"){//存款创利
	 				//$("#depositScore").text($("#depositScore").text()+"(+"+salasAdujest_[i].ADJUST_POINT+")");
	 				$('#adjust2').text(salasAdujest_[i].ADJUST_POINT).css('display','block');
	 				Q020200Adujst = salasAdujest_[i].ADJUST_DESC;
	 				//$("#adjustDesc").text(salasAdujest_[i].ADJUST_DESC);
	 				$("#adjust2").click(function(){
	 					$('.adjust').css('display','block');
	 					setAdujestDesc(Q020200Adujst);
	 					return false;

	 				});
	 			}
	// 			if(salasAdujest_[i].QUOTA_ID=="Q020600"){//信用卡新户
	// 				$("#creditCard").text($("#creditCard").text()+"(+"+salasAdujest_[i].ADJUST_POINT+")");
	// 				$("#adjustDesc").text(salasAdujest_[i].ADJUST_DESC);
	// 				$("#creditCard").click(function(){
	// 					$('.adjust').css('display','block');
	// 				});
	// 			}
	 			if(channelType_=="RM"){
	 				if(salasAdujest_[i].QUOTA_ID=="Q020500"){//AUM日均净值
	 	 				//$("#aumDayAvgRM").text($("#aumDayAvgRM").text()+"(+"+salasAdujest_[i].ADJUST_POINT+")");
	 					$('#adjust4').text(salasAdujest_[i].ADJUST_POINT).css('display','block');
	 					Q020500Adujst = salasAdujest_[i].ADJUST_DESC;
	 					//$("#adjustDesc").text(salasAdujest_[i].ADJUST_DESC);
	 	 				$("#adjust4").click(function(){
	 	 					$('.adjust').css('display','block');
	 	 					setAdujestDesc(Q020500Adujst);
	 	 				});
	 	 			}
	 				if(salasAdujest_[i].QUOTA_ID=="Q020600"){//净增财富客户数
	 	 				//$("#pureIncomeWealth").text($("#pureIncomeWealth").text()+"(+"+salasAdujest_[i].ADJUST_POINT+")");
	 					$('#adjust5').text(salasAdujest_[i].ADJUST_POINT).css('display','block');
	 					Q020600Adujst = salasAdujest_[i].ADJUST_DESC;
	 					//$("#adjustDesc").text(salasAdujest_[i].ADJUST_DESC);
	 	 				$("#adjust5").click(function(){
	 	 					$('.adjust').css('display','block');
	 	 					setAdujestDesc(Q020600Adujst);
	 	 				});
	 	 			}
	 				if(salasAdujest_[i].QUOTA_ID=="Q020700"){//净增私行客户数
	 	 				//$("#pureIncomePbankRM").text($("#pureIncomePbankRM").text()+"(+"+salasAdujest_[i].ADJUST_POINT+")");
	 					$('#adjust6').text(salasAdujest_[i].ADJUST_POINT).css('display','block');
	 					Q020700Adujst = salasAdujest_[i].ADJUST_DESC;
	 					//$("#adjustDesc").text(salasAdujest_[i].ADJUST_DESC);
	 	 				$("#adjust6").click(function(){
	 	 					$('.adjust').css('display','block');
	 	 					setAdujestDesc(Q020700Adujst);
	 	 				});
	 	 			}
	 				if(salasAdujest_[i].QUOTA_ID=="Q020800"){//移交私行客户数
	 	 				//$("#transferPbank").text($("#transferPbank").text()+"(+"+salasAdujest_[i].ADJUST_POINT+")");
	 					$('#adjust7').text(salasAdujest_[i].ADJUST_POINT).css('display','block');
	 					Q020800Adujst = salasAdujest_[i].ADJUST_DESC;
	 					//$("#adjustDesc").text(salasAdujest_[i].ADJUST_DESC);
	 	 				$("#adjust7").click(function(){
	 	 					$('.adjust').css('display','block');
	 	 					setAdujestDesc(Q020800Adujst);
	 	 				});
	 	 			}
	 				if(salasAdujest_[i].QUOTA_ID=="Q021100"){//达标客户流失率
	 	 				//$("#pointsVale").text($("#pointsVale").text()+"(+"+salasAdujest_[i].ADJUST_POINT+")");
	 					$('#adjust12').text(salasAdujest_[i].ADJUST_POINT).css('display','block');
	 					Q021100Adujst = salasAdujest_[i].ADJUST_DESC;
	 					//$("#adjustDesc").text(salasAdujest_[i].ADJUST_DESC);
	 	 				$("#adjust12").click(function(){
	 	 					$('.adjust').css('display','block');
	 	 					setAdujestDesc(Q021100Adujst);
	 	 				});
	 	 			}
	 			}
	 			if(channelType_=="PB"){
	 				if(salasAdujest_[i].QUOTA_ID=="Q020500"){//AUM日均净值
	 	 				//$("#aumDayAvgPB").text($("#aumDayAvgPB").text()+"(+"+salasAdujest_[i].ADJUST_POINT+")");
	 					$('#adjust8').text(salasAdujest_[i].ADJUST_POINT).css('display','block');
	 					Q020500Adujst = salasAdujest_[i].ADJUST_DESC;
	 					//$("#adjustDesc").text(salasAdujest_[i].ADJUST_DESC);
	 	 				$("#adjust8").click(function(){
	 	 					$('.adjust').css('display','block');
	 	 					setAdujestDesc(Q020500Adujst);
	 	 				});
	 	 			}
	 				if(salasAdujest_[i].QUOTA_ID=="Q020800"){//移交私行客户数
	 	 				//$("#pureIncomePbankPB").text($("#pureIncomePbankPB").text()+"(+"+salasAdujest_[i].ADJUST_POINT+")");
	 					$('#adjust9').text(salasAdujest_[i].ADJUST_POINT).css('display','block');
	 					Q020800Adujst = salasAdujest_[i].ADJUST_DESC;
	 					//$("#adjustDesc").text(salasAdujest_[i].ADJUST_DESC);
	 	 				$("#adjust9").click(function(){
	 	 					$('.adjust').css('display','block');
	 	 					setAdujestDesc(Q020800Adujst);
	 	 				});
	 	 				
	 	 			}
	 				if(salasAdujest_[i].QUOTA_ID=="Q021100"){//达标客户流失率
	 	 				//$("#pointsVale").text($("#pointsVale").text()+"(+"+salasAdujest_[i].ADJUST_POINT+")");
	 					$('#adjust12').next().text(salasAdujest_[i].ADJUST_POINT).css('display','block');
	 					Q021100Adujst = salasAdujest_[i].ADJUST_DESC;
	 					//$("#adjustDesc").text(salasAdujest_[i].ADJUST_DESC);
	 	 				$("#adjust12").click(function(){
	 	 					$('.adjust').css('display','block');
	 	 					setAdujestDesc(Q021100Adujst);
	 	 				});
	 	 			}
	 			}
	 			if(channelType_=="WSM"){
	 				if(salasAdujest_[i].QUOTA_ID=="Q020900"){//新增月末余额万元户数
	 	 				//$("#incomeTenThousand").text($("#incomeTenThousand").text()+"(+"+salasAdujest_[i].ADJUST_POINT+")");
	 					$('#adjust10').text(salasAdujest_[i].ADJUST_POINT).css('display','block');
	 					Q020900Adujst = salasAdujest_[i].ADJUST_DESC;
	 					//$("#adjustDesc").text(salasAdujest_[i].ADJUST_DESC);
	 	 				$("#adjust10").click(function(){
	 	 					$('.adjust').css('display','block');
	 	 					setAdujestDesc(Q020900Adujst);
	 	 				});
	 	 			}
	 				if(salasAdujest_[i].QUOTA_ID=="Q021201"){//一户六开新客户
	 	 				//$("#oneCustSix").text($("#oneCustSix").text()+"(+"+salasAdujest_[i].ADJUST_POINT+")");
	 					$('#adjust11').text(salasAdujest_[i].ADJUST_POINT).css('display','block');
	 					Q021201Adujst = salasAdujest_[i].ADJUST_DESC;
	 					//$("#adjustDesc").text(salasAdujest_[i].ADJUST_DESC);
	 	 				$("#adjust11").click(function(){
	 	 					$('.adjust').css('display','block');
	 	 					setAdujestDesc(Q021201Adujst);
	 	 				});
	 	 			}
	 				if(salasAdujest_[i].QUOTA_ID=="Q021202"){//一户六开老客户
	 	 				//$("#oneOldCustSixId").text($("#oneOldCustSixId").text()+"(+"+salasAdujest_[i].ADJUST_POINT+")");
	 					$('#adjust12').next().text(salasAdujest_[i].ADJUST_POINT).css('display','block');
	 					Q021202Adujst = salasAdujest_[i].ADJUST_DESC;
	 					//$("#adjustDesc").text(salasAdujest_[i].ADJUST_DESC);
	 	 				$("#adjust12").click(function(){
	 	 					$('.adjust').css('display','block');
	 	 					setAdujestDesc(Q021202Adujst);
	 	 				});
	 	 			}
	 				if(salasAdujest_[i].QUOTA_ID=="Q021001"){//柜面非寿险新客户_财富
	 	 				//$("#oneOldCustSixId").text($("#oneOldCustSixId").text()+"(+"+salasAdujest_[i].ADJUST_POINT+")");
	 					$('#adjust11').next().text(salasAdujest_[i].ADJUST_POINT).css('display','block');
	 					Q021001Adujst = salasAdujest_[i].ADJUST_DESC;
	 					//$("#adjustDesc").text(salasAdujest_[i].ADJUST_DESC);
	 	 				$("#adjust11").click(function(){
	 	 					$('.adjust').css('display','block');
	 	 					setAdujestDesc(Q021001Adujst);
	 	 				});
	 	 			}
	 				if(salasAdujest_[i].QUOTA_ID=="Q021002"){//柜面非寿险新客户_私行
	 	 				//$("#oneOldCustSixId").text($("#oneOldCustSixId").text()+"(+"+salasAdujest_[i].ADJUST_POINT+")");
	 					$('#adjust13').next().text(salasAdujest_[i].ADJUST_POINT).css('display','block');
	 					Q021002Adujst = salasAdujest_[i].ADJUST_DESC;
	 					//$("#adjustDesc").text(salasAdujest_[i].ADJUST_DESC);
	 	 				$("#adjust13").click(function(){
	 	 					$('.adjust').css('display','block');
	 	 					setAdujestDesc(Q021002Adujst);
	 	 				});
	 	 			}
	 			}
	 		}
			addAdjustValue();
		}
		
//		getRootPath = function () {
//	        var pathName = window.location.pathname.substring(1);
//	        var webName = pathName == '' ? '' : pathName.substring(0, pathName
//	                .indexOf('/'));
//	        //var webName1 = pathName.split("/");
//	        // webName = webName +"/" +webName1[1];
//	        if(webName!=""&&webName!=null&&webName!=undefined){
//	            var temp = window.location.protocol + '//' + window.location.host + "/bron/pmsrb/emp/banka/";
//	            temp = temp.replace("/bron/pmsrb/emp/banka","/emp/banka/");
//	            return temp;
//	        }else{
//	            return window.location.protocol + '//' + window.location.host + '/';
//	        }
//	        
//	    }
		//清空色块及弹框值
		function clearAdujest(){
			//清空弹框值
			$('.adjustArea').text('');
			//清空色块值
			$('#adjustDesc').text('');
		}
		function clearScoreValue(){
			var spanScores=$('.spanScore');
			$('.spanScore').each(function(){
				$(this).text("");
			})
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
		//弹框描述
		function setAdujestDesc(adujestDesc){
			$("#adjustDesc").text('');
			$("#adjustDesc").text(adujestDesc);
		}
	//判断数字颜色begin
		function addNumberColor(){
			var spanScores=$('.spanScore');
			$('.spanScore').each(function(){
					var temptext = $(this).text();
					if(temptext.replace(">", "")<0){
						$(this).css('color','#ff5666');
					}else{
						if(temptext.replace(">", "")>=0){
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
			if(sumTotal_ == undefined || sumTotal_ == null ){
				$("#score").text('--分');
			}
			//
			var investFinanceTemp = $("#investFinance").text();
			var depositScoreTemp = $("#depositScore").text();
			if(isNaN(investFinanceTemp)){
				$("#investFinanceImg").hide();
			}else{
				$("#investFinanceImg").show();
			}
			if(isNaN(depositScoreTemp)){
				$("#depositScoreImg").hide();
			}else{
				$("#depositScoreImg").show();
			}
	    }
		//关键积分说明
		getListDetails = function(type){
	   		  var setPoints1 = "--";
	   		  var setPoints2 = "--";
	   		  var setPoints3 = "--";
	   		  var setPoints4 = "--";
			  if("sales" == type){
	       			for(var i = 0 ;i < salesList_.length; i++){
	           			if("Q020100"== salesList_[i].RESERVE_CHAR1){
	           				setPoints1 = salesList_[i].STANDARD_POINTS;
	           			}else if("Q020200"== salesList_[i].RESERVE_CHAR1){
	           				setPoints2 = salesList_[i].STANDARD_POINTS;
	           			}
	           		}  
	       			var insDataStr = "每万元创利可得"+setPoints1+"分。"
	       			$("#insData").empty();
	       			$("#insData").append(insDataStr);
	       			var depDataStr = "每万元创利可得"+setPoints2+"分。大额存单计给销售人，其他按创利五折计给管户人。"
	       			$("#depData").empty();
	       			$("#depData").append(depDataStr);
	   			}
	   			if("department" == type){
			   			if("PB"== channelType_ || "RM"== channelType_){
			   				$("#incomeTenThousand1").hide();
	      					$("#pureIncomePbank1").hide();
			            	 for(var i = 0 ;i<departmentList_.length;i++){
			            		 if("Q020500"== departmentList_[i].RESERVE_CHAR1){        //AUM日均净增
			               				setPoints1 = departmentList_[i].STANDARD_POINTS;
			               			}else if("Q020700"== departmentList_[i].RESERVE_CHAR1){  //净增私行客户
			               				setPoints2 = departmentList_[i].STANDARD_POINTS;
			               			}else if("Q020800"== departmentList_[i].RESERVE_CHAR1){   //移交私行客户
			               				setPoints3 = departmentList_[i].STANDARD_POINTS;
			               			}else if("Q020600"== departmentList_[i].RESERVE_CHAR1){    //净增财富客户
			               				setPoints4 = departmentList_[i].STANDARD_POINTS;
			               			}
			            	 }
		               			var rmStr = "每百万净增可得"+setPoints1+"分；<br/>"
	                   				+"每百万流失可扣"+setPoints1+"分；<br/>"
	                   				+ "不封顶不封底。"
	                   		$("#aumData").empty();	
	                   		$("#aumData").append(rmStr);
			               	var jClientStr = "每个客户净增可得"+setPoints2+"分；<br/>"
			               				+"每个客户流失可扣"+setPoints2+"分；<br/>"
			               				+"不封顶不封底。";
			               		//jWealthData 净增财富客户数                                    jClientData   净增私行客户数
			               	$("#jClientData").empty();
	           				$("#jClientData").append(jClientStr);
	           				var jWealthStr = "每个客户净增可得"+setPoints4+"分；<br/>"
	              				+"每个客户流失可扣"+setPoints4+"分；<br/>"
	              				+"不封顶不封底。";
			               	$("#jWealthData").empty();
	           				$("#jWealthData").append(jWealthStr);
			               		var yClientStr = "每个客户移交可得"+setPoints3+"分；<br/>"
			               		$("#yClientData").empty();
	              				$("#yClientData").append(yClientStr);
	              			$("#wsmData").hide();
	          				if("PB"== channelType_){
	          					$("#mvClientData").hide();
	          					$("#wealthDiv").hide();
	          				}
			           	 }else{
			           		 
			           		 for(var i = 0 ;i<departmentList_.length;i++){
				            		 if("Q020900"== departmentList_[i].RESERVE_CHAR1){
				               				setPoints1 = departmentList_[i].STANDARD_POINTS;
				               			}else if("Q020600"== departmentList_[i].RESERVE_CHAR1){
				               				setPoints2 = departmentList_[i].STANDARD_POINTS;
				               			}else if("Q020700"== departmentList_[i].RESERVE_CHAR1){
				               				setPoints3 = departmentList_[i].STANDARD_POINTS;
				               			}
				            	 }

			           		 var wsmAddStr = "当月每个入金万元的客户可得"+setPoints1+"分";
			           		 var wsmInsuranceStr = "非寿险客户按3个月后客户资产等级计算分；<br/>"
			             		                 +"新增每个财富客户净增可得"+setPoints2+"分；<br/>"
			             	 
			             		                 
			                 var tempStr = "非寿险客户按3个月后客户资产等级计算分；<br/>"
			                	           +"新增每个私行客户净增可得"+setPoints3+"分；"
			             	 
			                 $("#pureIncomePbank12").empty();
			                 $("#pureIncomePbank12").append(tempStr);
			           		 
			       			 $("#incomeTenThousand2").empty();	
			           		 $("#incomeTenThousand2").append(wsmAddStr);
			           		 $("#pureIncomePbank2").empty();	
			           		 $("#pureIncomePbank2").append(wsmInsuranceStr);
			           		 $("#aumdayavg1").hide();
			           		 $("#wealthDiv").hide();
			           		 $("#jzshData").hide();
			           		 $("#mvClientData").hide();
			           	}
			         
	   				}
	   			if("quality" == type){
	   				  for(var i = 0 ;i<qualityList_.length;i++){	
							if("P0011"== qualityList_[i].POINT_ID){//底线值
								setPoints1 = qualityList_[i].STANDARDS;
								//setPoints1 = qualityList_[i].RESERVE_CHAR2; //极小值
			       			}else if("P0013"== qualityList_[i].POINT_ID){//封顶值
			       				setPoints2 = qualityList_[i].STANDARDS;
			       				//setPoints2 = qualityList_[i].RESERVE_CHAR2;  //极大值
			       			}else if("P0012"== qualityList_[i].POINT_ID){//标准值
			       				var setPoints5 = qualityList_[i].STANDARDS;
			       			}
						}
					  	var temp1 = qualityListScore_[0].STANDARD_POINTS;
						var divScore = parseInt(setPoints2) - parseInt(setPoints1);
//						var lsStr = "流失率=0%可得"+setPoints2+"分。每流失0.1%的客户，则对应扣除"+divScore+"/15分。"
//									+"最高扣除分为"+setPoints2+"分，超过1.5%的流失率也扣除"+setPoints1+"分。"
						var tempScore = temp1-(temp1*(setPoints5-0.001)/(setPoints5-setPoints2));
						var lsStr = "流失率=0%可得"+qualityListScore_[0].STANDARD_POINTS+"分。每流失0.1%的客户，则对应扣除"+Math.round(tempScore)+"分。"
									+"最高扣除分为"+qualityListScore_[0].STANDARD_POINTS+"分，超过1.5%的流失率也扣除"+qualityListScore_[0].STANDARD_POINTS+"分。"
			            $("#lsData").empty();
			            $("#lsData").append(lsStr);
				}
				if("serve" == type){
					for(var i = 0 ;i<serveList_.length;i++){
						if("Q021202"== serveList_[i].RESERVE_CHAR1){
		       				setPoints1 = serveList_[i].STANDARD_POINTS;
		       			}else if("Q021201"== serveList_[i].RESERVE_CHAR1){
		       				setPoints2 = serveList_[i].STANDARD_POINTS;
		       			}
					 }			               					 
					 var str1 = "当月完成一户六开的每个新客户数可得"+setPoints1+"分，老客户可得"+setPoints2+"分计给最后一开的办理人。";
		             $("#onetosixopen").empty();
		             $("#onetosixopen").append(str1);
				}
		}

		
	}
	importantscore.prototype = {
		init:function(){
			$(function(){
				//var channelType_ = "",//人员类型
			   var sumTotal_ = "",//总分
			    departmentList_ = "",//规模
			    qualityList_ = "",//品质
			    salesList_ = "",//销售
			    serveList_ = "",//服务
			    dataList_ = "",//数据
			    salasAdujest_ = "",//取调制值
				custLoseScore_ = "";//达标客户流失率
				var qualityListScore_ = "";//达标客户流失率得分
				//webroot = getRootPath();
				var Q020100Adjust = "";
				var Q020200Adjust = "";
				
				var Q020500Adjust = "";
				var Q020600Adjust = "";
				var Q020700Adjust = "";
				var Q020800Adjust = "";
				var Q021100Adjust = "";
				
				var Q020900Adjust = "";
				var Q021201Adjust = "";
				var Q021202Adjust = "";
				
				var Q021001Adjust = "";//柜面非寿险新客户_财富
				var Q021002Adjust = "";//柜面非寿险新客户_私行
				
				
//				//调整值弹框
//				$('.adjustArea').on('click',function(){
//					$('.adjust').css('display','block');
//				})
				hiddenCustomernteractionExplainModal1 = function(){
					$('.teraction').css('display','none');
				}
				hiddenCustomernteractionExplainModal2 = function(){
					$('.character').css('display','none');
				}
				hiddenCustomernteractionExplainModal3 = function(){
					$('.qualityMask').css('display','none');
				}
				hiddenCustomernteractionExplainModal4 = function(){
					$('.serveMask').css('display','none');
				}
				hiddenCustomernteractionExplainModal5 = function(){
					$('.adjust').css('display','none');
				}
				queryResponsePoints = function(temDate,teamFlg,umAccount){
					temDate = temDate;
					aladdin.loading.start({canCancel:false},function(err) {
					if(err){
			            aladdin.toast.show({ message:'加载进度框显示错误 ' + err.code});
					}
			        });
			
					aladdin.aike_tool.getTicket(function (err, ticket) {
			            if (err && !ticket) {
			                aladdin.toast.show({ message:err.message});
			               // alert("ticket=="+ticket);
			            } else {
			            	aladdin.aike_tool.getAccount(
	                    	        function (error,account) {
	                    	        	umdata = account;
	                    	            //alert("account:"+account);
	
	                    	        }
	                    	    );
							salesPoints(ticket,temDate,teamFlg,umAccount);//获取规模
			            }
					})
					

//					salesPoints("12","YUHAO236",dateTime);//WSM奖励积分 03you"YWF"

//					salesPoints("12","CHENJIJIE",dateTime);//WSM奖励积分 03you"YWF"

				}
				//投资理财创利
				$('#investFinanceImg').click (function () {
					aladdin.navigator.forward({
						  url: 'depositBenifits.html?Date='+temDate,
						  // 默认情况下即是`webapp`，可以不传
						  type: 'webapp'
						  // 如果使用默认的模板，不需要传递
						}, function (err) {
						  if (err) {
						    aladdin.toast.show({ message: err.message });  
						  }             
						});
//					$(window.location).prop('href', "depositBenifits.html?Date="+dateTime_); 
//							window.open(webroot+"salespoints/depositBenifits.html")
				}) 
			//存款创利
				$('#depositScoreImg').click (function () {
					aladdin.navigator.forward({
						  url: 'investmentBenifits.html?Date='+temDate,
						  // 默认情况下即是`webapp`，可以不传
						  type: 'webapp'
						  // 如果使用默认的模板，不需要传递
						}, function (err) {
						  if (err) {
						    aladdin.toast.show({ message: err.message });  
						  }             
						});
//					$(window.location).prop('href', "investmentBenifits.html?Date="+dateTime_); 
				}) 
				bindingAlert();
//				$('.section_a').on('click',function(){
//					$('.teraction').css('display','block');
//					getListDetails("sales")
//	
//				})
//				$('.section_b').on('click',function(){
//					$('.character').css('display','block');
//					getListDetails("department")
//				})
//				$('.section_c').on('click',function(){
//					//alert("channelType2=="+channelType_)
//					if(channelType_ != "WSM"){
//						$('.qualityMask').css('display','block');
//						getListDetails("quality")
//					}else {
//						$('.serveMask').css('display','block');
//						getListDetails("serve")
//					}
//					
//				})
			})
		}
	}
	var important = new importantscore();
	important.init();
})()
