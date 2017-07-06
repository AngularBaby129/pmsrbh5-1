;(function(w) {
	/**
	 * @description环境配置
	 * @param {path} path
	 */

	var path = {
			//生产环境
			pro: 'https://rsb.pingan.com.cn/bron/pmsrb/emp/banka/',
			//测试环境
			stg: 'https://rsb-stg.pingan.com.cn/bron/pmsrb/emp/banka/',
			//localhost
			loc: 'http://localhost:81/emp/banka/'
		}
	
		/**
		 *@description 请求数据
		 * @param 参数param
		 * 
		 */
	var	aladdinRequestData = function(param){
			aladdin.http.request({
				// 请求的 url 地址
				url:path.stg+param.url || "",
				// 请求的参数，会自动转换为 `querystring`
				// 如 ?name=bob&age=26&hobbies=football&hobbies=basketball
				//qs: {},
				// 支持 `get`、`post`、`put`、`delete`、`options`，默认为 `get`
				method: param.type || 'post',
				body: param.data || {},
				// 请求超时时间
				timeout: 10000,
				// 请求头
				headers: param.beforeSend || {}
			},param.success //发送请求回调 err相当于错误信息，res相当于成功后取到的数据
			);
		}
		/**
		 * 获取URL参数对象
		 * @param queryString
		 * @returns {{}}
		 */
	 var  getQueryString= function (name) {
		    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
		    var r = window.location.search.substr(1).match(reg);
		    if (r != null) {
		        return unescape(r[2]);
		    }
		    return null;
		}			 
		
		
    var  getQueryMap= function(string){
    		var umAccont = getQueryString("name");
    		if(umAccont != '' && umAccont != null && umAccont != undefined){
			var thisURL = document.URL;
			thisURL = decodeURI(thisURL);
			var urlValue = thisURL.split("?")[1];
			var urlFinancingType1 = urlValue.split("&")[0];
			var urlFinancingType2 = urlValue.split("&")[1];
		
			var name = urlFinancingType1.split("=")[1];
			var datetime = urlFinancingType2.split("=")[1];
			if(string == 'name'){
				return name;
			}else if(string == 'dateTime'){
				return datetime;
			}
		}else{
			var reg = new RegExp('(^|&)' + string + '=([^&]*)(&|$)', 'i');
		    var r = window.location.search.substr(1).match(reg);
		    if (r != null) {
		        return unescape(r[2]);
		    }
		    return null;
		}
    		
    }

	var  getQueryString= function (name) {
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
		var r = window.location.search.substr(1).match(reg);
		if (r != null) {
			return unescape(r[2]);
		}
		return null;
	}

	w.getQueryMap = getQueryString;
	w.getQueryMap = getQueryMap;
	// w.aladdinRequestData = aladdinRequestData;

})(window)