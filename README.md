# peryòd 

[![Build Status](https://secure.travis-ci.org/leny/peryod.png?branch=master)](http://travis-ci.org/leny/peryod)

Date for humans in javascript (node.js &amp; browser)

## Getting Started

### in node.js

Install the module with: `npm install peryod`

```javascript
require("peryod");

someDate = new Date();
humanReadableDate = someDate.peryod();
```

### in browsers

    <script src="peryod.min.js"></script>
    
```javascript
someDate = new Date();
humanReadableDate = someDate.peryod();
```

## Documentation
Peryòd add a new method `peryod` in the global `Date` object, returning a human-readable string representation of the date compared to another date (now, by default).

#### Human-readable representations : 
* a few seconds ago...
* 1 minute ago...
* **23** minutes ago...
* 1 hour ago...
* **4** hours ago..
* yesterday, **12**:**34**
* **14 october 2013**, **12**:**34**

### dateObject.peryod()

Returns a human-readable representation of the dateObject from **now**.

### dateObject.peryod( date )

Returns a human-readable representation of the dateObject from **date**.  
**Note:** if **date** isn't a `Date` object (or is `null`), it will be treated as **now**.

### dateObject.peryod( date, strings )

Returns a human-readable representation of the dateObject from **date**, using the custom givens strings.  
The **strings** parameters is an object with these properties : 

```javascript
strings = {
    "seconds": "a few seconds ago...",
    "minute": "1 minute ago...",
    "minutes": "{value} minutes ago...",
    "hour": "1 hour ago...",
    "hours": "{value} hours ago...",
    "yesterday": "yesterday, {value}",
    "past": "{date}, {time}",
    "months": [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december"
    ]
}
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style.  
Add unit tests for any new or changed functionality.  
Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
**2013-09-06:** v1.0.0 - *initial version*

## License
Copyright (c) 2013 Leny  
Licensed under the MIT license.
