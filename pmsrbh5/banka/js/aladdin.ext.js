'use strict'
/**
 * aladdin 扩展
 */
function readonlyProperty(obj, name, value) {
    Object.defineProperty(obj, name, {
        value: value,
        writable: false
    });
}

function PAPPBowreFreshControl(aladdin) {
    this._aladdin = aladdin;
}

readonlyProperty(PAPPBowreFreshControl.prototype, 'name', 'pAPPBowreFreshControl');

/**
 * 下拉刷新
 *
 * @param {Object} opts
 *                 - {String} refreshTitle 下拉松手显示文案
 *                 - {String} pullingTitle 下拉中显示文案
 *                 - {String} idleTitle
 *                 - {Function} onRefresh
 *                 - {Boolean} isStart
 * @param {Function} cb
 * @returns this
 */
PAPPBowreFreshControl.prototype.create = function (opts,cb) {
    if (typeof opts === 'function') {
        cb = opts;
        opts = {};
    }
    opts = opts || {};
    opts.refreshTitle = opts.refreshTitle || '刷新';
    opts.isStart = opts.isStart === undefined ? true : opts.isStart;
    opts.idleTitle = opts.idleTitle || '';
    opts.pullingTitle = opts.pullingTitle || '';
    this._aladdin.call(this.name, 'create', opts, cb);
    return this;
}

PAPPBowreFreshControl.prototype.stop = function (cb) {
    this._aladdin.call(this.name, 'stop', cb);
    return this;
}

function BKAALDBankATool(aladdin) {
    this._aladdin = aladdin;
}

readonlyProperty(BKAALDBankATool.prototype, 'name', 'bKAALDBankATool');

//获取ticket
BKAALDBankATool.prototype.getTicketInfo = function (cb) {
    this._aladdin.call(this.name, 'getTicketInfo', cb);
    return this;
}

//获取ticket
BKAALDBankATool.prototype.getAccountInfo = function (cb) {
    this._aladdin.call(this.name, 'getAccountInfo', cb);
    return this;
}

function PAPPHtmlNativeTool(aladdin) {
    this._aladdin = aladdin;
}

readonlyProperty(PAPPHtmlNativeTool.prototype, 'name', 'pAPPHtmlNativeTool');
//隐藏下方导航栏
PAPPHtmlNativeTool.prototype.start = function (opts, cb) {
    if (typeof opts === 'function') {
        cb = opts;
        opts = {};
    }
    opts = opts || {};
    opts.hiddenTabbar = opts.hiddenTabbar || false;
    this._aladdin.call(this.name, 'start', opts, cb);
    return this;
}

//返回私财首页
PAPPHtmlNativeTool.prototype.pop = function (opts, cb) {
    if (typeof opts === 'function') {
        cb = opts;
        opts = {};
    }
    opts = opts || {};
    this._aladdin.call(this.name, 'pop', opts, cb);
    return this;
}

PAPPHtmlNativeTool.prototype.jumpToMainView = function (opts, cb) {
    if (typeof opts === 'function') {
        cb = opts;
        opts = {};
    }
    opts = opts || {};
    this._aladdin.call(this.name, 'jumpToMainView', opts, cb);
    return this;
}

function PAPPRSAUtilPlugin(aladdin) {
    this._aladdin = aladdin;
}
readonlyProperty(PAPPRSAUtilPlugin.prototype, 'name', 'PPRSAUtilPlugin');
//本地加密
PAPPRSAUtilPlugin.prototype.RSAEncryption = function (opts, cb) {
    if (typeof opts === 'function') {
        cb = opts;
        opts = {};
    }
    opts = opts || {};
    opts.plainText = opts.plainText||'';
    this._aladdin.call(this.name, 'RSAEncryption', opts, cb);
    return this;
}

//loading动画
function Loading(aladdin) {
    this._aladdin = aladdin;
}
readonlyProperty(Loading.prototype, 'name', 'loading');

/**
 * 开启 Loading 动画
 *
 * @param {Object} opts Loading 配置
 *                 - {Boolean} canCancel 是否可以取消
 *                 - {String} message 显示的消息
 * @param {Function} cb
 * @returns this
 */
