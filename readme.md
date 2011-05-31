# random
Random is a simple RANDOM.ORG client for node. It asynchronously retrieves true random numbers for use in your programs, formatted in rows and columns.

    random = require("random");
    function randomCallback(integers){
	// Prints row 0, column 0
        console.log(integers[0][0]);
    }
    random.integers(randomCallback);

# Options
You can also specify options. By default, we request insecurely, and return one new base-10 integer from 0 to 10,000 in a one-column "table".

    random = require("random");
    options = {
        secure: true, // Make the request secure
        num: 10,      // Get 10 integers
        min: -10,     // Minimum of -10
        max: 10,      // Maximum of 10
        col: 2,       // 2 columns
        base: 10,     // Base-10 (Supported: 2, 8, 10, 16)
        rnd: "id.123" // Which set of random numbers to use
    }
    function randomCallback(integers){
        // Prints row 1, column 5
        console.log(integers[1][5]);
    }
    random.integers(randomCallback,options);

# rnd value

The rnd value in the options hash is a bit complicated. You have three options with it:
1. "new": generate a new set of true random numbers, then discard them afterwards.
2. "id.YOUR_ID_GOES_HERE": If the ID given has been used before, use those numbers. Otherwise, generate a new set.
3. "date.YOUR_DATE_GOES_HERE": Use a pregenerated set of numbers from a certain date. The date must be in ISO 8601 format (i.e., YYYY-MM-DD) or one of the two shorthand strings today or yesterday. 

# Install
for [node.js](http://nodejs.org/) and [npm](http://github.com/isaacs/npm):

	npm install random


