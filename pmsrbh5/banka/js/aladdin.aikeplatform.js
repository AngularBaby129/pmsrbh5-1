/*!
 * aladdin.aikeplatform v1.0.1
 * (c) 2017.3.28 
 */


'use strict';

//aladdin = 'default' in aladdin ? aladdin['default'] : aladdin;


/**
 *=======================| Aike_Tool类,工具类 |=================================/
 */

/**
 *

 */
function Aike_Tool(aladdin) {
	this._aladdin = aladdin;
}

Object.defineProperty(Aike_Tool.prototype, 'name', {
	value: 'aike_tool',
	writable: false
});

/**
 * 获取ticket
 *
 * @param {Function} cb   function(error,ticket){};
 */
Aike_Tool.prototype.getTicket = function (cb) {
	//alert('Aike_Tool getTicket');
	this._aladdin.call(this.name, 'getTicket', cb);
};


/**
 * 获取登录account
 *
 * @param {Function} cb   function(error,account){};
 */
Aike_Tool.prototype.getAccount = function (cb) {
	this._aladdin.call(this.name, 'getAccount', cb);
	// aladdin.localStorage.getItem('account',true,'',function(error,account){

	//         if(!error && undefined === account)
	//         {
	//             cb(error,null);
	//             return;
	//         }

	//         cb(error,account);
	//     });
};
/**
 * 获取登录getDeviceID
 *
 * @param {Function} cb   function(error,deviceId){};
 */
Aike_Tool.prototype.getDeviceID = function (cb) {

	//var replaceDeviceID = function (err,info) {

	//     if (err) {
	//         cb(err, null);
	//
	//         return;
	//     }
	//
	//     if (cb && typeof cb === 'function') {
	//         var myDeviceId = info.replace(/\-/g, "");
	//         console.log('Aike_Tool|getDeviceId  = ' + myDeviceId);
	//         cb(err, myDeviceId);
	//     }
	//
	//
	// };
	// this._aladdin.call(this.name, 'getDeviceID', replaceDeviceID);

	//}

	this._aladdin.device.getInfo(function (err, info) {

		if (err) {
			cb(err, null);

			return;
		}
		//alert('=======deviceId======'+ info.deviceId);
		if (cb
			&& typeof cb === 'function') {
			var myDeviceId = info.deviceId.replace(/\-/g, "");
			//console.log('Aike_Tool|getDeviceId  = '+myDeviceId);
			cb(err, myDeviceId);
		}

	});

};

/**
 * 同时获取 ticket + deviceId
 *
 * @param {Function} cb   function(ticket,deviceId){};
 */
Aike_Tool.prototype.getTicketAndDeviceId = function (cb) {
	if (cb
		&& typeof cb === 'function') {

		var that = this;
		this.getTicket(function (err, ticket) {

			that.getDeviceID(function (err, deviceId) {

				cb(ticket, deviceId);
			})
		});
	}

};


/**
 * 获取个人信息请求（注意：每次请求都是一次网络请求）
 *
 * @param {Function} cb   function(error,personalInfo){};
 - [object]  personalInfo     个人信息

 personalInfo:{
							userId:string  //用户ID
							userName:string //用户姓名
							orgName:string //机构名称
							weChatNum:string //微信号
							QRCodeURL:string //二维码地址
							avatarURL:string //头像地址
							mobile:string //手机号
							position:string //职位名称
							introduction:string //个人介绍
 						}
 */
Aike_Tool.prototype.getPersonalInfoReq = function (cb) {
	if (cb
		&& typeof cb === 'function') {
		this._aladdin.call(this.name, 'getPersonalInfoReq', cb);
	}
};


aladdin.use(Aike_Tool);


/**
 *=======================| Share类,ShareSDK 分享 |=================================/
 */

/**
 *  Share类,ShareSDK 分享
 *   aladdin.aike_share.
 */