Loading.prototype.start = function (opts, cb) {
    if (typeof opts === 'function') {
        cb = opts;
        opts = {};
    }

    opts = opts || {};
    (opts.canCancel === undefined) && (opts.canCancel = true);
    opts.message = opts.message || '加载中...';

    this._aladdin.call(this.name, 'start', opts, cb);

    return this;
};

/**
 * 停止 Loading 动画
 *
 * @param {Function} cb
 * @returns this
 */
Loading.prototype.stop = function (cb) {
    this._aladdin.call(this.name, 'stop', cb);

    return this;
};

//用户登录信息缓存
function LoginSuccess(aladdin) {
    this._aladdin = aladdin;
}

readonlyProperty(LoginSuccess.prototype, 'name', 'loginSuccess');

/**
 * 用户登录信息缓存
 *
 * @param {Object} opts  用户登录信息
 * {Function} cb (err, photos)
 {Object} err    错误信息
 {Array[String]}
 */
LoginSuccess.prototype.loginInfo = function(opts, cb) {
    opts = opts || {};
    this._aladdin.call(this.name, 'loginInfo', opts, cb);
    return this;
};


//分享
function ShareView(aladdin) {
    this._aladdin = aladdin;
}

readonlyProperty(ShareView.prototype, 'name', 'shareView');

/**
 * 分享
 *
 * @param {Object} opts
 *      [String]  url  页面url
 [String]  title 页面title
 [Array]   shareArr
 [String]  shareImage  分享客户头像url
 [String]  um  分享客户名  ‘理财经理:’+客户名
 [String]  tel  分享客户手机号  '电话:'+客户手机号
 * @param {Function} cb (err, photos)
 {Object} err    错误信息
 {Array[String]}
 */
ShareView.prototype.forwardShareView = function(opts, cb) {
    opts = opts || {};
    this._aladdin.call(this.name, 'forwardShareView', opts, cb);
    return this;
};

/**
 * 分享
 *
 * @param {Object} opts
 *      [String]  url  页面url
 [String]  title 页面title
 [Array]   shareArr
 [String]  shareImage  分享客户头像url
 [String]  um  分享客户名  ‘理财经理:’+客户名
 [String]  tel  分享客户手机号  '电话:'+客户手机号
 * @param {Function} cb (err, photos)
 {Object} err    错误信息
 {Array[String]}
 */
ShareView.prototype.speedyShareView = function(opts, cb) {
    opts = opts || {};
    this._aladdin.call(this.name, 'speedyShareView', opts, cb);
    return this;
};

//弱提示Toast
function Toast(aladdin) {
    this._aladdin = aladdin;
}

readonlyProperty(Toast.prototype, 'name', 'toast');
/**
 * 显示 Toast
 *
 * @param {Object} opts
 *                 - {String} message 显示的消息
 *                 - {Number} duration 显示时长(秒)
 *                 - {String} position 显示位置
 * @param {Function} cb
 * @returns this
 */
Toast.prototype.show = function (opts, cb) {
    opts = opts || {};
    opts.message = opts.message || '';
    opts.duration = opts.duration || 2000;
    opts.position = opts.position || 'bottom';

    this._aladdin.call(this.name, 'show', opts, cb);

    return this;
};

/**
 * 隐藏 Toast
 *
 * @param {Function} cb
 * @returns this
 */
Toast.prototype.hide = function (cb) {
    this._aladdin.call(this.name, 'hide', cb);

    return this;
};

//Dialog

function Dialog(aladdin) {
    this._aladdin = aladdin;
}

readonlyProperty(Dialog.prototype, 'name', 'dialog');

/**
 * 警告框
 *
 * @param  {Object|String} opts
 *                  {Object}
 *                  - {String} title
 *                  - {String} message
 *                  - {String} buttonText
 *                  - {Function} buttonCallback
 * @param  {Function} cb
 * @returns this
 */
Dialog.prototype.alert = function (opts, cb) {
    opts = opts || {};

    if (typeof opts === 'string') {
        opts = {
            message: opts,
            type: 'info'
        };
    }

    this._aladdin.call(this.name, 'alert', opts, cb);

    return this;
};

