"use strict";

var peryod = require( "../lib/peryod.js" );

module.exports = {
    setUp: function( done ) {
        done();
    },

    "0 - 59 seconds": function( test ) {
        var oDate = new Date();
        test.equal( oDate.peryod() , "a few seconds ago...", "should be \"a few seconds ago...\".");

        oDate.setTime( oDate.getTime() - 30000 );
        test.equal( oDate.peryod() , "a few seconds ago...", "should be \"a few seconds ago...\".");

        test.done();
    },

    "with given reference date": function( test ) {
        var oDate = new Date( 2012, 6, 7, 8, 9, 10 ),
            oNow = new Date( 2012, 6, 7, 8, 9, 31 );

        test.equal( oDate.peryod( oNow ) , "a few seconds ago...", "should be \"a few seconds ago...\".");

        test.done();
    },

    "1 minute": function( test ) {
        var oDate;
        ( oDate = new Date() ).setTime( oDate.getTime() - 60000 );
        test.equal( oDate.peryod() , "1 minute ago...", "should be \"1 minute ago...\".");

        ( oDate = new Date() ).setTime( oDate.getTime() - 110000 );
        test.equal( oDate.peryod() , "1 minute ago...", "should be \"1 minute ago...\".");

        test.done();
    },

    "2 - 59 minutes": function( test ) {
        var oDate;
        ( oDate = new Date() ).setTime( oDate.getTime() - 120000 );
        test.equal( oDate.peryod() , "2 minutes ago...", "should be \"2 minutes ago...\".");

        ( oDate = new Date() ).setTime( oDate.getTime() - 1800000 );
        test.equal( oDate.peryod() , "30 minutes ago...", "should be \"30 minutes ago...\".");

        ( oDate = new Date() ).setTime( oDate.getTime() - 3300000 );
        test.equal( oDate.peryod() , "55 minutes ago...", "should be \"55 minutes ago...\".");

        test.done();
    },

    "1 hour": function( test ) {
        var oDate;
        ( oDate = new Date() ).setTime( oDate.getTime() - 3600000 );
        test.equal( oDate.peryod() , "1 hour ago...", "should be \"1 hour ago...\".");

        ( oDate = new Date() ).setTime( oDate.getTime() - 7198000 );
        test.equal( oDate.peryod() , "1 hour ago...", "should be \"1 hour ago...\".");

        test.done();
    },

    "2 - 6 hours": function( test ) {
        var oDate;
        ( oDate = new Date() ).setTime( oDate.getTime() - 7200000 );
        test.equal( oDate.peryod() , "2 hours ago...", "should be \"2 hours ago...\".");

        ( oDate = new Date() ).setTime( oDate.getTime() - 21600000 );
        test.equal( oDate.peryod() , "6 hours ago...", "should be \"6 hours ago...\".");

        test.done();
    },

    "7 - 23 hours in the same day": function( test ) {
        var oDate = new Date( 2012, 6, 7, 8, 9, 10 ),
            oNow = new Date( 2012, 6, 7, 16, 18, 18 );

        test.equal( oDate.peryod( oNow ) , "8 hours ago...", "should be \"8 hours ago...\".");

        oDate = new Date( 2012, 6, 7, 0, 9, 10 );
        oNow = new Date( 2012, 6, 7, 23, 55, 18 );

        test.equal( oDate.peryod( oNow ) , "23 hours ago...", "should be \"23 hours ago...\".");

        test.done();
    },

    "7+ hours, yesterday": function( test ) {
        var oDate = new Date( 2012, 6, 6, 23, 9, 10 ),
            oNow = new Date( 2012, 6, 7, 2, 18, 18 );

        test.notEqual( oDate.peryod( oNow ), "yesterday, 09:10", "should not be \"yesterday, 09:10\"." );

        oDate = new Date( 2012, 6, 6, 23, 9, 10 );
        oNow = new Date( 2012, 6, 7, 12, 18, 18 );

        test.equal( oDate.peryod( oNow ), "yesterday, 09:10", "should be \"yesterday, 09:10\"." );

        test.done();
    },

    "far from yesterday": function( test ) {
        var oDate = new Date( 2012, 6, 3, 23, 9, 10 );

        test.equal( oDate.peryod(), "03 july 2012, 09:10", "should be \"03 july 2012, 09:10\"." );

        test.done();
    }

    // TODO: language object
};