function Share(aladdin) {
	this._aladdin = aladdin;
	this.ShareType = {
		WechatTimeline: 0, //微信朋友圈
		WechatSession: 1,  //微信好友
		SMS: 2, //短信分享 暂不支持
	};
	this.ResponseState = {
		/**
		 *  开始
		 */
		ResponseStateBegin: 0,

		/**
		 *  成功
		 */
		ResponseStateSuccess: 1,

		/**
		 *  失败
		 */
		ResponseStateFail: 2,

		/**
		 *  取消
		 */
		ResponseStateCancel: 3
	};
}

Object.defineProperty(Share.prototype, 'name', {
	value: 'aike_share',
	writable: false
});

/**
 *
 * shareSDK 分享功能(有默认弹窗)
 *
 * @param   {Object} opts
 *              - [String]  title       页面title
 *              - [String]  description 分享内容描述
 *              - [String]  imageData   分享客户头像url
 *              - [String]  webUrl      页面url
 * @param   {Function} function(error,message){};
 *              - [object]  data     信息
 data : {
                                shareType:int (值请参考上面ShareType常量)
                                message:string 错误信息
                                state:int      分享结果
                            }
 */
Share.prototype.share = function (opts, cb) {
	opts = opts || {};

	//alert('ShareSDK inside this.name='+this.name + ' this._aladdin ='+this._aladdin);
	this._aladdin.call(this.name, 'share', opts, cb);

	return this;
};

/**
 *
 * shareSDK 分享功能（无弹窗，自定义分享类型）
 *
 * @param   {Object} opts
 *              - [String]  title       页面title
 *              - [String]  description 分享内容描述
 *              - [String]  imageData   分享客户头像url
 *              - [String]  webUrl      页面url
 *              - [Number]  shareType   自定义分享类型（0、微信朋友圈 1、微信好友 2、短信分享（暂不支持））
 * @param   {Function} function(error,message){};
 *              - [object]  data     信息
 data : {
                                shareType:int (值请参考上面ShareType常量)
                                message:string 错误信息
                                state:int      分享结果
                            }
 */
Share.prototype.customShare = function (opts, cb) {
	opts = opts || {};
	this._aladdin.call(this.name, 'customShare', opts, cb);

	return this;
};

aladdin.use(Share);


/**
 *=======================| Aike_Pad类,PadSDK 埋点接口 |=================================/
 */

/**
 * Aike_Pad类,PadSDK 埋点接口
 * aladdin.aike_pad v1.0.0
 */

function Aike_Pad(aladdin) {
	this._aladdin = aladdin;
}

Object.defineProperty(Aike_Pad.prototype, 'name', {
	value: 'aike_pad',
	writable: false
});

/**
 * 调起浏览器打开网页
 *
 * @param eventId 事件ID
 * @param eventLabel 事件标签
 * @param parameters 参数
 */
Aike_Pad.prototype.trackEvent = function (eventId, eventLabel, parameters) {
	//var opts = opts || {};

	//alert('Aike_Pad inside this.name='+this.name + ' this._aladdin ='+this._aladdin);
	var opts = {
		eventId: eventId,
		eventLabel: eventLabel,
		parameters: parameters
	};
	this._aladdin.call(this.name, 'trackEvent', opts);

	return this;
};


Aike_Pad.prototype.trackPageStart = function (pageName) {
	this._aladdin.call(this.name, 'trackPageStart', pageName);
};

Aike_Pad.prototype.trackPageEnd = function (pageName) {
	this._aladdin.call(this.name, 'trackPageEnd', pageName);
};


Aike_Pad.prototype.setGlobalKV = function (key, value) {
	var opts = {
		key: key,
		value: value
	};
	this._aladdin.call(this.name, 'setGlobalKV', opts);
};

Aike_Pad.prototype.removeGlobalKV = function (key) {
	this._aladdin.call(this.name, 'removeGlobalKV', key);
};

aladdin.use(Aike_Pad);

/**
 *=======================| Aike_ModuleManager类,界面管理模块 |=================================/
 */

