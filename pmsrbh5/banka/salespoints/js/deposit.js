/**
 * Created by EX_WLJR_LIUSHIYU on 2017/5/17.
 */
(function() {
	var thisURL = document.URL;
	var urlValue = thisURL.split("?")[1];
	var urlFinancingType1 = urlValue.split("&")[0];
	var urlFinancingType2 = urlValue.split("&")[1];

	var financingType = urlFinancingType1.split("=")[1];
	var datetime = urlFinancingType2.split("=")[1];
	var myscroll;
//		alert("financingType=="+financingType+",datetime=="+datetime);
	//var urlDate = urlValue.split("&")[1];
	var tranNo_ = "",
		tot = "",
		page = 1,
		financingType = financingType;
	var listInfs = new Array();
	
	function bounsscore() {
		
		var title;
			if(financingType=='BBLC'){
				title='保本理财';
			}
			if(financingType=='FBBLC'){
				title='非保本理财';
			}
			if(financingType=='RJZG'){
				title='日均资管';
			}
			if(financingType=='YCXZG'){
				title='一次性资管';
			}
			if(financingType=='JJ'){
				title='基金';
			}
			if(financingType=='HJ'){
				title='黄金';
			}
			if(financingType=='JSLC'){
				title='券商理财';
			}
			if(financingType=='YB'){
				title='银保';
			}
			if(financingType=='JGXCP'){
				title='结构性产品';
			}
			if(financingType=='XT'){
				title='信托';
			}
			if(financingType=='GZ'){
				title='国债';
			}
			if(financingType=='WH'){
				title='外汇';
			}
			if(financingType=='DECD'){
				title='大额存单';
			}
			if(financingType=='DHT'){
				title='定活通';
			}
			if(financingType=='HQCK'){
				title='活期存款';
			}
			if(financingType=='BZJCK'){
				title='保证金存款';
			}
			if(financingType=='TZCK'){
				title='通知存款';
			}
			if(financingType=='YBDQCK'){
				title='一般定期存款';
			}
			var opts = {
            title:title ,
            color: "#000000",
            backgroundColor: "#FFFFFF",
            fontSize: '16px',
            underlineVisible: true,
            leftButtonVisible: true,
            leftButtonText: '',
            leftButtonFontSize: '16px',
            rightButtonVisible: false,
            leftButtonIcon: "/sicaih5/dist/static/back.png",
            leftButtonCallback: function () {
                aladdin.navigator.back()
            }
        };
        aladdin.header.config(opts, function (err) {
            if (err) {
                aladdin.toast.show({message: err.message});
            }
        })
		gotoDetailProfitability = function(profitabilityType) {
			var params = profitabilityType.split('&');
			var rowKey = params[0];
			var CPML_NAME06 = params[1];
			// 打开创利明细页面
			//alert('ss');
			aladdin.navigator.forward({
				title: '交易明细',
				url: '../salespoints/depositDetails.html?rowKey='+rowKey+'&financingType='+CPML_NAME06,
				// 默认情况下即是`webapp`，可以不传
				type: 'webapp',

				//导航头设置
				header: {
					visible: true
				}
				//如果使用默认的模板，不需要传递
				//visible tpl: 'default'
			}, function(err) {
				if(err) {
					aladdin.toast.show({
						message: err.message
					});
				}
			});
		}

		financingInfs = function(ticket, umAccount, date, page) {


			aladdinRequestData({
				type: "POST",
				url: "financing/financingInf.do",
				data: {
					'ticket': ticket,
					'umAccount': umAccount,
					'date': date,
					'tot': tot,
					'page': page,
					'financingType': financingType,
					'inputType': 'PB|RM|WSM'

				},
				beforeSend: {
					'brcpEaSessionTicket': ticket
				},
				success: function(err, res) {

					aladdin.loading.stop();
					if(err) {
						aladdin.toast.show({
							message: '加载错误 '
						});
						aladdin.loading.stop({
							canCancel: false
						});
						return;
					}
					var result = res.body;
					if(result.indexOf('responseCode') < 0) {
						aladdin.toast.show({
							message: '数据获取错误'
						});
						return;
					}

					result = eval("(" + result + ")");
					if(result.responseCode != "0") {
						if(result.responseCode == '900109') {
							aladdin.toast.show({
								message: '已经是最后一页了'
							});
							return;
						}else if(result.responseCode == "900120"){
							aladdin.toast.show({ message:'当前月份的用户角色发生变更，请切换到业绩主页查询'});
						}else if (result.responseCode == '900110') {
							aladdin.toast.show({
								message: '数据为空'
							});
						}else{
							aladdin.toast.show({
							message: '系统错误'
						});
						}
						
                        page--;
						return;
					}
					//                  var td1Width=$('#right_table1 tr:first td');
					// var DIFwidth=td1Width.height();

					listInfs = result.listInf;
					//                  if(myscroll){
					//						myscroll.scrollerH = myscroll.scrollerH+(listInfs.length*DIFwidth);
					//                  }
					tot = result.totNum;

					//                  $("#left_table2").empty();
					//                  $("#right_table2").empty();
					if(listInfs.length > -1)

						for(var i = 0; i < listInfs.length; i++) {
							//(function(i){
							var listMap = listInfs[i];
							var chuangli = 0;
							var bili = 0;
							var zizhi = '--';
							if(umAccount == listMap.GHR) {
								bili = bili + Number(listMap.GHR_SCALE);
								
								zizhi = listMap.GHR_QUALI_FLG;
							} else if(umAccount == listMap.MHR) {
								bili = bili + Number(listMap.MHR_SCALE);
								zizhi = listMap.MHR_QUALI_FLG;
							} else if(umAccount == listMap.SALER) {
								bili = bili + Number(listMap.SALER_SCALE);
								zizhi = listMap.SALER_QUALI_FLG;
							}
							if(bili == 0) {
								bili = '--';
								chuangli = '--';
							} else {
								chuangli = Number(listMap.MONTH_ZS_ZZ) * bili;
							}
							tranNo_ = listMap.TRAN_NO;
							// parms = {
							// 	TRAN_NO:listMap.TRAN_NO,
							// 	CPML_NAME06:listMap.CPML_NAME06
							// }
							if (zizhi == 1) {
								zizhi = '是';
							}else if (zizhi == 0) {
								zizhi = '否';
							}else{
								zizhi = '--';
							}
							$("#left_table2").append("<tr><th><div id=userClick" + i + " onclick=gotoDetailProfitability('"+listMap.ROW_KEY+"&"+financingType+"')>" + listMap.CUST_NAME + "</div></th></tr>");
							$("#right_table2").append("<tr><td><div>" + listMap.CPML_NAME06 + "</div></td><td><div>" + chuangli + "</div></td><td><div>" + listMap.MONTH_ZS_ZZ + "</div></td><td><div>" + bili + "</div></td><td><div>" + listMap.ORIG_PRIN_BAL + "</div></td><td><div>" + listMap.RMB_ORIG_PRIN_BAL + "</div></td><td><div>" + listMap.MONTH_NVL + "</div></td><td><div>" + listMap.RATE + "</div></td><td><div>" + listMap.PROD_GUIDE_XS + "</div></td><td><div>" + listMap.ZC_TYPE + "</div></td><td><div>" + zizhi + "</div></td><td><div>" + listMap.CARD_ZH_ID + "</div></td><td><div>" + listMap.MC_ACCT_NO + "</div></td><td><div>" + '--' + "</div></td><td><div>" + listMap.CURR_CD + "</div></td><td><div>" + listMap.DANHAO + "</div></td></tr>");

							//                          $('#userClick'+i).on('click',function(){
							//                          	gotoDetailProfitability(listMap.TRAN_NO);
							//                          });
							//})(i);

						}
					$("#totalBusiness").empty();
					$("#totalBusiness").text('共' + tot + '笔交易');
					//                    var viewH=$('#right_div2').height();
					//                    var contentH=$('#right_table2').height();
					var td2Width = $('#right_table2 tr:first td');
					td2Width.each(function(i, item) {
						var index = i;
						var td1Width = $('#right_table1 tr:first td');
						var DIFwidth = $(this).width();
						//console.log(DIFwidth);
						td1Width.each(function() {
							var difwidth = td1Width.eq(index).width();
							if(DIFwidth > difwidth) {
								td1Width.eq(index).find('div').width(DIFwidth + "px");
							} else {
								td2Width.eq(index).find('div').width(difwidth + "px");
							}
						})
					})
					setTimeout(function(){
						myScroll.refresh();
					},300)
				}
			});
		}

	}
	bounsscore.prototype = {
		init: function() {
			$(function() {
				var page = 1,umAccount = '';
				aladdin.page.bounce(false);
				var win = $(window),
				    scrollAreaEl = $('#right_div2'),
				    leftFreezeEl = $('#left_div2'),
				    leftTableEl = leftFreezeEl.find('table'),
				    rightTableEl = $('#right_div1 table');
					//动态计算容器最大高度
					function adjustHeight() {
					    var winHeight = win.height(),
					        tableHeight = winHeight + 60;
					    leftFreezeEl.height(tableHeight);
					    scrollAreaEl.height(tableHeight);
					}
					
					adjustHeight();
					win.on('resize', adjustHeight);
						//设置iscroll
					 myScroll = new IScroll('#right_div2', {
						    scrollX: true,
						    scrollY: true,
						    probeType: 3
						   
						});
						
						//阻止默认滚动
						scrollAreaEl.on('touchmove mousewheel', function(e) {
						    e.preventDefault();
						});
						////固定上左表头的滚动
						myScroll.on('scroll', updatePosition);
						myScroll.on('scrollEnd', function(){
							var a = this.y;
						    var b = this.x;
						    leftTableEl.css('transform', 'translate(0px, ' + a + 'px) translateZ(0px)');
						    rightTableEl.css('transform', 'translate(' + b + 'px, 0px) translateZ(0px)');
						  	var scrollTop = $('#right_div2').scrollTop();
					console.log(scrollTop)
					var viewH = $('#right_div2').height();
					console.log(viewH);
					var contentH = $('#right_div2').get(0).scrollHeight;
					console.log(contentH)
					if (this.directionY === 1) {
					if(contentH - viewH + a <= 0) {
//						if(isScrolling === 1) {
//							if(endPos.y.toString().indexOf('-') == 0){
//							if(Math.abs(endPos.y) > 10){	
								aladdin.loading.start({
									canCancel: false
								}, function(err) {
									if(err) {
										aladdin.toast.show({
											message: '加载进度框显示错误 '
										});
									}
								});
								aladdin.aike_tool.getTicket(function(err, ticket) {
									if(err && !ticket) {
										aladdin.toast.show({
											message: "ͨ哎呦网络不给力哦"
										});
									} else {
										page++;
                                        aladdin.aike_tool.getAccount(
                                            function (error,account) {
                                                if (error) {
                                                    aladdin.loading.stop({canCancel:false});
                                                    aladdin.toast.show({ message:"用户信息获取失败" });
                                                } else {
                                                    umAccount=account;
                                                    financingInfs(ticket,umAccount, datetime, page);
                                                }

                                            }
                                        );
										
									}
						});
						}
					}
					})
						
						function updatePosition() {
						    var a = this.y;
							    var b = this.x;
							    leftTableEl.css('transform', 'translate(0px, ' + a + 'px) translateZ(0px)');
							    rightTableEl.css('transform', 'translate(' + b + 'px, 0px) translateZ(0px)');
						}
				//设置右边div宽度
				document.getElementById("right_div").style.width = "" + document.documentElement.clientWidth - 180 + "px";
				setInterval(function() {
					document.getElementById("right_div").style.width = "" + document.documentElement.clientWidth - 180 + "px";
				}, 0);

				aladdin.loading.start({
					canCancel: false
				}, function(err) {
					if(err) {
						aladdin.toast.show({
							message: '加载进度框显示错误 '
						});
					}
				});
				aladdin.aike_tool.getTicket(function(err, ticket) {
					if(err && !ticket) {
						aladdin.toast.show({
							message: "ͨ哎呦网络不给力哦"
						});
					} else {
                         aladdin.aike_tool.getAccount(
                             function (error,account) {
                                 if (error) {
                                     aladdin.loading.stop({canCancel:false});
                                     aladdin.toast.show({ message:"用户信息获取失败" });
                                 } else {
                                     umAccount=account;
                                     financingInfs(ticket,umAccount, datetime, page);
                                 }

                             }
                         );
					}
				})
				
				//financingInfs("1212","WUHAN428",datetime,page);
			})

		}
	}

	var bouns = new bounsscore();
	bouns.init();
})();
