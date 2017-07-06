(function(){
	var umdata = '';
	var channelType = '';
	var dateTimes ;
	function obligation(){
		queryResponsePoints = function(dateTime){
			dateTimes = dateTime.substring(0,4)+'-'+dateTime.substring(4,8);
			//getListDetails('123456',"ANLINA720",dateTime);//分享
			aladdin.loading.start({canCancel:false},function(err) {
					if(err){
			          aladdin.toast.show({ message:'加载进度框显示错误 '});
					}
				});
	               aladdin.aike_tool.getTicket(function (err, ticket) {
	                    if (err && !ticket) {
	                        aladdin.toast.show({ message:'获取ticket失败' });
	                       // alert("ticket=="+ticket);
	                    } else {

	                  getListDetails(ticket,umdata,dateTime,'Q011100');//分享
	                }
	                })
	}

	
	//queryResponsePoints(dateTemp);
	
		//获取明细、客户互动
		getListDetails = function(ticket,umAccount,date){
			umdata = umAccount;
	      aladdinRequestData({
	            type: "post",
	            url: "dutyPoints/listDetails.do",
	            data: {
	            	'ticket':ticket,
	            	'umAccount':umAccount,
	            	'date':date,
					'inputType': 'PB|RM|WSM'

				},
	           beforeSend: {
	            	"brcpEaSessionTicket":ticket
	            },
	            success: function(err,res) {

	            	 aladdin.loading.stop();
	            	if(err){
	            		aladdin.toast.show({ message:'加载错误 ' });
	            		aladdin.loading.stop();
	            		$('#khhd').hide();
            			$('#quanlity').hide();
            			$('#zgpj').hide();
            			return;
	            	}
	            	var result = res.body;
	            	clearData();
	            	result = eval("("+result+")");
	            	if(result.responseCode!="0"){
	                    aladdin.loading.stop();
			         		if(result.responseCode == "900108"){
			        	 		aladdin.toast.show({ message:'该用户当月无数据'});
			        	 		$('.section_a').unbind('click');
			        	 		$('.section_b').unbind('click');
			        	 		$('.section_c').unbind('click');
			        	 	}else if(result.responseCode == "900120"){
								aladdin.toast.show({ message:'当前月份的用户角色发生变更，请切换到业绩主页查询'});
							}else{
			        	 		aladdin.toast.show({ message:'系统错误'});
			        	 	}
			         		$('#khhd').hide();
	            			$('#quanlity').hide();
	            			$('#zgpj').hide();
	            			$('.section_a').unbind('click');
		        	 		$('.section_b').unbind('click');
		        	 		$('.section_c').unbind('click');
			         		return;
	            		//alert("========="+result.responseCode);
	            	}else{
	            		$('#khhd').show();
            			$('#quanlity').show();
            			$('#zgpj').show();
            			bindClick();
	            		var actionTotals = result.actionPointDetails;
	            		var userInf = result.userMap;
	            		channelType = userInf.CHANNEL_TYPE;
	            		var score = result.score;
	            		var listStandard = result.listStandard;

	            		if(score==undefined||score==""||score==null){
	            			if(channelType!="WSM"){
	            				$("#exmine").hide();
	            			}else{
	            				$("#exmine").show();
	            			}
	            		}else{
	            			if(channelType!="WSM"){
	            				$("#exmine").hide();
	            			}else{
	            				$("#exmine").show();
	            			}
	            			$("#score").text(score.totalScore+'分');
	            			$("#ywdc").text(score.exmineScore);
	            			$("#hgfx").text(score.riskScore);
	            			$("#khts").text(score.complainScore);	
	            			$("#spanScore1").text(score.supervisorScore);
	            			
	            		}
	            		if(listStandard==undefined||listStandard==""||listStandard==null){
	            			
	            		}else{
	            			var content = "";
	            			for(var i=0;i<listStandard.length;i++){
	            				var detail = listStandard[i];
	            					if(detail.typeId=="Q011000"){
	            						var context = "每个审批通过后的调研可得"+detail.standardPoints+"分，可累加";
	            	           			$("#ywdyCt").html(context);
	            					}else if(detail.typeId=="Q010900"){
	            						var context ="网点现场活动及场外活动组织/场（覆盖>="+detail.finishCount+"名客户），每次审批通过后活动可得"+detail.standardPoints+"分，可累加"
	            						$("#hdzzCt").html(context);
	            					}else if(listStandard[i].typeId=="Q010800"){
	            						var context ="本月承接客户商机率>="+detail.finishPercent*100+"%,则本月可获得商机追踪的"+detail.standardPoints+"分</br>"+
												"本月跟进率=截止日期为当月的已跟进商机个数/截止日期为当月的商机总个数";
	            						$("#khsjCt").html(context);
	            					}else if(listStandard[i].typeId=="Q010700"){
	            						var context ="本月其他商机率>="+detail.finishPercent*100+"%,则本月可获得商机追踪的"+detail.standardPoints+"分;</br>"+
												" 本月跟进率=截止日期为当月的已跟进商机个数/截止日期为当月的商机总个数。";
	            						$("#qtsjCt").html(context);
	            					}
	            					if(listStandard[i].typeId=="Q010100"){
	            						var context = "本月商机跟进率>="+detail.finishPercent*100+"%，则本月可获得"+detail.standardPoints+"积分;<br/>"+
	            									"本月跟进率=截止日期为当月的已跟进商机个数 /截止日期为当月的商机总个数。";
	            	           			$("#sjzzCt").html(context);
	            					}else if(listStandard[i].typeId=="Q010200"){
	            						var context = "提醒消息类型为除“生日提醒”外的提醒;<br/>" +
	                   					"本月跟进率>="+detail.finishPercent*100+"%,则本月获得的"+detail.standardPoints+"分;<br/>"+
	                   					"本月跟进率=当月创建事项已跟进的客户数 /当月创建事项的客户数。";
	            						$("#zysxCt").html(context);
	            					}else if(listStandard[i].typeId=="Q010300"){
	            						var context = "提醒消息类型为“生日提醒”;<br/>" +
	                   					"本月跟进率>="+detail.finishPercent*100+"%,则本月获得"+detail.standardPoints+"分;<br/>"+
	                   					"本月跟进率=当月创建事项已跟进的客户数 /当月创建事项的客户数。";
	            						$("#dqwhCt").html(context);
	            					}else if(listStandard[i].typeId=="Q010400"){
	            						var context = "管户最近三个月有一次面访记录即生效;<br/>" +
	                   					"近三个月客户面访率>="+detail.finishPercent*100+"%,则本月获得"+detail.standardPoints+"分;<br/>"+
	                   					"近三个月客户面访率<"+detail.finishPercent*100+"%,得分=面访率*"+detail.standardPoints+"分;<br/>"+
	                   					"面访率=已完成的面访客户数 /需要完成的面访客户数;";
	            						$("#mfCt").html(context);
	            					}else if(listStandard[i].typeId=="Q011100"){
	            						var clickCount = detail.finishCount;
           							var standarpoint = detail.standardPoints;
           							var totalCount = detail.totalCount;
	            						if(detail.standardPoints==1){
	            							 content = content+ "当日分享内容数大于等于"+totalCount+"且当日获得累计点击数大于等于"+clickCount
   										+"得"+standarpoint+"分。<br/>" 
	            						}else{
	            							var clickCount = detail.finishCount;
	            							var standarpoint = detail.standardPoints;
	            							 content = content+ "当日分享内容数大于等于"+totalCount+"且当日获得累计点击数大于等于"+clickCount
   										+"得"+standarpoint+"分。<br/>"  
	            						}
	            					}
	            			}
	            			$("#fxxyCt").html(content+"要尽量一个内容分享给多个用户哦！");
	            		}
	                	if(actionTotals==undefined||actionTotals==""||actionTotals==null){
	                		if(channelType=="WSM"){
	                			$("#campaign").show();
	                    		$("#survey").show();
	                    		$("#clientBusiness").show();
	                    		$("#otherBusiness").show();
	                			
	                			$("#important").hide();
	                    		$("#greeting").hide();
	                    		$("#business").hide();
	                    		$("#interview").hide();
	                		}else{
	                			$("#important").show();
	                    		$("#greeting").show();
	                    		$("#business").show();
	                    		$("#interview").show();
	                			
	                			$("#campaign").hide();
	                    		$("#survey").hide();
	                    		$("#clientBusiness").hide();
	                    		$("#otherBusiness").hide();
	                    		
	                		}
	                	}else{

	                		if(channelType=="WSM"){
	                			$("#campaign").show();
	                    		$("#survey").show();
	                    		$("#clientBusiness").show();
	                    		$("#otherBusiness").show();
	                			
	                			$("#important").hide();
	                    		$("#greeting").hide();
	                    		$("#business").hide();
	                    		$("#interview").hide();
	                			//组织活动
	                			$("#campaignCondition").text(actionTotals[0].actionOrganize);
                      			$("#campaignScore").text(actionTotals[0].actionOrganizePoints);
                      			$("#campaignPercent").hide();
                      			//业务员调研
                      			$("#surveyCondition").text(actionTotals[0].salesmanSurvey);
                      			$("#surveyScore").text(actionTotals[0].salesmanSurveyPoints);
                      			$("#surveyPercent").hide();
                      			//承接客户商机
                      			$("#clientbusinessCondition").text(actionTotals[0].followCustOptyCondition);
                      			$("#clientbusinessPercent").text(actionTotals[0].custOptyfinishPercent+'%');
                      			$("#clientbusinessScore").text(actionTotals[0].custOptyPoints);
                      			if(actionTotals[0].custOptyFlag=="1"){
                      				$('#clientbusinessPercent').css('background-color','#59baff');
                      			}else{
                      				$('#clientbusinessPercent').css('background-color','#ff5f66');
                      			}
                      			if(actionTotals[0].custOptyfinishPercent==0||actionTotals[0].custOptyfinishPercent==null
                      					||actionTotals[0].custOptyfinishPercent==undefined){
                      				$("#clientbusinessPercent").hide();
                      			}else{
                      				$("#clientbusinessPercent").show();
                      			}
                      			//其他商机
                      			$("#otherbusinessCondition").text(actionTotals[0].salesManOptyCondition);
                      			$("#otherbusinessPercent").text(actionTotals[0].salesManOptyfinishPercent+'%');
                      			$("#otherbusinessScore").text(actionTotals[0].salesManOptyPoints);
                      			if(actionTotals[0].salesManOptyFlag=="1"){
                      				$('#otherbusinessPercent').css('background-color','#59baff');
                      			}else{
                      				$('#otherbusinessPercent').css('background-color','#ff5f66');
                      			}
                      			if(actionTotals[0].salesManOptyfinishPercent==0||actionTotals[0].salesManOptyfinishPercent==null
                      					||actionTotals[0].salesManOptyfinishPercent==undefined){
                      				$("#otherbusinessPercent").hide();
                      			}else{
                      				$("#otherbusinessPercent").show();
                      			}
	            			}else{
	            				$("#important").show();
	                    		$("#greeting").show();
	                    		$("#business").show();
	                    		$("#interview").show();
	            				
	            				$("#campaign").hide();
	                    		$("#survey").hide();
	                    		$("#clientBusiness").hide();
	                    		$("#otherBusiness").hide();
	            				//重要事项
	            				$("#zysx").text(actionTotals[0].msgRemindCondition);
                      			$("#zysxP").text(actionTotals[0].msgRemindfinishPercent+'%');
                      			$("#zysxS").text(actionTotals[0].msgRemindPoints)
//                      			$("#zysxS").append("<img src=../img/arrow.png id=image1 onclick=gotoEveryPage(msgRemind)>");
                      			if(actionTotals[0].msgRemindFlag=="1"){
                      				$('#zysxP').css('background-color','#59baff');
                      			}else{
                      				$('#zysxP').css('background-color','#ff5f66');
                      			}
                      			if(actionTotals[0].msgRemindfinishPercent==0||actionTotals[0].msgRemindfinishPercent==null
                      					||actionTotals[0].msgRemindfinishPercent==undefined){
                      				$("#zysxP").hide();
                      			}else{
                      				$("#zysxP").show();
                      			}
                      			//定期问候
                      			$("#dqwh").text(actionTotals[0].msgRegularCondition);
                      			$("#dqwhP").text(actionTotals[0].msgRegularfinishPercent+'%');
                      			$("#dqwhS").text(actionTotals[0].msgRegularPoints)
                      			if(actionTotals[0].msgRegularFlag=="1"){
                      				$('#dqwhP').css('background-color','#59baff');
                      			}else{
                      				$('#dqwhP').css('background-color','#ff5f66');
                      			}
                      			if(actionTotals[0].msgRegularfinishPercent==0||actionTotals[0].msgRegularfinishPercent==null
                      					||actionTotals[0].msgRegularfinishPercent==undefined){
                      				$("#dqwhP").hide();
                      			}else{
                      				$("#dqwhP").show();
                      			}
                      			//商机追踪
                      			$("#sjzz").text(actionTotals[0].optyCountCondition);
                      			$("#sjzzP").text(actionTotals[0].optyCountfinishPercent+'%');
                      			$("#sjzzS").text(actionTotals[0].optyPoints)
                      			if(actionTotals[0].optyCountFlag=="1"){
                      				$('#sjzzP').css('background-color','#59baff');
                      			}else{
                      				$('#sjzzP').css('background-color','#ff5f66');
                      			}
                      			if(actionTotals[0].optyCountfinishPercent==0||actionTotals[0].optyCountfinishPercent==null
                      					||actionTotals[0].optyCountfinishPercent==undefined){
                      				$("#sjzzP").hide();
                      			}else{
                      				$("#sjzzP").show();
                      			}
                      			//面访
                      			$("#mf").text(actionTotals[0].inPersonCustCondition);
                      			$("#mfP").text(actionTotals[0].inPersonCustfinishPercent+'%');
                      			$("#mfS").text(actionTotals[0].inPersonPoints)
                      			if(actionTotals[0].inPersonCustFlag=="1"){
                      				$('#mfP').css('background-color','#59baff');
                      			}else{
                      				$('#mfP').css('background-color','#ff5f66');
                      			}
                      			if(actionTotals[0].inPersonCustfinishPercent==0||actionTotals[0].inPersonCustfinishPercent==null
                      					||actionTotals[0].inPersonCustfinishPercent==undefined){
                      				$("#mfP").hide();
                      			}else{
                      				$("#mfP").show();
                      			}
	            			}
	                		//分享
                  			if(actionTotals[0].sharePoints!='--'){
	            				if($("#fxxy").attr("onClick")==undefined){
	            					$("#fxxy").attr("onClick","openShareScoreHtml()")
	            				}
	            				$("#image").show();
	            				if(actionTotals[0].sharePoints> 0){
		                   			$("#sharePoints").text('+'+actionTotals[0].sharePoints);//分享
		                   			$("#sharePoints").css('color','#34a1fc');
		                   		}else if(actionTotals[0].sharePoints< 0){
		                   			$("#sharePoints").text('-'+share[0].sharePoints);//分享
		                   			$("#sharePoints").css('color','#ff5f66');
		                   		}else if(actionTotals[0].sharePoints==0){
		                   			$("#sharePoints").text(0);//分享
		                   			$("#sharePoints").css('color','#34a1fc');
		                   		}
		                   			
	            			}else{
	            				$("#sharePoints").text("--");//分享
	            				$("#image").hide();
	            				$("#fxxy").removeAttr("onClick");
	            			}
	                	}
	            	addNumberColor()
	            	}
	            }
	        });
		}
		
	
	
		//判断数字颜色begin
		function addNumberColor(){
			var spanScores=$('.spanScore');
			//var spanScores=document.getElementsByClassName('spanScore')
			console.log(spanScores)
				//var text=spanScores[i].innerText;
			var image1 = $("#zysxS").text();
			
			if(isNaN(image1)){
				
				$("#image1").hide();
			}else{
				console.log($("#image1"));
				$("#image1").show();
			}	
			
			$('.spanScore').each(function(){
					if($(this).text()>=0){
				    	$(this).css('color','#34a1fc');
				    	$(this).text('+'+$(this).text());
				  	}
					else if($(this).text()==null||$(this).text()==''||$(this).text()==undefined){
						$(this).text('待结算');
						$(this).css('color','#ff5666');
					}
					else{
						$(this).css('color','#ff5666');
					}
				})
				var temp = $("#score").text();
				temp = temp.replace("分","")*1;
				if(temp>=0){
					$("#score").css('color','#34a1fc');
				}else{
					$("#score").css('color','#ff5666');
				}
				
				aladdin.loading.stop();
		}
		//判断颜色end
		
		//清除缓存
		function clearData(){
			$("#score").text("--");
			$("#ywdc").text("--");
			$("#hgfx").text("--");
			$("#khts").text("--");
			$("#sharePoints").text("--");
			$("#spanScore1").text("--");
			$("#surveyCondition").text("(--)");//业务调研
   			$("#surveyPercent").text("--");
   			$("#surveyScore").text("--");
   			$("#campaignCondition").text("(--)");//组织活动
   			$("#campaignPercent").text("--");
   			$("#campaignScore").text("--");
   			$("#clientbusinessCondition").text("(--/--)");//客户商机
   			$("#clientbusinessPercent").text("--");
   			$("#clientbusinessScore").text("--");
   			$("#otherbusinessCondition").text("(--/--)");//其他商机
   			$("#otherbusinessPercent").text("--");
   			$("#otherbusinessScore").text("--");
   			$("#sjzz").text("(--/--)");//商机跟进
   			$("#sjzzP").text("--");
   			$("#sjzzS").text("--");
   			$("#zysx").text("(--/--)");//重要事项提醒
   			$("#zysxP").text("--");
   			$("#zysxS").text("--");
   			$("#dqwh").text("(--/--)");//定期问候
   			$("#dqwhP").text("--");
   			$("#dqwhS").text("--");
   			$("#mf").text("(--/--)");//面访
   			$("#mfP").text("--");
   			$("#mfS").text("--");
   			$("#surveyPercent").hide();
    		$("#campaignPercent").hide();
    		$("#clientbusinessPercent").hide();
    		$("#otherbusinessPercent").hide();
    		$("#sjzzP").hide();
    		$("#zysxP").hide();
    		$("#dqwhP").hide();
    		$("#mfP").hide();
		}
		//得分标准
		function sum(){
			var sjzzS = $("#sjzzS").text()*1;
	        var zysxS = $("#zysxS").text()*1;
	        var dqwhS = $("#dqwhS").text()*1;
	        var mfS = $("#mfS").text()*1;
	        var fx = $("#sharePoints").text()*1;
	        var hgfx = $("#hgfx").text()*1;
	        var khts =$("#khts").text()*1;
	        var zgpf = $("#spanScore1").text()*1;
	        var pz = sjzzS+zysxS+dqwhS+mfS+fx+hgfx+khts+zgpf;
	        var result = pz.toString();
			index = result.indexOf(".");
			if(index==-1||result.substr(index+1).length<=2){
				result =  result+'';
			}else{
				result = result.substr(0,index+0)+"";
			}
	        $(".score").text(result+'分');//总分
	        addNumberColor();//改变数字颜色
		}
		function bindClick(){
			$('.section_a').on('click',function(){
				
				if(channelType!="WSM"){
					$("#hdzzsm").hide();
					$("#ywdysm").hide();
					$("#qtsjsm").hide();
					$("#khsjsm").hide();
					$("#zysxsm").show();
					$("#dqwhsm").show();
					$("#sjzzsm").show();
					$("#mfsm").show();
				}else{
					$("#zysxsm").hide();
					$("#dqwhsm").hide();
					$("#sjzzsm").hide();
					$("#mfsm").hide();
					$("#hdzzsm").show();
					$("#ywdysm").show();
					$("#qtsjsm").show();
					$("#khsjsm").show();
				}
				$('.teraction').css('display','block');
				aladdin.page.bounce(false);
				
			})
			$('.section_b').on('click',function(){
				if(channelType!="WSM"){
					$("#ywdcsm").hide();
				}else{
					$("#ywdcsm").show();
				}
				$('.character').css('display','block');
				
				aladdin.page.config({
	              bounce: false,
	              swipe: false,
	              backgroundColor: '#FFFFFF'
	            }, function (err) {
	              if (err) {
	                aladdin.toast.show({ message: err.message });
	              }
	            });
			})
			$('.section_c').on('click',function(){
				$('.comment').css('display','block');
				aladdin.page.bounce(false);
			})
		};
	    openShareScoreHtml = function(){
	    	var umAccount = umdata;
	    	var _date = $('.showDate').text();
	    	var _date = _date.replace('年','').replace('月','');
	    	// 打开分享响应页面
			aladdin.navigator.forward({
			  title: '分享响应',
			  url: '../dutypoints/shareScore.html?umAccount='+umAccount+'&date='+_date,
			  // 默认情况下即是`webapp`，可以不传
			  type: 'webapp',
	
			  //导航头设置
			  header:{
				  visible:true
			  }
			   //如果使用默认的模板，不需要传递
			 //visible tpl: 'default'
			}, function (err) {
			  if (err) {
			    aladdin.toast.show({ message: err.message });
			  }
			});
	
	    }
	    
	    //责任积分跳转各个页面
	    gotoEveryPage = function (actionType) {
        	// 打开创利明细页面
        	//alert('ss');
			var url;
	    	if(actionType=='msgRemind'){
    			url='/sicaih5/dist/module/homepage.html#/TipsList?actionType='+actionType+'&currMonth='+dateTimes;
    		}
    		if(actionType=='msgRegular'){
    			url='/sicaih5/dist/module/homepage.html#/TipsList?actionType='+actionType+'&currMonth='+dateTimes;
    		}
    		if(actionType=='optyCount'){
    			url='/sicaih5/dist/module/homepage.html#/businessOpportunityDetail?actionType='+actionType+'&currMonth='+dateTimes;
    		}
    		if(actionType=='inPersonCust'){
    			url='/sicaih5/dist/module/achievement.html#/faceTracking?actionType='+actionType+'&currMonth='+dateTimes;
    		}
    		if(actionType=='actionOrganize'){
    			url='/sicaih5/dist/module/homepage.html#/ActivityRecord?actionType='+actionType+'&currMonth='+dateTimes;
    		}
    		if(actionType=='salesmanSurvey'){
    			url='/sicaih5/dist/module/homepage.html#/SurveyList?actionType='+actionType+'&currMonth='+dateTimes;
    		}
    		if(actionType=='custOpty'){
    			url='/sicaih5/dist/module/homepage.html#/businessOpportunityDetail?actionType='+actionType+'&currMonth='+dateTimes;
    		}
    		if(actionType=='salesmanOpty'){
    			url='/sicaih5/dist/module/homepage.html#/businessOpportunityDetail?actionType='+actionType+'&currMonth='+dateTimes;
    		}
        	aladdin.navigator.forward({
        		//title: '创利明细',
        		
        		url:url,
        		
        		// 默认情况下即是`webapp`，可以不传
        		type: 'webapp',

        		//导航头设置
        		header:{
        			visible:true
        		}
        		//如果使用默认的模板，不需要传递
        		//visible tpl: 'default'
        	}, function (err) {
        		if (err) {
        			aladdin.toast.show({ message: err.message });
        		}
        	});
        }
	}
	obligation.prototype = {
		init:function(){
			$(function(){
				$('.section_a').on('click',function(){
					
					if(channelType!="WSM"){
						$("#hdzzsm").hide();
						$("#ywdysm").hide();
						$("#qtsjsm").hide();
						$("#khsjsm").hide();
						$("#zysxsm").show();
						$("#dqwhsm").show();
						$("#sjzzsm").show();
						$("#mfsm").show();
					}else{
						$("#zysxsm").hide();
						$("#dqwhsm").hide();
						$("#sjzzsm").hide();
						$("#mfsm").hide();
						$("#hdzzsm").show();
						$("#ywdysm").show();
						$("#qtsjsm").show();
						$("#khsjsm").show();
					}
					$('.teraction').css('display','block');
				var Bbox=$('.customernteractionExplainContainer').height();
				console.log(Bbox)
				var Sbox=$('.showMask1').height();
				console.log(Sbox)
				var marginH=(Bbox-Sbox)/2;
				console.log(marginH)
				$('.showMask1').css('margin-top',marginH+'px');
					aladdin.page.bounce(false);
					
				})
				$('.section_b').on('click',function(){
					if(channelType!="WSM"){
						$("#ywdcsm").hide();
					}else{
						$("#ywdcsm").show();
					}
					$('.character').css('display','block');
				var Bbox=$('.customernteractionExplainContainer').height();
				console.log(Bbox)
				var Sbox=$('.showMask2').height();
				console.log(Sbox)
				var marginH=(Bbox-Sbox)/2;
				console.log(marginH)
				$('.showMask2').css('margin-top',marginH+'px')
					aladdin.page.config({
		              bounce: false,
		              swipe: false,
		              backgroundColor: '#FFFFFF'
		            }, function (err) {
		              if (err) {
		                aladdin.toast.show({ message: err.message });
		              }
		            });
				})
				$('.section_c').on('click',function(){
					$('.comment').css('display','block');
				var Bbox=$('.customernteractionExplainContainer').height();
				console.log(Bbox)
				var Sbox=$('.showMask3').height();
				console.log(Sbox)
				var marginH=(Bbox-Sbox)/2;
				console.log(marginH)
				$('.showMask3').css('margin-top',marginH+'px')
					aladdin.page.bounce(false);
				})
				hiddenCustomernteractionExplainModals = function(){
					$('.teraction').css('display','none');
				}
				hiddenCustomernteractionExplainModal = function(){
					$('.character').css('display','none');
				}
				hiddenCustomernteractionExplainModal1 = function(){
					$('.comment').css('display','none');
				}
			
				
			})
		}
	}
	var oba = new obligation();
	oba.init();
})()