/**
 * Aike_ModuleManager类,界面管理模块
 * aladdin.aike_modulemanager v1.0.0
 */
function Aike_ModuleManager(aladdin) {
	this._aladdin = aladdin;
	this.ShowOptsConst = { //打开模块界面方式
		ShowType: { //打开模块界面方式
			Push: 'Push',// IOS: navigtor --->pushViewController
			Present: 'Present', // IOS: presentViewController
			ReplaceRoot: 'ReplaceRoot'//IOS:替换根控制器
		}
	};
}

Object.defineProperty(Aike_ModuleManager.prototype, 'name', {
	value: 'aike_modulemanager',
	writable: false
});


/*
 独立显示个人设置界面
 * */
Aike_ModuleManager.prototype.showSettingModule = function () {
	var moduleParam = {
		isSettingPage: true
	};
	//alert('showSettingModule inside');
	this.showModule('PersonnalCenter', {showType: this.ShowOptsConst.ShowType.Present}, moduleParam);
};

/*
 显示手势密码解锁界面
 * */
Aike_ModuleManager.prototype.showGestureLock = function () {
	this.showModule('GestureLock', {showType: this.ShowOptsConst.ShowType.Present}, {});
};

/**
 *
 *  跳转到传送门
 *  @filterPluginName  需要过滤，在传送门界面不显示的插件名（一般是自己的插件名）
 */
Aike_ModuleManager.prototype.showAikeMarketPortal = function (filterPluginName) {

	var url = '/aikemarkportal/dist/module/portal.html?resourceName=' + filterPluginName;
	this._aladdin.navigator.forward({
		url: url,
		type: 'webapp'
	}, function (error, data) {
		if (error) {
			alert(error.message);
		}
	})
};

/**
 * 显示ReactNative界面
 *
 * showOpts:显示方式参数
 * showOpts = {
 *      showType:this.ShowOptsConst.ShowType.XXX
 * }
 * moduleParam:传给模块的参数
 * moduleParam = {
 *     resourceName:string, //资源包名
 *     componentName:string, //AppRegistry.registerComponent 注册的组件名
 *     initialProperties:object  //相当于 给将要显示的 RN View组件的 this.props数据
 *                               //************initialProperties对象数据约束 [注意]***************／
 *                               //initialProperties对象数据  key 为字符串  ／
 *                               //initialProperties对象数据  value  只能为 string 数字  BOOL,不能为object（对象），不能为数组,
 *                                                                  对象和数组数据可用JSON.stringify()转为字符串数据传递，接收方再用JSON.parse转回对象和数组／
 *
 *     例：
 *
 *     let myProps = {
 *          x:'abc',
 *          y:123,
 *          z:true
 *     };
 *
 *     let myPropsString = JSON.stringify(myProps);//把对象转化为字符串
 *
 *     let moduleParam = {
 *          resourceName:'sicai/sicai.jsboundle',//私财RN包
 *          componentName:'homePage',//打开主页
 *          initialProperties:{
 *               myPropsString:myPropsString
 *          }
 *     }
 *     BKAModuleManager.showReactNativeModule({showType:this.ShowOptsConst.ShowType.XXX},moduleParam);
 *
 *     //------------被hompage接收数据方代码-----------------
 *     let myPropsString = this.props.myPropsString;
 *     let myProps = JSON.parse(myPropsString);
 *
 *
 * */
