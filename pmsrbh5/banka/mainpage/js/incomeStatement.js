(function(){
	function income(){
		queryResponsePoints = function (){
			var thisURL = document.URL;
			var  getval =thisURL.split('?')[1];
			var datetime= getval.split("=")[1];

			aladdin.loading.start({canCancel:false},function(err) {

				if(err) {
                    aladdin.toast.show({message: '加载进度框显示错误 '});
                }
				});
			aladdin.aike_tool.getTicket(function (err, ticket) {
				if (err && !ticket) {
					aladdin.toast.show({message:'ticket加载错误'});
					// alert("ticket=="+ticket);
				} else {
					initInfo(ticket,'',datetime);
					// initInfo('aa','MENGJIE189','201704');

				}
			});

		};
		//初始化页面信息
		initInfo = function(ticket,umAccount,date){
			aladdinRequestData({
				url:'mainPage/getMonthlyIncome.do',
				type:'post',
				data:{
					'ticket':ticket,
					'umAccount':umAccount,
					'date':date,
					'inputType': 'PB|RM|WSM'


				},
				beforeSend:{
					'brcpEaSessionTicket':ticket
				},
				success:function(err,res){
					aladdin.loading.stop({canCancel:false});
					if(err){
						aladdin.toast.show({message:'请求不成功'});
                        aladdin.loading.stop({canCancel:false});
						return;}
					var result = res.body;
					result = eval('('+result+')');
					if(result.responseCode!="0"){
						if(result.responseCode == "900108"){
							aladdin.toast.show({ message:'用户本月无数据'});
						}else if(result.responseCode == "900120"){
							aladdin.toast.show({ message:'当前月份的用户角色发生变更，请切换到业绩主页查询'});
						}else{
							aladdin.toast.show({ message:'系统错误'});
						}
						return;
					}
					if(result.responseCode == "0") {
						var basicSalarydatas = result.basicSalarydatas;
						var baseLineDates = result.baseLineDates;
						var unitpriceDates = result.unitpriceDates;
						var configInf = result.configInf;
						var isProtection = result.isProtection;
						if(basicSalarydatas != undefined || basicSalarydatas != '' || basicSalarydatas !=null){
							$('#basicSalarydatasRangUppLimit1').text(basicSalarydatas[0].rangUppLimit);//责任积分上限
							$('#basicSalarydatasRangUppLimit2').text(basicSalarydatas[1].rangUppLimit);//责任积分上限
							$('#basicSalarydatasRangUppLimit3').text(basicSalarydatas[2].rangUppLimit);//责任积分上限
							$('#basicSalarydatasRangLowLimit1').text(basicSalarydatas[1].rangLowLimit);//责任积分下限
							$('#basicSalarydatasRangLowLimit2').text(basicSalarydatas[2].rangLowLimit);//责任积分下限
							$('#finishPercent1').text(basicSalarydatas[0].finishPercent);//责任积分下限
							$('#finishPercent2').text(basicSalarydatas[1].finishPercent);//责任积分下限
							$('#finishPercent3').text(basicSalarydatas[2].finishPercent);//责任积分下限
						}

						if(baseLineDates != undefined || baseLineDates != '' || baseLineDates !=null) {

							$('#baseLineDatesRangUppLimit').text(baseLineDates[0].rangUppLimit);//底线分上限
							$('#baseLineNumber').text(baseLineDates[0].baseLineNumber);//底线分
							$('#amount').text(unitpriceDates[0].amount);//积分单价
						}
                        if(configInf != undefined || configInf != '' || configInf !=null){
                            $('#protect1').text(configInf.protect);//保护期关键积分打折
                            $('#protect2').text(configInf.protect);//保护期关键积分打折
                            $('#levelSalary').text(configInf.levelSalary);//职级基本工资
                            $('#zoneCoefficient').text(configInf.zoneCoefficient);//地区系数
                            $('#proportion').text(configInf.proportion);//目前发放比例
                        }
                        if("true"==isProtection){$('.textData').show()}else {$('.textData').hide()};
					}else if((result.responseCode == "1")){
						aladdin.toast.show({message:'系统错误'});
					}else if(result.responseCode == "900108"){

                        aladdin.toast.show({message:'该用户当月无数据'});
                    }

				}

			});

		};
	}
	income.prototype = {
		init:function(){
			$(function(){
				 queryResponsePoints();

				 // initInfo('aa','YUHAO236','201704');

			})
		}
	}
	var IN = new income();
	IN.init();
})()