/**
 * 提示框
 *
 * @param {Object} opts
 *                 - {String} title
 *                 - {String} message
 *                 - {String} leftButtonText
 *                 - {Function} leftButtonCallback
 *                 - {String} rightButtonText
 *                 - {Function} rightButtonCallback
 * @param {Function} cb
 * @returns this
 */
Dialog.prototype.confirm = function (opts, cb) {
    opts = opts || {};

    this._aladdin.call(this.name, 'confirm', opts, cb);
};


// 拍照或获取照片
function ZkCamera(aladdin) {
    this._aladdin = aladdin;
}

readonlyProperty(ZkCamera.prototype, 'name', 'zkcamera');

/**
 * 获取照片
 *
 * @param {Object} opts
 *	    [source]	Number	默认照片来源（1: 拍照，2: 相册，默认为1）
 [returnType]	String	返回的照片类型（uri | base64，默认为uri）
 [edit]	Boolean	选取照片后是否编辑（默认false）
 [width]	Number	照片宽度（单位px，默认照片宽度）
 [height]	Number	照片高度（单位px，默认照片高度度）
 [quality]	Number	照片质量（1-100，默认为原图）
 [type]	String	照片类型（jpg | png，默认为jpg）
 [maxSelect]	Number	最大可选取个数，默认为1
 * @param {Function} cb (err, photos)
 {Object} err    错误信息
 {Array[String]} photos 选取的照片源列表.uri | base64，具体由传入的选项决定

 */
ZkCamera.prototype.getPhotos = function(opts, cb) {
    opts = opts || {};

    this._aladdin.call(this.name, 'getPhotos', opts, cb);

    return this;
};


// iobs
function iobs(aladdin) {
    this._aladdin = aladdin;
}

// 添加name属性
readonlyProperty(iobs.prototype, 'name', 'iobs');

/**
 * 文件上传
 *@param opts         option对象
 *         option.type      string    base64 | filePath
 *         option.fileData  string    可选参数 type为base64必传，以base64流传入
 *         option.fileName  string    可选参数 type为base64必传
 *         option.filePath  string    可选参数 type为filePath必传
 *         option.bucket    string    上传到指定bucket名称, 默认为iobs-zhike-dev-pri
 *         option.key       string    上传对应 bucket 里文件的 key
 *         option.token     string    上传的token信息
 *         option.onprocess     function    上传中的回调
 *  @param cb(err, data)         回调
 // err错误对象, {code: "错误代码", message: "错误消息"}
 // data 数据对象, {status:"", process:0.12}
 // data.status (0: 初始化完成, 1: 就绪, 2: 上传中, 4: 上传完成)
 // data.process 上传进度大小
 */
iobs.prototype.upload = function(opts, cb) {
    if (aladdin.env.isiOS) {
        var url = App.Api.iobsHost + '/upload/' + opts.bucket + '/' + opts.key;
        aladdin.http.upload({
            url: url,
            filePath: opts.filePath,
            fileDataName: 'file',
            body: {
                token: opts.token,
                bucket: opts.bucket,
                key: opts.key
            },
            onProcess: opts.onProcess
        }, cb);
        return;
    }

    opts = opts || {};
    opts.onprocess && (opts.onprocess.keep = true);

    opts.bucket = opts.bucket || 'iobs-sf-dev-pri';
    this._aladdin.call(this.name, 'upload', opts, cb);
};

/**
 * 文件下载，另存为本地，并返回本地的文件路径
 *@param opts         option对象
 *         option.url 下载的url
 *  @param cb(err, data)         回调
 // err错误对象, {code: "错误代码", message: "错误消息"}
 // data 数据对象,
 //    data.filePath 下载的本地文件名
 */
iobs.prototype.download = function(opts, cb) {
    opts = opts || {};
    this._aladdin.call(this.name, 'download', opts, cb);
};

// 系统扩展
function sysctrl(aladdin) {
    this._aladdin = aladdin;
}
// 添加name属性
readonlyProperty(sysctrl.prototype, 'name', 'sysctrl');
/**
 @param callback 清除缓存后的回调
 */
sysctrl.prototype.clearCache = function(cb) {
    this._aladdin.call(this.name, 'clearCache', cb);
};
/**
 @param callback 获取缓存后的回调(size)
 */