Aike_ModuleManager.prototype.showReactNativeModule = function (showOpts, moduleParam) {
	//如果是跳转到业务方rn插件里面,需要在options传一个参数nativeJump:true,用于处理事件
	if (moduleParam.initialProperties) {
		moduleParam.initialProperties.closeModule = true;
		moduleParam.initialProperties.showType = showOpts.showType;
	} else {
		moduleParam.initialProperties = {closeModule: true, showType: showOpts.showType};
	}
	//将initialProperties对象转成json字符串,主要是为了解决rn0.33以下版本安卓端不能处理不限定个数参数的问题,将来替换0.38版本之后可以不用再这么处理
	//moduleParam.initialProperties = JSON.stringify(moduleParam.initialProperties);

	var u = navigator.userAgent;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端

	if (isAndroid) {
		var bundleName = moduleParam.resourceName.split('.')[0];
		var moduleName = moduleParam.componentName;
		var url = bundleName + '/' + moduleName;
		this._aladdin.navigator.forward({
			// 目标页面地址
			url: url,
			// 类型
			type: 'rnapp',

			initialProperties: moduleParam.initialProperties
		}, function () {
		});
	} else {
		//moduleManager.showModule('ReactNativeModeule',showOpts,moduleParam);
		//iOS
		this.showModule('ReactNativeModeule', showOpts, moduleParam);
	}
};


//清空之前的Activity或者controller,显示H5插件页面
Aike_ModuleManager.prototype.showAladdinH5ModuleInRoot = function (moduleParam) {

	var params = moduleParam ? moduleParam : {};
	var u = navigator.userAgent;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
	if (isAndroid) {
		this._aladdin.navigator.forward({
			// 目标页面地址
			url: moduleParam.url,
			// 类型
			type: 'webapp',

		});
		this.closeModule({});
	} else {

		this.showModule('AladdinH5Module', {showType: this.ShowOptsConst.ShowType.ReplaceRoot}, params);
	}
};

//清空之前的Activity或者controller,显示native插件页面
Aike_ModuleManager.prototype.showNativeModuleInRoot = function (moduleParam) {

	var params = moduleParam ? moduleParam : {};
	var u = navigator.userAgent;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
	if (isAndroid) {
		this._aladdin.navigator.forward({
			// 类型
			type: 'nativeapp',
			// 对应的原生的宿主模版
			tpl: moduleParam.activityName,
			initialProperties: moduleParam.initialProperties,
		});
		this.closeModule({});
	} else {
		var nativeModule = moduleParam.activityName ? moduleParam.activityName : 'NativeModule';
		this.showModule(nativeModule, {showType: this.ShowOptsConst.ShowType.ReplaceRoot}, params);
	}
};


//清空之前的Activity或者controller,显示RN插件页面
Aike_ModuleManager.prototype.showReactNativeModuleInRoot = function (moduleParam) {

	var params = moduleParam ? moduleParam : {};
	var u = navigator.userAgent;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
	if (isAndroid) {
		var bundleName = moduleParam.resourceName.split('.')[0];
		var moduleName = moduleParam.componentName;
		var url = bundleName + '/' + moduleName;
		this._aladdin.navigator.forward({
			// 目标页面地址
			url: url,
			// 类型
			type: 'rnapp',
			rnflag: "1",
			initialProperties: moduleParam.initialProperties,
		});
		this.closeModule({});
	} else {

		this.showModule('ReactNativeModeule', {showType: this.ShowOptsConst.ShowType.ReplaceRoot}, params);
	}
};

Aike_ModuleManager.prototype.OpenAiKeApp = function() {
	//this.actionModule('OpenUrlAction',null,{url:'pinganiclientapp'});
	this.OpenUrl('pinganiclientapp');//
}

Aike_ModuleManager.prototype.OpenUrl = function(url) {
	this.actionModule('OpenUrlAction',null,{url:url});
}

//webView 可以上下滑动  
Aike_ModuleManager.prototype.webViewScrollEnabled = function(scrollEnable) {
	this.actionModule('webViewScrollEnabled',null,{scrollEnable:scrollEnable});
}

//--------------------------下面是到Native到接口-----------------------
/**
 * 显示界面
 *
 * moduleName:string要显示的模块名
 * showOpts:string显示方式参数
 * showOpts = {
     *      showType:ShowOptsConst.ShowType.XXX
     * }
 * moduleParam:传给模块的参数
 * */
Aike_ModuleManager.prototype.showModule = function (moduleName, showOpts, moduleParam) {
	this._aladdin.call(this.name, 'showModule', moduleName, showOpts, moduleParam);
};

