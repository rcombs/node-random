#!/usr/bin/env node
http  = require("http");
https = require("https");
const VERSION = "1.0.0beta-1"
function globalErrorCallback(type,code,string){
    console.error("RANDOM.ORG Error: Type: "+type+", Status Code: "+code+", Response Data: "+string);
};
function formatStrings(strings){
    return strings.toString().trim().split("\n");
}
function formatNumbers(numbers){
    var rows = numbers.toString().trim().split("\n");
    for(var i=0;i<rows.length;i++){
        rows[i]=rows[i].split("\t");
    }
    return rows;
}
function getOptions(options,defaults){
	if(!options){
        options = [];
	}
	for(var i in defaults){
		if(!options[i]){
			options[i] = defaults[i];
		}
	}
	return options;
};
exports.generateIntegers = function(callback,options,errorCallback){
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
	   errorCallback = globalErrorCallback;
	}
	var scheme;
	var opts = getOptions(options,defaults);
	if(opts.secure){
		scheme = https;
	}else{
		scheme = http;
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
		});
	}
	var req = scheme.request({
		host: "www.random.org",
		port: opts.secure?443:80,
		method: "GET",
		path: "/integers/?format=plain&num="+opts.num+"&min="+opts.min+"&max="+opts.max+"&col="+opts.col+"&base="+opts.base+"&rnd="+opts.rnd,
		headers: {
			"User-Agent": "Random.org client for Node.js by Rodger Combs <rodger.combs@gmail.com>, version "+VERSION
		}
	},callbackFunction);
	req.end();
};
exports.generateSequence = function(callback,options,errorCallback){
	var defaults = {
		secure: false,
		min: 0,
		max: 10,
		col: 1,
		base: 10,
		rnd: "new"
	};
	if(!callback){
	   callback = console.log;
	}
	if(!errorCallback){
	   errorCallback = globalErrorCallback;
	}
	var scheme;
	var opts = getOptions(options,defaults);
	if(opts.secure){
		scheme = https;
	}else{
		scheme = http;
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
		});
	}
	var req = scheme.request({
		host: "www.random.org",
		port: opts.secure?443:80,
		method: "GET",
		path: "/sequences/?format=plain&min="+opts.min+"&max="+opts.max+"&col="+opts.col+"&base="+opts.base+"&rnd="+opts.rnd,
		headers: {
			"User-Agent": "Random.org client for Node.js by Rodger Combs <rodger.combs@gmail.com>, version "+VERSION
		}
	},callbackFunction);
	req.end();
};
exports.generateStrings = function(callback,options,errorCallback){
	var defaults = {
		secure: false,
        num: 1,
        length: 10,
        digits: true,
		upper: true,
		lower: true,
		unique: false,
		rnd: "new"
	};
	if(!callback){
	   callback = console.log;
	}
	if(!errorCallback){
	   errorCallback = globalErrorCallback;
	}
	var scheme;
	var opts = getOptions(options,defaults);
	if(opts.secure){
		scheme = https;
	}else{
		scheme = http;
	}
	var callbackFunction = function(res){
		res.on("data",function(data){
			if(res.statusCode == 200){
				callback(formatStrings(data));
			}else if(res.statusCode == 503){
				errorCallback("ServerError",503,data);
			}else{
				errorCallback("RequestError",res.statusCode,data);
			}
		});
	}
	var req = scheme.request({
		host: "www.random.org",
		port: opts.secure?443:80,
		method: "GET",
		path: "/strings/?format=plain&num="+opts.num+"&len="+opts.length+"&digits="+(opts.digits?"on":"off")+"&upperalpha="+(opts.upper?"on":"off")+"&loweralpha="+(opts.lower?"on":"off")+"&unique="+(opts.unique?"on":"off")+"&rnd="+opts.rnd,
		headers: {
			"User-Agent": "Random.org client for Node.js by Rodger Combs <rodger.combs@gmail.com>, version "+VERSION
		}
	},callbackFunction);
	req.end();
};
exports.checkQuota = function(callback,options,errorCallback){
	var defaults = {
		secure: false,
        ip: false
	};
	if(!callback){
	   callback = console.log;
	}
	if(!errorCallback){
	   errorCallback = globalErrorCallback;
	}
	var scheme;
	var opts = getOptions(options,defaults);
	if(opts.secure){
		scheme = https;
	}else{
		scheme = http;
	}
	var callbackFunction = function(res){
		res.on("data",function(data){
			if(res.statusCode == 200){
				callback(parseInt(data));
			}else if(res.statusCode == 503){
				errorCallback("ServerError",503,data);
			}else{
				errorCallback("RequestError",res.statusCode,data);
			}
		});
	}
	var req = scheme.request({
		host: "www.random.org",
		port: opts.secure?443:80,
		method: "GET",
		path: "/quota/?format=plain"+(opts.ip?"&ip="+opts.ip:""),
		headers: {
			"User-Agent": "Random.org client for Node.js by Rodger Combs <rodger.combs@gmail.com>, version "+VERSION
		}
	},callbackFunction);
	req.end();
};