/* peryòd
 * https://github.com/leny/peryod
 *
 * Copyright (c) 2013 Leny
 * Licensed under the MIT license.
 */

;( function() {
    "use strict";

    var oDateStrings = {
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
    };

    Date.prototype.peryod = function( dNow, oGivenStrings ) {
        var iDiff, bFuture, _ref, _ref2, sHours, sMinutes, sDay, iMonth, sMonth;
        dNow = ( !!dNow && typeof dNow === "object" && Object.prototype.toString.call( dNow ) === "[object Date]" ) ? dNow : new Date();

        iDiff = Math.round( ( dNow.getTime() - this.getTime() ) / 1000 );

        bFuture = iDiff < 0;

        // seconds
        if( !bFuture && iDiff < 60 ) {
            return ( _ref = oGivenStrings ) ? _ref.seconds : oDateStrings.seconds;
        }

        // 1 minutes
        if( !bFuture && iDiff < 120 ) {
            return ( _ref = oGivenStrings ) ? _ref.minute : oDateStrings.minute;
        }

        // 2 - 59 minutes
        if( !bFuture && iDiff < 3600 ) {
            return ( ( _ref = oGivenStrings ) ? _ref.minutes : oDateStrings.minutes ).replace( "{value}", Math.floor( iDiff / 60 ) );
        }

        // 1 hour
        if( !bFuture && iDiff < 7200 ) {
            return ( _ref = oGivenStrings ) ? _ref.hour : oDateStrings.hour;
        }

        // 2 - 6 hours
        if( !bFuture && iDiff < 21600 ) {
            return ( ( _ref = oGivenStrings ) ? _ref.hours : oDateStrings.hours ).replace( "{value}", Math.floor( iDiff / 3600 ) );
        }

        // 7 - 23 hours in the same day
        if( !bFuture && iDiff < 86400 && dNow.getDate() === this.getDate() ) {
            return ( ( _ref = oGivenStrings ) ? _ref.hours : oDateStrings.hours ).replace( "{value}", Math.floor( iDiff / 3600 ) );
        }

        sHours = ( _ref = this.getHours() ) < 10 ? "0" + _ref : _ref;
        sMinutes = ( _ref = this.getMinutes() ) < 10 ? "0" + _ref : _ref;

        // 7+ hours, yesterday
        if( !bFuture && iDiff < ( ( this.getHours() + 24 ) * 60 * 60 ) ) {
            return ( ( _ref = oGivenStrings ) ? _ref.yesterday : oDateStrings.yesterday ).replace( "{value}", sHours + ":" + sMinutes );
        }

        // far from yesterday
        sDay = ( _ref = this.getDate() ) < 10 ? "0" + _ref : _ref;
        iMonth = this.getMonth();
        sMonth = ( ( _ref = oGivenStrings ) ? ( ( _ref2 = _ref.months[ iMonth ] ) ? _ref2 : oDateStrings.months[ iMonth ] ) : oDateStrings.months[ iMonth ] );
        return ( ( _ref = oGivenStrings ) ? _ref.past : oDateStrings.past ).replace( "{date}", sDay + " " + sMonth + " " + this.getFullYear() ).replace( "{time}", sHours + ":" + sMinutes );
    };

} ).call( this );