/**
 * 关闭界面
 *
 * moduleName:string 要关闭的模块名
 * closeOpts:object 关闭方式参数
 *          var closeOpts = {
     *              showType:aladdin.aike_modulemanager.ShowOptsConst.ShowType.XXX
     *          }
 * moduleParam:object 传给模块的参数
 * */
Aike_ModuleManager.prototype.closeModule = function (closeOpts) {
	var opts = closeOpts ? closeOpts : {showType: this.ShowOptsConst.ShowType.Push};
	this._aladdin.call(this.name, 'closeModule', "", opts, {});
};


/**
 * 触发事件
 *
 * moduleName:string 触发事件模块名
 * actionOpts:object 触发方式 {}
 * actionParam:object 传给模块的参数
 * */
Aike_ModuleManager.prototype.actionModule = function (moduleName, actionOpts, actionParam) {
	this._aladdin.call(this.name, 'actionModule', moduleName, actionOpts, actionParam);
};


aladdin.use(Aike_ModuleManager);

/**
 *=======================| Aike_securityKeyBoard类,安全键盘 |=================================/
 */

/** Aike_securityKeyBoard类,安全键盘
 *
 */

function Aike_securityKeyBoard(aladdin) {
	this._aladdin = aladdin;
	this.keyBoardType = {
		KBType_Letter: 1,  //安全键盘——字母
		KBType_Symbol: 2,  //安全键盘——字符
		KBType_Numeral: 3, //安全键盘——数字
		KBType_Decimal: 4, //安全键盘——带小数点数字键盘

	}
}

Object.defineProperty(Aike_securityKeyBoard.prototype, 'name', {
	value: 'aike_securitykeyboard',
	writable: false
});

/** 显示安全键盘
 * @method showSecrityKeyBoard:callBack:
 * @param {Object} opts
 *              - [String]  kbType       安全键盘类型
 *              - [function]  keypressCallback 输入内容改变回调，每输入一次回调一次
 *
 *安全键盘类型
 this.keyBoardType = {
        KBType_Letter:1,  //安全键盘——字母
        KBType_Symbol:2,  //安全键盘——字符
        KBType_Numeral:3, //安全键盘——数字
        KBType_Decimal:4, //安全键盘——带小数点数字键盘

    };
 * @param   {Function} function(error,message){};
 *              - [object]  data     信息
 data : {
                                degree:string 字符
                                len:string    已输入的字符长度
                            }
 */

Aike_securityKeyBoard.prototype.showSecrityKeyBoard = function (opts, cb) {
	opts = opts || {};

	this._aladdin.call(this.name, 'showSecrityKeyBoard', opts, cb);
};
/** 清除键盘内容
 * @method clearContent:
 *
 * @param   {Function} function(error,data){};
 *              - [object]  data
 data :预留

 *
 */
Aike_securityKeyBoard.prototype.clearContent = function (cb) {

	this._aladdin.call(this.name, 'clearContent', cb);
};
/** 获取键盘输入内容
 * @method getContent:callBack:
 * @param  key 加密公钥，如果缺省，就用平台的公钥加密
 * @param   {Function}cb function(error,data){};
 *              - [object]  data
 data : {
                                message:string 加密后的字符串
                            }
 *
 */
Aike_securityKeyBoard.prototype.getContent = function (key, cb) {
	var mkey = key || '';
	this._aladdin.call(this.name, 'getContent', mkey, cb);
};

/** 隐藏键盘
 * @method hideSecrityKeyBoard:
 *
 * @param   {Function} function(error,data){};
 *              - [object]  data
 data :预留
 */
Aike_securityKeyBoard.prototype.hideSecrityKeyBoard = function (cb) {

	this._aladdin.call(this.name, 'hideSecrityKeyBoard', cb);
};

aladdin.use(Aike_securityKeyBoard);


//===================================================================//


