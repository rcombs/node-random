http  = require("http");
https = require("https");
getOptions = function(options,defaults){
	if(!options){
		
	}
	options = [];
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
	if(!callback){
	   callback = console.log;
	}
	if(!errorCallback){
	   errorCallback = function(type,code,string){console.log("RANDOM.ORG Error: Type: "+type+", Status Code: "+code+", Response Data: "+string);};
	}
	var scheme;
	var opts = getOptions(options,defaults);
	if(opts.secure){
		scheme = https;
	}else{
		scheme = http;
	}
	var formatNumbers = function(numbers){
		var rows = numbers.toString().trim().split("\n");
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
				errorCallback("ServerError",503,data);
			}else{
				errorCallback("RequestError",res.statusCode,data);
			}
		})
	}
	var req = scheme.request({
		host: "www.random.org",
		port: opts.secure?443:80,
		method: "GET",
		path: "/integers/?format=plain&num="+opts.num+"&min="+opts.min+"&max="+opts.max+"&col="+opts.col+"&base="+opts.base+"&rnd="+opts.rnd,
		headers: {}
	},callbackFunction);
	req.end();
};
