(function(){
	function currentdata(){
        
       

		getcurrentData= function(ticket,tempDate,teamFlg,umAccount){
             var dataTemp;
             $('#auliParent').text("");
             $('#liParent').text("");
             
             if(ticket!=""&&ticket!=null){
                    dataTemp = "ticket="+ticket;
                }
             if(umAccount!=""&&umAccount!=null){
                dataTemp = dataTemp+"&umAccount="+umAccount;
                }
                if(date!=""&&date!=null){
                    dataTemp = dataTemp+"&tempDate="+tempDate;
                }
//                var url =  webroot+"parameter/bonusMonthInfApp.do";

                aladdinRequestData({
                	url:'parameter/bonusMonthInfApp.do',
                	type: 'POST',
                	data: {
                		//TODO
                		'ticket':ticket,
                		'tempDate': tempDate,//日期 YYYY-MM/YYYY-MM-DD,
                        'umAccount': umAccount,//ticket,
                        'inputType': 'PB|RM|WSM'

                    },
                	beforeSend:  {
                		//brcpSessionTicket
                		//deviceId
                		
//                		request.setRequestHeader("brcpEaSessionTicket",  ticket);
                		'brcpEaSessionTicket':ticket
                	},
                	success: function(err,res) {
                		 aladdin.loading.stop();
                		if(err){
                			aladdin.toast.show({ message:'加载错误 '});
                			

                			$('.section_a').hide();
                			$('.section_b').hide();   
                			aladdin.loading.stop();
                			return
                			}

                		var result = res.body;
                		result = eval("("+result+")");
                		if(result.responseCode=="900108"){
                			$('#fen').text("--");
                			aladdin.toast.show({ message:'该用户当月无数据 '});

                			$('#diaoduxishu').show();               		
                			return
                			
                		}else if(result.responseCode == "900120"){
                            aladdin.toast.show({ message:'当前月份的用户角色发生变更，请切换到业绩主页查询'});
                        }
                		 
                        $('#auliParent').text("");
                        $('#liParent').text("");
                      
                        var aun = result.bonusMonthInfs;
                        var mun = result.aumInfs;
                        var outOfLint = result.outOfLint;
                        
                        var rangUpLimit = result.complate * 100;
//                		 var channelType =  "WSM";
                        var total = "--";
                        var liChild = "";
                        var auliChild = "";
                        var moun = "";
                        var color = "";
                        var backcolor = "";
                        var lis = "";
                        var channelType = "";
//                		$('#fen').text("");
                        $('#fen').text("--");
                        if(result.responseCode!=0){
                        	$('#liParent').append('<li "><span class="spanTitle">关键积分</span><span class="spanScore"><span class="dataStyle" style="color:#666666;font-size:28px">系数</span></span></li>');
                            $('#auliParent').append('<li "><span class="spanTitle">AUM日均净值(百万)</span><span class="spanScore"><span class="dataStyle" style="color:#666666;font-size:28px">系数</span></span></li>');
                           return
                        }
                        if(result.responseCode==0){
                		if(aun !=null && aun !=undefined && aun !="" ){
                		// alert(2)
                			channelType =  aun[0].channelType;
                			
                		}

                            var update_=result.Stat_data;
                            $('#dateUpdate').text('最近更新日期'+update_);
               //判断用户为角色为PB或RM
                		
                  if(channelType=="PB" || channelType=="RM"){
                	 
                	  $('#diaoduxishu').show();
	                  $('#liParent').append('<li "><span class="spanTitle">关键积分</span><span class="spanScore"><span class="dataStyle" style="color:#666666;font-size:28px">系数</span></span></li>');
	                  $('#auliParent').append('<li "><span class="spanTitle">AUM日均净值(百万)</span><span class="spanScore"><span class="dataStyle" style="color:#666666;font-size:28px">系数</span></span></li>');
                 if(aun!=null && aun.length>0){
                	 if(outOfLint ==null || outOfLint ==undefined || outOfLint ==="" || outOfLint==0){
                		 
                		 $('#liParent').append('<li  style=background:#f6fbff><span class=spanTitle style=color:#f37938><'+rangUpLimit+'%(完成率)<i class="youAreHere"></i></span><span class="spanScore">'
                				 +'<span class="dataStyle">0</span></span></li>');
                		 
                	 }else{
                		 
                		 $('#liParent').append('<li ><span class="spanTitle"><'+rangUpLimit+'%(完成率)</span><span class="spanScore">'
                				 +'<span class="dataStyle">0</span></span></li>');
                	 }
                		 
                  for(var i=0;i<= aun.length-1;i++){
                      var rangLowLimit=aun[i].rangLowLimit;
                      var rangUppLimit=aun[i].rangUppLimit;
                      lis =  "";
                      if(i==0){
                    	  if(aun[0].flag==aun[0].points){
                    		  
                    		  
                    		  color = '#f37938';
                    		  backcolor = "#f6fbff";
                    		  lis = '';
                    		  lis='<i class="youAreHere"></i>'
                    			  liChild = '<li  style=background:'+backcolor+'><span class=spanTitle style=color:'+color+'><'+aun[0].rangUppLimit+''+lis+'</span><span class="spanScore">'
                    			  +'<span class="dataStyle">'+aun[0].points+'</span></span></li>';
                    		  $('#liParent').append(liChild);
                    	  }else{
                    		  lis =  "";
                    		  liChild = '';
                    		  liChild = '<li ><span class="spanTitle">'+'<'+aun[0].rangUppLimit+''+lis+'</span><span class="spanScore">'
                    		  +'<span class="dataStyle">'+aun[0].points+'</span></span></li>';
                    		  $('#liParent').append(liChild);
                    	  }
                      }
                      if(i<aun.length-1 && i>0){
                    	  
                    	  if(aun[i].flag==aun[i].points){
                    		  
                    		  
                    		  lis =  '<i class="youAreHere"></i>';
                    		  color = '#f37938';
                    		  backcolor = "#f6fbff";
                    		  liChild = '<li  style=background:'+backcolor+'><span class="spanTitle" style=color:'+color+'>'+'['+rangLowLimit+','+rangUppLimit+')'+''+lis+'</span><span class="spanScore">'
                    		  +'<span class="dataStyle">'+aun[i].points+'</span></span></li>';
                    		  $('#liParent').append(liChild);
                    		  
                    	  }else{
                    		  lis =  "";
                    		  liChild = '<li ><span class="spanTitle">'+'['+rangLowLimit+','+rangUppLimit+')'+''+lis+'</span><span class="spanScore">'
                    		  +'<span class="dataStyle">'+aun[i].points+'</span></span></li>';
                    		  $('#liParent').append(liChild);
                    		  
                    	  }
                      }
                  }
                  if(i=aun.length-1){
                	  
                    lis =  "";
                    if(aun[i].flag==aun[i].points){


                         lis =  "<i class=youAreHere></i>";
                          color = '#f37938';
                          backcolor = "#f6fbff";
                         liChild = '<li  style=background:'+backcolor+'><span class="spanTitle" style=color:'+color+'>'+'>='+aun[aun.length-1].rangLowLimit+''+lis+'</span><span class="spanScore">'
                         +'<span class="dataStyle">'+aun[aun.length-1].points+'</span></span></li>';
                         $('#liParent').append(liChild);

                    }else{

                        liChild = '<li ><span class="spanTitle">'+'>='+aun[aun.length-1].rangLowLimit+''+lis+'</span><span class="spanScore">'
                        +'<span class="dataStyle">'+aun[aun.length-1].points+'</span></span></li>';
                        $('#liParent').append(liChild);
                    }
                  }
              }
                 if(mun!=null && mun.length>0){

                	
                     if(mun[0].flag==mun[0].points){
                    	 
                       
                          color = '#f37938';
                          backcolor = "#f6fbff";
                          lis='<i class="youAreHere"></i>'
                            auliChild = '<li  style=background:'+backcolor+'><span class=spanTitle style=color:'+color+'><'+mun[0].rangUppLimit+''+lis+'</span><span class=spanScore>'
                              +'<span class="dataStyle">'+mun[0].points+'</span></span></li>';
                          $('#auliParent').append(auliChild);
                      }else{
                    	  lis =  "";

                        auliChild = '<li ><span class="spanTitle">'+'<'+mun[0].rangUppLimit+''+lis+'</span><span class="spanScore">'
                          +'<span class="dataStyle">'+mun[0].points+'</span></span></li>';
                          $('#auliParent').append(auliChild);
                      }

                  for(var i=1;i< mun.length-1;i++){
                      var rangLowLimit=mun[i].rangLowLimit;
                      var rangUppLimit=mun[i].rangUppLimit;
                     lis =  "";
                      if(mun[i].flag==mun[i].points){
                    	 
                    	  
                       
                      
                           lis =  '<i class="youAreHere"></i>';
                           color = '#f37938';
                          backcolor = "#f6fbff";
                          auliChild = '</li><li  style=background:'+backcolor+';><span class="spanTitle" style=color:'+color+'>'+'['+rangLowLimit+','+rangUppLimit+')'+''+lis+'</span><span class="spanScore">'
                          +'<span class="dataStyle">'+mun[i].points+'</span></span></li>';
                          $('#auliParent').append(auliChild);

                      }else{
                    	  lis =  "";
                        auliChild = '<li ><span class="spanTitle">'+'['+rangLowLimit+','+rangUppLimit+')'+''+lis+'</span><span class="spanScore">'
                          +'<span class="dataStyle">'+mun[i].points+'</span></span></li>';
                          $('#auliParent').append(auliChild);

                      }

//               			
                  }
                  if(i=mun.length-1){
                	
                	  if(mun[i].flag==mun[i].points){
                		 
                    lis =  "";
                      
                         lis =  "<i class=youAreHere></i>";
                          color = '#f37938';
                          backcolor = "#f6fbff";
                        auliChild = '<li  style=background:'+backcolor+'><span class="spanTitle" style=color:'+color+'>'+'>='+mun[i].rangLowLimit+''+lis+'</span><span class="spanScore">'
                         +'<span class="dataStyle">'+mun[i].points+'</span></span></li>';
                         $('#auliParent').append(auliChild);

                    }else{
                    	lis =  "";
                    

                        auliChild = '<li ><span class="spanTitle">'+'>='+mun[i].rangLowLimit+''+lis+'</span><span class="spanScore">'
                        +'<span class="dataStyle">'+mun[i].points+'</span></span></li>';
                        $('#auliParent').append(auliChild);
                    }

                  }

                  }
              
               
               
                 if(outOfLint !=null && outOfLint !=undefined && outOfLint !=="" && outOfLint==1){
                	 total =  result.total;
                	 $('#fen').text(total);
                } else if(outOfLint !=null && outOfLint !=undefined && outOfLint !=="" && outOfLint==0){
                	total=0;
                	 $('#fen').text(total);
                	
                }else{
                	
                	 $('#fen').text("--");
                }
                
              
                keyPoints = "";
                aumPoints = "";
               
                  }else if(channelType=="WSM"){
                	  //判断用户为角色WSM
                	  $('#titles_first').text("");
                	  $('#diaoduxishu').hide();
                	  $('#titles_first').text("目前系数=月度奖励系数");
                	 
                      $('#liParent').append('<li ><span class="spanTitle">关键积分</span><span class="spanScore"><span class="dataStyle" style="color:#666666;font-size:28px">系数</span></span></li>');

                     if(aun!=null && aun.length>0){
                    	 var outNum=0;
                    	 if(outOfLint !=null && outOfLint !=undefined && outOfLint !=="" && outOfLint==0){
                    		 $('#liParent').append('<li  style=background:#f6fbff><span class=spanTitle style=color:#f37938><'+rangUpLimit+'%(完成率)<i class="youAreHere"></i></span><span class="spanScore">'
                    				 +'<span class="dataStyle">'+outNum+'</span></span></li>');
                    	 }else{

                    		 $('#liParent').append('<li ><span class="spanTitle"><'+rangUpLimit+'%(完成率)</span><span class="spanScore">'
                    				 +'<span class="dataStyle">'+outNum+'</span></span></li>');


                    	 }
                      if(aun[0].flag==aun[0].points){


                          color = '#f37938';
                          backcolor = "#f6fbff";
                          lis = '';
                          lis='<i class="youAreHere"></i>'
                              liChild = '<li  style=background:'+backcolor+'><span class=spanTitle style=color:'+color+'><'+aun[0].rangUppLimit+''+lis+'</span><span class="spanScore">'
                              +'<span class="dataStyle">'+aun[0].points+'</span></span></li>';
                          $('#liParent').append(liChild);
                      }else{
                    	  lis =  "";
                    	  liChild = '';
                          liChild = '<li ><span class="spanTitle">'+'<'+aun[0].rangUppLimit+''+lis+'</span><span class="spanScore">'
                          +'<span class="dataStyle">'+aun[0].points+'</span></span></li>';
                          $('#liParent').append(liChild);
                      }
                      

                      for(var i=1;i< aun.length-1;i++){
                          var rangLowLimit=aun[i].rangLowLimit;
                          var rangUppLimit=aun[i].rangUppLimit;
                          lis =  "";
                          if(aun[i].flag==aun[i].points){


                               lis =  '<i class="youAreHere"></i>';
                               color = '#f37938';
                              backcolor = "#f6fbff";
                              liChild = '<li  style=background:'+backcolor+'><span class="spanTitle" style=color:'+color+'>'+'['+rangLowLimit+','+rangUppLimit+')'+''+lis+'</span><span class="spanScore">'
                              +'<span class="dataStyle">'+aun[i].points+'</span></span></li>';
                              $('#liParent').append(liChild);

                          }else{
                        	  lis =  "";
                              liChild = '<li ><span class="spanTitle">'+'['+rangLowLimit+','+rangUppLimit+')'+''+lis+'</span><span class="spanScore">'
                              +'<span class="dataStyle">'+aun[i].points+'</span></span></li>';
                              $('#liParent').append(liChild);

                          }
                      }
                      if(i=aun.length-1){

                        lis =  "";
                        if(aun[i].flag==aun[i].points){


                             lis =  "<i class=youAreHere></i>";
                              color = '#f37938';
                              backcolor = "#f6fbff";
                             liChild = '<li  style=background:'+backcolor+'><span class="spanTitle" style=color:'+color+'>'+'>='+aun[aun.length-1].rangLowLimit+''+lis+'</span><span class="spanScore">'
                             +'<span class="dataStyle">'+aun[aun.length-1].points+'</span></span></li>';
                             $('#liParent').append(liChild);

                        }else{

                            liChild = '<li ><span class="spanTitle">'+'>='+aun[aun.length-1].rangLowLimit+''+lis+'</span><span class="spanScore">'
                            +'<span class="dataStyle">'+aun[aun.length-1].points+'</span></span></li>';
                            $('#liParent').append(liChild);
                        }
                      }
                  }


                     if(outOfLint !=null && outOfLint !=undefined && outOfLint !=="" && outOfLint==1){
                    	 total =  result.total;
                    	 $('#fen').text(total);
                    } else if(outOfLint !=null && outOfLint !=undefined && outOfLint !=="" && outOfLint==0){
                    	total=0;
                    	 $('#fen').text(total);
                    	
                    }else{
                    	
                    	 $('#fen').text("--");
                    }


                     keyPoints = "";
                     aumPoints = "";
                  }
                   }else{
                	   $('#diaoduxishu').show();
                	   $('#auliParent').text("");
                       $('#liParent').text("");
                       $('#fen').text("--");
                       
                       $('#liParent').append('<li "><span class="spanTitle">关键积分</span><span class="spanScore"><span class="dataStyle" style="color:#666666;font-size:28px">系数</span></span></li>');
                       $('#auliParent').append('<li "><span class="spanTitle">AUM日均净值(百万)</span><span class="spanScore"><span class="dataStyle" style="color:#666666;font-size:28px">系数</span></span></li>');

                   }

                    }
                   
               });


}


	}
	
	currentdata.prototype = {
		init:function(){
			$(function(){
        aladdin.page.bounce(false);
		        $('.section_a').on('click',function(){
                   $('.teraction').css('display','block');
        		})
		        $('.section_b').on('click',function(){
		            $('.character').css('display','block');
		        })
		        $('.section_c').on('click',function(){
		            $('.qualityMask').css('display','block');
		        })
		        hiddenCustomernteractionExplainModal1 = function(){
		            $('.teraction').css('display','none');
		        }
		        hiddenCustomernteractionExplainModal2 = function(){
		            $('.character').css('display','none');
		        }
		        hiddenCustomernteractionExplainModal3 = function(){
		            $('.qualityMask').css('display','none');
		        }
		       
		        
		        queryResponsePoints = function (tempDate,teamFlg,umAccount) {
		            aladdin.loading.start({canCancel: false}, function (err) {
		            	if(err){
		            		aladdin.toast.show({message: '加载进度框显示错误 '});
		            	}
		            });
		            aladdin.aike_tool.getTicket(function (err, ticket) {
		                if (err && !ticket) {
		                    aladdin.toast.show({message: err.message});
		                    // alert("ticket=="+ticket);
		                } else {
		                  
		                    aladdin.aike_tool.getAccount(
		                        function (error, account) {
		                          
		                            //alert("account:"+account);
		                        }
		                    );
		                    getcurrentData(ticket,tempDate,teamFlg,umAccount);
		                }
		            });
		        }
		        
		        /*queryResponsePoints = function (date) {
	        	 aladdin.loading.start({canCancel: false}, function (err) {
	                 aladdin.toast.show({message: '加载进度框显示错误 '});
	             });
	            // getcurrentData("44441", "YUHAO236", date);
	            // getcurrentData("44441", "CHENJIJIE", date);
	            // getcurrentData("44441", "WSMTEST001", date);
	            getcurrentData("3333", "", date);
	            }*/
        
       
			})
		}
	}
	var current = new currentdata();
	current.init();
})()