sysctrl.prototype.getCacheSize = function(cb) {
    this._aladdin.call(this.name, 'getCacheSize', cb);
};

// 录音
function Recorder(aladdin) {
    this._aladdin = aladdin;
}
readonlyProperty(Recorder.prototype, 'name', 'recorder');

/**
 *  开始录音
 *
 * @param {Function} cb
 *    cb(error) 如果打开录音功能失败, error 为具体的值，打开成功为空
 */
Recorder.prototype.startRecord = function(cb) {
    this._aladdin.call(this.name, 'startRecord', cb);
    return this;
};

/**
 *  取消录音
 *
 * @param {Function} cb(error)
 *   error 如果取消录音失败,为具体的值，取消成功为空
 */
Recorder.prototype.cancelRecord = function(cb) {
    this._aladdin.call(this.name, 'cancelRecord', cb);
    return this;
};

/**
 *  停止录音,回调中可得到录音的数据信息
 *
 * @param {Function} cb(error,data)
 *    error 如果取消录音失败,为具体的值，取消成功为空
 *    data 录音相关信息:
 *      url       | String    | 文件路径
 *      size      | Number    | 文件大小(单位KB)
 *      duration  | Number    | 录音时长(单位毫秒)
 */
Recorder.prototype.stopRecord = function(cb) {
    this._aladdin.call(this.name, 'stopRecord', cb);
    return this;
};

/**
 *  开始播放录音
 *
 * @param {Object} opts
 *   opts参数:
 *      url  | String  | 文件路径地址
 *      onComplete | Function | 播放完毕会触发（如果是停止播放则不会触发）
 * @param {Function} cb(error)
 *   error 如果播放录音失败,为具体的值，播放录音成功为空
 */
Recorder.prototype.startPlay = function(opts, cb) {
    this._aladdin.call(this.name, 'startPlay', opts, cb);
    return this;
};

/**
 *  停止播放录音
 *
 * @param {Function} cb(error)
 *   error 如果停止播放录音失败,为具体的值，停止播放成功为空
 */
Recorder.prototype.stopPlay = function(cb) {
    this._aladdin.call(this.name, 'stopPlay', cb);
    return this;
};

/**
 *  密码键盘
 */
function SecrityKeyBoard(aladdin) {
    this._aladdin = aladdin;
}
readonlyProperty(SecrityKeyBoard.prototype, 'name', 'SecrityKeyBoard');
SecrityKeyBoard.prototype.showSecrityKeyBoard = function(opts, cb) { //显示键盘
    opts = opts || {};

    this._aladdin.call(this.name, 'showSecrityKeyBoard', opts, cb);

    return this;
};
SecrityKeyBoard.prototype.getContent = function(opts, cb) { //获取密码
    opts = opts || {};

    this._aladdin.call(this.name, 'getContent', opts, cb);

    return this;
};
SecrityKeyBoard.prototype.clearContent = function(opts, cb) { //清除密码
    opts = opts || {};

    this._aladdin.call(this.name, 'clearContent', opts, cb);

    return this;
};
SecrityKeyBoard.prototype.hideSecrityKeyBoard = function(opts, cb) { //隐藏键盘
    opts = opts || {};

    this._aladdin.call(this.name, 'hideSecrityKeyBoard', opts, cb);

    return this;
};

/**
 *  手势密码
 */
function GuesturePassword(aladdin) {
    this._aladdin = aladdin;
}
readonlyProperty(GuesturePassword.prototype, 'name', 'GuesturePassword');
/*
 * 设置手势密码
 * @param opts 参数
 *             type 类型: 1 设置， 2: 修改
 *             headImg 头像
 * @param cb   回调(err, options)  err:错误信息，正常则为null, options:回调值, 可选
 ＊
 */
GuesturePassword.prototype.setGuesturePassword = function(opts, cb) {
    opts = opts || {};

    this._aladdin.call(this.name, 'setGuesturePassword', opts, cb);

    return this;
};
// 清除手势密码
GuesturePassword.prototype.clearGuesturePassword = function(cb) {

    this._aladdin.call(this.name, 'clearGuesturePassword', cb);

    return this;
};
// 唤起手势密码验证界面
/*
 * @param opts 参数
 *          headImg 头像
 * @param cb 回调方法
 (
 * err: 错误对象
 * options： 回调参数
 *    controllType:
 0:   验证通过
 1:   忘记手势密码
 *    2:   第6次错误后的回调，密码失效跳转到登录页
 3:   账号登录
 )
 */
