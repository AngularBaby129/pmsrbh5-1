/**
 * 
 *日期控制js文件
 *@author by..
 */
		
(function(){
	function commonJS(){
		//设置全局变量
		var data = {date:'',year:0,month:0,day:0,};
		var name = '';
		//初始化日期
		init = function(){
//			
//			var thisURL = document.URL;
//			var  getval =thisURL.split('?')[1];
//			var datetime= getval.split("=")[1];
			
			
			var datetime = getQueryMap("dateTime");
			var name = getQueryMap("name");
			nameNow = decodeURI(decodeURI(name));
			teamFlg = getQueryMap('teamFlg');
			umAccount = getQueryMap('umAccount');

			var date = new Date();
			    data.year = date.getFullYear();
			    data.month = date.getMonth()+1;
			    data.day = date.getDate();
			    var month = data.month.toString();
			    if(month.length == 1){month = '0'+month}
			    data.date = data.year+'年' + month+'月';
			    
			    var tempDate;
			    if(datetime != null && datetime != '' && datetime != undefined){
                    data.year = datetime.substring(0,4);
                    data.month = datetime.substring(4,6);
                    data.date = data.year+'年'+data.month+'月';
			    	tempDate = datetime
			    }else{
			    	tempDate = data.year + month;
			    }
            $('.dateText').text(data.date);
			    queryResponsePoints(tempDate,teamFlg,umAccount);
			    if(data.year == date.getFullYear()){
			        if(data.month == date.getMonth()+1){
			        	$('.rightSelect').find('img').attr('src','../images/unclick.png');
			        	$('.rightCon').find('img').attr('src','../images/unclick.png')
			        };
			        
		        };
		   	if(nameNow != '' && nameNow != null && nameNow != undefined && nameNow != 'null' && nameNow !='undefined'){
				$('.rightSelect').find('img').attr('src','../images/unclick.png');
		        	$('.rightCon').find('img').attr('src','../images/unclick.png');
		        	$('.leftSelect').find('img').attr('src','../images/leftArrowunclick.png');
		        	$('.leftButton').find('img').attr('src','../images/leftArrowunclick.png')
			}
		}
		
	
			leftDateSelect = function (){
				if(nameNow == '' && nameNow == null && nameNow == undefined && nameNow == 'null' && nameNow =='undefined')return;
                var date = new Date(data.year,data.month-1,data.day);
		        date.setMonth(date.getMonth()-1);
		        data.year = date.getFullYear();
		        data.month = date.getMonth()+1; 
		        data.day = date.getDate();
		        updateDisplay();
		        console.log(data.year+'/'+data.month+'/'+data.day);
		        
		        $('.rightSelect').find('img').attr('src','../images/rightArrow.png');
            	if(data.year < new Date().getFullYear()){
            		  $('.rightCon').find('img').attr('src','../images/rightArrow.png');
            	}
			}
            rightDateSelect = function (){ 
            	if(nameNow == '' && nameNow == null && nameNow == undefined && nameNow == 'null' && nameNow == 'undefined')return;
            	var date = new Date(data.year,data.month-1,data.day);
		        date.setMonth(date.getMonth()+1);
		        data.year = date.getFullYear();
		        data.month = date.getMonth()+1;
		        data.day = date.getDate();
		        var nowDate = new Date();
		        if(data.year == nowDate.getFullYear()){
			        if(data.month > nowDate.getMonth()+1){
			        	data.month = nowDate.getMonth()+1;
                        $('.rightSelect').find('img').attr('src','../images/unclick.png');
			        }else if (data.month == nowDate.getMonth()+1){
                        $('.rightSelect').find('img').attr('src','../images/unclick.png');
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
            //计算中间格子宽度(month)
			itemWidth = function (){
			        return 600/4-10;
			      };
			    //当月选中月份
              months = function (){
                    $(".monthList").find('div').remove();
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
				        var items = retArr;
				        var itemwidth = itemWidth();
				        var itemHeight = itemWidth();
				        $.each(items, function(i,item) {
				        	var monthUntil = "<div style=width:"+itemwidth+"px;height:"+itemHeight+"px;float:left;margin:5px; class=contenter onclick=selectMonth("+i+")><div  onclick=cancelButtonAction() class=contenter style=color:"+item.textColor+";background:"
				        	+item.color+";width:100px;height:100px;border-radius:100%>"+item.value+"</div></div>";
	              		$(".monthList").append(monthUntil);
				        });
			      };
			      //更新数据
            	updateDisplay = function (){
					//清空数据
            		      		
            		$(".monthList").find('div').remove();
			        var month = data.month.toString();
			        if(month.length == 1)
			        {
			          month = '0'+month;
			        }
			        var dateText = data.year+'年' + month+'月';
			        $(".dateText").text(dateText);
			        var temDate = data.year+month;
			        console.log(temDate);
			        queryResponsePoints(temDate,teamFlg,umAccount);
			        months();
			     };
      			
			    leftButtonAction = function (){
			    		if(name)return;
			       // alert('left');
			        data.year -=1;
			         $('.rightSelect').find('img').attr('src','../images/rightArrow.png');
			         $('.rightCon').find('img').attr('src','../images/rightArrow.png');
			        updateDisplay();
			      };
			    rightButtonAction = function (){
			        //alert('right');
			        if(name)return;
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
			    selectMonth = function(item) {
			        data.month = item+1;
			        var nowDate = new Date();
			        if(data.year == nowDate.getFullYear()){

				        if(item  >= nowDate.getMonth()){
				        	data.month = nowDate.getMonth()+1;
				        	  $('.rightSelect').find('img').attr('src','../images/unclick.png');
                              $('.rightCon').find('img').attr('src','../images/unclick.png');
				        }else{

                             $('.rightSelect').find('img').attr('src','../images/rightArrow.png');
                             $('.rightCon').find('img').attr('src','../images/rightArrow.png');
				        }

			        }
			        updateDisplay();
			
			      };
			      //隐藏日期组件
			    cancelButtonAction = function (){
			      	$('.modal').hide();
			    };


				
	}
	commonJS.prototype = {
		init:function(){
			$(function(){
				
				init();
				$('.showDate').on('click',function(){
					$('.modal').show();
					months();
				})
								
			})
		}
	}
	var common = new commonJS();
		common.init()
})()