/**
 *=======================| Aike_FaceRec类,人脸识别插件 |=================================/
 */

/**
 * Aike_FaceRec类,人脸识别插件 -- created by 陈才旺
 *
 */
function Aike_FaceRec(aladdin) {
	this._aladdin = aladdin;
}


Object.defineProperty(Aike_FaceRec.prototype, 'name', {
	value: 'aike_faceRec',
	writable: false
});

/** 打开人脸识别
 *
 * @param opts [appId]             string    BISP统一分配,请与人脸识别appkey的申请人确认
 *             [appKey]            string    BISP统一分配,请与人脸识别appkey的申请人确认
 *             [sdkVersion]        string    人脸识别的sdk版本信息,请与人脸识别appkey的申请人确认,一般测试环境为"1.0.0",生产环境为"i.1.0.0"
 *             [systemId]          string    BISP统一分配,请与人脸识别appkey的申请人确认
 *             [actionNum]         string    0:无动作 1:张嘴 2:随机动作
 *             [faceRecVersion]    string    0:旧SDK流程 1:新SDK流程(旧版SDK可默认不传,新版SDK必填1)
 * @param {Function} cb   function(error,responseObj){}; responseObj 对象有两个属性,为imageId和token
 */
Aike_FaceRec.prototype.showFaceRec = function (params, cb) {

	this._aladdin.call(this.name, 'showFaceRec', params, cb);
};


aladdin.use(Aike_FaceRec);

/**
 *=======================| Aike_CityPicker类，城市选择器|=================================/
 */

/**
 * Aike_CityPicker类，城市选择器.
 *
 * @constructor
 * @param {object} aladdin
 */
function Aike_CityPicker(aladdin) {
	this._aladdin = aladdin;
	//this._bow = null;
}

Object.defineProperty(Aike_CityPicker.prototype, 'name', {
	value: 'aike_cityPicker',
	writable: false
});

/**
 *
 *
 * @param {Object} opts
 * @param {Function} cb
 */
Aike_CityPicker.prototype.show = function (opts, cb) {
	opts = opts || {};

	return this._aladdin.call(this.name, 'show', opts, cb);
};

aladdin.use(Aike_CityPicker);


/**
 *=======================| Aike_DatePicker类，日期选择器. |=================================/
 */


/**
 * Aike_DatePicker类，日期选择器.
 *
 * @constructor
 * @param {object} aladdin
 */
function Aike_DatePicker(aladdin) {
	this._aladdin = aladdin;
	this.DataType = {
		DataType_YMD: 'showYearMonthDayDialog',//年月日
		DataType_YM: 'showYearMonthDialog',//年月
		DataType_MD: 'showMonthDayDialog',//月日
		DataType_YMDHM: 'showYearMonthDayAmPmDialog'//年月日 时分
	};
	this.FlagType = {
		FlagType_week: 1,
		FlagType_moth: 2
	}
}

Object.defineProperty(Aike_DatePicker.prototype, 'name', {
	value: 'aike_datePicker',
	writable: false
});

/**
 * 日期
 *
 * @param {Object} opts
 * @param {Function} cb
 */
Aike_DatePicker.prototype.date = function (opts, cb) {
	opts = opts || {};

	return this._aladdin.call(this.name, 'date', opts, cb);
};
/**
 * @callback cb (error, data)
 * @param {Object} error
 * @param {Object} data
 */

/**
 * 周期
 *
 * @param {Object} opts
 * @param {Function} cb
 */
Aike_DatePicker.prototype.period = function (opts, cb) {
	opts = opts || {};

	return this._aladdin.call(this.name, 'period', opts, cb);
};
aladdin.use(Aike_DatePicker);


/**
 *=======================| Aike_Preview类，图片预览 |=================================/
 */

/**
 * Aike_Preview类，图片预览.
 *
 * @constructor
 * @param {object} aladdin
 */
function Aike_Preview(aladdin) {
	this._aladdin = aladdin;
}