GuesturePassword.prototype.callGuesturePassword = function(opts, cb) {
    opts = opts || {};

    this._aladdin.call(this.name, 'callGuesturePassword', opts, cb);

    return this;
};
/**
 * 检测是否设置手势密码
 * @param cb 回调(1:已设置|0:未设置)
 */
GuesturePassword.prototype.checkGuesturePassword = function(cb) {

    this._aladdin.call(this.name, 'checkGuesturePassword', cb);

    return this;
};

// 分享
function shareBridge(aladdin) {
    this._aladdin = aladdin;
}
readonlyProperty(shareBridge.prototype, 'name', 'shareBridge');
/**
 *  @brief                      微信，QQ，新浪微博分享
 *  @param opts
 *         scene        场景
 0 ：新浪微博
 1 ：QQ好友
 2 ：QQ空间
 3 ：朋友圈
 4 ：微信朋友

 *         title        标题
 *         describe  内容
 *         url          链接
 *         imge         图片
 *  @param cb  回调(status: 0:分享成功/1:分享失败/2:取消分享/3:未安装, message: '分享完成')
 *
 */
shareBridge.prototype.shareInformation = function(opts, cb) {
    opts = opts || {};
    this._aladdin.call(this.name, 'shareInformation', opts, cb);

    return this;
}

// TalkingData
function TalkingData(aladdin) {
    this._aladdin = aladdin;
}

readonlyProperty(TalkingData.prototype, 'name', 'TalkingData');

/**
 * 无固定上传数据
 * @param eventId 事件ID
 * @param eventLabel 事件标签
 * @param parameters 参数
 */
TalkingData.prototype.trackEvent = function(eventId, eventLabel, parameters) {
    console.log('[TalkingData] eventId:' + eventId + ' , eventLabel:' + eventLabel);
    this._aladdin.call(this.name, 'trackEvent', eventId, eventLabel, parameters || {});
};
/**
 * 有固定上传数据
 * @param eventId 事件ID
 * @param eventLabel 事件标签
 * @param parameters 参数
 */
TalkingData.prototype.trackEventWithPublicParams = function(eventId, eventLabel, parameters) {
    console.log('[TalkingData] eventId:' + eventId + ' , eventLabel:' + eventLabel);
    this._aladdin.call(this.name, 'trackEventWithPublicParams', eventId, eventLabel, parameters || {});
};

// winctrl
function winctrl(aladdin) {
    this._aladdin = aladdin;
}
// 添加name属性
readonlyProperty(winctrl.prototype, 'name', 'winctrl');
winctrl.prototype.open = function(opts, cb) {
    opts = opts || {};
    this._aladdin.call(this.name, 'open', opts, cb);
};
winctrl.prototype.close = function(cb) {
    this._aladdin.call(this.name, 'close', cb);
};

// 获取插件版本信息
function GainPluginfo(aladdin) {
    this._aladdin = aladdin;
}
readonlyProperty(GainPluginfo.prototype, 'name', 'GainPluginfo');
GainPluginfo.prototype.gainPlugInfo = function(cb) {
    this._aladdin.call(this.name, 'gainPlugInfo', cb);
    return this;
}

aladdin.use(iobs);
aladdin.use(sysctrl);
aladdin.use(winctrl);
aladdin.use(Recorder);
aladdin.use(ZkCamera);
aladdin.use(ShareView);
aladdin.use(Dialog);
aladdin.use(LoginSuccess);
//aladdin.use(Http);
//aladdin.use(Navigator);
aladdin.use(SecrityKeyBoard);
aladdin.use(GuesturePassword);
aladdin.use(shareBridge);
aladdin.use(TalkingData);
aladdin.use(GainPluginfo);
aladdin.use(Loading);
aladdin.use(Toast);
aladdin.use(PAPPHtmlNativeTool);
aladdin.use(BKAALDBankATool);
aladdin.use(PAPPRSAUtilPlugin);
aladdin.use(PAPPBowreFreshControl);

