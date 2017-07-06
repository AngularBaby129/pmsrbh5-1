(function(){
	function depositbenifits(){
		//数据查询
		/*queryResponsePoints = function(dateTime){
			salesInf("121","ZHANGSHANSHAN1097",dateTime);//WSM奖励积分 03you"YWF"
		}*/

		var thisURL = document.URL;
		var  getval =thisURL.split('?')[1];
		var datetime= getval.split("=")[1];

		var umAccount="";
		var rijunLinkFlg,yiciLinkFlg,daeLinkFlg;
			aladdin.loading.start({canCancel: false}, function (err) {
				aladdin.toast.show({message: '加载进度框显示错误 ' + err.code});
			});

			 aladdin.aike_tool.getTicket(function (err, ticket) {
			 	if (err && !ticket) {
			 		aladdin.toast.show({message: err.message});
			 		// alert("ticket=="+ticket);
			 	} else {

			 		aladdin.aike_tool.getAccount(
			 			function (error, account) {
			 				umAccount = account;
			 				//alert("account:"+account);
			 			}
			 		);
			 		salesInf(ticket, "", datetime);
			 	}
			 });
					 //salesInf("5555", "YUPEIYIN148", datetime);

//投资理财创利
		function salesInf(ticket,umAccount,date){


			var dataTemp;
			if(ticket!=""&&ticket!=null){
				dataTemp = "ticket="+ticket;
			}
			if(umAccount!=""&&umAccount!=null){
				dataTemp = dataTemp+"&umAccount="+umAccount;
			}
			if(date!=""&&date!=null){
				dataTemp = dataTemp+"&date="+date;
			}

			aladdinRequestData({

				type: 'POST',
				url: "salesPoints/selProjectInfList.do",
				data: {
					//TODO
					'ticket':ticket,
					'umAccount': umAccount,//ticket,
					'date': date,//日期 YYYY-MM/YYYY-MM-DD,
					'inputType': 'PB|RM|WSM'

				},
				beforeSend:  {

					'brcpEaSessionTicket':ticket
				},
				success: function(err,res) {

					aladdin.loading.stop();
					if(err){aladdin.toast.show({ message:'加载错误 '});}
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
						return;
					}
					var selProjectInf =	result.selProjectInf;
					// console.log(selProjectInf);
					// alert(selProjectInf)
					rijunLinkFlg = result.rijunLinkFlg;
					yiciLinkFlg = result.yiciLinkFlg;
					daeLinkFlg = result.daeLinkFlg;

					var update_=result.Stat_data;
					$('#dateUpdate').text('最近更新日期'+update_);

					if(selProjectInf !=null && selProjectInf !=undefined && selProjectInf!="" && selProjectInf.length>=0){
						for(var i=0; i< selProjectInf.length;i++){
							var invest=selProjectInf[0];
							////保本理财
							
						 
							if(invest.BREAK_EVEN==undefined||invest.BREAK_EVEN==null || invest.BREAK_EVEN===""){
								$('#baoben').text("--");
							}else {
								$('#baoben').text((invest.BREAK_EVEN).toString()+'元 >');
							}//非保本理财
							if(invest.NON_BREAK_EVEN==undefined||invest.NON_BREAK_EVEN==null || invest.NON_BREAK_EVEN===""){
								$('#feibaoben').text("--");
							}else {
								$('#feibaoben').text((invest.NON_BREAK_EVEN).toString()+'元 >');
							}//日均资管
							if(invest.AVG_CAPITAL_MANAGE==undefined||invest.AVG_CAPITAL_MANAGE==null || invest.AVG_CAPITAL_MANAGE===""){
								$('#daymoney').text("--");
							}else {
								$('#daymoney').text((invest.AVG_CAPITAL_MANAGE).toString()+'元 >');
							}//一次性资管
							if(invest.ONCE_CAPITAL_MANAGE==undefined||invest.ONCE_CAPITAL_MANAGE==null || invest.ONCE_CAPITAL_MANAGE===""){
								$('#disposable').text("--");
							}else {
								$('#disposable').text((invest.ONCE_CAPITAL_MANAGE).toString()+'元 >');
							}//基金
							if(invest.FUNDS==undefined||invest.FUNDS==null || invest.FUNDS===""){
								$('#fund').text("--");
							}else {
								$('#fund').text((invest.FUNDS).toString()+'元 >');
							}
							//黄金
							if(invest.GOLD==undefined||invest.GOLD==null || invest.GOLD===""){
								$('#gold').text("--");
							}else {
								$('#gold').text((invest.GOLD).toString()+'元 >');
							}
							//券商理财
							if(invest.SECURITY_FINANCING==undefined||invest.SECURITY_FINANCING==null || invest.SECURITY_FINANCING===""){
								$('#juanshang').text("--");
							}else {
								$('#juanshang').text((invest.SECURITY_FINANCING).toString()+'元 >');
							}//银保
							if(invest.BANK_INSURANCE==undefined||invest.BANK_INSURANCE==null || invest.BANK_INSURANCE===""){
								$('#moneyprotect').text("--");
							}else {
								$('#moneyprotect').text((invest.BANK_INSURANCE).toString()+'元 >');
							}//结构性产品
							if(invest.STRUCTURED_PRODUCTS==undefined||invest.STRUCTURED_PRODUCTS==null || invest.STRUCTURED_PRODUCTS===""){
								$('#struture').text("--");
							}else {
								$('#struture').text((invest.STRUCTURED_PRODUCTS).toString()+'元 >');
							}if(invest.AFFIANCE==undefined||invest.AFFIANCE==null || invest.AFFIANCE===""){
								$('#trust').text("--");
							}else {
								$('#trust').text((invest.AFFIANCE).toString()+'元 >');
							}if(invest.NATIONAL_DEBT==undefined||invest.NATIONAL_DEBT==null || invest.NATIONAL_DEBT===""){
								$('#nationaldebt').text("--");
							}else {
								$('#nationaldebt').text((invest.NATIONAL_DEBT).toString()+'元 >');
							}if(invest.EXCHANGE==undefined||invest.EXCHANGE==null || invest.EXCHANGE===""){
								$('#waihui').text("--");
							}else {
								
								$('#waihui').text((invest.EXCHANGE).toString()+'元 >');
							}
							if(invest.TOUMONEY==undefined||invest.TOUMONEY==null || invest.TOUMONEY===""){
								$('#touzi_total').text("--");
							}else {
								
//								$('#waihui').text((invest.EXCHANGE).toString()+'元 >');
								$('#touzi_total').text(invest.TOUMONEY);
							}
//							$('#touzi_total').text(invest.BREAK_EVEN + invest.NON_BREAK_EVEN + invest.AVG_CAPITAL_MANAGE + invest.ONCE_CAPITAL_MANAGE + invest.FUNDS + invest.SECURITY_FINANCING + invest.BANK_INSURANCE + invest.STRUCTURED_PRODUCTS + invest.AFFIANCE + invest.NATIONAL_DEBT + invest.EXCHANGE);
							
							
							if(invest.CERTIFICATE_DEPOSIT==undefined||invest.CERTIFICATE_DEPOSIT==null || invest.CERTIFICATE_DEPOSIT===""){
								$('#greatmoney').text("--");
							}else {
								$('#greatmoney').text((invest.CERTIFICATE_DEPOSIT).toString()+'元 >');//大额
							}
							
							if(invest.FCLA==undefined||invest.FCLA==null || invest.FCLA===""){
								$('#dinghuotong').text("--");
							}else {
								$('#dinghuotong').text((invest.FCLA).toString()+'元 >');              //定活通
							}if(invest.CURRENT_DEPOSIT==undefined||invest.CURRENT_DEPOSIT==null || invest.CURRENT_DEPOSIT===""){
								$('#demandmoney').text("--");
							}else {
								$('#demandmoney').text((invest.CURRENT_DEPOSIT).toString()+'元 >');      //活期存款
							}if(invest.INSURANCE_DEPOSIT==undefined||invest.INSURANCE_DEPOSIT==null || invest.INSURANCE_DEPOSIT===""){
								$('#marginmoney').text("--");
							}else {
								$('#marginmoney').text((invest.INSURANCE_DEPOSIT).toString()+'元 >');//保证金存款
							}if(invest.NOTICE_DEPOSIT==undefined||invest.NOTICE_DEPOSIT==null || invest.NOTICE_DEPOSIT===""){
								$('#infrommoney').text("--");
							}else {
								$('#infrommoney').text((invest.NOTICE_DEPOSIT).toString()+'元 >');//通知存款
							}if(invest.GENERAL_DEPOSIT==undefined||invest.GENERAL_DEPOSIT==null || invest.GENERAL_DEPOSIT===""){
								$('#commonmoney').text("--");
							}else {
								$('#commonmoney').text((invest.GENERAL_DEPOSIT).toString()+'元 >');//一般定期存款*/
								
							}if(invest.DEPOSIT_SUM==undefined||invest.DEPOSIT_SUM==null || invest.DEPOSIT_SUM===""){
								$('#cunkuan_total').text("--");
							}else {
								
								$('#cunkuan_total').text(invest.DEPOSIT_SUM);
							}
//							$('#cunkuan_total').text(invest.CERTIFICATE_DEPOSIT + invest.FCLA + invest.CURRENT_DEPOSIT + invest.INSURANCE_DEPOSIT + invest.NOTICE_DEPOSIT + invest.GENERAL_DEPOSIT);

						}
					}else{
						$('#baoben').text("--");
						$('#feibaoben').text("--");
						$('#fund').text("--");
						$('#disposable').text("--");
						$('#daymoney').text("--");
						$('#juanshang').text("--");
						$('#moneyprotect').text("--");
						$('#struture').text("--");
						$('#trust').text("--");
						$('#nationaldebt').text("--");
						$('#waihui').text("--");
						$('#greatmoney').text("--");
						$('#dinghuotong').text("--");
						$('#demandmoney').text("--");
						$('#marginmoney').text("--");
						$('#infrommoney').text("--");
						$('#commonmoney').text("--");
						$('#cunkuan_total').text("--");
						$('#touzi_total').text("--");
					}


				}

			});
		}
		gotoDetailProfitability = function (profitabilityType) {
			var title;
			var product = '';
			var type = '';
			if(profitabilityType=='BBLC'){
				title='保本理财';
				type = 'rijun';
			}
			if(profitabilityType=='FBBLC'){
				title='非保本理财';
				type = 'rijun';
			}
			if(profitabilityType=='RJZG'){
				title='日均资管';
				type = 'rijun';
			}
			if(profitabilityType=='YCXZG'){
				title='一次性资管';
				type = 'yici';
			}
			if(profitabilityType=='JJ'){
				title='基金';
				type = 'yici';
			}
			if(profitabilityType=='HJ'){
				title='黄金';
				type = 'yici';
			}
			if(profitabilityType=='JSLC'){
				title='券商理财';
				type = 'rijun';
			}
			if(profitabilityType=='YB'){
				title='银保';
				type = 'yici';
			}
			if(profitabilityType=='JGXCP'){
				title='结构性产品';
				type = 'rijun';
			}
			if(profitabilityType=='XT'){
				title='信托';
				type = 'yici';
			}
			if(profitabilityType=='GZ'){
				title='国债';
				type = 'yici';
			}
			if(profitabilityType=='WH'){
				title='外汇';
				type = 'yici';
			}
			if(profitabilityType=='DECD'){
				title='大额传单';
				product = 'depositProduct'
			}
			if(profitabilityType=='DHT'){
				title='定活通';
				product = 'depositProduct'
			}
			if(profitabilityType=='HQCK'){
				title='活期存款';
				product = 'depositProduct'
			}
			if(profitabilityType=='BZJCK'){
				title='保证金存款';
				product = 'depositProduct'
			}
			if(profitabilityType=='TZCK'){
				title='通知存款';
				product = 'depositProduct'
			}
			if(profitabilityType=='YBDQCK'){
				title='一般定期存款';
				product = 'depositProduct'
			}
			
			
			// 打开创利明细页面
			//alert('ss');
			product == '' ? product = 'financingProduct':product = 'depositProduct';
			if(type == 'rijun'){
					if(rijunLinkFlg == 0){
						return;
					}
			}else if(type == 'yici'){
					if(yiciLinkFlg == 0){
						return;
					}
			}else if(product == 'depositProduct'){
				if(daeLinkFlg == 0){
						return;
					}
			}else{
				return;
			}
				aladdin.navigator.forward({
				title: title,
				url: '../salespoints/'+product+'.html?financingType='+profitabilityType+'&datetime='+datetime,
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


	};
	depositbenifits.prototype = {
		init:function(){
			$(function(){
				aladdin.page.bounce(false);
				$('.section_a').on('click',function(){
					$('.teraction').css('display','block');
						salesType = "sales";

				})
				$('.section_b').on('click',function(){
					$('.character').css('display','block');
					salesType = "department";
				})
				$('.section_c').on('click',function(){
					if(flag != "WSM"){
						$('.qualityMask').css('display','block');
						salesType = "quality";
					}else {
						$('.serveMask').css('display','block');
						salesType = "serve";
					}

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


			})
		}	
	};
	var obposit = new depositbenifits();
	obposit.init();
})()


