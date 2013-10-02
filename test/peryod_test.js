"use strict";

var peryod = require( "../lib/peryod.js" );

module.exports = {
    setUp: function( done ) {
        done();
    },

    "0 - 59 seconds": function( test ) {
        var dDate = new Date();
        test.equal( dDate.peryod() , "a few seconds ago...", "should be \"a few seconds ago...\".");

        dDate.setTime( dDate.getTime() - 30000 );
        test.equal( dDate.peryod() , "a few seconds ago...", "should be \"a few seconds ago...\".");

        test.done();
    },

    "with given reference date": function( test ) {
        var dDate = new Date( 2012, 6, 7, 8, 9, 10 ),
            dNow = new Date( 2012, 6, 7, 8, 9, 31 );

        test.equal( dDate.peryod( dNow ) , "a few seconds ago...", "should be \"a few seconds ago...\".");

        test.done();
    },

    "1 minute": function( test ) {
        var dDate;
        ( dDate = new Date() ).setTime( dDate.getTime() - 60000 );
        test.equal( dDate.peryod() , "1 minute ago...", "should be \"1 minute ago...\".");

        ( dDate = new Date() ).setTime( dDate.getTime() - 110000 );
        test.equal( dDate.peryod() , "1 minute ago...", "should be \"1 minute ago...\".");

        test.done();
    },

    "2 - 59 minutes": function( test ) {
        var dDate;
        ( dDate = new Date() ).setTime( dDate.getTime() - 120000 );
        test.equal( dDate.peryod() , "2 minutes ago...", "should be \"2 minutes ago...\".");

        ( dDate = new Date() ).setTime( dDate.getTime() - 1800000 );
        test.equal( dDate.peryod() , "30 minutes ago...", "should be \"30 minutes ago...\".");

        ( dDate = new Date() ).setTime( dDate.getTime() - 3300000 );
        test.equal( dDate.peryod() , "55 minutes ago...", "should be \"55 minutes ago...\".");

        test.done();
    },

    "1 hour": function( test ) {
        var dDate;
        ( dDate = new Date() ).setTime( dDate.getTime() - 3600000 );
        test.equal( dDate.peryod() , "1 hour ago...", "should be \"1 hour ago...\".");

        ( dDate = new Date() ).setTime( dDate.getTime() - 7198000 );
        test.equal( dDate.peryod() , "1 hour ago...", "should be \"1 hour ago...\".");

        test.done();
    },

    "2 - 6 hours": function( test ) {
        var dDate;
        ( dDate = new Date() ).setTime( dDate.getTime() - 7200000 );
        test.equal( dDate.peryod() , "2 hours ago...", "should be \"2 hours ago...\".");

        ( dDate = new Date() ).setTime( dDate.getTime() - 21600000 );
        test.equal( dDate.peryod() , "6 hours ago...", "should be \"6 hours ago...\".");

        test.done();
    },

    "7 - 23 hours in the same day": function( test ) {
        var dDate = new Date( 2012, 6, 7, 8, 9, 10 ),
            dNow = new Date( 2012, 6, 7, 16, 18, 18 );

        test.equal( dDate.peryod( dNow ) , "8 hours ago...", "should be \"8 hours ago...\".");

        dDate = new Date( 2012, 6, 7, 0, 9, 10 );
        dNow = new Date( 2012, 6, 7, 23, 55, 18 );

        test.equal( dDate.peryod( dNow ) , "23 hours ago...", "should be \"23 hours ago...\".");

        test.done();
    },

    "7+ hours, yesterday": function( test ) {
        var dDate = new Date( 2012, 6, 6, 23, 9, 10 ),
            dNow = new Date( 2012, 6, 7, 2, 18, 18 );

        test.notEqual( dDate.peryod( dNow ), "yesterday, 23:09", "should not be \"yesterday, 23:09\"." );

        dDate = new Date( 2012, 6, 6, 23, 9, 10 );
        dNow = new Date( 2012, 6, 7, 12, 18, 18 );

        test.equal( dDate.peryod( dNow ), "yesterday, 23:09", "should be \"yesterday, 23:09\"." );

        test.done();
    },

    "far from yesterday": function( test ) {
        var dDate = new Date( 2012, 6, 3, 23, 9, 10 );

        test.equal( dDate.peryod(), "03 july 2012, 23:09", "should be \"03 july 2012, 23:09\"." );

        test.done();
    },

    "some time in the future": function( test ) {
        var dDate = new Date( 2012, 9, 3, 23, 9, 10 ),
            dNow = new Date( 2012, 6, 7, 2, 18, 18 );

        test.equal( dDate.peryod( dNow ), "03 october 2012, 23:09", "should be \"03 october 2012, 23:09\"." );

        test.done();
    },

    "with custom language strings": function( test ) {
        var dDate,
            dNow,
            oCustomDateStrings = {
                "seconds": "il y a quelques secondes...",
                "minute": "il y a 1 minute...",
                "minutes": "il y a {value} minutes...",
                "hour": "il y a 1 heure...",
                "hours": "il y a {value} heures...",
                "yesterday": "hier, {value}",
                "past": "{date}, {time}",
                "months": [
                    "janvier",
                    "février",
                    "mars",
                    "avril",
                    "mai",
                    "juin",
                    "juillet",
                    "août",
                    "septembre",
                    "octobre",
                    "novembre",
                    "décembre"
                ]
            };

        dDate = new Date();
        test.equal( dDate.peryod( null, oCustomDateStrings ) , "il y a quelques secondes...", "should be \"il y a quelques secondes...\".");

        dDate.setTime( dDate.getTime() - 30000 );
        test.equal( dDate.peryod( null, oCustomDateStrings ) , "il y a quelques secondes...", "should be \"il y a quelques secondes...\".");

        dDate = new Date( 2012, 6, 7, 8, 9, 10 );
        dNow = new Date( 2012, 6, 7, 8, 9, 31 );

        test.equal( dDate.peryod( dNow, oCustomDateStrings ) , "il y a quelques secondes...", "should be \"il y a quelques secondes...\".");

        ( dDate = new Date() ).setTime( dDate.getTime() - 60000 );
        test.equal( dDate.peryod( null, oCustomDateStrings ) , "il y a 1 minute...", "should be \"il y a 1 minute...\".");

        ( dDate = new Date() ).setTime( dDate.getTime() - 110000 );
        test.equal( dDate.peryod( null, oCustomDateStrings ) , "il y a 1 minute...", "should be \"il y a 1 minute...\".");

        ( dDate = new Date() ).setTime( dDate.getTime() - 120000 );
        test.equal( dDate.peryod( null, oCustomDateStrings ) , "il y a 2 minutes...", "should be \"il y a 2 minutes...\".");

        ( dDate = new Date() ).setTime( dDate.getTime() - 1800000 );
        test.equal( dDate.peryod( null, oCustomDateStrings ) , "il y a 30 minutes...", "should be \"il y a 30 minutes...\".");

        ( dDate = new Date() ).setTime( dDate.getTime() - 3300000 );
        test.equal( dDate.peryod( null, oCustomDateStrings ) , "il y a 55 minutes...", "should be \"il y a 55 minutes...\".");

        ( dDate = new Date() ).setTime( dDate.getTime() - 3600000 );
        test.equal( dDate.peryod( null, oCustomDateStrings ) , "il y a 1 heure...", "should be \"il y a 1 heure...\".");

        ( dDate = new Date() ).setTime( dDate.getTime() - 7198000 );
        test.equal( dDate.peryod( null, oCustomDateStrings ) , "il y a 1 heure...", "should be \"il y a 1 heure...\".");

        ( dDate = new Date() ).setTime( dDate.getTime() - 7200000 );
        test.equal( dDate.peryod( null, oCustomDateStrings ) , "il y a 2 heures...", "should be \"il y a 2 heures...\".");

        ( dDate = new Date() ).setTime( dDate.getTime() - 21600000 );
        test.equal( dDate.peryod( null, oCustomDateStrings ) , "il y a 6 heures...", "should be \"il y a 6 heures...\".");

        dDate = new Date( 2012, 6, 7, 8, 9, 10 );
        dNow = new Date( 2012, 6, 7, 16, 18, 18 );

        test.equal( dDate.peryod( dNow, oCustomDateStrings ) , "il y a 8 heures...", "should be \"il y a 8 heures...\".");

        dDate = new Date( 2012, 6, 7, 0, 9, 10 );
        dNow = new Date( 2012, 6, 7, 23, 55, 18 );

        test.equal( dDate.peryod( dNow, oCustomDateStrings ) , "il y a 23 heures...", "should be \"il y a 23 heures...\".");

        dDate = new Date( 2012, 6, 6, 23, 9, 10 );
        dNow = new Date( 2012, 6, 7, 2, 18, 18 );

        test.notEqual( dDate.peryod( dNow, oCustomDateStrings ), "hier, 23:09", "should not be \"hier, 23:09\"." );

        dDate = new Date( 2012, 6, 6, 23, 9, 10 );
        dNow = new Date( 2012, 6, 7, 12, 18, 18 );

        test.equal( dDate.peryod( dNow, oCustomDateStrings ), "hier, 23:09", "should be \"hier, 23:09\"." );

        dDate = new Date( 2012, 6, 3, 23, 9, 10 );

        test.equal( dDate.peryod( null, oCustomDateStrings ), "03 juillet 2012, 23:09", "should be \"03 juillet 2012, 23:09\"." );

        dDate = new Date( 2012, 9, 3, 23, 9, 10 );
        dNow = new Date( 2012, 6, 7, 2, 18, 18 );

        test.equal( dDate.peryod( dNow, oCustomDateStrings ), "03 octobre 2012, 23:09", "should be \"03 octobre 2012, 23:09\"." );

        test.done();
    }
};
