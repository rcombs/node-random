# random
Random is a simple RANDOM.ORG client for node. It asynchronously retrieves true random numbers for use in your programs, formatted in rows and columns.

# Install
for [node.js](http://nodejs.org/) and [npm](http://github.com/isaacs/npm):

	npm install random

# Use
## All functions
All functions in this library accept three arguments: A callback for the result, a hash of options, and a callback for error messages.
All three arguments are optional. The default result callback is `console.log`, the default options are listed for each function, and the default error handler `console.error()`s the error in a human-readable string.
The error callback takes three arguments: the error type ("ServerError" or "RequestError"), the request status code, and the server's response data.

## `generateIntegers`
The `generateIntegers` function asynchronously retrieves a customizable table of true random integers.

### Basic Example

    random = require("random");
    function randomCallback(integers){
	// Prints row 0, column 0
        console.log(integers[0][0]);
    }
    var options = {};
    function errorCallback(type,code,string){
        console.log("RANDOM.ORG Error: Type: "+type+", Status Code: "+code+", Response Data: "+string);
    }
    random.generateIntegers(randomCallback,options,errorCallback);

### Options
By default, we request insecurely, and return one new base-10 integer from 0 to 10,000 in a one-column "table". The options available are:
+ secure:	Boolean:		If true, use https. Otherwise, use http.
+ num:		Integer [0,1e4]:	Number of random integers to retrieve
+ min:		Integer [-1e9,1e9]:	Minimum value
+ max:		Integer [-1e9,1e9]:	Maximum value
+ col:		Integer [1,1e4]:	Number of "columns"
+ base		Integer [2,8,10,16]:	Base to use (binary, octal, decimal, or hexadecimal)
+ rnd:		String:			Which set of random number to use (see "rnd" below)

### Example with options

    random = require("random");
    options = {
        secure: true, // Make the request secure
        num: 10,      // Get 10 integers
        min: -10,     // Minimum of -10
        max: 10,      // Maximum of 10
        col: 2,       // 2 columns
        base: 16,     // Use Base 16
        rnd: "id.123" // Which set of random numbers to use
    }
    function randomCallback(integers){
        // Prints row 1, column 4
        console.log(integers[1][4]);
    }
    random.generateIntegers(randomCallback,options);

## `generateSequence`
The `generateSequence` function asynchronously retrieves a customizable table containing a truly random non-repetitive sequence of integers.

### Basic Example

    random = require("random");
    function randomCallback(sequence){
	// Prints the entire sequence
        console.log(sequence);
    }
    var options = {};
    function errorCallback(type,code,string){
        console.log("RANDOM.ORG Error: Type: "+type+", Status Code: "+code+", Response Data: "+string);
    }
    random.generateSequence(randomCallback,options,errorCallback);

### Options
By default, we request insecurely, and return a sequence of base-10 integers from 0 to 10 in a one-column "table". The options available are:
+ secure:	Boolean:		If true, use https. Otherwise, use http.
+ min:		Integer [-1e9,1e9]:	Lower bound of sequence
+ max:		Integer [-1e9,1e9]:	Upper bound of sequence
+ col:		Integer [1,1e9]:	Number of "columns"
+ base		Integer [2,8,10,16]:	Base to use (binary, octal, decimal, or hexadecimal)
+ rnd:		String:			Which set of random number to use (see "rnd" below)

### Example with options
    random = require("random");
    options = {
        secure: true, // Make the request secure
        min: -10,     // Lower bound -10
        max: 10,      // Upper bound 10
        col: 2,       // 2 columns
        base: 16,     // Use Base 16
        rnd: "id.123" // Which set of random numbers to use
    }
    function randomCallback(sequence){
        // Prints entire sequence
        console.log(sequence);
    }
    random.generateIntegers(randomCallback,options);

## `generateStrings`
The `generateStrings` function asynchronously retrieves an array of customizable truly random strings.

### Basic Example

    random = require("random");
    function randomCallback(string){
	// Prints the string
        console.log(string[0]);
    }
    var options = {};
    function errorCallback(type,code,string){
        console.log("RANDOM.ORG Error: Type: "+type+", Status Code: "+code+", Response Data: "+string);
    }
    random.generateStrings(randomCallback,options,errorCallback);

### Options
By default, we request insecurely, and return a single 10-character-long non-unique string containing digits 0-9 and uppercase and lowercase letters. The options available are:
+ secure:	Boolean:		If true, use https. Otherwise, use http.
+ num:		Integer [1,1e4]:	Number of strings to retrieve
+ len:		Integer [1,20]:		Length of the strings
+ digits:	Boolean:		Whether or not to include the digits 0-9
+ upper:	Boolean:		Whether or not to include the uppercase letters A-Z
+ lower:	Boolean:		Whether or not to include the lowercase letters a-z
+ unique:	Boolean:		Whether or not to ensure that no two strings returned match each other
+ rnd:		String:			Which set of random number to use (see "rnd" below)

### Example with options
    random = require("random");
    options = {
        secure: true, // Make the request secure
        num: 10,      // Get 10 strings
        len: 15,      // 15 characters long
        digits: true  // Include digits
        upper: false  // Exclude uppercase letters
        lower: true   // Include lowercase letters
	unique: true  // Make each one unique
        rnd: "id.123" // Which set of random numbers to use
    }
    function randomCallback(sequence){
        // Prints all strings
        console.log(sequence);
    }
    random.generateStrings(randomCallback,options);

## `checkQuota`
The `checkQuota` function asynchronously checks to see how many bits a given IP is allowed to use before its next top-off. When this becomes negative, the machine in question is not allowed to request any more random numbers until it is either topped off automatically, or more bits are bought for it at [random.org/quota](http://random.org/quota/)

### Basic Example

    random = require("random");
    function quotaCallback(quota){
	// Prints the remaining quota bits
        console.log(quota);
    }
    var options = {};
    function errorCallback(type,code,string){
        console.log("RANDOM.ORG Error: Type: "+type+", Status Code: "+code+", Response Data: "+string);
    }
    random.checkQuota(quotaCallback,options,errorCallback);

### Options
By default, we request insecurely, and check the quota for the current machine's IP.
+ secure:	Boolean:		If true, use https. Otherwise, use http.
+ ip:		String:			IP Address to check quota for

### Example with options
    random = require("random");
    options = {
        secure: true,       // Make the request secure
        ip: "134.226.36.80" // Get the quota for random.org's server
    }
    function quotaCallback(quota){
        // Prints the remaining quota bits
        console.log(quota);
    }
    random.checkQuota(quotaCallback,options);

## rnd value

The rnd value in the options hash is a bit complicated. You have three options with it:
+ "new": generate a new set of true random numbers, then discard them afterwards.
+ "id.YOUR_ID_GOES_HERE": If the ID given has been used before, use those numbers. Otherwise, generate a new set.
+ "date.YOUR_DATE_GOES_HERE": Use a pregenerated set of numbers from a certain date. The date must be in ISO 8601 format (i.e., YYYY-MM-DD) or one of the two shorthand strings today or yesterday. 
