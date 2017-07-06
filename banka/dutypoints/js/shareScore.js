/**
 * Created by .. on 2017/4/12.
 */
(function(){
	function weekList(){
		var umAccont,quotaId,ticket;
		var pointColors = [];
		var pointData = [];
		var obj = {
	    	screenWidth : 742,//屏幕宽度
	        screenHeight : 400,
		    itemDayHeight : 60,
		    		
		};
		var rightButtonCallback  = function(){
			aladdin.navigator.forward({
				title: '问题反馈',
				url: '/sicaih5/dist/module/mine.html#/interactiveDtail?dateTime='+data.year+'-'+data.month,
				// 默认情况下即是`webapp`，可以不传
				type: 'webapp',
				header:{
					visible:true
				}
				// 如果使用默认的模板，不需要传递
			}, function (err) {
				if (err) {
					aladdin.toast.show({ message: err.message });
				}
			})
		};
		rightButtonCallback.keep=true;
		var opts = {
			title:"分享响应",
			color:"#000000",
			backgroundColor:"#FFFFFF",
			fontSize:'16px',
			underlineVisible:true,
			leftButtonVisible:true,
			leftButtonText:'',
			leftButtonFontSize: '16px',
			rightButtonVisible:true,
			rightButtonTextColor:"#34a1fc",
			rightButtonText:"明细",
			rightButtonFontSize: '16px',
			rightButtonBackgroundColor:"#ffffff",
			leftButtonIcon:"/sicaih5/dist/static/back.png",
			leftButtonCallback:function(){aladdin.navigator.back()},
			rightButtonCallback:rightButtonCallback

		};
		aladdin.header.config(opts,function(err){
			if (err) {
				aladdin.toast.show({ message:err.message });
			}
		});
		init = function(){
			var date = new Date();
//			    data.year = date.getFullYear();
//			    data.month = date.getMonth()+1;
//			    data.day = date.getDate();
//			    if(data.month<10){month = '0'+data.month}
//			    data.date = data.year + month;
//			    var temp = data.year+'年' + month +'月';
////			    $('.dateText').text(data.date);
//			    $('.dateText').text(temp);
//			    updateDisplay();
			 function getQueryString(name) {
				    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
				    var r = window.location.search.substr(1).match(reg);
				    if (r != null) {
				        return unescape(r[2]);
				    }
				    return null;
				}			 
				umAccont = getQueryString("umAccount");
				data.date = getQueryString("date");
				var temp = data.date;
				data.year = temp.substring(0,4);
				data.month = temp.substring(4,6);
				data.day = date.getDate();
//				temp = temp.substring(0,4)+"年" +temp.substring(4,6)+"月"
//				$('.dateText').text(temp);
			    updateDisplay();
				if(data.year == date.getFullYear()){
			        if(data.month == date.getMonth()+1){
			        	$('.rightSelect').find('img').attr('src','../images/unclick.png')
			        	
			        	$('.rightCon').find('img').attr('src','../images/unclick.png')
			        };
			        
		        };
		}

	
		    mounted = function(){
		    	console.log('***************', this.pointColors);
		        this.year =  this.newdate.year;
		        this.month = this.newdate.month;
		        this.day = this.newdate.day;
		        this.currentDay = this.day;
				// debugger;
		        this.updateDisplay();
		
		      //console.log("==>"+this.year+'/'+this.month+'/'+this.day);
				};
				
			methods = function(){
					
			};
			pointData = function (days){                  
                var colors = new Array();
                    for(var i = 0; i < days; i++)
                      {
                          colors.push({'day':i,'point':0,'col':'#d4d4d4'});
                      }

                      
                      return colors; 
          };	
			updateDisplay = function(){
				//清空日历列表
            	$(".monthList").find('div').remove();
            	$("#weekList").find('div').remove();
            	$(".dayList").find('div').remove();
            	
				 //刷新数据
				$.each(data.weeks, function(i,item) {
			        var monthUntil = "<div class=containerDate style=width:"+data.itemDayWidth+"px;height:"+data.itemDayWidth+"px;float:left;margin:5px;background-color:transparent>"
                +"<div class=containerDate style=width:72px;height:72px;font-size:1.5rem>"+item+"</div></div>";
              		$("#weekList").append(monthUntil);
              });
              var items = months();
              var itemMonthWidth = itemMonthWidths();
              $.each(items, function(i,item) {
			        	var monthUntil = "<div style=width:"+itemMonthWidth+"px;height:"+itemMonthWidth+"px;float:left;margin:5px; class=contenter onclick=selectMonth("+i+")><div  class=contenter style=color:"+item.textColor+
			        	";background:"+item.color+";width:100px;height:100px;border-radius:100%>"+item.value+"</div></div>";
              		$(".monthList").append(monthUntil);
			        });
			  if(data.year == new Date().getFullYear()){
			        if(data.month == new Date().getMonth()+1){
			        	$('.rightSelect').find('img').attr('src','../images/unclick.png')
			        	
			        	$('.rightCon').find('img').attr('src','../images/unclick.png')
			        };
			        
		        };
		        
		        var month = data.month.toString();
		        if(month.length == 1)
		        {
		          month = '0'+month;
		          //data.month = '0'+month;
		        }
		        var day = data.day.toString();
		        if(day.length == 1)
		        {
		          day = '0'+day;
		        }
		        data.date = data.year + month;
			    var temp = data.year+'年' + month +'月';
		        $('.dateText').text(temp);
		        var nowTime = data.year + month; 
		        aladdin.aike_tool.getTicket(function (err, ticket) {
		        	if (err && !ticket) {
                    aladdin.toast.show({ message:'获取ticket失败' });
                   // alert("ticket=="+ticket);
		        	} else {
		        		searchDayScore(ticket,'',data.date,'Q011100');
		        	}
		        })
		        //searchDayScore('123456',umAccont,data.date,'Q011100');
		        
			};
			
			
			leftDateSelect = function (){
                var date = new Date(data.year,data.month-1,data.day);
		        date.setMonth(date.getMonth()-1);
		        data.year = date.getFullYear();
		        var monthString = date.getMonth()+1;
		        if(monthString.toString().length == 1){
		        		data.month = '0' + monthString;
		        }
		        data.day = date.getDate();
		        updateDisplay();
		        console.log(data.year+'/'+data.month+'/'+data.day);
		        $('.rightSelect').find('img').attr('src','../images/rightArrow.png')
            }
            rightDateSelect = function (){ 
            	var date = new Date(data.year,data.month-1,data.day);
		        date.setMonth(date.getMonth()+1);
		        data.year = date.getFullYear();
		        var monthString = date.getMonth()+1;
		        if(monthString.toString().length == 1){
		        		data.month = '0' + monthString;
		        }
		        data.day = date.getDate();
		        var nowDate = new Date();
		        if(data.year == nowDate.getFullYear()){
			        if(data.month > nowDate.getMonth()+1){
			        	data.month = nowDate.getMonth()+1;
                        $('.rightSelect').find('img').attr('src','../images/unclick.png');
			        }else if (data.month == nowDate.getMonth()+1){
                        $('.rightSelect').find('img').attr('src','../images/unclick.png');
                        data.day = new Date().getDate();
                        updateDisplay();
                    }else {
                        updateDisplay();
                    };
			        
		        }else {
                    updateDisplay();
                };
		        console.log(data.date);
		        console.log(data.year+'/'+data.month+'/'+data.day);

            }
		    leftButtonAction = function (){
			       // alert('left');
			        data.year -=1;
			        $('.rightCon').find('img').attr('src','../images/rightArrow.png');
			        updateDisplay();
			      };
		    rightButtonAction = function (){
			        //alert('right');
		    	data.year +=1;
		        var nowDate = new Date();
				if(data.year >=nowDate.getFullYear()){
	        		data.year = nowDate.getFullYear();
		        	if(data.month == nowDate.getMonth()+1){
		        		$('.rightSelect').find('img').attr('src','../images/unclick.png');
                        $('.rightCon').find('img').attr('src','../images/unclick.png');
		        	}
	        };
	        	if(data.year == nowDate.getFullYear()){
	        	  if(data.month >= nowDate.getMonth()+1){
		        	data.month = nowDate.getMonth()+1;
		        };
	        	};
                if(data.year <= nowDate.getFullYear()) {
                    updateDisplay();
                }
			      };
		    selectedItemAction = function(item){
		    	console.log(item);
		        var validDay = new Date().getDate();
				var validMonth = new Date().getMonth()+1;
				var validYear = new Date().getFullYear();
				if(data.year==validYear){
					if(data.month == validMonth){
						if(item >= validDay){
							return;
						}
					}
				}
				if(data.month.length == 1){
					data.month = '0' + data.month;
				}
				if(item.toString().length == 1)
				{
					data.day = '0'+item;
				}else{
					data.day = item;
				}
				var dateTime = data.year +'-'+data.month+'-'+data.day;
				aladdin.navigator.forward({
					title: '分享明细',
					url: '/sicaih5/dist/module/mine.html#/interactiveDtail?dateTime='+dateTime,
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
      	};
      		
		    cancelButtonAction = function(){
		       
				$('.modal').css('display','none');
		     };
		    
		    //计算中间格子宽度(month)
			itemMonthWidths = function (){
			    return 600/4-10;
			    };
		    
		    itemwidth = function(){
		         //5=margin,14 = 6*2+左右两个,7=是一衄1�7�1�7
		        return parseInt((obj.screenWidth-14*5)/7);
		     };
		      
		    itemDayWidth = function(){
		          //6=margin+选中的红圄1�7,14 = 6*2+左右两个,7=是一衄1�7�1�7
		        var retValue = (obj.screenWidth-14*6)/7;
		        return parseInt(retValue);
		     };
		      
		    itemDayHeight = function(){
		        return obj.itemDayHeight;
		     };
		      
		    daysCanvaseHeight = function(){
		        return obj.itemDayHeight*6;
		     };
		      
		    canvaseHeight = function(){
		        return obj.itemDayHeight*6+120;
		     };
		    
    		months = function (){
		        var retArr = new Array();
		        var nowDate = new Date();
		        for(var i = 0; i < 12; i++)
			        {	
			        	if(data.year == nowDate.getFullYear())
				        	{
				        		if(i > nowDate.getMonth()){
					        		retArr.push({
						              value:i+1,
						              color:'transparent',
						              textColor:'rgb(211,211,211)',
					            	});
						        	}else if(i== data.month-1){
						        		//当前选中月
							            retArr.push({
							              value:i+1,
							              color:'rgba(75,165,250,1)',
							              textColor:'white',
							            });
							          }else {
							          retArr.push({
							            value:i+1,
							            color:'transparent',
							            textColor:'black' ,
							          });
							          }
							}else{
							   if(i== data.month-1){
						        		//当前选中月
							            retArr.push({
							              value:i+1,
							              color:'rgba(75,165,250,1)',
							              textColor:'white',
							            });
							          }else{
							          retArr.push({
							            value:i+1,
							            color:'transparent',
							            textColor:'black' ,
							          });
							          }
							    }
		        }
		        return retArr;
		      };
			
			selectMonth = function (item) {
                //alert(item.value);
                var itens = item+1;
                if(itens.toString().length == 1){
                	data.month = '0' + itens;
                }
			        var nowDate = new Date();
			        if(data.year == nowDate.getFullYear()){
			        	
				        if(item  > nowDate.getMonth()){
				        	data.month = nowDate.getMonth()+1;
				        	
				        }else if(item == nowDate.getMonth()){
				        		data.day = new Date().getDate();
				        }
				       
			        }
			    updateDisplay();
		        cancelButtonAction();
            },
			
		    daysOfMonth = function(days){
		        //当前月的朄1�7大天敄1�7
		         // debugger;
//		        var  days = new Date(data.year,data.month,0).getDate();

				var daysArr = new Array();
		
		          //console.log('->>month:'+this.month + 'day:'+this.day);
		        //当前朄1�7�星期几
		        var date = new Date(data.year,data.month-1,1);
		        var week = date.getDay() ;
		          data.week = week;
		        for(var i = 0; i < week; i++)
		        {
		          daysArr.push(
		            {
		              fontColor:'transparent',
		              borderColor:'transparent',
		              value:i+1,
		              valid:false,
		              color:'transparent',
		              pointColor:'',
		            });
		        }
		        
		        for(var i = 0; i < days; i++)
		        {
		            var fontColor = '#999999';
					var borderColor = '';
		          //小点的颜艄1�7
					
		            var pointColor = pointColors[i].col;
		            var date = new Date();
		            var year = date.getFullYear();
		             year = year.toString();
		            var month = date.getMonth()+1;
		             month = month.toString();
			        if(month.length == 1)
			        {
			          month = '0'+month;
			        }
		            var day = date.getDate();
		            var tatal =year+month+day;
		            var tatalData = data.year+data.month+data.day;
//		            if(data.year > year)
//			          {
//			            fontColor = 'rgb(211,211,211)';
//			            pointColor = 'rgb(255,255,255,0)';
//			            borderColor = 'transparent';
//			          }else{
//			          	borderColor = 'transparent';
//			          }
			          if(data.year == year){
							if(data.month > month){
								fontColor = 'rgb(211,211,211)';
					            pointColor = 'rgb(255,255,255,0)';
					            borderColor = 'transparent';
								}else{
									borderColor = 'transparent';
								}
							if(data.month == month){
							if( i > date.getDate()-1){
								fontColor = 'rgb(211,211,211)';
					            pointColor = 'rgb(255,255,255,0)';
					            borderColor = 'transparent';
							}else if(i == data.day-1){
								borderColor = '#34a1fc';
								pointColor = 'transparent'
							}
						}
						}else{
							borderColor = 'transparent';
						}
			       daysArr.push({
		                fontColor:fontColor,
		                borderColor:borderColor,
		                value:i+1,
		                valid:true,
		                color:'blue',
		                pointColor:pointColor
		            });
		        }
		        var pointLeft=(data.itemDayWidth - 10)/2;
  		        this.dayItems = daysArr;
  				$.each(daysArr,function(i,item){
  					var itemDay = "<div onclick=selectedItemAction("+item.value+") class=containerDate style=color:"+item.fontColor+";width:"+data.itemDayWidth+"px;height:"+data.itemDayHeight+"px;position:relative;float:left;margin:5px>"+
  			              "<div class=containerDate style=fontSize:1.4rem;left:2px;width:72px;height:72px;background:transparent;border-radius:100%;border-width:1px;border-style:solid;border-color:"+item.borderColor+";>"+
  			              item.value+"</div><div style=background:"+item.pointColor+";margin-top:20px;width:10px;height:10px;border-radius:5px;position:absolute;bottom:5px;left:"+pointLeft+"px></div></div>";
  					$('.dayList').append(itemDay);
  				})
		      }
	    
		
		var data = {
			msg: '日期选择',
			weeks: ['日','一','二','三','四','五','六'],
			week: 0,
			dayItems:[],
			width:obj.screenWidth,
			height:obj.screenHeight,
			daysHeight:daysCanvaseHeight(),
			itemwidth:itemwidth(),
			itemDayWidth:itemDayWidth(),
			itemDayHeight:itemDayHeight(),
			
	//		        imgurlLeft:("../images/leftArrow.png"),
	//		        imgurlRight:require("../images/rightArrow.png"),
			date:'',
			year:0,
			month:0,
			day:0,
			currentDay:0,
		}
	    searchDayScore = function (ticket,umAccount,date,quotaId){
			var dataTemp = 0;
			aladdinRequestData({
				type:"POST",
				url: "dutyPoints/listShareDetails.do",
				data:{
					'ticket':ticket,
					'umAccount':umAccount,
					'date':date,
					'quotaId':quotaId,
					'inputType': 'PB|RM|WSM'

				},
				beforeSend:{
					//request.setRequestHeader("brcpEaSessionTicket",  ticket);
					'brcpEaSessionTicket':ticket
				},
				success:function(err,res){
					var  days = new Date(data.year,data.month,0).getDate();
					pointColors = pointData(days);
					if(err){
						aladdin.toast.show({ message:'请求数据错误'});
						aladdin.loading.stop();
						daysOfMonth(days);
						}
					var result = res.body;
					$('#allScore').text('--');
					if(result==""){
						daysOfMonth(days);
						return;
					}
					result = eval("("+result+")");
					
					console.log(result);
					if(result.responseCode!="0"){
		          		//alert("========="+result.responseCode);
						daysOfMonth(days);
		          	}else{
		          		var list = result.listShareDetails;
		          	 	if(list==undefined||list==""||list==null){
		          	 		$(".score").text('--');
		          	 		daysOfMonth(days);
		          	 		}else{
		          	 			var score = 0;		          	 			
		          	 			for(var i = 0;i<list.length;i++){
		          	 				 dataTemp = list[i].sharePoints;
		          	 				score = score + dataTemp;
		          	 				 day = list[i].statDate;
		          	 				 var newDay = parseInt(day.substring(6,8));
		          	 				
//		          	 				 pointColors[12].point = 2;
//		          	 				 pointColors[newDay].point == 1?pointColors[newDay].col = '#ff5f66':pointColors[newDay].col = '#34a1fc';
		          	 				if(0==dataTemp){
		          	 					pointColors[newDay-1].col = '#d4d4d4';
		        					}else if(dataTemp == 1){
		        						pointColors[newDay-1].col = '#ff5f66';
		        					}else if(dataTemp > 1){
		        						pointColors[newDay-1].col = '#34a1fc';
		        					}
//			          	 			
			          	 			}
		          	 			$(".score").text(result.sumScore+"分");
		          	 			daysOfMonth(days);
		          	 			}
		               	 }
					
					
				}
			
			})
	}
	}
	weekList.prototype = {
		init : function(){
			$(function(){
				init();
				//点击事件
//				var urlData = getQueryMap();
//				alert(urlData)
			$('.showDate').on('click',function(){
				$('.modal').show();
				});
			
			})
		}
	}
	
	

	var week = new weekList();
	week.init();
})()