Object.defineProperty(Aike_Preview.prototype, 'name', {
	value: 'aike_preview',
	writable: false
});

/**
 * 获取图片数据
 *
 * @param {Object} opts
 * @param {Function} cb
 */
Aike_Preview.prototype.view = function (opts, cb) {
	opts = opts || {};
	return this._aladdin.call(this.name, 'preview', opts, cb);
};
aladdin.use(Aike_Preview);


/**
 *=======================| Aike_CreditAuthorization类,身份证授权 |=================================/
 */

/**
 * Aike_CreditAuthorization类,身份证授权
 */

function Aike_CreditAuthorization(aladdin) {
	this._aladdin = aladdin;
	this.OCRType = {
		OCRType_front: '1',//正面
		OCRType_back: '2'//反面
	}
}

Object.defineProperty(Aike_CreditAuthorization.prototype, 'name', {
	value: 'aike_creditAuthorization',
	writable: false
});

/**
 * 扫描身份证
 *
 * @param {Object} opts
 * @param {Function} cb
 */
Aike_CreditAuthorization.prototype.scan = function (opts, cb) {
	opts = opts || {};

	return this._aladdin.call(this.name, 'scan', opts, cb);
};
aladdin.use(Aike_CreditAuthorization);


/**
 *=======================| Aike_Phone类,打电话 |=================================/
 */

/**
 * Aike_Phone类,打电话
 */
function Aike_Phone(aladdin) {
	this._aladdin = aladdin;
}

Object.defineProperty(Aike_Phone.prototype, 'name', {
	value: 'aike_phone',
	writable: false
});

/**
 * 调起拨号程序拨打电话
 *
 * @param {Object} opts
 * @param {Function} cb
 */
Aike_Phone.prototype.call = function (opts, cb) {
	return this._aladdin.call(this.name, 'call', opts, cb);
};

/**
 * 弹出通讯录界面选择某个联系人信息
 *
 * @param {Function} cb
 */
Aike_Phone.prototype.selectContact = function (cb) {
	return this._aladdin.call(this.name, 'selectContact', cb);
};

/**
 * 获取手机号
 *
 * @param {Function} cb
 */
Aike_Phone.prototype.getMobileNo = function (cb) {
	return this._aladdin.call(this.name, 'getMobileNo', cb);
};
aladdin.use(Aike_Phone);

/**
 *=======================| Aike_HandWrite类 电子签名 |=================================/
 */

function Aike_HandWrite(aladdin) {
	this._aladdin = aladdin;
};

Object.defineProperty(Aike_HandWrite.prototype, 'name', {
	value: 'aike_handwride',
	writable: false
});

/***模板****/
Aike_HandWrite.prototype.generateALD_BKATemplate = function (handwrite, callb) {
	this._aladdin.call(this.name, 'generateALD_BKATemplate', handwrite, callb);
};

/** 普通拍照
 *  handwrite = {
 *      contextId:xxx,
 *      crtInfo:{
 *          isRemind:xxx,                //是否开启拍照提醒
 *          remindText:xxx,              //拍照提醒文字
 *          xOffset:xxx,                 //默认位置左右偏移大小
 *          yOffset:xxx,                 //默认位置上下偏移大小
 *          textColor:xxx,               //提醒文字颜色（0:黑色,1:白色,2:灰色,3:红色,4:绿色,5:蓝色,6:黄色）
 *      },
 *      cameraInfo:{
 *          property:xxx,                //图片的属性(可为空)
 *          quality:xxx,                 //图片保存成jpg的质量（0~100）
 *          imageSize:{                  //保存图片的尺寸
 *              imageSizeWidth:xxx,      //宽度
 *              imageSizeHeight:xxx,     //高度
 *          },
 *          frameRect:{                  //弹出框大小（默认为全屏）
 *              x:xxx,                   //x值
 *              y:xxx,                   //y值
 *              width:xxx,               //宽
 *              height:xxx,              //高
 *          },
 *          checkface:xxx,               //是否进行人脸识别
 *          faceMessage:xxx,             //人脸识别失败的提示语言
 *          cancelExist:xxx,             //是否显示返回按钮（单独拍照中使用，证据拍照一直显示）
 *      }
 *  }
 *
 * @param  callb  回调
 **/
