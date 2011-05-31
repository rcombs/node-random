http  = require("http");
https = require("https");
getOptions = function(options,defaults){
	for(var i in defaults){
		if(!options[i]){
			options[i] = defaults[i];
		}
	}
	return options;
};
exports.integers = function(options,callback,errorCallback){
	var defaults = {
		secure: false,
		num: 1,
		min: 0,
		max: 10000,
		col: 1,
		base: 10,
		rnd: "new"
	};
	var scheme;
	var opts = getOptions(options,defaults);
	if(opts.secure){
		scheme = https;
	}else{
		scheme = http;
	}
	var formatNumbers = function(numbers){
		var rows = numbers.trim().split("\n");
		for(var i=0;i<rows.length;i++){
			rows[i]=rows[i].split("\t");
		}
		return rows;
	}
	var callbackFunction = function(res){
		res.on("data",function(data){
			if(res.statusCode == 200){
				callback(formatNumbers(data));
			}else if(res.statusCode == 503){
				errorCallback("ServerError",{statusCode: 503, response: data);
			}else{
				errorCallback("RequestError",{statusCode: res.statusCode, response: data});
			}
		})
	}
	var req = scheme.request({
		host: "www.random.org",
		port: opts.secure?443:80,
		method: "GET",
		path: "/integers/?num="+opts.num+"&min="+opts.min+"&max="+opts.max+"&col="+opts.col+"&base="+opts.base+"&rnd="+opts.rnd,
		headers: {}
	},callbackFunction);
	req.end();
};