Aike_HandWrite.prototype.showCommonALDTakePicture = function (handwrite, callb) {

	this._aladdin.call(this.name, 'showCommonALDTakePicture', handwrite, callb);
};

/***证据拍照**/
Aike_HandWrite.prototype.showEvidenceALDTakePicture = function (handwrite, callb) {
	this._aladdin.call(this.name, 'showEvidenceALDTakePicture', handwrite, callb);
};

/** 普通录音接口（不添加证据时使用)
 *  @method showCommonMediaRecord:callBack:
 *
 *  @param  handwrite              参数
 *          handwrite contextId    录音的id(50~59 500~599)
 *          handwrite recInfo      录音信息
 *
 *          recInfo    录音信息
 *                 showUi          是否显示录音界面
 *                 frameRect       弹出框大小（默认为全屏）
 *                 (frameRect)     x       x值
 *                                 y       y值
 *                                 width   宽
 *                                 height  高
 *                 DurTime         最长录音的时长
 *  @param  callb  回调
 */
Aike_HandWrite.prototype.showCommonALDMediaRecord = function (handwrite, callb) {
	this._aladdin.call(this.name, 'showCommonALDMediaRecord', handwrite, callb);
};

/***证据录音接口（添加录音证据时使用）***/
Aike_HandWrite.prototype.showEvidenceALDMediaRecord = function (handwrite, callb) {
	this._aladdin.call(this.name, 'showEvidenceALDMediaRecord', handwrite, callb);
};

/***停止录音（无录音UI时调用)***/
Aike_HandWrite.prototype.stopALDRecord = function (callb) {
	this._aladdin.call(this.name, 'stopALDRecord', callb);
};

/***证据传入***/
Aike_HandWrite.prototype.addALDEvidence = function (handwrite, callb) {
	this._aladdin.call(this.name, 'addALDEvidence', handwrite, callb);
};

/*** 签名***/
Aike_HandWrite.prototype.showALDSignViewDialog = function (handwrite, callb) {
	this._aladdin.call(this.name, 'showALDSignViewDialog', handwrite, callb);
};

/**** 批注****/
Aike_HandWrite.prototype.showALD_BKAMassInputDialog = function (handwrite, callb) {
	this._aladdin.call(this.name, 'showALD_BKAMassInputDialog', handwrite, callb);
};

/***清除所有本地数据****/
Aike_HandWrite.prototype.clearALD_ABKAllData = function (callb) {
	this._aladdin.call(this.name, 'clearALD_ABKAllData', callb);
};

aladdin.use(Aike_HandWrite);


/**
 *=======================| Aike_Pad类,PadSDK 埋点接口 |=================================/
 */

function Aike_Iobs(aladdin) {
	this._aladdin = aladdin;
}

Object.defineProperty(Aike_Iobs.prototype, 'name', {
	value: 'aike_iobs',
	writable: false
});

/** 上传文件
 * @param opts [type]        String    上传类型说明,如'filePath'、'base64'
 *             [filePath]    String    文件的本地路径
 *             [key]         String    服务器返回的fileKey
 *             [token]       String    服务器返回的iobsToken
 *             [bucket]      String    服务器返回的bucketName
 *             [hostName]    String    服务器返回的host
 * @param cb   回调方法
 */
Aike_Iobs.prototype.upload = function (opts, cb) {
	return this._aladdin.call(this.name, 'upload', opts, cb);
};


/** 下载文件
 * @param opts [url]        String    服务器返回的文件URL
 * @param cb   回调方法
 */
Aike_Iobs.prototype.download = function (opts, cb) {
	return this._aladdin.call(this.name, 'download', opts, cb);
};

aladdin.use(Aike_Iobs);
